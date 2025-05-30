import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { user_id, total_score, max_possible_score, percentage, classification } = await request.json()

    const newAssessment = await sql`
      INSERT INTO assessments (user_id, total_score, max_possible_score, percentage, classification)
      VALUES (${user_id}, ${total_score}, ${max_possible_score}, ${percentage}, ${classification})
      RETURNING *
    `

    return NextResponse.json(newAssessment[0])
  } catch (error) {
    console.error("Error guardando evaluación:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
