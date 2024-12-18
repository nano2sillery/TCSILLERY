import React from 'react';
import StatCard from './StatCard';

interface StatConfig {
  label: string;
  value: number;
  maxValue: number;
  info: string;
  color: string;
}

interface StatsSectionProps {
  title: string;
  icon: React.ReactNode;
  stats: StatConfig[];
}

export default function StatsSection({ title, icon, stats }: StatsSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}