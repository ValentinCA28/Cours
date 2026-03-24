"use client";

import { useState, useCallback } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

let nextId = 0;

export default function TodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: nextId++, text, done: false }]);
    setInput("");
  }, [input]);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="space-y-4">
      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Nouvelle tâche…"
          className="flex-1 bg-code-bg border border-border rounded-lg px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
        />
        <button
          onClick={addTodo}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Ajouter
        </button>
      </div>

      {/* Counter */}
      <p className="text-xs font-mono text-muted">
        {todos.length === 0
          ? "Aucune tâche"
          : `${todos.length} tâche(s) — ${doneCount} terminée(s)`}
      </p>

      {/* Todo list */}
      {todos.length > 0 && (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 bg-code-bg border border-border rounded-lg px-3 py-2"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="accent-accent w-4 h-4 shrink-0"
              />
              <span
                className={`flex-1 text-sm font-mono ${
                  todo.done ? "line-through text-muted" : "text-text"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-muted hover:text-pink text-lg leading-none transition-colors"
                aria-label="Supprimer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
