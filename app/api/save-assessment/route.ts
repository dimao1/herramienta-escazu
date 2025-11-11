import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Usar Pool de pg para soportar tanto local como Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
});

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

    // Verificar que DATABASE_URL está configurado
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
      throw new Error("DATABASE_URL no está configurado correctamente. Por favor configura .env.local");
    }

    // 1. Crear/guardar el usuario
    console.log("👤 Guardando usuario...");
    const userResult = await pool.query(
      `INSERT INTO users (name, contact, entity, municipality)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        body.user.name,
        body.user.phone + " / " + body.user.email,
        body.user.entity,
        body.user.municipality
      ]
    );

    const userId = userResult.rows[0].id;
    console.log("✅ Usuario guardado con ID:", userId);

    // 2. Guardar la evaluación (assessment)
    console.log("📈 Guardando evaluación...");
    const assessmentResult = await pool.query(
      `INSERT INTO assessments (user_id, total_score, max_possible_score, percentage, classification)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        userId,
        body.assessment.total_score,
        body.assessment.max_possible_score,
        body.assessment.percentage,
        body.assessment.classification
      ]
    );

    const assessmentId = assessmentResult.rows[0].id;
    console.log("✅ Evaluación guardada con ID:", assessmentId);

    // 3. Guardar todas las respuestas
    console.log("📝 Guardando", body.responses.length, "respuestas...");
    const responsePromises = body.responses.map((response) =>
      pool.query(
        `INSERT INTO responses (user_id, question_id, response_option_id, open_response, justification)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          userId,
          response.questionId,
          response.response_option_id || null,
          response.open_response || null,
          response.justification || null
        ]
      )
    );

    await Promise.all(responsePromises);
    console.log("✅ Todas las respuestas guardadas");

    console.log("🎉 Guardado completo exitosamente");
    return NextResponse.json({
      success: true,
      userId,
      assessmentId,
      message: "Evaluación guardada exitosamente",
    });
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
