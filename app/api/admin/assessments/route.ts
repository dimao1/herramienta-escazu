import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    // Transformar a formato snake_case para compatibilidad con frontend
    const formattedAssessments = assessments.map(a => ({
      id: a.id,
      user_id: a.userId,
      total_score: a.totalScore,
      max_possible_score: a.maxPossibleScore,
      percentage: a.percentage,
      classification: a.classification,
      completed_at: a.completedAt,
      name: a.user.name,
      contact: a.user.contact,
      entity: a.user.entity,
      municipality: a.user.municipality,
      created_at: a.user.createdAt,
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
