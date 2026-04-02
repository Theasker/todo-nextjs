import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/todos — devuelve todas las tareas
export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(todos)
}

// POST /api/todos — crea una tarea nueva
export async function POST(request: Request) {
  const { title } = await request.json()

  if (!title || title.trim() === '') {
    return NextResponse.json(
      { error: 'El título es obligatorio' },
      { status: 400 }
    )
  }

  const todo = await prisma.todo.create({
    data: { title: title.trim() }
  })
  return NextResponse.json(todo, { status: 201 })
}