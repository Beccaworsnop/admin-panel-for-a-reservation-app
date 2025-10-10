"use client"

import { useState } from "react"
import { Sidebar } from "@/componenets/sidebar"
import { MobileSidebar } from "@/componenets/mobile-sidebar"
import { HotelReservations } from "@/componenets/hotel-reservations"
import { ApartmentReservations } from "@/componenets/apartment-reservations"
import { Analytics } from "@/componenets/analytics"
import { NotificationsPanel } from "@/componenets/notifications-panel"
import { SettingsManagement } from "@/componenets/settings-management"
import { HostInsight } from "@/componenets/host-insight"
import { CouponsManagement } from "@/componenets/cuppons-management"
import { ContentManagement } from "@/componenets/content-management"
import { PaymentManagement } from "@/componenets/payment-management"

export default function Home() {
  const [activeSection, setActiveSection] = useState("host-insight")

  const renderContent = () => {
    switch (activeSection) {
      case "host-insight":
        return <HostInsight />
      case "hotel-reservations":
        return <HotelReservations />
      case "apartment-reservations":
        return <ApartmentReservations />
      case "analytics":
        return <Analytics />
      case "notifications":
        return <NotificationsPanel />
      case "coupons":
        return <CouponsManagement />
      case "content":
        return <ContentManagement />
      case "payments":
        return <PaymentManagement />
      case "settings":
        return <SettingsManagement />
      case "feedback":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Feedback Management</h2>
            <p className="text-gray-600 mt-2">Feedback management interface coming soon...</p>
          </div>
        )
      case "live-chat":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Live Chat</h2>
            <p className="text-gray-600 mt-2">Live chat interface coming soon...</p>
          </div>
        )
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{activeSection}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}
