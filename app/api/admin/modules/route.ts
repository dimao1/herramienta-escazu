import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM modules ORDER BY order_index"
    );
    return NextResponse.json(result.rows);
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

    const result = await pool.query(
      "INSERT INTO modules (name, description, order_index) VALUES ($1, $2, $3) RETURNING *",
      [name, description, order_index]
    );

    return NextResponse.json(result.rows[0]);
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

    const result = await pool.query(
      "UPDATE modules SET name = $1, description = $2, order_index = $3 WHERE id = $4 RETURNING *",
      [name, description, order_index, id]
    );

    return NextResponse.json(result.rows[0]);
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

    await pool.query("DELETE FROM modules WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando módulo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
