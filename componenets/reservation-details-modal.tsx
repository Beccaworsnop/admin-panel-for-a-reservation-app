"use client"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Upload, Check, XCircle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReservationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  reservationId: string
  type: "hotel" | "apartment"
}

export function ReservationDetailsModal({ isOpen, onClose, reservationId }: ReservationDetailsModalProps) {
  const [showPaymentManagement, setShowPaymentManagement] = useState(false)
  const [showManageConfirmation, setShowManageConfirmation] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancelReason, setCancelReason] = useState("")

  const [cashPaymentData, setCashPaymentData] = useState({
    receiptNumber: "",
    date: "2025-12-04",
    receiptFile: null as File | null,
  })

  const [bankTransferData, setBankTransferData] = useState({
    bankName: "",
    referenceNumber: "",
    date: "2025-12-04",
    proofFile: null as File | null,
  })

  const cashReceiptInputRef = useRef<HTMLInputElement>(null)
  const bankFileInputRef = useRef<HTMLInputElement>(null)

  const handleConfirmCashPayment = () => {
    console.log("[v0] Confirming cash payment with data:", cashPaymentData)
    if (!cashPaymentData.receiptNumber || !cashPaymentData.receiptFile) {
      alert("Please fill in all required fields and upload receipt")
      return
    }

    // Simulate sending to Google Sheets and WhatsApp
    console.log("[v0] Registering payment in Google Sheets...")
    console.log("[v0] Sending to WhatsApp group:", {
      reservationNumber: reservationId,
      date: cashPaymentData.date,
      receiptNumber: cashPaymentData.receiptNumber,
      receiptImage: cashPaymentData.receiptFile.name,
    })

    alert("Cash payment confirmed! Data sent to Google Sheets and WhatsApp group.")
  }

  const handleConfirmBankTransfer = () => {
    console.log("[v0] Confirming bank transfer with data:", bankTransferData)
    if (!bankTransferData.bankName || !bankTransferData.referenceNumber) {
      alert("Please fill in all required fields")
      return
    }
    alert("Bank transfer confirmed successfully!")
  }

  const handleFileUpload = (type: "cash" | "bank", file: File | null) => {
    console.log(`[v0] Uploading ${type} proof file:`, file?.name)
    if (type === "cash") {
      setCashPaymentData((prev) => ({ ...prev, receiptFile: file }))
    } else {
      setBankTransferData((prev) => ({ ...prev, proofFile: file }))
    }
  }

  const handleManageReservation = () => {
    setShowManageConfirmation(true)
  }

  const confirmManageReservation = () => {
    console.log("[v0] Agent managing reservation:", reservationId)
    // In real app, this would capture the logged-in agent's name
    alert("You are now managing this reservation. Your name has been recorded.")
    setShowManageConfirmation(false)
  }

  const handleCancelReservation = () => {
    setShowCancelDialog(true)
  }

  const confirmCancelReservation = () => {
    if (!cancelReason) {
      alert("Please select a cancellation reason")
      return
    }
    console.log("[v0] Cancelling reservation:", reservationId, "Reason:", cancelReason)
    alert(`Reservation cancelled. Reason: ${cancelReason}`)
    setShowCancelDialog(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">Reservation Details</DialogTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">ID: {reservationId}</span>
                <Button size="sm" variant="outline" onClick={handleManageReservation}>
                  Manage This Reservation
                </Button>
                <Button size="sm" variant="destructive" onClick={handleCancelReservation}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
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
                        Disponible (Available)
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

                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Booked Through:</span>
                      <span className="text-sm text-gray-900">XML from HotelBeds</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date of Creation:</span>
                      <span className="text-sm text-gray-900">2025-05-15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">State:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
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

                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Purchase Price:</span>
                      <span className="text-sm font-medium text-gray-900">300$</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Margin:</span>
                      <span className="text-sm font-medium text-green-600">+150$</span>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">Sale Price:</span>
                      <span className="text-lg font-semibold text-gray-900">450$</span>
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
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Cash Payment */}
                <Card className="p-4 lg:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold text-gray-900">$</span>
                    <h3 className="text-lg font-semibold text-gray-900">Cash Payment</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Receipt Number</label>
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
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Upload Receipt</label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                        onClick={() => cashReceiptInputRef.current?.click()}
                      >
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          {cashPaymentData.receiptFile ? cashPaymentData.receiptFile.name : "Upload receipt image"}
                        </p>
                        <input
                          ref={cashReceiptInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileUpload("cash", e.target.files?.[0] || null)}
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handleConfirmCashPayment}>
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Cash Payment
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

      <Dialog open={showManageConfirmation} onOpenChange={setShowManageConfirmation}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Manage Reservation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-gray-700">
              Are you sure you want to manage this reservation? Your name will be recorded as the managing agent.
            </p>
            <div className="flex items-center gap-3">
              <Button onClick={confirmManageReservation} className="bg-blue-600 hover:bg-blue-700 flex-1">
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setShowManageConfirmation(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Cancel Reservation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-gray-700">Please select a reason for cancelling this reservation:</p>
            <Select value={cancelReason} onValueChange={setCancelReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select cancellation reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-pickup">Client did not pick up</SelectItem>
                <SelectItem value="changed-mind">Client changed his mind</SelectItem>
                <SelectItem value="wants-change">Client wants to change reservation (place, hotel, or time)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3">
              <Button onClick={confirmCancelReservation} variant="destructive" className="flex-1">
                Confirm Cancellation
              </Button>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                Go Back
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
