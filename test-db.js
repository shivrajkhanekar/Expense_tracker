import 'dotenv/config'
import { prisma } from './lib/prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully!')
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('Query result:', result)
    await prisma.$disconnect()
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

testConnection()