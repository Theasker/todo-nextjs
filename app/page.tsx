'use client'

import { useEffect, useState } from 'react'

type Todo = {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  async function createTodo() {
    if (!title.trim()) return
    setLoading(true)
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    setTitle('')
    await fetchTodos()
    setLoading(false)
  }

  async function deleteTodo(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    await fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 flex items-start justify-center pt-20 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          📝 Lista de tareas
        </h1>

        {/* Formulario */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createTodo()}
            placeholder="Nueva tarea..."
            className="flex-1 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={createTodo}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? '...' : 'Añadir'}
          </button>
        </div>

        {/* Lista */}
        {todos.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            No hay tareas todavía
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3"
              >
                <span className="text-gray-100 text-sm">{todo.title}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-500 text-xs font-medium ml-4"
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}