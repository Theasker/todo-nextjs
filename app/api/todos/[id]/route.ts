import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await context.params
  const id = parseInt(idStr)

  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400 }
    )
  }

  await prisma.todo.delete({ where: { id } })
  return NextResponse.json({ message: 'Tarea eliminada' })
}