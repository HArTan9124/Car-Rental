"use client"

import { Plus, Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { VehicleModal } from "./vehicle-modal"

export function FleetPage() {
  const [cars, setCars] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)

  const fetchCars = () => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handleAdd = () => {
    setEditingCar(null)
    setIsModalOpen(true)
  }

  const handleEdit = (car: any) => {
    setEditingCar(car)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/cars/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      fetchCars()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/20 text-green-400"
      case "In Use":
        return "bg-blue-500/20 text-blue-400"
      case "Maintenance":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <main className="flex-1 overflow-auto p-8 space-y-8">
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVehicleAdded={fetchCars}
        vehicle={editingCar}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Fleet Management</h1>
          <p className="text-[#a0aec0]">Manage and monitor your vehicle fleet</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Total Vehicles</p>
          <h3 className="text-3xl font-bold text-white">{cars.length}</h3>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-400">{cars.length}</h3>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">In Use</p>
          <h3 className="text-3xl font-bold text-blue-400">0</h3>
        </div>
        <div className="bg-[#2a2a3e] rounded-lg p-6 border border-[#3a3a4e]">
          <p className="text-[#a0aec0] text-sm font-medium mb-2">Maintenance</p>
          <h3 className="text-3xl font-bold text-yellow-400">0</h3>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-[#2a2a3e] rounded-lg border border-[#3a3a4e] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3a4e] bg-[#1a1a2e]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#a0aec0] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car: any) => (
                <tr key={car.id} className="border-b border-[#3a3a4e] hover:bg-[#3a3a4e]/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#7c3aed]">{car.id}</td>
                  <td className="px-6 py-4 text-sm text-white">
                    {car.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">₹{car.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor("Available")}`}>
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a0aec0]">{car.location}</td>
                  <td className="px-6 py-4 text-sm flex gap-3">
                    <button onClick={() => handleEdit(car)} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
