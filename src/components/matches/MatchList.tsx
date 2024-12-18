import React from 'react';
import MatchCard from './MatchCard';
import type { MatchWithPlayers } from '@/services/matches';

interface MatchListProps {
  matches: MatchWithPlayers[];
  currentUserId?: string;
  className?: string;
  filterValue?: string;
}

export default function MatchList({ 
  matches,
  currentUserId,
  className = '',
  filterValue = ''
}: MatchListProps) {
  const filteredMatches = matches.filter(match => {
    if (!filterValue) return true;
    const searchTerm = filterValue.toLowerCase();
    
    const player1Name = `${match.player1?.firstName} ${match.player1?.lastName}`.toLowerCase();
    const player2Name = `${match.player2?.firstName} ${match.player2?.lastName}`.toLowerCase();
    
    return player1Name.includes(searchTerm) || player2Name.includes(searchTerm);
  });
  
  if (filteredMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-500 text-center">
          {matches.length === 0 
            ? "Aucun match n'a encore été enregistré"
            : "Aucun match ne correspond à votre recherche"}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {filteredMatches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
        />
      ))}
    </div>
  );
}