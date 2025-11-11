import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        a.*,
        u.name,
        u.contact,
        u.entity,
        u.municipality,
        COUNT(r.id) as total_responses
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN responses r ON r.user_id = u.id
      GROUP BY a.id, u.id
      ORDER BY a.completed_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo evaluaciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
