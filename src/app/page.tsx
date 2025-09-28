"use client"

import { useState } from "react"
import { Sidebar } from "../../componenets/sidebar" 
import { MobileSidebar } from "../../componenets/mobile-sidebar" 
import { HostInsight } from "../../componenets/host-insight" 
import { ReservationManagement } from "../../componenets/reservation-management" 
import { PaymentManagement } from "../../componenets/payment-management" 
import { Analytics } from "../../componenets/analytics" 
import { useMobile } from "../../hooks/use-mobile" 

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("host-insight")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMobile()

  const renderContent = () => {
    switch (activeSection) {
      case "host-insight":
        return <HostInsight />
      case "hotel-reservations":
        return <ReservationManagement type="hotel" />
      case "apartment-reservations":
        return <ReservationManagement type="apartment" />
      case "reservations":
        return <ReservationManagement type="hotel" />
      case "payments":
        return <PaymentManagement />
      case "analytics":
        return <Analytics />
      case "feedback":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Feedback Management</h2>
            <p className="text-gray-600 mt-2">Feedback management interface coming soon...</p>
          </div>
        )
      case "notifications":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-gray-600 mt-2">Notifications interface coming soon...</p>
          </div>
        )
      case "coupons":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Coupons Management</h2>
            <p className="text-gray-600 mt-2">Coupons management interface coming soon...</p>
          </div>
        )
      case "content":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Content Management</h2>
            <p className="text-gray-600 mt-2">Content management interface coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-gray-600 mt-2">Settings interface coming soon...</p>
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
        return <HostInsight />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />}

      {/* Mobile Sidebar */}
      {isMobile && (
        <MobileSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between lg:hidden">
            <h1 className="text-xl font-semibold text-blue-600">Reserveit</h1>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  )
}