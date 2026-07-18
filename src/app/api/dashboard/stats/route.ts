import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [totalServers, activeServers, payments, totalUsers] = await Promise.all([
    prisma.server.count({ where: { userId: session.user.id } }),
    prisma.server.count({ where: { userId: session.user.id, status: 'RUNNING' } }),
    prisma.payment.aggregate({
      where: { userId: session.user.id },
      _sum: { amount: true },
    }),
    prisma.user.count(),
  ]);

  return NextResponse.json({
    totalServers,
    activeServers,
    totalSpent: payments._sum.amount || 0,
    totalUsers,
  });
}
