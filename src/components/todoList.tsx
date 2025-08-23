"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-components";
import { Trash2, Edit, Eye, Check } from "lucide-react";

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
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");

    useEffect(() => {
        fetch("/api/tasks")
            .then((res) => res.json())
            .then((data) => setTodos(data.todos));
    }, []);

    const startEdit = (todo: Todo) => {
        setEditingTodoId(todo.id);
        setEditTitle(todo.title);
        setEditDesc(todo.description);
        setExpandedTodoId(todo.id); // Also expand to show the edit form
    };

    const cancelEdit = () => {
        setEditingTodoId(null);
        setEditTitle("");
        setEditDesc("");
    };

    const saveEdit = async (todoId: number) => {
        const updated = {
            title: editTitle,
            description: editDesc
        };

        const res = await fetch(`/api/tasks/${todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updated),
        });

        if (res.ok) {
            const todo = todos.find(t => t.id === todoId);
            if (todo) {
                const updatedTodo = { ...todo, ...updated };
                setTodos(todos.map((t) => (t.id === todoId ? updatedTodo : t)));
            }
        }

        cancelEdit();
    };

    const addTodo = async () => {
        if (!newTitle.trim()) return;
        const res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify({ title: newTitle, description: newDesc }),
        });
        const data = await res.json();
        setTodos([...todos, data.todo]);
        setNewTitle("");
        setNewDesc("");
    };

    const deleteTodo = async (id: number) => {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        setTodos(todos.filter((t) => t.id !== id));
        if (expandedTodoId === id) setExpandedTodoId(null);
    };

    // Update todo toggle
    const toggleTodo = async (id: number) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        const updated = { ...todo, completed: !todo.completed };
        await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(updated),
        });

        setTodos(todos.map((t) => (t.id === id ? updated : t)));
    };

    return (
        <div className="grid gap-6 grid-cols-1 mb-10 mt-4 rounded-2xl mx-2 shadow-md ">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Todos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <Input
                            className="w-1/3"
                            placeholder="Title"
                            value={newTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                        />
                        <Input
                            className="w-2/3"
                            placeholder="Description"
                            value={newDesc}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
                        />
                        <Button onClick={addTodo}>Add</Button>
                    </div>

                    <ul className="space-y-2">
                        {todos.map((todo) => {
                            const isEditing = editingTodoId === todo.id;
                            const isExpanded = expandedTodoId === todo.id;

                            return (
                                <li
                                    key={todo.id}
                                    className="p-2 rounded-lg hover:bg-slate-50 border-slate-50 border-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            onClick={() => !isEditing && toggleTodo(todo.id)}
                                            className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""} ${isEditing ? 'cursor-default' : ''}`}
                                        >
                                            {isEditing ? (
                                                <Input
                                                    value={editTitle}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                                                    className="w-full"
                                                    placeholder="Todo title"
                                                />
                                            ) : (
                                                todo.title
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {!isEditing && (
                                                <>
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
                                                        <Check size={16} />
                                                    </Button>
                                                </>

                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => isEditing ? cancelEdit() : startEdit(todo)}
                                            >
                                                {isEditing ? "Cancel" : <Edit size={16} />}
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteTodo(todo.id)}
                                                disabled={isEditing}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Show description inline when expanded or editing */}
                                    {(isExpanded || isEditing) && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                            <div className="text-gray-600 text-sm mb-1">
                                                <strong>Description:</strong>{" "}
                                                {isEditing ? (
                                                    <Input
                                                        value={editDesc}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDesc(e.target.value)}
                                                        className="w-full mt-1"
                                                        placeholder="Todo description"
                                                    />
                                                ) : (
                                                    <span>{todo.description || "No description"}</span>
                                                )}
                                            </div>
                                            {!isEditing && (
                                                <p className={`text-sm ${todo.completed ? "text-green-600" : "text-red-600"}`}>
                                                    <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
                                                </p>
                                            )}
                                            {isEditing && (
                                                <div className="flex gap-2 mt-2">
                                                    <Button size="sm" onClick={() => saveEdit(todo.id)}>Save</Button>
                                                    <Button size="sm" variant="outline" onClick={cancelEdit}>Cancel</Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
