'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface AddVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onVehicleAdded: () => void
}

export function AddVehicleModal({ isOpen, onClose, onVehicleAdded }: AddVehicleModalProps) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [transmission, setTransmission] = useState("automatic")
  const [seatingCapacity, setSeatingCapacity] = useState(5)
  const [fuelType, setFuelType] = useState("petrol")
  const [location, setLocation] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newVehicle = { name, image, price, transmission, seatingCapacity, fuelType, location }

    const response = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicle),
    })

    if (response.ok) {
      onVehicleAdded()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2a2a3e] border-[#3a3a4e] text-white">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9]">Add Vehicle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
