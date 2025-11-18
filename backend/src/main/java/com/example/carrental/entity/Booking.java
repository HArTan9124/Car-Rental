package com.example.carrental.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long userId;
    private Long carId;
    private LocalDateTime pickupAt;
    private LocalDateTime dropoffAt;
    private String status;
    // added fields to store booking details and price breakdown
    private Integer days;
    private String pickupLocation;
    private String dropoffLocation;

    private Integer dailyRate;
    private Integer subtotal;
    private Integer tax;
    private Integer insurance;
    private Integer total;

    public Booking() {}

    public Booking(Long userId, Long carId, LocalDateTime pickupAt, LocalDateTime dropoffAt) {
        this.userId = userId;
        this.carId = carId;
        this.pickupAt = pickupAt;
        this.dropoffAt = dropoffAt;
    this.status = "PENDING";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public LocalDateTime getPickupAt() { return pickupAt; }
    public void setPickupAt(LocalDateTime pickupAt) { this.pickupAt = pickupAt; }

    public LocalDateTime getDropoffAt() { return dropoffAt; }
    public void setDropoffAt(LocalDateTime dropoffAt) { this.dropoffAt = dropoffAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getDays() { return days; }
    public void setDays(Integer days) { this.days = days; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public Integer getDailyRate() { return dailyRate; }
    public void setDailyRate(Integer dailyRate) { this.dailyRate = dailyRate; }

    public Integer getSubtotal() { return subtotal; }
    public void setSubtotal(Integer subtotal) { this.subtotal = subtotal; }

    public Integer getTax() { return tax; }
    public void setTax(Integer tax) { this.tax = tax; }

    public Integer getInsurance() { return insurance; }
    public void setInsurance(Integer insurance) { this.insurance = insurance; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
}
