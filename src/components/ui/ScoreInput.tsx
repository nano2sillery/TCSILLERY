import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreInputProps {
  value: string;
  onChange: (score: string) => void;
  error?: string;
}

export default function ScoreInput({ value, onChange, error }: ScoreInputProps) {
  const [player1Score, player2Score] = value.split('-').map(s => s.trim()) || ['', ''];

  const handleScoreChange = (isPlayer1: boolean, newScore: string) => {
    if (!newScore) {
      onChange('');
      return;
    }
    const score = isPlayer1 ? 
      `${newScore}-${player2Score || '0'}` : 
      `${player1Score || '0'}-${newScore}`;
    onChange(score);
  };

  const scores = ['0', '1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label className="text-sm font-medium text-gray-600 mb-1">Vous</label>
          <select
            value={player1Score}
            onChange={(e) => handleScoreChange(true, e.target.value)}
            className={cn(
              "block w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm",
              error && "border-red-300 focus:border-red-500 focus:ring-red-500"
            )}
          >
            <option value="">-</option>
            {scores.map(score => (
              <option key={score} value={score}>{score}</option>
            ))}
          </select>
        </div>

        <span className="text-lg font-medium text-gray-400">-</span>

        <div className="flex flex-col items-center">
          <label className="text-sm font-medium text-gray-600 mb-1">Adversaire</label>
          <select
            value={player2Score}
            onChange={(e) => handleScoreChange(false, e.target.value)}
            className={cn(
              "block w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm",
              error && "border-red-300 focus:border-red-500 focus:ring-red-500"
            )}
          >
            <option value="">-</option>
            {scores.map(score => (
              <option key={score} value={score}>{score}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}