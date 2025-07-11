# MND Assistant

A professional AI Assistant application with screen sharing, voice chat, and text chat capabilities.

## Features

- **Dual Bot System**: Clay and Reese chatbots with configurable App IDs
- **Voice Chat**: Real-time voice interaction with speech-to-text and text-to-speech
- **Screen Sharing**: Share your screen and get AI assistance with visual content
- **Text Chat**: Traditional text-based conversation interface
- **Modern UI**: Dark theme with professional design using Tailwind CSS and shadcn/ui

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Database**: Prisma ORM with SQLite
- **AI Integration**: Abacus.AI API
- **Voice**: Web Speech API
- **Screen Sharing**: WebRTC Screen Capture API

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`
5. Configure your Clay and Reese App IDs in the settings

## Configuration

The application requires Abacus.AI App IDs for Clay and Reese chatbots. Configure these through the settings modal in the application.

## Project Structure

```
app/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── bot-selector.tsx
│   ├── voice-chat.tsx
│   ├── screen-share.tsx
│   ├── text-chat.tsx
│   └── settings-modal.tsx
├── lib/               # Utility functions
├── prisma/           # Database schema
└── public/           # Static assets
```

## License

This project is part of the MND business suite.
