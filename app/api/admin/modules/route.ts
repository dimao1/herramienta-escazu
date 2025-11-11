import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(modules);
  } catch (error) {
    console.error("Error obteniendo módulos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, order_index } = await request.json();

    const module = await prisma.module.create({
      data: {
        name,
        description,
        orderIndex: order_index,
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error creando módulo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, description, order_index } = await request.json();

    const module = await prisma.module.update({
      where: { id },
      data: {
        name,
        description,
        orderIndex: order_index,
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Error actualizando módulo:", error);
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

    await prisma.module.delete({
      where: { id: parseInt(id!) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando módulo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
