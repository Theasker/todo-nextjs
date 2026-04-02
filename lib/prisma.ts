import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

export function getPrisma() {
  const libsql = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const adapter = new PrismaLibSql(libsql)
  return new PrismaClient({ adapter })
}