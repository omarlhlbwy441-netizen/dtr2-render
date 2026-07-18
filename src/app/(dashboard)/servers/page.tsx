'use client';

import { useState } from 'react';
import { Plus, Server, Play, Stop, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServerModal } from '@/components/dashboard/ServerModal';

interface ServerData {
  id: string;
  name: string;
  type: string;
  status: 'RUNNING' | 'STOPPED' | 'PENDING' | 'ERROR';
  ip: string;
  port: number;
}

export default function ServersPage() {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateServer = async (data: any) => {
    const res = await fetch('/api/servers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const newServer = await res.json();
      setServers([...servers, newServer]);
      setIsModalOpen(false);
    }
  };

  const handleToggleServer = async (id: string, action: 'start' | 'stop') => {
    await fetch(`/api/servers/${id}/${action}`, { method: 'POST' });
  };

  const handleDeleteServer = async (id: string) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/servers/${id}`, { method: 'DELETE' });
      setServers(servers.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Servers
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Server
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP:Port</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {servers.map((server) => (
              <tr key={server.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Server className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {server.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {server.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    server.status === 'RUNNING' ? 'bg-green-100 text-green-800' :
                    server.status === 'STOPPED' ? 'bg-gray-100 text-gray-800' :
                    server.status === 'ERROR' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {server.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {server.ip}:{server.port}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleServer(server.id, server.status === 'RUNNING' ? 'stop' : 'start')}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    {server.status === 'RUNNING' ? <Stop className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDeleteServer(server.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateServer}
      />
    </div>
  );
}
