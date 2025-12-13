# AI Chat Bot (Version 1.1)

## 🌟 Overview

**AI Chat Bot** is an advanced conversational AI assistant built with **Next.js 15 (App Router)** and **LangChain**, powered by Google's **Gemini 2.5 Flash** model. This full-stack application combines modern web technologies with sophisticated AI capabilities to deliver an intelligent, real-time chat experience.

The platform features a comprehensive agent-based architecture with multiple AI tools including **RAG (Retrieval-Augmented Generation)**, **web browsing**, **file operations**, and **search capabilities**. Built with scalability in mind, it leverages **Redis** for state management and caching, **Clerk** for authentication, and **Redux** for global state management.

### Key Highlights
- 🤖 **AI-Powered Conversations** - Gemini 2.5 Flash integration via LangChain
- 🔧 **Multi-Tool Agent System** - RAG, browser, file, and search tools
- 🎨 **Modern UI/UX** - Shadcn/ui components with Tailwind CSS
- 🔐 **Secure Authentication** - Clerk integration for user management
- 💾 **Persistent Storage** - Redis-backed conversation history
- 🚀 **Real-time Interactions** - Streaming responses with AI SDK
- 📱 **Responsive Design** - Mobile-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components

### AI & Backend
- **LangChain** - Framework for building AI applications
- **Google Gemini 2.5 Flash** - Large Language Model
- **LangGraph** - Agent orchestration and workflows
- **Vercel AI SDK** - Streaming AI responses

### State Management & Data
- **Redux Toolkit** - Centralized state management
- **SWR** - Data fetching and caching
- **Zustand** - Lightweight state management
- **Redis/IORedis** - Persistent storage and caching

### Authentication & Middleware
- **Clerk** - Complete user management
- **Protected routes** - Secure authentication flow

### Additional Tools
- **Tavily** - Web search integration
- **Cheerio** - Web scraping
- **PDF Parse** - Document processing for RAG
- **React Markdown** - Rich text rendering
- **KaTeX** - Mathematical notation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Redis instance (for conversation persistence)
- Google API Key (for Gemini AI)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Khang080704/chat-bot.git
cd chat-bot
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Google AI
GOOGLE_API_KEY=your_google_api_key

# Redis
REDIS_URL=your_redis_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Tavily Search API (optional)
TAVILY_API_KEY=your_tavily_api_key
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

You can start editing the page by modifying [`app/page.tsx`](app/page.tsx). The page will auto-update as you save changes.

> This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), Vercel's new font family.

---

## 🧩 Core Features

### Real-time Chat Interface
- Modern chat UI with conversation history and navigation
- See [`NewChat`](components/newChat.tsx) component and main UI at [`app/(dashboard)/page.tsx`](app/(dashboard)/page.tsx)
- Message sending function: [`sendMessage`](app/(dashboard)/page.tsx)
- Real-time streaming responses with AI SDK

### AI Agent & Tool Runtime
The system includes multiple specialized tools:
- **RAG Tool** ([`ragTool`](lib/tools/calculus.ts)) - Document retrieval and augmented generation
- **Browser Tool** ([`browserTool`](lib/tools/browser.ts)) - Web scraping and content extraction
- **File Tool** ([`fileTool`](lib/tools/file.ts)) - File operations and management
- **Search Tool** ([`searchTool`](lib/tools/search.ts)) - Web search integration via Tavily

### AI Agent Architecture
- Agent creation logic: [`createExecutor`](lib/ai/createAgent.ts)
- Model configuration: [`model`](lib/ai/model.ts)
- LangGraph-based workflow orchestration
- Dynamic tool selection and execution

### API Routes
- [`app/api/chat2/route.ts`](app/api/chat2/route.ts) - Main chat endpoint with streaming
- [`app/api/chatDetail/route.ts`](app/api/chatDetail/route.ts) - Retrieve chat conversation details
- [`app/api/currentUser/route.ts`](app/api/currentUser/route.ts) - Get current user information
- [`app/api/delete/route.ts`](app/api/delete/route.ts) - Delete conversations
- [`app/api/update/route.ts`](app/api/update/route.ts) - Update chat metadata

### State Management
- Global state with Redux Toolkit
- [`ReduxProvider`](redux/provider.tsx) - Redux provider wrapper
- Chat list management: [`redux/features/chatList/`](redux/features/chatList/)
- Real-time updates with SWR for data fetching

### Persistent Storage
- Redis-backed conversation history
- [`redis`](db/redis.ts) - Connection configuration
- [`lib/ai/redis.ts`](lib/ai/redis.ts) - AI-specific Redis operations
- [`lib/ai/chatHistory.ts`](lib/ai/chatHistory.ts) - Conversation history management

### UI Components
- Sidebar navigation with chat history
- Custom components: [`ThreeDots`](components/ThreeDots.tsx), [`app-sidebar`](components/app-sidebar.tsx), [`ChatTitle`](components/ChatTitle.tsx)
- Shadcn/ui primitives in [`components/ui/`](components/ui)
- Responsive layouts: [`app/layout.tsx`](app/layout.tsx)

---

## 🗂️ Important Pages & Routes

### Pages
- **Root Page**: [`app/page.tsx`](app/page.tsx) - Landing/redirect page
- **Dashboard**: [`app/(dashboard)/page.tsx`](app/(dashboard)/page.tsx) - Main chat interface

### API Routes
- **Chat Endpoint**: [`app/api/chat2/route.ts`](app/api/chat2/route.ts) - Primary chat API with streaming
- **Additional APIs**: See [API Routes](#api-routes) section above

### Authentication Pages
- **Sign In**: [`app/sign-in/[[...sign-in]]/`](app/sign-in/[[...sign-in]]/) - Clerk sign-in page
- **Sign Up**: [`app/sign-up/[[...sign-up]]/`](app/sign-up/[[...sign-up]]/) - Clerk sign-up page

---

## 📁 Project Structure

```
chat-bot/
├── app/                        # Next.js App Router pages & layouts
│   ├── layout.tsx             # Root layout with providers
│   ├── (dashboard)/           # Dashboard group
│   │   ├── page.tsx          # Main chat interface
│   │   └── layout.tsx        # Dashboard layout
│   ├── api/                   # API routes
│   │   ├── chat2/            # Main chat endpoint
│   │   ├── chatDetail/       # Chat retrieval
│   │   ├── currentUser/      # User info
│   │   ├── delete/           # Delete conversations
│   │   └── update/           # Update metadata
│   ├── sign-in/              # Authentication pages
│   └── sign-up/
├── components/                # React components
│   ├── ui/                   # Shadcn/ui primitives
│   ├── newChat.tsx           # Chat input component
│   ├── app-sidebar.tsx       # Sidebar navigation
│   ├── ChatTitle.tsx         # Chat header
│   ├── listChat.tsx          # Chat list
│   └── ThreeDots.tsx         # Menu component
├── lib/                      # Utilities & AI logic
│   ├── ai/                   # AI-related modules
│   │   ├── createAgent.ts   # Agent builder
│   │   ├── model.ts         # LLM configuration
│   │   ├── chatHistory.ts   # History management
│   │   └── redis.ts         # AI Redis operations
│   ├── tools/                # LangChain tools
│   │   ├── calculus.ts      # RAG tool
│   │   ├── browser.ts       # Web scraping
│   │   ├── file.ts          # File operations
│   │   └── search.ts        # Web search
│   ├── fetcher.ts            # SWR data fetching
│   └── utils.ts              # Utility functions
├── redux/                    # State management
│   ├── provider.tsx          # Redux provider
│   ├── store.ts              # Redux store
│   └── features/
│       └── chatList/         # Chat list slice
├── db/                       # Database connections
│   └── redis.ts              # Redis client
├── hooks/                    # Custom React hooks
├── context/                  # React contexts
└── public/                   # Static assets
```

---

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy this application is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/chat-bot)

**Live Demo**: [https://chat-bot-rq8t.vercel.app/](https://chat-bot-alpha-sandy.vercel.app/)

### Environment Variables

Make sure to configure the following environment variables in your deployment:

- `GOOGLE_API_KEY` - Google Gemini API key
- `REDIS_URL` - Redis connection URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `TAVILY_API_KEY` - Tavily search API key (optional)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [Clerk Documentation](https://clerk.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

