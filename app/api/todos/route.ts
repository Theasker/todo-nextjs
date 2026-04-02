import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { NextResponse } from 'next/server'

export async function GET() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const prisma = new PrismaClient({ adapter })
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const prisma = new PrismaClient({ adapter })
  const { title } = await request.json()
  if (!title || title.trim() === '') {
    return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 })
  }
  const todo = await prisma.todo.create({
    data: { title: title.trim() }
  })
  return NextResponse.json(todo, { status: 201 })
}
