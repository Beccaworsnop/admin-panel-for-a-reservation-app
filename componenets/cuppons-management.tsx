"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge" 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Eye } from "lucide-react"

interface Coupon {
  id: string
  code: string
  discountPercent: number
  startDate: string
  endDate: string
  usageLimit: number
  usedCount: number
  status: "Active" | "Expired"
}

interface CouponUsage {
  customerName: string
  bookingId: string
  dateUsed: string
}

export function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "SUMMER2025",
      discountPercent: 20,
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      usageLimit: 100,
      usedCount: 45,
      status: "Active",
    },
    {
      id: "2",
      code: "WINTER2024",
      discountPercent: 15,
      startDate: "2024-12-01",
      endDate: "2025-02-28",
      usageLimit: 50,
      usedCount: 50,
      status: "Expired",
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false)
  const [selectedCouponUsage, setSelectedCouponUsage] = useState<CouponUsage[]>([])
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
  })

  const handleCreateCoupon = () => {
    const discount = Number.parseInt(newCoupon.discountPercent)
    const limit = Number.parseInt(newCoupon.usageLimit)

    if (!newCoupon.code || !discount || !newCoupon.startDate || !newCoupon.endDate || !limit) {
      alert("Please fill in all fields")
      return
    }

    if (discount < 0 || discount > 100) {
      alert("Discount must be between 0-100%")
      return
    }

    const coupon: Coupon = {
      id: Date.now().toString(),
      code: newCoupon.code.toUpperCase(),
      discountPercent: discount,
      startDate: newCoupon.startDate,
      endDate: newCoupon.endDate,
      usageLimit: limit,
      usedCount: 0,
      status: "Active",
    }

    setCoupons([...coupons, coupon])
    setNewCoupon({ code: "", discountPercent: "", startDate: "", endDate: "", usageLimit: "" })
    setIsCreateModalOpen(false)
  }

  const handleViewUsage = (couponCode: string) => {
    // Mock usage data
    const mockUsage: CouponUsage[] = [
      { customerName: "John Smith", bookingId: "BK001", dateUsed: "2025-07-15" },
      { customerName: "Sarah Johnson", bookingId: "BK002", dateUsed: "2025-07-20" },
      { customerName: "Mike Wilson", bookingId: "BK003", dateUsed: "2025-08-01" },
    ]
    setSelectedCouponUsage(mockUsage)
    setIsUsageModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Coupons</h2>
          <p className="text-gray-600 mt-1">Manage promotional codes and discounts</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Usage Limit</TableHead>
                <TableHead>Used Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discountPercent}%</TableCell>
                  <TableCell>{coupon.startDate}</TableCell>
                  <TableCell>{coupon.endDate}</TableCell>
                  <TableCell>{coupon.usageLimit}</TableCell>
                  <TableCell>{coupon.usedCount}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "Active" ? "default" : "secondary"}>{coupon.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => handleViewUsage(coupon.code)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Usage History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Coupon Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Coupon Code</label>
              <Input
                placeholder="SUMMER2025"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Discount % (0-100)</label>
              <Input
                type="number"
                placeholder="20"
                min="0"
                max="100"
                value={newCoupon.discountPercent}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountPercent: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
              <Input
                type="date"
                value={newCoupon.startDate}
                onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
              <Input
                type="date"
                value={newCoupon.endDate}
                onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Usage Limit</label>
              <Input
                type="number"
                placeholder="100"
                value={newCoupon.usageLimit}
                onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleCreateCoupon} className="bg-blue-600 hover:bg-blue-700">
                Create
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Usage History Modal */}
      <Dialog open={isUsageModalOpen} onOpenChange={setIsUsageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Coupon Usage History</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Date Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCouponUsage.map((usage, index) => (
                  <TableRow key={index}>
                    <TableCell>{usage.customerName}</TableCell>
                    <TableCell>{usage.bookingId}</TableCell>
                    <TableCell>{usage.dateUsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
