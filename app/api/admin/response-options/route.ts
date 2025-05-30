import { type NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  try {
    const { option_text, points, excludes_from_calculation } = await request.json()

    const newOption = await sql`
      INSERT INTO response_options (option_text, points, excludes_from_calculation)
      VALUES (${option_text}, ${points}, ${excludes_from_calculation})
      RETURNING *
    `

    return NextResponse.json(newOption[0])
  } catch (error) {
    console.error("Error creando opción de respuesta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, option_text, points, excludes_from_calculation } = await request.json()

    const updatedOption = await sql`
      UPDATE response_options 
      SET option_text = ${option_text}, 
          points = ${points}, 
          excludes_from_calculation = ${excludes_from_calculation}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(updatedOption[0])
  } catch (error) {
    console.error("Error actualizando opción de respuesta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    await sql`DELETE FROM response_options WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error eliminando opción de respuesta:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
