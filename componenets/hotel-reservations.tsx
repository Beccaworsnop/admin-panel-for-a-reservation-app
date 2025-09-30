"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge"
import { ReservationDetailsModal } from "./reservation-details-modal"
import { Search, Filter, Calendar, Users, Download, Plus, ChevronDown } from "lucide-react"

const hotelReservations = [
  {
    id: "HTL001",
    customer: "John Smith",
    email: "john.smith@gmail.com",
    phone: "+1 234 567 890",
    checkIn: "2025-05-20",
    checkOut: "2025-05-23",
    nights: 3,
    roomType: "Deluxe Suite",
    roomNumber: "101",
    floor: "1st Floor",
    guests: { adults: 2, children: 1 },
    status: "Confirmed",
    price: 450,
    paymentStatus: "Paid",
    amenities: ["WiFi", "Breakfast", "Pool Access", "Gym"],
    specialRequests: "Late check-in requested",
    bookingSource: "Direct Website",
    membershipLevel: "Premium",
  },
  {
    id: "HTL002",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234 567 891",
    checkIn: "2025-05-25",
    checkOut: "2025-05-30",
    nights: 5,
    roomType: "Ocean Suite",
    roomNumber: "201",
    floor: "2nd Floor",
    guests: { adults: 2, children: 0 },
    status: "Cancelled",
    price: 750,
    paymentStatus: "Refunded",
    amenities: ["WiFi", "Ocean View", "Balcony", "Mini Bar"],
    specialRequests: "Ocean view preferred",
    bookingSource: "Booking.com",
    membershipLevel: "Standard",
  },
]

export function HotelReservations() {
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null)
  const [showNewReservationModal, setShowNewReservationModal] = useState(false)

  const handleExport = () => {
    console.log("[v0] Exporting hotel reservations data...")
    const csvData = [
      [
        "Reservation ID",
        "Customer",
        "Email",
        "Phone",
        "Check-in",
        "Check-out",
        "Room Type",
        "Room Number",
        "Guests",
        "Status",
        "Price",
        "Amenities",
      ],
      ...hotelReservations.map((res) => [
        res.id,
        res.customer,
        res.email,
        res.phone,
        res.checkIn,
        res.checkOut,
        res.roomType,
        res.roomNumber,
        `${res.guests.adults}A ${res.guests.children}C`,
        res.status,
        `$${res.price}`,
        res.amenities.join("; "),
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hotel-reservations-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleNewReservation = () => {
    console.log("[v0] Opening new hotel reservation modal...")
    setShowNewReservationModal(true)
  }

  const handleConsultClick = (reservationId: string) => {
    setSelectedReservation(reservationId)
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Hotel Reservations</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto" onClick={handleNewReservation}>
            <Plus className="w-4 h-4 mr-2" />
            New Hotel Reservation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Filters</h3>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search hotel reservations..." className="pl-10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Room Type
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Date range
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Floor
            </Button>
          </div>
        </div>
      </Card>

      {/* Reservations Table */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Hotel Reservations ({hotelReservations.length})</h3>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {hotelReservations.map((reservation) => (
            <div key={reservation.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{reservation.id}</div>
                  <div className="text-sm text-gray-500">Hotel Reservation</div>
                </div>
                <Badge
                  className={`${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} hover:${reservation.status === "Confirmed" ? "bg-green-100" : "bg-red-100"}`}
                >
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
                  <span className="text-sm text-gray-900">
                    {reservation.checkIn} to {reservation.checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Room:</span>
                  <span className="text-sm text-gray-900">
                    {reservation.roomType} - {reservation.roomNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-sm font-medium text-gray-900">${reservation.price}</span>
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
              {hotelReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reservation.id}</div>
                        <div className="text-sm text-gray-500">Hotel Reservation</div>
                        <div className="text-xs text-gray-400 mt-1">
                          <div>Booking Source: {reservation.bookingSource}</div>
                          <div>Member: {reservation.membershipLevel}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.customer}</div>
                      <div className="text-sm text-gray-500">{reservation.membershipLevel} member</div>
                      <div className="text-sm text-gray-500">{reservation.email}</div>
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.checkIn}</div>
                    <div className="text-sm text-gray-900">{reservation.checkOut}</div>
                    <div className="text-sm text-gray-500">{reservation.nights} nights</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.roomType}</div>
                    <div className="text-sm text-gray-500">
                      Room {reservation.roomNumber} • {reservation.floor}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      <div>
                        Guests: {reservation.guests.adults} adults, {reservation.guests.children} children
                      </div>
                      <div>Amenities: {reservation.amenities.slice(0, 2).join(", ")}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={`${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} hover:${reservation.status === "Confirmed" ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {reservation.status}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{reservation.paymentStatus}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${reservation.price}</div>
                    <div className="text-xs text-gray-500">{reservation.paymentStatus}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleConsultClick(reservation.id)}
                    >
                      Consult
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reservation Details Modal */}
      <ReservationDetailsModal
        isOpen={selectedReservation !== null}
        onClose={() => setSelectedReservation(null)}
        reservationId={selectedReservation || ""}
        type="hotel"
      />

      {/* New Reservation Modal */}
      {showNewReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">New Hotel Reservation</h3>
            <p className="text-gray-600 mb-4">
              Hotel reservation form with room selection, amenities, and guest details would be implemented here.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowNewReservationModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("[v0] Creating new hotel reservation...")
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

