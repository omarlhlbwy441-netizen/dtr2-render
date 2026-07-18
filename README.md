# DTR2 - Server Management Platform

## Features
- 🚀 Server deployment & management
- 📦 Pre-built templates (Node.js, Python, Docker)
- 💳 Stripe billing integration
- 📊 Real-time monitoring
- 🔐 OAuth & credentials authentication
- 🌐 WebSocket real-time updates

## Tech Stack
- Next.js 14
- Prisma + PostgreSQL
- NextAuth.js
- Stripe
- Tailwind CSS
- Recharts
- Socket.io

## Deployment on Render
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Add environment variables from `.env.example`
5. Deploy!

## Local Development
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `GET /api/servers` - List servers
- `POST /api/servers` - Create server
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/monitoring/metrics` - System metrics
- `WS /api/monitoring/ws` - Real-time metrics WebSocket
