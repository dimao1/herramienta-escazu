import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, entity, municipality } = await request.json()

    const contact = `${phone} / ${email}`

    const newUser = await sql`
      INSERT INTO users (name, contact, entity, municipality)
      VALUES (${name}, ${contact}, ${entity}, ${municipality})
      RETURNING *
    `

    return NextResponse.json(newUser[0])
  } catch (error) {
    console.error("Error creando usuario:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
