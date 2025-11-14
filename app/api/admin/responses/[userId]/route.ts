import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    const userIdInt = parseInt(userId, 10);

    if (Number.isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "Parámetro userId inválido" },
        { status: 400 },
      );
    }

    const [userResult, responsesResult] = await Promise.all([
      pool.query(
        `SELECT id, name, contact, entity, municipality, created_at AS "createdAt"
         FROM users
         WHERE id = $1`,
        [userIdInt],
      ),
      pool.query(
        `SELECT
           r.id,
           r.user_id        AS "userId",
           r.question_id    AS "questionId",
           r.response_option_id AS "responseOptionId",
           r.response_text  AS "responseText",
           r.created_at     AS "createdAt",
           q.question_text  AS "question_text",
           q.question_type  AS "question_type",
           q.recommendations AS "recommendation",
           ro.option_text   AS "option_text",
           ro.points        AS "points",
           m.name           AS "module_name",
           m.order_index    AS "module_order_index",
           q.order_index    AS "question_order_index"
         FROM responses r
         JOIN questions q ON q.id = r.question_id
         JOIN modules m   ON m.id = q.module_id
         LEFT JOIN response_options ro ON ro.id = r.response_option_id
         WHERE r.user_id = $1
         ORDER BY m.order_index ASC, q.order_index ASC`,
        [userIdInt],
      ),
    ]);

    const user = userResult.rows[0] ?? null;
    const responses = responsesResult.rows;

    return NextResponse.json({
      user,
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
