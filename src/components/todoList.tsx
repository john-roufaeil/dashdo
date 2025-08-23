"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-components";
import { Trash2, Edit, Eye } from "lucide-react";

type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [expandedTodoId, setExpandedTodoId] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/todos")
            .then((res) => res.json())
            .then((data) => setTodos(data.todos));
    }, []);

    const addTodo = async () => {
        if (!newTitle.trim()) return;
        const res = await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({ title: newTitle, description: newDesc }),
        });
        const data = await res.json();
        setTodos([...todos, data.todo]);
        setNewTitle("");
        setNewDesc("");
    };

    const deleteTodo = async (id: number) => {
        await fetch(`/api/todos/${id}`, { method: "DELETE" });
        setTodos(todos.filter((t) => t.id !== id));
        if (expandedTodoId === id) setExpandedTodoId(null);
    };

    // Update todo toggle
    const toggleTodo = async (id: number) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        const updated = { ...todo, completed: !todo.completed };
        await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(updated),
        });

        setTodos(todos.map((t) => (t.id === id ? updated : t)));
    };

    return (
        <div className="grid gap-6 grid-cols-1">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Todos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <Input
                            placeholder="Title"
                            value={newTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                        />
                        <Input
                            placeholder="Description"
                            value={newDesc}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
                        />
                        <Button onClick={addTodo}>Add</Button>
                    </div>

                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="p-2 rounded-lg hover:bg-slate-50 border-slate-50 border-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""
                                            }`}
                                    >
                                        {todo.title}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setExpandedTodoId(expandedTodoId === todo.id ? null : todo.id)}
                                        >
                                            <Eye size={16} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleTodo(todo.id)}
                                        >
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Show description inline when expanded */}
                                {expandedTodoId === todo.id && (
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        <p className="text-gray-600 text-sm mb-1">
                                            <strong>Description:</strong> {todo.description || "No description"}
                                        </p>
                                        <p className={`text-sm ${todo.completed ? "text-green-600" : "text-red-600"}`}>
                                            <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
