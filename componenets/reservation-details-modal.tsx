"use client"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge" 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Upload, Check, XCircle } from "lucide-react"

interface ReservationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  reservationId: string
  type: "hotel" | "apartment"
}

export function ReservationDetailsModal({ isOpen, onClose, reservationId }: ReservationDetailsModalProps) {
  const [showPaymentManagement, setShowPaymentManagement] = useState(false)
  const [cashPaymentData, setCashPaymentData] = useState({
    agentName: "",
    receiptNumber: "",
    date: "2025-12-04",
  })

  const [ccpTransferData, setCcpTransferData] = useState({
    transactionNumber: "",
    transferDate: "2025-12-04",
    agentName: "",
    proofFile: null as File | null,
  })

  const [bankTransferData, setBankTransferData] = useState({
    bankName: "",
    referenceNumber: "",
    date: "2025-12-04",
    agentName: "",
    proofFile: null as File | null,
  })

  const ccpFileInputRef = useRef<HTMLInputElement>(null)
  const bankFileInputRef = useRef<HTMLInputElement>(null)

  const handleConfirmCashPayment = () => {
    console.log("[v0] Confirming cash payment with data:", cashPaymentData)
    if (!cashPaymentData.agentName || !cashPaymentData.receiptNumber) {
      alert("Please fill in all required fields")
      return
    }
    alert("Cash payment confirmed successfully!")
  }

  const handleConfirmCcpTransfer = () => {
    console.log("[v0] Confirming CCP transfer with data:", ccpTransferData)
    if (!ccpTransferData.transactionNumber || !ccpTransferData.agentName) {
      alert("Please fill in all required fields")
      return
    }
    alert("CCP transfer confirmed successfully!")
  }

  const handleConfirmBankTransfer = () => {
    console.log("[v0] Confirming bank transfer with data:", bankTransferData)
    if (!bankTransferData.bankName || !bankTransferData.referenceNumber || !bankTransferData.agentName) {
      alert("Please fill in all required fields")
      return
    }
    alert("Bank transfer confirmed successfully!")
  }

  const handleFileUpload = (type: "ccp" | "bank", file: File | null) => {
    console.log(`[v0] Uploading ${type} proof file:`, file?.name)
    if (type === "ccp") {
      setCcpTransferData((prev) => ({ ...prev, proofFile: file }))
    } else {
      setBankTransferData((prev) => ({ ...prev, proofFile: file }))
    }
  }

  const handleCancelReservation = () => {
    const confirmed = window.confirm("Are you sure you want to cancel this reservation? This action cannot be undone.")
    if (confirmed) {
      console.log("[v0] Cancelling reservation:", reservationId)
      alert("Reservation has been cancelled successfully!")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Reservation Details</DialogTitle>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">ID: {reservationId}</span>
              <Button size="sm" variant="destructive" onClick={handleCancelReservation}>
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Reservation
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowPaymentManagement(!showPaymentManagement)}
              >
                {showPaymentManagement ? "View Details" : "Manage Payment"}
              </Button>
            </div>
          </div>
        </DialogHeader>

        {!showPaymentManagement ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Reservation Status */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sub-Status:</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Refund confirmed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Status:</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Managed by:</span>
                    <span className="text-sm text-gray-900">Sarah Johnson</span>
                  </div>
                </div>
              </Card>

              {/* Client Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">John smith</p>
                  <p className="text-sm text-gray-600">+132 456 789</p>
                  <p className="text-sm text-gray-600">john.smith@gmail.com</p>
                </div>
              </Card>

              {/* Pricing Details */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Price:</span>
                    <span className="text-lg font-semibold text-gray-900">450$</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Margin:</span>
                    <span className="text-sm font-medium text-green-600">135$</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Method:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="text-sm text-gray-900">Card</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Hotel Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-medium text-gray-900">Grand Palace Hotel</h4>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Location:</p>
                  <p className="text-sm text-gray-900">123 Grand Ave, City Center</p>
                </div>
              </Card>

              {/* Guest & Room Details */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest & Room details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Check-in:</span>
                    <span className="text-sm text-gray-900">20-05-2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Check-out:</span>
                    <span className="text-sm text-gray-900">23-05-2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm text-gray-900">3 nights</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Room Type:</span>
                    <span className="text-sm text-gray-900">Deluxe Suite</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Guests:</span>
                    <span className="text-sm text-gray-900">2 adults, 1 child</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {/* Reservation Summary */}
            <Card className="p-4 lg:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer</p>
                  <p className="font-medium text-gray-900">John Smith</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="font-medium text-gray-900">450$</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Cash Payment */}
              <Card className="p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold text-gray-900">$</span>
                  <h3 className="text-lg font-semibold text-gray-900">Cash Payment</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Received by (Agent Name)</label>
                    <Input
                      placeholder="Agent Name"
                      value={cashPaymentData.agentName}
                      onChange={(e) => setCashPaymentData((prev) => ({ ...prev, agentName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Received Number</label>
                    <Input
                      placeholder="Receipt #"
                      value={cashPaymentData.receiptNumber}
                      onChange={(e) => setCashPaymentData((prev) => ({ ...prev, receiptNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date</label>
                    <Input
                      type="date"
                      value={cashPaymentData.date}
                      onChange={(e) => setCashPaymentData((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handleConfirmCashPayment}>
                    <Check className="w-4 h-4 mr-2" />
                    Confirm Cash Payment
                  </Button>
                </div>
              </Card>

              {/* CCP Transfer */}
              <Card className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CCP Transfer</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Transaction Number</label>
                    <Input
                      placeholder="Transaction #"
                      value={ccpTransferData.transactionNumber}
                      onChange={(e) => setCcpTransferData((prev) => ({ ...prev, transactionNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Transfer Date</label>
                    <Input
                      type="date"
                      value={ccpTransferData.transferDate}
                      onChange={(e) => setCcpTransferData((prev) => ({ ...prev, transferDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Upload Proof</label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => ccpFileInputRef.current?.click()}
                    >
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        {ccpTransferData.proofFile ? ccpTransferData.proofFile.name : "Upload screenshot or PDF"}
                      </p>
                      <input
                        ref={ccpFileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileUpload("ccp", e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Agent Name</label>
                    <Input
                      placeholder="Agent name"
                      value={ccpTransferData.agentName}
                      onChange={(e) => setCcpTransferData((prev) => ({ ...prev, agentName: e.target.value }))}
                    />
                  </div>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handleConfirmCcpTransfer}>
                    <Check className="w-4 h-4 mr-2" />
                    Confirm CCP Transfer
                  </Button>
                </div>
              </Card>

              {/* Bank Transfer */}
              <Card className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank transfer</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Bank Name</label>
                    <Input
                      placeholder="Bank name"
                      value={bankTransferData.bankName}
                      onChange={(e) => setBankTransferData((prev) => ({ ...prev, bankName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Reference Number</label>
                    <Input
                      placeholder="Reference #"
                      value={bankTransferData.referenceNumber}
                      onChange={(e) => setBankTransferData((prev) => ({ ...prev, referenceNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date</label>
                    <Input
                      type="date"
                      value={bankTransferData.date}
                      onChange={(e) => setBankTransferData((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Upload Proof</label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => bankFileInputRef.current?.click()}
                    >
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        {bankTransferData.proofFile ? bankTransferData.proofFile.name : "Upload screenshot or PDF"}
                      </p>
                      <input
                        ref={bankFileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileUpload("bank", e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Agent Name</label>
                    <Input
                      placeholder="Agent name"
                      value={bankTransferData.agentName}
                      onChange={(e) => setBankTransferData((prev) => ({ ...prev, agentName: e.target.value }))}
                    />
                  </div>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handleConfirmBankTransfer}>
                    <Check className="w-4 h-4 mr-2" />
                    Confirm Bank Transfer
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}