import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Todo } from "../route";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "tasks.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readTodos(): Todo[] {
  ensureDataDir();
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

function writeTodos(todos: Todo[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todos = readTodos();
  const todo = todos.find((t: Todo) => t.id === parseInt(id));

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ todo });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Validate required fields if they are being updated
    if (body.title !== undefined && (!body.title || body.title.trim() === "")) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (
      body.description !== undefined &&
      (!body.description || body.description.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const todos = readTodos();
    const todoIndex = todos.findIndex((t: Todo) => t.id === parseInt(id));

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Trim string values if they exist
    const updateData = { ...body };
    if (updateData.title) {
      updateData.title = updateData.title.trim();
    }
    if (updateData.description) {
      updateData.description = updateData.description.trim();
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updateData };
    writeTodos(todos);
    return NextResponse.json({ todo: todos[todoIndex] });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todos = readTodos();
  const initialLength = todos.length;
  const filteredTodos = todos.filter((t: Todo) => t.id !== parseInt(id));

  if (filteredTodos.length === initialLength) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  writeTodos(filteredTodos);
  return NextResponse.json({ success: true });
}
