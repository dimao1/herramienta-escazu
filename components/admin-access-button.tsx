"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export function AdminAccessButton() {
  const [showButton, setShowButton] = useState(false)

  // Mostrar el botón solo después de hacer clic 5 veces en una esquina
  const handleCornerClick = () => {
    setShowButton(true)
  }

  return (
    <>
      {/* Área invisible en la esquina superior derecha para activar el botón admin */}
      <div
        className="fixed top-0 right-0 w-16 h-16 cursor-pointer z-50"
        onClick={handleCornerClick}
        title="Acceso de administrador"
      />

      {/* Botón de acceso admin que aparece después del clic */}
      {showButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="bg-white shadow-lg">
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}
