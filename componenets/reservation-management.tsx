"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge" 
import { ReservationDetailsModal } from "./reservation-details-modal" 
import { Search, Filter, Calendar, Users, Download, Plus, ChevronDown } from "lucide-react"

interface ReservationManagementProps {
  type?: "hotel" | "apartment"
}

export function ReservationManagement({ type = "hotel" }: ReservationManagementProps) {
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null)
  const [showNewReservationModal, setShowNewReservationModal] = useState(false)

  const handleExport = () => {
    console.log("[v0] Exporting reservations data...")
    // Create CSV data
    const csvData = [
      ["Reservation ID", "Customer", "Email", "Check-in", "Check-out", "Status", "Price"],
      ["RES001", "John Smith", "john.smith@gmail.com", "2025-05-20", "2025-05-23", "Confirmed", "450$"],
      ["RES002", "John Smith", "john.smith@gmail.com", "2025-05-25", "2025-05-30", "Cancelled", "150$"],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}-reservations-export.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleNewReservation = () => {
    console.log("[v0] Opening new reservation modal...")
    setShowNewReservationModal(true)
  }

  const handleConsultClick = (reservationId: string) => {
    setSelectedReservation(reservationId)
  }

  const title = type === "hotel" ? "Hotel Reservations" : "Apartment Reservations"

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto" onClick={handleNewReservation}>
            <Plus className="w-4 h-4 mr-2" />
            New reservation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Filters</h3>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search reservations..." className="pl-10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Date range
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Agent
            </Button>
          </div>
        </div>
      </Card>

      {/* Reservations Table */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reservations (3)</h3>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {[
            {
              id: "RES001",
              customer: "John smith",
              email: "john.smith@gmail.com",
              dates: "20-05-2025 to 23-05-2025",
              nights: "3 nights",
              room: "Deluxe Suite",
              status: "Confirmed",
              price: "450$",
              statusColor: "bg-green-100 text-green-800",
            },
            {
              id: "RES002",
              customer: "John smith",
              email: "john.smith@gmail.com",
              dates: "25-05-2025 to 30-05-2025",
              nights: "5 nights",
              room: "Ocean Suite",
              status: "Cancelled",
              price: "150$",
              statusColor: "bg-red-100 text-red-800",
            },
          ].map((reservation) => (
            <div key={reservation.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{reservation.id}</div>
                  <div className="text-sm text-gray-500">Regular Reservation</div>
                </div>
                <Badge className={`${reservation.statusColor} hover:${reservation.statusColor}`}>
                  {reservation.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer:</span>
                  <span className="text-sm text-gray-900">{reservation.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dates:</span>
                  <span className="text-sm text-gray-900">{reservation.dates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Room:</span>
                  <span className="text-sm text-gray-900">{reservation.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-sm font-medium text-gray-900">{reservation.price}</span>
                </div>
              </div>

              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => handleConsultClick(reservation.id)}
              >
                Consult
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">RES 001</div>
                      <div className="text-sm text-gray-500">Regular Reservation</div>
                      <div className="text-xs text-gray-400 mt-1">
                        <div>Reservation details</div>
                        <div>ID: RES001</div>
                        <div>Status: Confirmed, Paid</div>
                        <div>Check-in: 20-05-2025</div>
                        <div>Check-out: 23-05-2025</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">John smith</div>
                    <div className="text-sm text-gray-500">Premium member</div>
                    <div className="text-sm text-gray-500">john.smith@gmail.com</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">20-05-2025</div>
                  <div className="text-sm text-gray-900">23-05-2025</div>
                  <div className="text-sm text-gray-500">3 nights</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Deluxe Suite</div>
                  <div className="text-sm text-gray-500">Room 101 • Premium</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>Guest details</div>
                    <div>Name: John Smith</div>
                    <div>Phone: +132 456 789</div>
                    <div>Email: john.smith@gmail.com</div>
                    <div>Guests: 2 adults, 1 child</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                  <div className="text-xs text-gray-500 mt-1">Refund confirmed</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">450$</div>
                  <div className="text-xs text-gray-500">Paid</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleConsultClick("RES001")}
                  >
                    Consult
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">RES 002</div>
                      <div className="text-sm text-gray-500">Regular Reservation</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">John smith</div>
                    <div className="text-sm text-gray-500">Premium member</div>
                    <div className="text-sm text-gray-500">john.smith@gmail.com</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">25-05-2025</div>
                  <div className="text-sm text-gray-900">30-05-2025</div>
                  <div className="text-sm text-gray-500">5 nights</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Ocean Suite</div>
                  <div className="text-sm text-gray-500">Room 201 • Premium</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
                  <div className="text-xs text-gray-500 mt-1">No refund</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">150$</div>
                  <div className="text-xs text-gray-500">Refunded</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleConsultClick("RES002")}
                  >
                    Consult
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reservation Details Modal */}
      <ReservationDetailsModal
        isOpen={selectedReservation !== null}
        onClose={() => setSelectedReservation(null)}
        reservationId={selectedReservation || ""
        
        }
        type="hotel"

      />

      {/* New Reservation Modal */}
      {showNewReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">New {type === "hotel" ? "Hotel" : "Apartment"} Reservation</h3>
            <p className="text-gray-600 mb-4">Create a new reservation form would be implemented here.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowNewReservationModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("[v0] Creating new reservation...")
                  setShowNewReservationModal(false)
                }}
                className="flex-1"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}