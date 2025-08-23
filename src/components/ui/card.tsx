// src/components/TodoCard.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card-components";

interface Todo {
    id: number;
    title: string;
    description: string;
}

interface TodoCardProps {
    todo: Todo;
    onUpdate: (id: number, updatedTodo: Partial<Todo>) => void;
    onDelete: (id: number) => void;
    onSelect: (todo: Todo) => void;
}

const TodoCard = ({ todo, onUpdate, onDelete, onSelect }: TodoCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);

    const handleSave = () => {
        onUpdate(todo.id, { title: editedTitle, description: editedDescription });
        setIsEditing(false);
    };

    return (
        <Card className="w-full bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
            <CardHeader className="flex justify-between items-center">
                {isEditing ? (
                    <Input
                        value={editedTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
                        className="font-semibold"
                    />
                ) : (
                    <h3
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => onSelect(todo)}
                    >
                        {todo.title}
                    </h3>
                )}

                <div className="flex gap-2">
                    {isEditing ? (
                        <Button size="sm" onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                    )}
                    <Button size="sm" variant="danger" onClick={() => onDelete(todo.id)}>
                        Delete
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {isEditing ? (
                    <Input
                        value={editedDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    <p
                        className="text-gray-600 cursor-pointer"
                        onClick={() => onSelect(todo)}
                    >
                        {todo.description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default TodoCard;
