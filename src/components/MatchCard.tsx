import React from 'react';
import type { Match, Player } from '@/types';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MatchCardProps {
  match: Match & {
    player1?: Player;
    player2?: Player;
  };
}

export default function MatchCard({ match }: MatchCardProps) {
  const { currentUser } = useAuth();
  const isWinner = currentUser?.uid === match.winnerId;

  const opponent = currentUser?.uid === match.player1Id ? match.player2 : match.player1;

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-gray-500">
            {formatDate(match.date)}
          </span>
          {opponent && (
            <p className="text-sm font-medium text-gray-700 mt-1">
              vs {opponent.firstName} {opponent.lastName}
              <span className="text-gray-500 ml-1">
                ({opponent.fftRanking})
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {match.scores.map((score, index) => (
          <div key={index} className="text-base font-medium text-center text-gray-700">
            {score}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm font-medium text-center">
        <span className={`px-3 py-1 rounded-full ${
          isWinner 
            ? 'bg-primary-50 text-primary-600'
            : 'bg-secondary-50 text-secondary-600'
        }`}>
          {isWinner ? 'Victoire' : 'Défaite'}
        </span>
      </div>
    </div>
  );
}