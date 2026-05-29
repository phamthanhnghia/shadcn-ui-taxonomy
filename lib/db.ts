import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: any
}

let prisma: any

const getClient = () => {
  const client = new PrismaClient()
  if (process.env.DATABASE_URL?.startsWith("prisma://")) {
    return client.$extends(withAccelerate())
  }
  return client
}

if (process.env.NODE_ENV === "production") {
  prisma = getClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = getClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma

