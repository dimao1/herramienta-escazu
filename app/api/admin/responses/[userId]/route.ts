import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
);

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;

    const responses = await sql`
      SELECT 
        r.*,
        q.question_text,
        q.question_type,
        q.recommendations,
        ro.option_text,
        ro.points,
        m.name as module_name
      FROM responses r
      JOIN questions q ON r.question_id = q.id
      JOIN modules m ON q.module_id = m.id
      LEFT JOIN response_options ro ON r.response_option_id = ro.id
      WHERE r.user_id = ${userId}
      ORDER BY m.order_index, q.order_index
    `;

    const user = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `;

    return NextResponse.json({
      user: user[0],
      responses,
    });
  } catch (error) {
    console.error("Error obteniendo respuestas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
