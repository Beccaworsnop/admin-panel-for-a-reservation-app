"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge"
import { Search, Filter, Users, Download, Plus, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReservationDetailsModal } from "./reservation-details-modal"
import { NewApartmentReservationModal } from "./new-apartment-reservation-modal"

const apartmentReservations = [
  {
    id: "APT001",
    customer: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 234 567 892",
    checkIn: "2025-06-01",
    checkOut: "2025-06-30",
    duration: "1 month",
    apartmentType: "2-Bedroom Apartment",
    apartmentNumber: "A-205",
    building: "Building A",
    guests: { adults: 3, children: 1 },
    status: "Confirmed",
    price: 1200,
    paymentStatus: "Paid",
    utilities: ["Electricity", "Water", "Internet", "Heating"],
    furnished: true,
    parkingSpot: "P-15",
    securityDeposit: 500,
    leaseType: "Short-term",
    specialRequests: "Pet-friendly apartment needed",
    bookingSource: "Direct Contact",
    managedBy: "Emma Davis",
    managerResponsible: "Michael Chen",
  },
  {
    id: "APT002",
    customer: "David Wilson",
    email: "david.w@email.com",
    phone: "+1 234 567 893",
    checkIn: "2025-06-15",
    checkOut: "2025-09-15",
    duration: "3 months",
    apartmentType: "Studio Apartment",
    apartmentNumber: "B-101",
    building: "Building B",
    guests: { adults: 1, children: 0 },
    status: "Pending",
    price: 2400,
    paymentStatus: "Deposit Paid",
    utilities: ["Electricity", "Water", "Internet"],
    furnished: false,
    parkingSpot: null,
    securityDeposit: 800,
    leaseType: "Medium-term",
    specialRequests: "Ground floor preferred",
    bookingSource: "Airbnb",
    managedBy: null,
    managerResponsible: null,
  },
]

export function ApartmentReservations() {
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null)
  const [showNewReservationModal, setShowNewReservationModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("all")
  const [filteredReservations, setFilteredReservations] = useState(apartmentReservations)

  const applyFilters = () => {
    console.log("[v0] Applying filters to apartment reservations...")
    let filtered = apartmentReservations

    if (searchQuery) {
      filtered = filtered.filter(
        (res) =>
          res.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((res) => res.status.toLowerCase() === statusFilter.toLowerCase())
    }

    if (agentFilter !== "all") {
      filtered = filtered.filter((res) => res.managedBy === agentFilter)
    }

    if (dateRangeFilter) {
      filtered = filtered.filter((res) => {
        const checkInDate = new Date(res.checkIn)
        const filterDate = new Date(dateRangeFilter)
        return checkInDate >= filterDate
      })
    }

    setFilteredReservations(filtered)
    console.log("[v0] Filtered results:", filtered.length, "reservations")
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters()
    }
  }

  const handleExport = () => {
    console.log("[v0] Exporting apartment reservations data...")
    const csvData = [
      [
        "Reservation ID",
        "Customer",
        "Email",
        "Phone",
        "Check-in",
        "Check-out",
        "Duration",
        "Apartment Type",
        "Unit",
        "Building",
        "Guests",
        "Status",
        "Price",
        "Utilities",
        "Furnished",
        "Managed By",
        "Manager Responsible",
      ],
      ...filteredReservations.map((res) => [
        res.id,
        res.customer,
        res.email,
        res.phone,
        res.checkIn,
        res.checkOut,
        res.duration,
        res.apartmentType,
        res.apartmentNumber,
        res.building,
        `${res.guests.adults}A ${res.guests.children}C`,
        res.status,
        `$${res.price}`,
        res.utilities.join("; "),
        res.furnished ? "Yes" : "No",
        res.managedBy || "",
        res.managerResponsible || "",
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "apartment-reservations-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleNewReservation = () => {
    console.log("[v0] Opening new apartment reservation modal...")
    setShowNewReservationModal(true)
  }

  const handleConsultClick = (reservationId: string) => {
    console.log("[v0] Opening apartment reservation details for:", reservationId)
    setSelectedReservation(reservationId)
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Apartment Reservations</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto" onClick={handleNewReservation}>
            <Plus className="w-4 h-4 mr-2" />
            New Apartment Reservation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Filters</h3>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search apartment reservations by name or ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              className="w-full sm:w-auto"
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
            />
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" onClick={applyFilters} className="w-full sm:w-auto">
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredReservations.map((reservation) => (
          <div key={reservation.id} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium text-gray-900">{reservation.id}</div>
                <div className="text-sm text-gray-500">Apartment Reservation</div>
              </div>
              <Badge
                className={`${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : reservation.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"} hover:${reservation.status === "Confirmed" ? "bg-green-100" : reservation.status === "Pending" ? "bg-yellow-100" : "bg-red-100"}`}
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
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm text-gray-900">{reservation.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Apartment:</span>
                <span className="text-sm text-gray-900">
                  {reservation.apartmentType} - {reservation.apartmentNumber}
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
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apartment Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.id}</div>
                      <div className="text-sm text-gray-500">Apartment Reservation</div>
                      <div className="text-xs text-gray-400 mt-1">
                        <div>Lease: {reservation.leaseType}</div>
                        <div>Source: {reservation.bookingSource}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{reservation.customer}</div>
                    <div className="text-sm text-gray-500">{reservation.email}</div>
                    <div className="text-sm text-gray-500">{reservation.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.checkIn}</div>
                  <div className="text-sm text-gray-900">{reservation.checkOut}</div>
                  <div className="text-sm text-gray-500">{reservation.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.apartmentType}</div>
                  <div className="text-sm text-gray-500">
                    {reservation.apartmentNumber} • {reservation.building}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>
                      Guests: {reservation.guests.adults} adults, {reservation.guests.children} children
                    </div>
                    <div>Furnished: {reservation.furnished ? "Yes" : "No"}</div>
                    <div>Parking: {reservation.parkingSpot || "None"}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={`${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : reservation.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"} hover:${reservation.status === "Confirmed" ? "bg-green-100" : reservation.status === "Pending" ? "bg-yellow-100" : "bg-red-100"}`}
                  >
                    {reservation.status}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">{reservation.paymentStatus}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${reservation.price}</div>
                  <div className="text-xs text-gray-500">Deposit: ${reservation.securityDeposit}</div>
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

      {/* Reservation Details Modal */}
      <ReservationDetailsModal
        isOpen={selectedReservation !== null}
        onClose={() => setSelectedReservation(null)}
        reservationId={selectedReservation || ""}
        type="apartment"
      />

      {/* New Apartment Reservation Modal */}
      <NewApartmentReservationModal
        isOpen={showNewReservationModal}
        onClose={() => setShowNewReservationModal(false)}
      />
    </div>
  )
}
