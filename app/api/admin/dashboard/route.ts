import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // Obtener estadísticas del dashboard
    const totalUsers = await pool.query("SELECT COUNT(*) as count FROM users");
    const totalAssessments = await pool.query("SELECT COUNT(*) as count FROM assessments");
    const totalQuestions = await pool.query("SELECT COUNT(*) as count FROM questions");
    const totalModules = await pool.query("SELECT COUNT(*) as count FROM modules");

    // Obtener evaluaciones recientes
    const recentAssessments = await pool.query(`
      SELECT a.*, u.name, u.entity, u.municipality
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.completed_at DESC
      LIMIT 10
    `);

    // Obtener distribución por clasificación
    const classificationStats = await pool.query(`
      SELECT classification, COUNT(*) as count
      FROM assessments
      GROUP BY classification
    `);

    return NextResponse.json({
      stats: {
        totalUsers: Number.parseInt(totalUsers.rows[0].count),
        totalAssessments: Number.parseInt(totalAssessments.rows[0].count),
        totalQuestions: Number.parseInt(totalQuestions.rows[0].count),
        totalModules: Number.parseInt(totalModules.rows[0].count),
      },
      recentAssessments: recentAssessments.rows,
      classificationStats: classificationStats.rows,
    });
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
