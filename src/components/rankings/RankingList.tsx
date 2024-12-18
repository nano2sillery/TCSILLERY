import React from 'react';
import { Medal } from 'lucide-react';
import UserInitials from '@/components/ui/UserInitials';
import PlayerName from '@/components/ui/PlayerName';
import type { PlayerRanking } from '@/types/rankings';

interface RankingListProps {
  rankings: PlayerRanking[];
  type: 'matches' | 'victories';
}

export default function RankingList({ rankings, type }: RankingListProps) {
  // Filtrer les joueurs qui ont joué au moins un match
  const activeRankings = rankings.filter(player => player.totalMatches > 0);

  if (activeRankings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun joueur n'a encore joué de match
      </div>
    );
  }

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-700';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-3">
      {activeRankings.map((player, index) => (
        <div 
          key={player.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4"
        >
          {/* Position */}
          <div className="flex-shrink-0 w-8 text-center">
            {index < 3 ? (
              <Medal className={`w-6 h-6 ${getMedalColor(index)}`} />
            ) : (
              <span className="text-lg font-semibold text-gray-400">
                {index + 1}
              </span>
            )}
          </div>

          {/* Avatar et nom */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <UserInitials
              firstName={player.firstName}
              lastName={player.lastName}
              gender={player.gender}
              size="sm"
            />
            <div className="min-w-0">
              <PlayerName
                firstName={player.firstName}
                lastName={player.lastName}
                firstNameClassName="text-sm text-gray-600 truncate"
                lastNameClassName="text-base text-gray-900 truncate"
              />
              <div className="text-xs text-gray-500 mt-0.5">
                {player.fftRanking}
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex flex-col items-end">
            <div className="text-sm font-medium text-gray-900">
              {type === 'matches' ? (
                `${player.totalMatches} matches`
              ) : (
                `${Math.round(player.winPercentage)}%`
              )}
            </div>
            <div className="text-xs text-gray-500">
              {type === 'matches' ? (
                `${Math.round(player.winPercentage)}% victoires`
              ) : (
                `${player.totalMatches} matches`
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}