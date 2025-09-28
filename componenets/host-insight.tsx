"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "./ui/badge" 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BarChart3, DollarSign, Star, Calendar } from "lucide-react"

const occupancyData = [
  { month: "Jan", occupancy: 75 },
  { month: "Feb", occupancy: 82 },
  { month: "Mar", occupancy: 78 },
  { month: "Apr", occupancy: 85 },
  { month: "May", occupancy: 84 },
  { month: "Jun", occupancy: 88 },
]

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 58000 },
  { month: "May", revenue: 56500 },
  { month: "Jun", revenue: 62000 },
]

const ratingData = [
  { rating: "5 Star", count: 85, color: "#10B981" },
  { rating: "4 Star", count: 12, color: "#F59E0B" },
  { rating: "3 Star", count: 2, color: "#EF4444" },
  { rating: "2 Star", count: 1, color: "#6B7280" },
]

const bookingsData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 135 },
  { month: "Mar", bookings: 128 },
  { month: "Apr", bookings: 145 },
  { month: "May", bookings: 141 },
  { month: "Jun", bookings: 152 },
]

export function HostInsight() {
  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Online
          </Badge>
        </div>
      </div>

      {/* Host Insight Section */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Host insight</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-sm text-gray-600">Total hosts: 3</span>
            <Button variant="default" size="sm" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto">
              Global analytics
            </Button>
          </div>
        </div>

        {/* Metrics Cards with Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Average Occupancy Chart */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Occupancy</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">84%</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="occupancy" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Total Revenue Chart */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">56.5k$</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Average Rating Chart */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">4.8</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ratingData} cx="50%" cy="50%" innerRadius={20} outerRadius={50} dataKey="count">
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Total Bookings Chart */}
          <Card className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total bookings</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">141</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}