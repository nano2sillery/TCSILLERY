import React from 'react';
import { cn } from '@/lib/utils';
import { Trophy, Percent } from 'lucide-react';

interface RankingTabsProps {
  activeTab: 'matches' | 'victories';
  onChange: (tab: 'matches' | 'victories') => void;
  className?: string;
}

export default function RankingTabs({ activeTab, onChange, className }: RankingTabsProps) {
  return (
    <div className={cn("flex rounded-lg bg-gray-100 p-1", className)}>
      <button
        onClick={() => onChange('matches')}
        className={cn(
          "flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium rounded-md",
          activeTab === 'matches'
            ? "bg-white text-tertiary-500 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        <Trophy className="w-4 h-4 mr-2" />
        Matches joués
      </button>
      <button
        onClick={() => onChange('victories')}
        className={cn(
          "flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium rounded-md",
          activeTab === 'victories'
            ? "bg-white text-tertiary-500 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        <Percent className="w-4 h-4 mr-2" />
        % Victoires
      </button>
    </div>
  );
}