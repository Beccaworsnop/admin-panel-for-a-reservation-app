"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Bell, Building, Home, CreditCard, AlertCircle } from "lucide-react"

const notifications = [
  {
    id: "NOT001",
    type: "hotel_purchase",
    message: "John Smith purchased hotel reservation HTL001",
    timestamp: "2025-05-20 14:30",
    read: false,
    icon: Building,
    color: "text-blue-600",
  },
  {
    id: "NOT002",
    type: "apartment_reservation",
    message: "Maria Garcia reserved apartment APT001",
    timestamp: "2025-05-20 13:15",
    read: false,
    icon: Home,
    color: "text-green-600",
  },
  {
    id: "NOT003",
    type: "payment_received",
    message: "Payment received for reservation HTL002 - $750",
    timestamp: "2025-05-20 12:00",
    read: true,
    icon: CreditCard,
    color: "text-emerald-600",
  },
  {
    id: "NOT004",
    type: "cancellation",
    message: "Reservation APT003 cancelled by David Wilson",
    timestamp: "2025-05-20 10:45",
    read: true,
    icon: AlertCircle,
    color: "text-red-600",
  },
  {
    id: "NOT005",
    type: "hotel_purchase",
    message: "Sarah Johnson purchased hotel reservation HTL003",
    timestamp: "2025-05-19 16:20",
    read: true,
    icon: Building,
    color: "text-blue-600",
  },
]

export function NotificationsPanel() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-gray-900" />
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Notifications</h1>
          <Badge className="bg-red-500 text-white hover:bg-red-500">
            {notifications.filter((n) => !n.read).length}
          </Badge>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-200 last:border-b-0 ${!notification.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${notification.color} flex-shrink-0 mt-1`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <tr key={notification.id} className={!notification.read ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${notification.color}`} />
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {notification.type.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">{notification.timestamp}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!notification.read ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-600">
                          Read
                        </Badge>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
