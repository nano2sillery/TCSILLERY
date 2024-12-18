import React from 'react';
import type { Player } from '@/types';

interface PlayerSelectProps {
  players: Player[];
  value: string;
  onChange: (value: string) => void;
}

export default function PlayerSelect({ players, value, onChange }: PlayerSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Adversaire
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="">Sélectionnez votre adversaire</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {`${player.lastName} ${player.firstName} (${player.fftRanking})`}
          </option>
        ))}
      </select>
    </div>
  );
}