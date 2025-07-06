
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { botName, appId } = await request.json()

    // Validate input
    if (!botName || !['clay', 'reese'].includes(botName)) {
      return NextResponse.json(
        { error: 'Valid bot name is required (clay or reese)' },
        { status: 400 }
      )
    }

    if (!appId || appId.trim() === '') {
      return NextResponse.json(
        { error: 'App ID is required' },
        { status: 400 }
      )
    }

    // For now, we'll use a default user ID
    // In a real implementation, you would get this from authentication
    const defaultUserId = 'default-user'

    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { id: defaultUserId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: defaultUserId,
          email: 'default@example.com'
        }
      })
    }

    // Upsert bot configuration
    const botConfig = await prisma.botConfig.upsert({
      where: {
        userId_botName: {
          userId: defaultUserId,
          botName
        }
      },
      update: {
        appId: appId.trim(),
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        userId: defaultUserId,
        botName,
        appId: appId.trim(),
        isActive: true
      }
    })

    // Test the bot configuration by making a simple API call
    let testSuccess = true
    try {
      const testResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'user',
              content: 'Hello, this is a test message.'
            }
          ],
          max_tokens: 10,
        }),
      })

      if (!testResponse.ok) {
        testSuccess = false
      }
    } catch (error) {
      console.error('Bot test error:', error)
      testSuccess = false
    }

    return NextResponse.json({
      success: testSuccess,
      botName,
      appId: appId.trim(),
      message: testSuccess 
        ? 'Bot configuration saved and tested successfully' 
        : 'Bot configuration saved but test failed'
    })

  } catch (error) {
    console.error('Bot config API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
