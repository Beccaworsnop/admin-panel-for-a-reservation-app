"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge" 
import { Upload, Check } from "lucide-react"

export function PaymentManagement() {
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

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Payment Management</h1>
          <span className="text-sm text-blue-600">Reservation: RES001</span>
        </div>
      </div>

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
  )
}
