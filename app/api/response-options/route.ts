import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const responseOptions = await sql`
      SELECT * FROM response_options ORDER BY id
    `
    return NextResponse.json(responseOptions)
  } catch (error) {
    console.error("Error obteniendo opciones de respuesta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
