import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const statements = await prisma.statement.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ statements })
  } catch (error) {
    console.error('Statements get API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const statement = await prisma.statement.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        userId: 'default-user'
      }
    })

    return NextResponse.json({ statement })
  } catch (error) {
    console.error('Statements post API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
