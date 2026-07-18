'use client';

import { useEffect, useState } from 'react';
import { Server, Play, Stop, MoreVertical } from 'lucide-react';

interface ServerData {
  id: string;
  name: string;
  type: string;
  status: string;
  ip: string;
  port: number;
}

export function ServerList() {
  const [servers, setServers] = useState<ServerData[]>([]);

  useEffect(() => {
    fetch('/api/servers')
      .then(res => res.json())
      .then(data => setServers(data.slice(0, 5)));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Servers
      </h2>
      <div className="space-y-3">
        {servers.length === 0 ? (
          <p className="text-gray-500 text-sm">No servers yet. Create your first server!</p>
        ) : (
          servers.map((server) => (
            <div key={server.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Server className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{server.name}</p>
                  <p className="text-xs text-gray-500">{server.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  server.status === 'RUNNING' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {server.status}
                </span>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
