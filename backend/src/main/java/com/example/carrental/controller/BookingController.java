package com.example.carrental.controller;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrental.entity.Booking;
import com.example.carrental.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private com.example.carrental.repository.CarRepository carRepository;
    @Autowired
    private com.example.carrental.repository.UserRepository userRepository;

    @GetMapping
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Booking getById(@org.springframework.web.bind.annotation.PathVariable Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Booking create(@RequestBody Booking b) {
        return bookingRepository.save(b);
    }

    @GetMapping(path = "/{id}/receipt")
    public ResponseEntity<byte[]> getReceipt(@org.springframework.web.bind.annotation.PathVariable Long id) {
        Booking b = bookingRepository.findById(id).orElse(null);
        if (b == null) return ResponseEntity.notFound().build();

        try {
            // generate styled PDF using OpenPDF to approximate the provided receipt design
            com.lowagie.text.Document document = new com.lowagie.text.Document(com.lowagie.text.PageSize.A4, 36, 36, 36, 36);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            com.lowagie.text.pdf.PdfWriter.getInstance(document, baos);
            document.open();

            com.lowagie.text.Font brand = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 18, com.lowagie.text.Font.BOLD);
            com.lowagie.text.Font h1 = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 16, com.lowagie.text.Font.BOLD);
            com.lowagie.text.Font normal = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 11, com.lowagie.text.Font.NORMAL);
            com.lowagie.text.Font muted = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 10, com.lowagie.text.Font.NORMAL);

            // Header area
            com.lowagie.text.pdf.PdfPTable header = new com.lowagie.text.pdf.PdfPTable(2);
            header.setWidthPercentage(100);
            header.setWidths(new int[] {3,1});
            com.lowagie.text.pdf.PdfPCell left = new com.lowagie.text.pdf.PdfPCell();
            left.setBorder(com.lowagie.text.Rectangle.NO_BORDER);
            left.addElement(new com.lowagie.text.Paragraph("AutoRent", brand));
            left.addElement(new com.lowagie.text.Paragraph("Your booking is confirmed!", muted));
            header.addCell(left);

            com.lowagie.text.pdf.PdfPCell right = new com.lowagie.text.pdf.PdfPCell();
            right.setBorder(com.lowagie.text.Rectangle.NO_BORDER);
            right.setHorizontalAlignment(com.lowagie.text.Element.ALIGN_RIGHT);
            right.addElement(new com.lowagie.text.Paragraph("Booking ID: #" + b.getId(), h1));
            right.addElement(new com.lowagie.text.Paragraph("Issue Date: " + java.time.LocalDate.now().format(java.time.format.DateTimeFormatter.ofPattern("dd MMM, yyyy")), muted));
            header.addCell(right);

            document.add(header);

            // Renter / total box
            com.lowagie.text.pdf.PdfPTable renterTotal = new com.lowagie.text.pdf.PdfPTable(2);
            renterTotal.setWidthPercentage(100);
            renterTotal.setSpacingBefore(12);
            renterTotal.setWidths(new int[] {3,1});

            com.lowagie.text.pdf.PdfPCell renterCell = new com.lowagie.text.pdf.PdfPCell();
            renterCell.setBorder(com.lowagie.text.Rectangle.BOX);
            renterCell.setPadding(12);
            // fetch user info if available
            String renterName = "Guest";
            String renterEmail = "";
            if (b.getUserId() != null) {
                var ou = userRepository.findById(b.getUserId());
                if (ou.isPresent()) {
                    var u = ou.get();
                    renterName = (u.getFirstName() != null ? u.getFirstName() + " " : "") + (u.getLastName() != null ? u.getLastName() : "");
                    renterEmail = u.getEmail() != null ? u.getEmail() : "";
                }
            }
            renterCell.addElement(new com.lowagie.text.Paragraph("Rented by", muted));
            renterCell.addElement(new com.lowagie.text.Paragraph(renterName, h1));
            if (!renterEmail.isEmpty()) renterCell.addElement(new com.lowagie.text.Paragraph(renterEmail, muted));
            renterTotal.addCell(renterCell);

            com.lowagie.text.pdf.PdfPCell totalCell = new com.lowagie.text.pdf.PdfPCell();
            totalCell.setBorder(com.lowagie.text.Rectangle.BOX);
            totalCell.setPadding(12);
            totalCell.setHorizontalAlignment(com.lowagie.text.Element.ALIGN_RIGHT);
            totalCell.addElement(new com.lowagie.text.Paragraph("Total Amount Paid", muted));
            totalCell.addElement(new com.lowagie.text.Paragraph("₹" + (b.getTotal() != null ? b.getTotal() : 0), new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 16, com.lowagie.text.Font.BOLD)));
            renterTotal.addCell(totalCell);

            document.add(renterTotal);

            // Vehicle box with image placeholder
            com.lowagie.text.pdf.PdfPTable vehicle = new com.lowagie.text.pdf.PdfPTable(2);
            vehicle.setSpacingBefore(12);
            vehicle.setWidthPercentage(100);
            vehicle.setWidths(new int[] {1,2});

            com.lowagie.text.pdf.PdfPCell imgCell = new com.lowagie.text.pdf.PdfPCell();
            imgCell.setBorder(com.lowagie.text.Rectangle.BOX);
            imgCell.setPadding(8);
            // attempt to fetch car and embed image if possible
            String carName = "Vehicle";
            String carBrand = "";
            String carImage = null;
            if (b.getCarId() != null) {
                var oc = carRepository.findById(b.getCarId());
                if (oc.isPresent()) {
                    var c = oc.get();
                    carName = c.getName() != null ? c.getName() : carName;
                    carBrand = c.getBrand() != null ? c.getBrand() : "";
                    carImage = c.getImage();
                }
            }
            if (carImage != null && carImage.startsWith("data:")) {
                try {
                    // base64 image: create Image from bytes
                    String base64 = carImage.substring(carImage.indexOf(',') + 1);
                    byte[] img = java.util.Base64.getDecoder().decode(base64);
                    com.lowagie.text.Image im = com.lowagie.text.Image.getInstance(img);
                    im.scaleToFit(110, 72);
                    imgCell.addElement(im);
                } catch (Exception ex) {
                    imgCell.addElement(new com.lowagie.text.Paragraph("[Image]", muted));
                }
            } else if (carImage != null && (carImage.startsWith("/uploads/") || carImage.startsWith("http"))) {
                try {
                    // attempt to fetch remote image bytes
                    java.net.URL u = new java.net.URL((carImage.startsWith("/uploads/") ? "http://localhost:8080" + carImage : carImage));
                    java.io.InputStream is = u.openStream();
                    byte[] img = is.readAllBytes();
                    is.close();
                    com.lowagie.text.Image im = com.lowagie.text.Image.getInstance(img);
                    im.scaleToFit(110, 72);
                    imgCell.addElement(im);
                } catch (Exception ex) {
                    imgCell.addElement(new com.lowagie.text.Paragraph("[Image]", muted));
                }
            } else {
                imgCell.addElement(new com.lowagie.text.Paragraph("[Image]", muted));
            }
            vehicle.addCell(imgCell);

            com.lowagie.text.pdf.PdfPCell infoCell = new com.lowagie.text.pdf.PdfPCell();
            infoCell.setBorder(com.lowagie.text.Rectangle.BOX);
            infoCell.setPadding(12);
            infoCell.addElement(new com.lowagie.text.Paragraph(carName, h1));
            if (!carBrand.isEmpty()) infoCell.addElement(new com.lowagie.text.Paragraph(carBrand, muted));
            infoCell.addElement(new com.lowagie.text.Paragraph(" ", muted));
            infoCell.addElement(new com.lowagie.text.Paragraph("Seats: " + ("5"), normal));
            infoCell.addElement(new com.lowagie.text.Paragraph("Transmission: " + ("Automatic"), normal));
            infoCell.addElement(new com.lowagie.text.Paragraph("Fuel: " + ("Petrol"), normal));
            vehicle.addCell(infoCell);

            document.add(vehicle);

            // Pickup / Drop boxes
            com.lowagie.text.pdf.PdfPTable pd = new com.lowagie.text.pdf.PdfPTable(2);
            pd.setSpacingBefore(12);
            pd.setWidthPercentage(100);
            pd.setWidths(new int[] {1,1});

            com.lowagie.text.pdf.PdfPCell pickup = new com.lowagie.text.pdf.PdfPCell();
            pickup.setBorder(com.lowagie.text.Rectangle.BOX);
            pickup.setPadding(12);
            pickup.addElement(new com.lowagie.text.Paragraph("Pickup", muted));
            pickup.addElement(new com.lowagie.text.Paragraph(b.getPickupLocation() != null ? b.getPickupLocation() : "Pickup location", normal));
            if (b.getPickupAt() != null) pickup.addElement(new com.lowagie.text.Paragraph(b.getPickupAt().format(DateTimeFormatter.ofPattern("EEE, MMM d, yyyy - hh:mm a")), muted));
            pd.addCell(pickup);

            com.lowagie.text.pdf.PdfPCell drop = new com.lowagie.text.pdf.PdfPCell();
            drop.setBorder(com.lowagie.text.Rectangle.BOX);
            drop.setPadding(12);
            drop.addElement(new com.lowagie.text.Paragraph("Drop-off", muted));
            drop.addElement(new com.lowagie.text.Paragraph(b.getDropoffLocation() != null ? b.getDropoffLocation() : "Return location", normal));
            if (b.getDropoffAt() != null) drop.addElement(new com.lowagie.text.Paragraph(b.getDropoffAt().format(DateTimeFormatter.ofPattern("EEE, MMM d, yyyy - hh:mm a")), muted));
            pd.addCell(drop);

            document.add(pd);

            // Payment summary table
            com.lowagie.text.pdf.PdfPTable table = new com.lowagie.text.pdf.PdfPTable(2);
            table.setWidths(new int[] {4,1});
            table.setWidthPercentage(100);
            table.setSpacingBefore(12);

            table.addCell(new com.lowagie.text.Phrase("Rental Fee (" + (b.getDays()!=null?b.getDays():1) + " days x ₹" + (b.getDailyRate()!=null?b.getDailyRate():0) + ")", muted));
            table.addCell(new com.lowagie.text.Phrase("₹" + (b.getSubtotal()!=null?b.getSubtotal():0), normal));

            table.addCell(new com.lowagie.text.Phrase("Collision Damage Waiver", muted));
            table.addCell(new com.lowagie.text.Phrase("₹" + (b.getInsurance()!=null?b.getInsurance():0), normal));

            table.addCell(new com.lowagie.text.Phrase("Taxes & Surcharges", muted));
            table.addCell(new com.lowagie.text.Phrase("₹" + (b.getTax()!=null?b.getTax():0), normal));

            table.addCell(new com.lowagie.text.Phrase("One-way Drop-off Fee", muted));
            table.addCell(new com.lowagie.text.Phrase("₹0", normal));

            com.lowagie.text.pdf.PdfPCell totalLabel = new com.lowagie.text.pdf.PdfPCell(new com.lowagie.text.Phrase("Total Paid", h1));
            totalLabel.setBorder(com.lowagie.text.Rectangle.TOP);
            totalLabel.setPaddingTop(8);
            table.addCell(totalLabel);
            com.lowagie.text.pdf.PdfPCell totalValue = new com.lowagie.text.pdf.PdfPCell(new com.lowagie.text.Phrase("₹" + (b.getTotal()!=null?b.getTotal():0), h1));
            totalValue.setBorder(com.lowagie.text.Rectangle.TOP);
            totalValue.setPaddingTop(8);
            table.addCell(totalValue);

            document.add(table);

            // Footer note
            com.lowagie.text.Paragraph note = new com.lowagie.text.Paragraph("Please bring your driver's license and the credit card used for this booking to the pickup location. The cancellation is free up to 48 hours before pickup time.", muted);
            note.setSpacingBefore(12);
            document.add(note);

            document.close();

            byte[] pdfBytes = baos.toByteArray();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "receipt-" + b.getId() + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
