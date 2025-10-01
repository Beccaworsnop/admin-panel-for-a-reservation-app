"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "./ui/badge" 
import { TrendingUp, Filter, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 45000 },
  { month: "Jun", revenue: 45678 },
]

export function Analytics() {
  const handleExportReports = () => {
    console.log("[v0] Exporting analytics reports...")

    // Create comprehensive analytics data
    const analyticsData = [
      ["Metric", "Current Value", "Previous Month", "Change %"],
      ["Total Reservations", "1,247", "1,150", "+8.2%"],
      ["Revenue", "$45,678", "$40,650", "+12.5%"],
      ["Occupancy Rate", "78.5%", "76.1%", "+3.1%"],
      ["Average Stay", "3.2 nights", "3.1 nights", "+0.3%"],
      [""],
      ["Booking Sources", "Percentage", "", ""],
      ["Online", "45%", "", ""],
      ["Hotel Direct", "35%", "", ""],
      ["Desk", "20%", "", ""],
    ]

    const csvContent = analyticsData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Analytics</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Online
          </Badge>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-blue-900 hover:bg-gray-800 w-full sm:w-auto" onClick={handleExportReports}>
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Reservations */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Reservations</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">1,247</p>
            <p className="text-sm text-green-600">+8.2% from last month</p>
          </Card>

          {/* Revenue */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Revenue</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">$45,678</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </Card>

          {/* Occupancy Rate */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">78.5%</p>
            <p className="text-sm text-green-600">+3.1% from last month</p>
          </Card>

          {/* Average Stay */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Average Stay</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">3.2 nights</p>
            <p className="text-sm text-green-600">+0.3% from last month</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Revenue Trend */}
          <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-48 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Booking Sources */}
          <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Sources</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Online</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Hotel Direct</span>
                <span className="text-sm font-medium text-gray-900">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Desk</span>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}