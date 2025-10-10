"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge"
import { TrendingUp, Filter, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 45000 },
  { month: "Jun", revenue: 45678 },
]

const analyticsDataSample = [
  { id: "1", status: "confirmed", agent: "Sarah Johnson", date: "2025-06-01", revenue: 450 },
  { id: "2", status: "saved", agent: "Michael Chen", date: "2025-06-05", revenue: 320 },
  { id: "3", status: "confirmed", agent: "Emma Davis", date: "2025-06-10", revenue: 580 },
  { id: "4", status: "canceled", agent: "Sarah Johnson", date: "2025-06-15", revenue: 0 },
]

export function Analytics() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRangeStart, setDateRangeStart] = useState("")
  const [dateRangeEnd, setDateRangeEnd] = useState("")
  const [agentFilter, setAgentFilter] = useState("all")
  const [filteredData, setFilteredData] = useState(analyticsDataSample)

  const applyFilters = () => {
    console.log("[v0] Applying analytics filters:", {
      status: statusFilter,
      dateRange: { start: dateRangeStart, end: dateRangeEnd },
      agent: agentFilter,
    })

    let filtered = analyticsDataSample

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    if (agentFilter !== "all") {
      filtered = filtered.filter((item) => item.agent === agentFilter)
    }

    if (dateRangeStart) {
      filtered = filtered.filter((item) => new Date(item.date) >= new Date(dateRangeStart))
    }

    if (dateRangeEnd) {
      filtered = filtered.filter((item) => new Date(item.date) <= new Date(dateRangeEnd))
    }

    setFilteredData(filtered)
    console.log("[v0] Analytics filtered results:", filtered.length, "items")
    alert(`Filters applied! Found ${filtered.length} matching records.`)
  }

  const handleExportReports = () => {
    console.log("[v0] Exporting analytics reports...")

    const csvContent = filteredData.map((row) => row.join(",")).join("\n")
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

      <Card className="p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Filters</h3>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="saved">Saved</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="date"
              placeholder="Start Date"
              value={dateRangeStart}
              onChange={(e) => setDateRangeStart(e.target.value)}
              className="w-full sm:w-auto"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={dateRangeEnd}
              onChange={(e) => setDateRangeEnd(e.target.value)}
              className="w-full sm:w-auto"
            />
          </div>

          <Select value={agentFilter} onValueChange={setAgentFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              <SelectItem value="Michael Chen">Michael Chen</SelectItem>
              <SelectItem value="Emma Davis">Emma Davis</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" onClick={applyFilters} className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Analytics Dashboard */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <Button size="sm" className="bg-blue-900 hover:bg-gray-800 w-full sm:w-auto" onClick={handleExportReports}>
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Reservations */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Reservations</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{filteredData.length}</p>
            <p className="text-sm text-green-600">+8.2% from last month</p>
          </Card>

          {/* Revenue */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Revenue</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              ${filteredData.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()}
            </p>
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
