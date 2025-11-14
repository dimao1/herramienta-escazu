import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      // Obtener estadísticas básicas
      const [usersRes, assessmentsRes, questionsRes, modulesRes] = await Promise.all([
        client.query('SELECT COUNT(*) AS count FROM "users"'),
        client.query('SELECT COUNT(*) AS count FROM "assessments"'),
        client.query('SELECT COUNT(*) AS count FROM "questions"'),
        client.query('SELECT COUNT(*) AS count FROM "modules"'),
      ]);

      const totalUsers = parseInt(usersRes.rows[0]?.count ?? '0', 10);
      const totalAssessments = parseInt(assessmentsRes.rows[0]?.count ?? '0', 10);
      const totalQuestions = parseInt(questionsRes.rows[0]?.count ?? '0', 10);
      const totalModules = parseInt(modulesRes.rows[0]?.count ?? '0', 10);

      // Evaluaciones recientes con datos del usuario
      const recentRes = await client.query(
        `SELECT a.id,
                a.user_id,
                a.total_score,
                a.max_possible_score,
                a.percentage,
                a.classification,
                a.completed_at,
                u.name,
                u.entity,
                u.municipality
         FROM "assessments" a
         JOIN "users" u ON u.id = a.user_id
         ORDER BY a.completed_at DESC
         LIMIT 10`,
      );

      const formattedAssessments = recentRes.rows.map((a) => ({
        id: a.id,
        user_id: a.user_id,
        total_score: a.total_score,
        max_possible_score: a.max_possible_score,
        percentage: Number(a.percentage),
        classification: a.classification,
        completed_at: a.completed_at,
        user: {
          name: a.name,
          entity: a.entity,
          municipality: a.municipality,
        },
      }));

      // Distribución por clasificación
      const classRes = await client.query(
        `SELECT classification, COUNT(*) AS count
         FROM "assessments"
         GROUP BY classification`,
      );

      const classificationStats = classRes.rows.map((row) => ({
        classification: row.classification,
        count: parseInt(row.count ?? '0', 10),
      }));

      return NextResponse.json({
        stats: {
          totalUsers,
          totalAssessments,
          totalQuestions,
          totalModules,
        },
        recentAssessments: formattedAssessments,
        classificationStats,
      });
    } finally {
      // Liberar el cliente siempre
      client.release();
    }
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
