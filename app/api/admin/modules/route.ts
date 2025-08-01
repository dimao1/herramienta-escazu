import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
);

export async function GET() {
  try {
    const modules = await sql`
      SELECT * FROM modules ORDER BY order_index
    `;
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

    const newModule = await sql`
      INSERT INTO modules (name, description, order_index)
      VALUES (${name}, ${description}, ${order_index})
      RETURNING *
    `;

    return NextResponse.json(newModule[0]);
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

    const updatedModule = await sql`
      UPDATE modules 
      SET name = ${name}, description = ${description}, order_index = ${order_index}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(updatedModule[0]);
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

    await sql`DELETE FROM modules WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando módulo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
