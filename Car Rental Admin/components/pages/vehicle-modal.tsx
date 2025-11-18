'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

interface VehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onVehicleAdded: () => void
  vehicle?: any
}

export function VehicleModal({ isOpen, onClose, onVehicleAdded, vehicle }: VehicleModalProps) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [transmission, setTransmission] = useState("automatic")
  const [seatingCapacity, setSeatingCapacity] = useState(5)
  const [fuelType, setFuelType] = useState("petrol")
  const [location, setLocation] = useState("")
  const [brand, setBrand] = useState("")
  const [engineCapacity, setEngineCapacity] = useState("N/A")
  const [airbags, setAirbags] = useState("N/A")
  const [mileage, setMileage] = useState("N/A")
  const [bluetooth, setBluetooth] = useState("N/A")
  const [vehicleType, setVehicleType] = useState("Sedan")
  const [bootSpace, setBootSpace] = useState("N/A")
  const [gpsNavigation, setGpsNavigation] = useState("N/A")
  const [sunroof, setSunroof] = useState("N/A")
  const [status, setStatus] = useState("available")
  const [rating, setRating] = useState(4.0)
  const [reviews, setReviews] = useState(0)
  const [pickupLocation, setPickupLocation] = useState("")

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name)
      setImage(vehicle.image)
      setPrice(vehicle.price)
      setTransmission(vehicle.transmission)
      setSeatingCapacity(vehicle.seatingCapacity)
      setFuelType(vehicle.fuelType)
      setLocation(vehicle.location)
  setBrand(vehicle.brand || "")
  setEngineCapacity(vehicle.engineCapacity || "N/A")
  setAirbags(vehicle.airbags || "N/A")
  setMileage(vehicle.mileage || "N/A")
  setBluetooth(vehicle.bluetooth || "N/A")
  setVehicleType(vehicle.vehicleType || "Sedan")
  setBootSpace(vehicle.bootSpace || "N/A")
  setGpsNavigation(vehicle.gpsNavigation || "N/A")
  setSunroof(vehicle.sunroof || "N/A")
  setStatus(vehicle.status || "available")
  setRating(vehicle.rating || 4.0)
  setReviews(vehicle.reviews || 0)
  setPickupLocation(vehicle.pickupLocation || "")
    }
  }, [vehicle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const vehicleData = { name, image, price, transmission, seatingCapacity, fuelType, location,
      brand, engineCapacity, airbags, mileage, bluetooth, vehicleType, bootSpace, gpsNavigation, sunroof, status, rating, reviews, pickupLocation
    }
    console.log("Submitting vehicle data:", vehicleData)

    const url = vehicle ? `/api/cars/${vehicle.id}` : "/api/cars"
    const method = vehicle ? "PUT" : "POST"
    console.log(`Making ${method} request to ${url}`)

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      })
      console.log("Received response:", response)

      if (response.ok) {
        onVehicleAdded()
        onClose()
      } else {
        console.error("Failed to add/edit vehicle:", response)
      }
    } catch (error) {
      console.error("An error occurred during fetch:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2a2a3e] border-[#3a3a4e] text-white w-1/2 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{vehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
          <div>
            <Label htmlFor="name">Vehicle Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="price">Price per day</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <Select value={transmission} onValueChange={setTransmission}>
              <SelectTrigger className="bg-[#1a1a2e] border-[#3a3a4e]">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3e] text-white">
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="seatingCapacity">Seating Capacity</Label>
            <Input id="seatingCapacity" type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(Number(e.target.value))} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger className="bg-[#1a1a2e] border-[#3a3a4e]">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3e] text-white">
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="brand">Brand / Model</Label>
            <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="engineCapacity">Engine Capacity</Label>
            <Input id="engineCapacity" value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="fuelType">Airbags</Label>
            <Input id="airbags" value={airbags} onChange={(e) => setAirbags(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="mileage">Mileage</Label>
            <Input id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="bluetooth">Bluetooth</Label>
            <Input id="bluetooth" value={bluetooth} onChange={(e) => setBluetooth(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="bg-[#1a1a2e] border-[#3a3a4e]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3e] text-white">
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bootSpace">Boot Space</Label>
            <Input id="bootSpace" value={bootSpace} onChange={(e) => setBootSpace(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="gpsNavigation">GPS Navigation</Label>
            <Input id="gpsNavigation" value={gpsNavigation} onChange={(e) => setGpsNavigation(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="sunroof">Sunroof</Label>
            <Input id="sunroof" value={sunroof} onChange={(e) => setSunroof(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#1a1a2e] border-[#3a3a4e]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3e] text-white">
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" type="number" step="0.1" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="reviews">Reviews</Label>
            <Input id="reviews" type="number" value={reviews} onChange={(e) => setReviews(Number(e.target.value))} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div>
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input id="pickupLocation" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="bg-[#1a1a2e] border-[#3a3a4e]" />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9]">{vehicle ? "Save Changes" : "Add Vehicle"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
