## Chat Bot (chat-bot) (Version 1.1)

Ứng dụng **Next.js (App Router)** dạng chat/assistant local, tích hợp nhiều công cụ AI & trợ giúp (RAG, web tools, file IO). Dùng để demo/phát triển các agent AI, hội thoại người-máy, và các tiện ích liên quan.

---

## 🚀 Setup

### 1. Cài đặt package

```bash
npm i
```

### 2. Chạy chế độ phát triển

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem kết quả.

Bạn có thể bắt đầu chỉnh sửa trang bằng cách sửa file `app/page.tsx`. Trang sẽ tự động cập nhật khi bạn lưu thay đổi.

> Dự án sử dụng [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) để tối ưu và tự động tải [Geist](https://vercel.com/font), font mới của Vercel.

---

## 🧩 Chức năng chính

- **Real-time chat UI** với lưu & điều hướng conversation  
    - Xem [`NewChat`](components/newChat.tsx) và UI chính tại [`app/(dashboard)/page.tsx`](app/(dashboard)/page.tsx)
    - Hàm gửi tin nhắn: [`sendMessage`](app/(dashboard)/page.tsx)
- **Agent & tools runtime** (RAG, web/browser, search, file)  
    - Tool export: [`ragTool`](lib/tools/calculus.ts), [`browserTool`](lib/tools/browser.ts), [`fileTool`](lib/tools/file.ts)
- **AI executor/agent builder**  
    - Logic tạo agent: [`createExecutor`](lib/ai/createAgent.ts)
    - Model config: [`model`](lib/ai/model.ts)
- **API route cho chat agent**  
    - [`app/api/chat2/route.ts`](app/api/chat2/route.ts)
- **Redux + Provider** cho state toàn cục  
    - [`ReduxProvider`](redux/provider.tsx)
- **Redis helper** cho persistence/cache  
    - [`redis`](db/redis.ts)
- **UI primitives & layout components**  
    - Sidebar/header/footer, primitives tại [`components/ui/`](components/ui), layout tại [`app/layout.tsx`](app/layout.tsx)

---

## 🗂️ Các trang / route quan trọng

- Trang gốc: [`app/page.tsx`](app/page.tsx)
- Dashboard: [`app/(dashboard)/page.tsx`](app/(dashboard)/page.tsx)
- Chat API route: [`app/api/chat2/route.ts`](app/api/chat2/route.ts)
- Trang auth/sign-in/sign-up:  
    - [`app/sign-in/[[...sign-in]]/`](app/sign-in/[[...sign-in]]/)
    - [`app/sign-up/[[...sign-up]]/`](app/sign-up/[[...sign-up]]/)

---

## 📁 Cấu trúc thư mục (tóm tắt)

- **app/** — pages & layouts (Next App Router)  
    - [`app/layout.tsx`](app/layout.tsx), [`app/(dashboard)/layout.tsx`](app/(dashboard)/layout.tsx)
- **components/** — UI & domain components  
    - Ví dụ: `ThreeDotsMenu` tại [`components/ThreeDots.tsx`](components/ThreeDots.tsx), sidebar tại [`components/app-sidebar.tsx`](components/app-sidebar.tsx)
- **lib/** — helper & AI logic  
    - [`lib/ai/createAgent.ts`](lib/ai/createAgent.ts), [`lib/ai/model.ts`](lib/ai/model.ts), [`lib/fetcher.ts`](lib/fetcher.ts)
- **lib/tools/** — bộ tool agent  
    - [`calculus.ts`](lib/tools/calculus.ts), [`browser.ts`](lib/tools/browser.ts), [`file.ts`](lib/tools/file.ts), [`search.ts`](lib/tools/search.ts)
- **db/** — kết nối DB/Redis  
    - [`db/redis.ts`](db/redis.ts)
- **redux/** — store & provider  
    - [`redux/provider.tsx`](redux/provider.tsx), [`redux/store.ts`](redux/store.ts)
- **public/** — static assets  
    - Ví dụ: PDF RAG demo `public/Huyền Sử Silmarillion-2.pdf`

---

## ☁️ Deploy on Vercel

Xem demo tại: [https://chat-bot-alpha-sandy.vercel.app/](https://chat-bot-alpha-sandy.vercel.app/)

