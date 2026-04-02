import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const prisma = new PrismaClient({ adapter })
  const { id: idStr } = await context.params
  const id = parseInt(idStr)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  await prisma.todo.delete({ where: { id } })
  return NextResponse.json({ message: 'Tarea eliminada' })
}
