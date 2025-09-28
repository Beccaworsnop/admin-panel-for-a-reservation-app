"use client"

import { cn } from "@/app/lib/utils" 
import {
  BarChart3,
  TrendingUp,
  MessageSquare,
  Bell,
  Tag,
  FileText,
  Settings,
  MessageCircle,
  User,
  Building,
  Home,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "hotel-reservations", label: "Hotel reservations", icon: Building },
  { id: "apartment-reservations", label: "Apartment reservations", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "host-insight", label: "Host insight", icon: TrendingUp },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "content", label: "Content Management", icon: FileText },
  { id: "live-chat", label: "Live chat", icon: MessageCircle },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-blue-600">Reserveit</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                activeSection === item.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Admin User */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Admin user</span>
        </div>
      </div>
    </div>
  )
}
