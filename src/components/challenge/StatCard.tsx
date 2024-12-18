import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  maxValue: number;
  info: string;
  color: string;
}

export default function StatCard({ label, value, maxValue, info, color }: StatCardProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="relative">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-base font-semibold">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">{info}</p>
    </div>
  );
}