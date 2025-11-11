import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const responsesResult = await pool.query(`
      SELECT 
        r.*,
        q.question_text,
        q.question_type,
        q.recommendation,
        ro.option_text,
        ro.points,
        m.name as module_name
      FROM responses r
      JOIN questions q ON r.question_id = q.id
      JOIN modules m ON q.module_id = m.id
      LEFT JOIN response_options ro ON r.response_option_id = ro.id
      WHERE r.user_id = $1
      ORDER BY m.order_index, q.order_index
    `, [userId]);

    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    return NextResponse.json({
      user: userResult.rows[0],
      responses: responsesResult.rows,
    });
  } catch (error) {
    console.error("Error obteniendo respuestas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
