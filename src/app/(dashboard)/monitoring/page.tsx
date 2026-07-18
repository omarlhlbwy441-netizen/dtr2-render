'use client';

import { useEffect, useState } from 'react';
import { Activity, Cpu, HardDrive, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricsData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<MetricsData[]>([]);
  const [servers, setServers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch initial data
    fetch('/api/monitoring/metrics')
      .then(res => res.json())
      .then(data => setMetrics(data));

    fetch('/api/servers')
      .then(res => res.json())
      .then(data => setServers(data));

    // WebSocket for real-time updates
    const ws = new WebSocket(`wss://${window.location.host}/api/monitoring/ws`);
    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics(prev => [...prev.slice(-50), newMetric]);
    };

    return () => ws.close();
  }, []);

  const stats = [
    { name: 'CPU Usage', value: metrics.length > 0 ? metrics[metrics.length - 1].cpu : 0, icon: Cpu, color: 'text-blue-500' },
    { name: 'Memory', value: metrics.length > 0 ? metrics[metrics.length - 1].memory : 0, icon: Activity, color: 'text-green-500' },
    { name: 'Disk', value: metrics.length > 0 ? metrics[metrics.length - 1].disk : 0, icon: HardDrive, color: 'text-yellow-500' },
    { name: 'Network', value: metrics.length > 0 ? metrics[metrics.length - 1].network : 0, icon: Wifi, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Monitoring
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mr-4`} />
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Real-time Metrics
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU" />
            <Line type="monotone" dataKey="memory" stroke="#10B981" name="Memory" />
            <Line type="monotone" dataKey="disk" stroke="#F59E0B" name="Disk" />
            <Line type="monotone" dataKey="network" stroke="#8B5CF6" name="Network" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Server Status
        </h2>
        <div className="space-y-3">
          {servers.map((server) => (
            <div key={server.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{server.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                server.status === 'RUNNING' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {server.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
