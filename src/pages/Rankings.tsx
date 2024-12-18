import React, { useState } from 'react';
import { useRankings } from '@/hooks/useRankings';
import RankingTabs from '@/components/rankings/RankingTabs';
import RankingList from '@/components/rankings/RankingList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageTitle from '@/components/ui/PageTitle';

type RankingType = 'matches' | 'victories';

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<RankingType>('matches');
  const { rankings, loading, error } = useRankings();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  const sortedRankings = [...rankings].sort((a, b) => {
    if (activeTab === 'matches') {
      if (b.totalMatches !== a.totalMatches) {
        return b.totalMatches - a.totalMatches;
      }
      return b.winPercentage - a.winPercentage;
    } else {
      if (b.winPercentage !== a.winPercentage) {
        return b.winPercentage - a.winPercentage;
      }
      return b.totalMatches - a.totalMatches;
    }
  });

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <PageTitle>Classement des joueurs</PageTitle>

      <RankingTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      <RankingList 
        rankings={sortedRankings}
        type={activeTab}
      />
    </div>
  );
}