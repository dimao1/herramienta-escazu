import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require")

export async function GET() {
  try {
    // Obtener estadísticas del dashboard
    const totalUsers = await sql`SELECT COUNT(*) as count FROM users`
    const totalAssessments = await sql`SELECT COUNT(*) as count FROM assessments`
    const totalQuestions = await sql`SELECT COUNT(*) as count FROM questions`
    const totalModules = await sql`SELECT COUNT(*) as count FROM modules`

    // Obtener evaluaciones recientes
    const recentAssessments = await sql`
      SELECT a.*, u.name, u.entity, u.municipality
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.completed_at DESC
      LIMIT 10
    `

    // Obtener distribución por clasificación
    const classificationStats = await sql`
      SELECT classification, COUNT(*) as count
      FROM assessments
      GROUP BY classification
    `

    return NextResponse.json({
      stats: {
        totalUsers: Number.parseInt(totalUsers[0].count),
        totalAssessments: Number.parseInt(totalAssessments[0].count),
        totalQuestions: Number.parseInt(totalQuestions[0].count),
        totalModules: Number.parseInt(totalModules[0].count),
      },
      recentAssessments,
      classificationStats,
    })
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
