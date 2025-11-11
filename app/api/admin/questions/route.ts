import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        module: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { moduleId: 'asc' },
        { orderIndex: 'asc' },
      ],
    });

    return NextResponse.json(questions.map(q => ({
      ...q,
      module_name: q.module.name,
    })));
  } catch (error) {
    console.error("Error obteniendo preguntas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      module_id,
      question_text,
      question_type,
      order_index,
      recommendations,
    } = await request.json();

    const question = await prisma.question.create({
      data: {
        moduleId: module_id,
        questionText: question_text,
        questionType: question_type,
        orderIndex: order_index,
        recommendations: recommendations || null,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error creando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      module_id,
      question_text,
      question_type,
      order_index,
      recommendations,
    } = await request.json();

    const question = await prisma.question.update({
      where: { id },
      data: {
        moduleId: module_id,
        questionText: question_text,
        questionType: question_type,
        orderIndex: order_index,
        recommendations: recommendations || null,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error actualizando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await prisma.question.delete({
      where: { id: parseInt(id!) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando pregunta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
