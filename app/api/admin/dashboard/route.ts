import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Obtener estadísticas del dashboard usando Prisma
    const [totalUsers, totalAssessments, totalQuestions, totalModules] = await Promise.all([
      prisma.user.count(),
      prisma.assessment.count(),
      prisma.question.count(),
      prisma.module.count(),
    ]);

    // Obtener evaluaciones recientes con datos del usuario
    const recentAssessments = await prisma.assessment.findMany({
      take: 10,
      orderBy: { completedAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            entity: true,
            municipality: true,
          },
        },
      },
    });

    // Obtener distribución por clasificación
    const classificationStats = await prisma.assessment.groupBy({
      by: ['classification'],
      _count: {
        classification: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalAssessments,
        totalQuestions,
        totalModules,
      },
      recentAssessments,
      classificationStats: classificationStats.map(stat => ({
        classification: stat.classification,
        count: stat._count.classification,
      })),
    });
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
