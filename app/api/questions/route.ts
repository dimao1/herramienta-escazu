import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const questions = await sql`
      SELECT * FROM questions ORDER BY module_id, order_index
    `
    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error obteniendo preguntas:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
