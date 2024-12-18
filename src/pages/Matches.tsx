import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMatches } from '@/hooks/useMatches';
import MatchList from '@/components/matches/MatchList';
import MatchesHeader from '@/components/matches/MatchesHeader';
import PlayerFilter from '@/components/matches/PlayerFilter';

export default function Matches() {
  const { currentUser } = useAuth();
  const { matches, loading, error } = useMatches();
  const [filterValue, setFilterValue] = useState('');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-tertiary-500">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <MatchesHeader />
      
      <div className="mb-6">
        <PlayerFilter 
          value={filterValue}
          onChange={setFilterValue}
        />
      </div>

      <MatchList 
        matches={matches}
        currentUserId={currentUser?.uid}
        filterValue={filterValue}
      />
    </div>
  );
}