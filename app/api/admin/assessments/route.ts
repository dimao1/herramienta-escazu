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

    return NextResponse.json(assessments);
  } catch (error) {
    console.error("Error obteniendo evaluaciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
