import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface SaveAssessmentRequest {
  user: {
    name: string;
    phone: string;
    email: string;
    entity: string;
    municipality: string;
  };
  responses: Array<{
    questionId: number;
    response_option_id?: number;
    open_response?: string;
    justification?: string;
  }>;
  assessment: {
    total_score: number;
    max_possible_score: number;
    percentage: number;
    classification: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Recibiendo solicitud de guardado...");
    const body: SaveAssessmentRequest = await request.json();
    
    console.log("📊 Datos recibidos:", {
      user: body.user.name,
      responsesCount: body.responses.length,
      assessment: body.assessment.classification,
    });

    // Usar transacción manual con pg para garantizar consistencia
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1. Crear usuario
      console.log("👤 Guardando usuario...");
      const userResult = await client.query(
        `INSERT INTO "users" ("name", "contact", "entity", "municipality")
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [
          body.user.name,
          `${body.user.phone} / ${body.user.email}`,
          body.user.entity,
          body.user.municipality,
        ],
      );
      const userId = userResult.rows[0].id as number;
      console.log("✅ Usuario guardado con ID:", userId);

      // 2. Crear evaluación
      console.log("📈 Guardando evaluación...");
      const assessmentResult = await client.query(
        `INSERT INTO "assessments" ("user_id", "total_score", "max_possible_score", "percentage", "classification")
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [
          userId,
          body.assessment.total_score,
          body.assessment.max_possible_score,
          body.assessment.percentage,
          body.assessment.classification,
        ],
      );
      const assessmentId = assessmentResult.rows[0].id as number;
      console.log("✅ Evaluación guardada con ID:", assessmentId);

      // 3. Crear todas las respuestas
      console.log("📝 Guardando", body.responses.length, "respuestas...");
      if (body.responses.length > 0) {
        const values: any[] = [];
        const valuePlaceholders: string[] = [];

        body.responses.forEach((response, index) => {
          const baseIndex = index * 4;
          valuePlaceholders.push(
            `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4})`,
          );
          values.push(
            userId,
            response.questionId,
            response.response_option_id ?? null,
            response.open_response ?? null,
          );
        });

        const insertQuery = `
          INSERT INTO "responses" ("user_id", "question_id", "response_option_id", "response_text")
          VALUES ${valuePlaceholders.join(",\n          ")};
        `;

        await client.query(insertQuery, values);
      }
      console.log("✅ Todas las respuestas guardadas");

      await client.query("COMMIT");

      const result = { userId, assessmentId };
      console.log("🎉 Guardado completo exitosamente");
      return NextResponse.json({
        success: true,
        userId: result.userId,
        assessmentId: result.assessmentId,
        message: "Evaluación guardada exitosamente",
      });
    } catch (txError) {
      await client.query("ROLLBACK");
      throw txError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("❌ ERROR COMPLETO:", error);
    console.error("❌ Tipo de error:", error instanceof Error ? error.constructor.name : typeof error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("❌ Mensaje:", errorMessage);
    if (errorStack) console.error("❌ Stack:", errorStack);
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorStack,
        hint: "Verifica que Docker esté ejecutándose con 'docker compose ps' y que las tablas existan",
      },
      { status: 500 }
    );
  }
}
