import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const modules = await sql`
      SELECT * FROM modules ORDER BY order_index
    `
    return NextResponse.json(modules)
  } catch (error) {
    console.error("Error obteniendo módulos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
