import React from 'react';
import { formatDate } from '@/lib/utils';
import type { Match, Player } from '@/types';
import PlayerInfo from './PlayerInfo';

interface MatchCardProps {
  match: Match & {
    player1?: Player;
    player2?: Player;
  };
}

export default function MatchCard({ match }: MatchCardProps) {
  const { player1, player2, scores, date, winnerId } = match;
  if (!player1 || !player2) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="text-sm text-gray-500 text-center mb-4">
        {formatDate(date)}
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Joueur 1 */}
        <div className="flex justify-center">
          <PlayerInfo 
            player={player1}
            isWinner={winnerId === player1.id}
          />
        </div>

        {/* Scores */}
        <div className="flex flex-col items-center justify-center">
          {scores.map((score, index) => (
            <div 
              key={index}
              className="text-sm font-medium text-gray-600 tabular-nums bg-gray-50 px-3 py-1.5 rounded-full mb-1.5 last:mb-0 w-20 text-center"
            >
              {score}
            </div>
          ))}
        </div>

        {/* Joueur 2 */}
        <div className="flex justify-center">
          <PlayerInfo 
            player={player2}
            isWinner={winnerId === player2.id}
          />
        </div>
      </div>
    </div>
  );
}