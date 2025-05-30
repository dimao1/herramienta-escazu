"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

interface AdminUser {
  id: number
  username: string
  role: string
}

export default function AdminPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión de admin guardada
    const savedAdmin = localStorage.getItem("admin")
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    }
    setLoading(false)
  }, [])

  const handleLogin = (adminData: AdminUser) => {
    setAdmin(adminData)
    localStorage.setItem("admin", JSON.stringify(adminData))
  }

  const handleLogout = () => {
    setAdmin(null)
    localStorage.removeItem("admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard admin={admin} onLogout={handleLogout} />
}
