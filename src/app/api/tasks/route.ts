import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

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

export async function GET(req: NextRequest) {
  const todos = readTodos();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const todo = todos.find((t: Todo) => t.id === parseInt(id));
    return NextResponse.json({ todo: todo || null });
  }

  return NextResponse.json({ todos });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!body.description || body.description.trim() === "") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const todos = readTodos();
    const newTodo: Todo = {
      id: Date.now(),
      title: body.title.trim(),
      description: body.description.trim(),
      completed: false,
      ...body,
    };
    todos.push(newTodo);
    writeTodos(todos);
    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
