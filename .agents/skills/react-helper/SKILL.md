---
name: react-helper
description: Guidelines and helper instructions to build, run, test and debug the Next.js / React frontend application for Flower Shop.
---
# Next.js & React Developer Helper Skill

Use this skill when working on the Next.js frontend (`frontend`).

## Environment & Tech Stack
- **Framework & App Router**: Next.js 14+, React 18, App Router.
- **Styling**: Tailwind CSS, Glassmorphism, Playfair Display & Be Vietnam Pro typography.
- **HTTP Client & State**: Axios, Zustand, TanStack Query.

## Startup Operations
Always execute these commands inside the `frontend` directory:

1. **Install Dependencies**:
   ```powershell
   cd frontend
   npm install
   ```
2. **Run Dev Server**:
   ```powershell
   npm run dev
   ```
   Server will run at `http://localhost:3000`.

## Environment Configuration & API Integration
- Local API URL is configured in `frontend/.env.local` or defaults to:
  `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`

## Best Practices
- **API Failure Handling**:
  - API errors are handled gracefully in components with Toast notifications via `useUIStore`.
- **State Management**:
  - `useAuthStore`: Manages logged in User details and JWT Access/Refresh tokens.
  - `useCartStore`: Synchronizes cart items with backend and controls slide-over Cart Drawer.
