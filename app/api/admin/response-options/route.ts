import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const responseOptions = await prisma.responseOption.findMany({
      orderBy: { id: 'asc' },
    });
    
    // Transformar a snake_case
    const formattedOptions = responseOptions.map(o => ({
      id: o.id,
      option_text: o.optionText,
      points: o.points,
      excludes_from_calculation: o.excludesFromCalculation,
    }));
    
    return NextResponse.json(formattedOptions);
  } catch (error) {
    console.error("Error obteniendo opciones de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { option_text, points, excludes_from_calculation } =
      await request.json();

    const responseOption = await prisma.responseOption.create({
      data: {
        optionText: option_text,
        points,
        excludesFromCalculation: excludes_from_calculation,
      },
    });

    return NextResponse.json(responseOption);
  } catch (error) {
    console.error("Error creando opción de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, option_text, points, excludes_from_calculation } =
      await request.json();

    const responseOption = await prisma.responseOption.update({
      where: { id },
      data: {
        optionText: option_text,
        points,
        excludesFromCalculation: excludes_from_calculation,
      },
    });

    return NextResponse.json(responseOption);
  } catch (error) {
    console.error("Error actualizando opción de respuesta:", error);
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

    await prisma.responseOption.delete({
      where: { id: parseInt(id!) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando opción de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
