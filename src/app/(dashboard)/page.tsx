import { Metadata } from 'next';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ServerList } from '@/components/dashboard/ServerList';
import { ActivityChart } from '@/components/dashboard/ActivityChart';

export const metadata: Metadata = {
  title: 'Dashboard | DTR2',
  description: 'Manage your servers and deployments',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServerList />
        <ActivityChart />
      </div>
    </div>
  );
}
