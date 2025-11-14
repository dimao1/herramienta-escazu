import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT q.id,
              q.module_id,
              q.question_text,
              q.question_type,
              q.order_index,
              q.recommendations,
              m.name AS module_name
       FROM "questions" q
       JOIN "modules" m ON m.id = q.module_id
       ORDER BY q.module_id ASC, q.order_index ASC`,
    );

    const formattedQuestions = result.rows.map((q) => ({
      id: q.id,
      module_id: q.module_id,
      question_text: q.question_text,
      question_type: q.question_type,
      order_index: q.order_index,
      recommendations: q.recommendations,
      module_name: q.module_name,
    }));

    return NextResponse.json(formattedQuestions);
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
      `INSERT INTO "questions" ("module_id", "question_text", "question_type", "order_index", "recommendations")
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [module_id, question_text, question_type, order_index, recommendations || null],
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
      `UPDATE "questions"
       SET "module_id" = $1,
           "question_text" = $2,
           "question_type" = $3,
           "order_index" = $4,
           "recommendations" = $5
       WHERE id = $6
       RETURNING *`,
      [module_id, question_text, question_type, order_index, recommendations || null, id],
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

    await pool.query(`DELETE FROM "questions" WHERE id = $1`, [parseInt(id!, 10)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
