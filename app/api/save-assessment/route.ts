import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Usar transacción de Prisma para garantizar consistencia
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear usuario
      console.log("👤 Guardando usuario...");
      const user = await tx.user.create({
        data: {
          name: body.user.name,
          contact: `${body.user.phone} / ${body.user.email}`,
          entity: body.user.entity,
          municipality: body.user.municipality,
        },
      });
      console.log("✅ Usuario guardado con ID:", user.id);

      // 2. Crear evaluación
      console.log("📈 Guardando evaluación...");
      const assessment = await tx.assessment.create({
        data: {
          userId: user.id,
          totalScore: body.assessment.total_score,
          maxPossibleScore: body.assessment.max_possible_score,
          percentage: body.assessment.percentage,
          classification: body.assessment.classification,
        },
      });
      console.log("✅ Evaluación guardada con ID:", assessment.id);

      // 3. Crear todas las respuestas
      console.log("📝 Guardando", body.responses.length, "respuestas...");
      await tx.response.createMany({
        data: body.responses.map((response) => ({
          userId: user.id,
          questionId: response.questionId,
          responseOptionId: response.response_option_id || null,
          responseText: response.open_response || null,
        })),
      });
      console.log("✅ Todas las respuestas guardadas");

      return { userId: user.id, assessmentId: assessment.id };
    });

    console.log("🎉 Guardado completo exitosamente");
    return NextResponse.json({
      success: true,
      userId: result.userId,
      assessmentId: result.assessmentId,
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
