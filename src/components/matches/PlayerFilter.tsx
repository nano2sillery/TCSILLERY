import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function PlayerFilter({ value, onChange, className }: PlayerFilterProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un joueur..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                 text-sm placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:border-transparent"
      />
    </div>
  );
}