import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { user_id, question_id, response_option_id, open_response, justification } = await request.json()

    const newResponse = await sql`
      INSERT INTO responses (user_id, question_id, response_option_id, open_response, justification)
      VALUES (${user_id}, ${question_id}, ${response_option_id}, ${open_response}, ${justification})
      RETURNING *
    `

    return NextResponse.json(newResponse[0])
  } catch (error) {
    console.error("Error guardando respuesta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
