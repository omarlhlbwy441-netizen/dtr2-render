import { NextResponse } from 'next/server';

export async function GET() {
  // Generate sample metrics data
  const metrics = Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100,
    network: Math.random() * 1000,
  }));

  return NextResponse.json(metrics);
}
