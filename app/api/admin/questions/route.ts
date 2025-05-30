import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const questions = await sql`
      SELECT q.*, m.name as module_name
      FROM questions q
      JOIN modules m ON q.module_id = m.id
      ORDER BY q.module_id, q.order_index
    `
    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error obteniendo preguntas:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { module_id, question_text, question_type, order_index, recommendations } = await request.json()

    const newQuestion = await sql`
      INSERT INTO questions (module_id, question_text, question_type, order_index, recommendations)
      VALUES (${module_id}, ${question_text}, ${question_type}, ${order_index}, ${JSON.stringify(recommendations)})
      RETURNING *
    `

    return NextResponse.json(newQuestion[0])
  } catch (error) {
    console.error("Error creando pregunta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, module_id, question_text, question_type, order_index, recommendations } = await request.json()

    const updatedQuestion = await sql`
      UPDATE questions 
      SET module_id = ${module_id}, 
          question_text = ${question_text}, 
          question_type = ${question_type}, 
          order_index = ${order_index},
          recommendations = ${JSON.stringify(recommendations)}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(updatedQuestion[0])
  } catch (error) {
    console.error("Error actualizando pregunta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    await sql`DELETE FROM questions WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error eliminando pregunta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
