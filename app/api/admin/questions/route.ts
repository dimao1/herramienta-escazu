import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT q.*, m.name as module_name
      FROM questions q
      JOIN modules m ON q.module_id = m.id
      ORDER BY q.module_id, q.order_index
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo preguntas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      module_id,
      question_text,
      question_type,
      order_index,
      recommendations,
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO questions (module_id, question_text, question_type, order_index, recommendation)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [module_id, question_text, question_type, order_index, JSON.stringify(recommendations)]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      module_id,
      question_text,
      question_type,
      order_index,
      recommendations,
    } = await request.json();

    const result = await pool.query(
      `UPDATE questions 
       SET module_id = $1, question_text = $2, question_type = $3, order_index = $4, recommendation = $5
       WHERE id = $6 RETURNING *`,
      [module_id, question_text, question_type, order_index, JSON.stringify(recommendations), id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await pool.query("DELETE FROM questions WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
