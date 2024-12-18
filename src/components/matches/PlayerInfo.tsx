import React from 'react';
import { cn } from '@/lib/utils';
import type { Player } from '@/types';
import UserInitials from '@/components/ui/UserInitials';
import PlayerName from '@/components/ui/PlayerName';

interface PlayerInfoProps {
  player: Player;
  isWinner: boolean;
}

export default function PlayerInfo({ player, isWinner }: PlayerInfoProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col items-center">
        <UserInitials
          firstName={player.firstName}
          lastName={player.lastName}
          gender={player.gender}
          size="md"
        />
        <div className="mt-2 text-center">
          <PlayerName
            firstName={player.firstName}
            lastName={player.lastName}
            firstNameClassName="text-xs text-gray-600"
            lastNameClassName="text-sm text-gray-900"
          />
          <div className="text-xs text-gray-500 mt-1">
            {player.fftRanking}
          </div>
          <div className={cn(
            "text-xs px-2 py-0.5 rounded-full inline-block mt-1.5",
            isWinner 
              ? "bg-emerald-50 text-emerald-600" 
              : "bg-red-50 text-red-600"
          )}>
            {isWinner ? "Victoire" : "Défaite"}
          </div>
        </div>
      </div>
    </div>
  );
}