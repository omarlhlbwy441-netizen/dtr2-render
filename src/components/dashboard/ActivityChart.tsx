'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityData {
  day: string;
  deployments: number;
  builds: number;
}

export function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>([]);

  useEffect(() => {
    // Generate sample data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    setData(days.map(day => ({
      day,
      deployments: Math.floor(Math.random() * 10),
      builds: Math.floor(Math.random() * 15),
    })));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Weekly Activity
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="deployments" fill="#3B82F6" name="Deployments" />
          <Bar dataKey="builds" fill="#10B981" name="Builds" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
