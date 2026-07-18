'use client';

import { useState } from 'react';
import { Plus, Copy, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const templates = [
  {
    id: '1',
    name: 'Node.js + PM2',
    description: 'Production-ready Node.js server with PM2 process manager',
    type: 'NODEJS_PM2',
    price: 0,
    config: { nodeVersion: '18', pm2Instances: 2 },
  },
  {
    id: '2',
    name: 'Python FastAPI',
    description: 'High-performance Python API with FastAPI and Uvicorn',
    type: 'PYTHON_FASTAPI',
    price: 0,
    config: { pythonVersion: '3.11', workers: 4 },
  },
  {
    id: '3',
    name: 'Docker Compose',
    description: 'Multi-container setup with Docker Compose',
    type: 'DOCKER_COMPOSE',
    price: 5,
    config: { composeVersion: '3.8' },
  },
  {
    id: '4',
    name: 'Static Site',
    description: 'Nginx-powered static site hosting',
    type: 'STATIC_SITE',
    price: 0,
    config: { nginxVersion: '1.24' },
  },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleDeploy = async (templateId: string) => {
    const res = await fetch('/api/servers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId }),
    });
    if (res.ok) {
      alert('Server deployment started!');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Server Templates
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {template.name}
              </h3>
              {template.price > 0 && (
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  ${template.price}/mo
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {template.description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
              <code className="text-xs text-gray-600 dark:text-gray-300">
                {JSON.stringify(template.config, null, 2)}
              </code>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleDeploy(template.id)}
                className="flex-1"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Deploy
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedTemplate(template.id)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
