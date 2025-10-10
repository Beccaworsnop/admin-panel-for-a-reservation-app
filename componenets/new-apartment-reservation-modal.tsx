"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewApartmentReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewApartmentReservationModal({ isOpen, onClose }: NewApartmentReservationModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    apartmentType: "",
    adults: "1",
    children: "0",
    furnished: "yes",
    parkingRequired: "no",
    specialRequests: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating new apartment reservation with data:", formData)
    // Here you would send the data to your backend
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Apartment Reservation</DialogTitle>
          <DialogDescription>Enter the client details to create a new apartment reservation.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartmentType">Apartment Type *</Label>
              <Select value={formData.apartmentType} onValueChange={(value) => handleChange("apartmentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select apartment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio Apartment</SelectItem>
                  <SelectItem value="1bed">1-Bedroom Apartment</SelectItem>
                  <SelectItem value="2bed">2-Bedroom Apartment</SelectItem>
                  <SelectItem value="3bed">3-Bedroom Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date *</Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleChange("checkIn", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date *</Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adults">Adults *</Label>
              <Select value={formData.adults} onValueChange={(value) => handleChange("adults", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children">Children</Label>
              <Select value={formData.children} onValueChange={(value) => handleChange("children", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="furnished">Furnished</Label>
              <Select value={formData.furnished} onValueChange={(value) => handleChange("furnished", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parkingRequired">Parking Required</Label>
              <Select
                value={formData.parkingRequired}
                onValueChange={(value) => handleChange("parkingRequired", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Input
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Any special requests or notes..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Reservation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
