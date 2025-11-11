import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    const userIdInt = parseInt(userId);

    const [user, responses] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userIdInt },
      }),
      prisma.response.findMany({
        where: { userId: userIdInt },
        include: {
          question: {
            include: {
              module: {
                select: {
                  name: true,
                  orderIndex: true,
                },
              },
            },
          },
          responseOption: {
            select: {
              optionText: true,
              points: true,
            },
          },
        },
        orderBy: [
          { question: { module: { orderIndex: 'asc' } } },
          { question: { orderIndex: 'asc' } },
        ],
      }),
    ]);

    return NextResponse.json({
      user,
      responses: responses.map(r => ({
        ...r,
        question_text: r.question.questionText,
        question_type: r.question.questionType,
        recommendation: r.question.recommendations,
        option_text: r.responseOption?.optionText,
        points: r.responseOption?.points,
        module_name: r.question.module.name,
      })),
    });
  } catch (error) {
    console.error("Error obteniendo respuestas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
