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
              u.created_at,
              COUNT(r.id) AS total_responses
       FROM "assessments" a
       JOIN "users" u ON u.id = a.user_id
       LEFT JOIN "responses" r ON r.user_id = u.id
       GROUP BY a.id,
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
      total_responses: Number(a.total_responses ?? 0),
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

export async function DELETE() {
  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Eliminar primero todas las respuestas y evaluaciones
      await client.query('DELETE FROM "responses"');
      await client.query('DELETE FROM "assessments"');

      // Eliminar también todos los usuarios evaluados, de modo que
      // el contador de "Total Usuarios" en el dashboard quede en 0.
      // (La tabla admins no se ve afectada porque es distinta.)
      await client.query('DELETE FROM "users"');

      await client.query("COMMIT");

      return NextResponse.json({
        success: true,
        message:
          "Todas las evaluaciones y usuarios evaluados fueron eliminados correctamente.",
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error eliminando evaluaciones:", error);
      return NextResponse.json(
        { error: "Error al eliminar las evaluaciones" },
        { status: 500 },
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error en DELETE /api/admin/assessments:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

