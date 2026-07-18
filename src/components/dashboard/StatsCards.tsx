'use client';

import { useEffect, useState } from 'react';
import { Server, Activity, CreditCard, Users } from 'lucide-react';

interface Stats {
  totalServers: number;
  activeServers: number;
  totalSpent: number;
  totalUsers: number;
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    totalServers: 0,
    activeServers: 0,
    totalSpent: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const cards = [
    { name: 'Total Servers', value: stats.totalServers, icon: Server, color: 'bg-blue-500' },
    { name: 'Active', value: stats.activeServers, icon: Activity, color: 'bg-green-500' },
    { name: 'Total Spent', value: `$${stats.totalSpent}`, icon: CreditCard, color: 'bg-amber-500' },
    { name: 'Team Members', value: stats.totalUsers, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
              <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{card.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
