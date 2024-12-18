import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  scores: string[];
  isWinner: boolean;
  className?: string;
}

export default function ScoreDisplay({ scores, isWinner, className }: ScoreDisplayProps) {
  const colors = isWinner ? 'text-emerald-600' : 'text-amber-600';

  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      {scores.map((score, index) => (
        <div 
          key={index}
          className={cn(
            "text-sm font-medium tabular-nums",
            colors
          )}
        >
          {score}
        </div>
      ))}
    </div>
  );
}