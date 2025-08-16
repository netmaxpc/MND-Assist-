
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { botName: string } }
) {
  try {
    const { botName } = params

    // Validate bot name
    if (!['clay', 'reese'].includes(botName)) {
      return NextResponse.json(
        { error: 'Invalid bot name' },
        { status: 400 }
      )
    }

    // For now, we'll use a default user ID
    const defaultUserId = 'default-user'

    const botConfig = await prisma.botConfig.findUnique({
      where: {
        userId_botName: {
          userId: defaultUserId,
          botName
        }
      }
    })

    if (!botConfig || !botConfig.appId) {
      return NextResponse.json(
        { error: 'Bot not configured' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      botName,
      appId: botConfig.appId, // OpenAI model id
      isActive: botConfig.isActive
    })

  } catch (error) {
    console.error('Bot config get API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
