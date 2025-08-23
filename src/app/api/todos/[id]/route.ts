import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "todos.json");

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
  { params }: { params: { id: string } }
) {
  const todos = readTodos();
  const todo = todos.find((t: Todo) => t.id === parseInt(params.id));

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ todo });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const todos = readTodos();
    const todoIndex = todos.findIndex(
      (t: Todo) => t.id === parseInt(params.id)
    );

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    todos[todoIndex] = { ...todos[todoIndex], ...body };
    writeTodos(todos);
    return NextResponse.json({ todo: todos[todoIndex] });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const todos = readTodos();
  const initialLength = todos.length;
  const filteredTodos = todos.filter((t: Todo) => t.id !== parseInt(params.id));

  if (filteredTodos.length === initialLength) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  writeTodos(filteredTodos);
  return NextResponse.json({ success: true });
}
