import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT a.id,
              a.user_id,
              a.total_score,
              a.max_possible_score,
              a.percentage,
              a.classification,
              a.completed_at,
              u.name,
              u.contact,
              u.entity,
              u.municipality,
              u.created_at
       FROM "assessments" a
       JOIN "users" u ON u.id = a.user_id
       ORDER BY a.completed_at DESC`,
    );

    const formattedAssessments = result.rows.map((a) => ({
      id: a.id,
      user_id: a.user_id,
      total_score: a.total_score,
      max_possible_score: a.max_possible_score,
      percentage: Number(a.percentage),
      classification: a.classification,
      completed_at: a.completed_at,
      name: a.name,
      contact: a.contact,
      entity: a.entity,
      municipality: a.municipality,
      created_at: a.created_at,
    }));

    return NextResponse.json(formattedAssessments);
  } catch (error) {
    console.error("Error obteniendo evaluaciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
