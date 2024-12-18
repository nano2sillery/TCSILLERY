import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import { useMatches } from '@/hooks/useMatches';
import { Trophy, Target, Percent, TrendingUp } from 'lucide-react';
import CircularProgress from '@/components/ui/CircularProgress';
import StatCard from '@/components/challenge/StatCard';
import MatchHistory from '@/components/matches/MatchHistory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageTitle from '@/components/ui/PageTitle';

export default function Statistics() {
  const { currentUser } = useAuth();
  const { stats, loading: statsLoading, error: statsError } = usePlayerStats();
  const { matches, loading: matchesLoading, error: matchesError } = useMatches(currentUser?.uid);

  if (!currentUser || statsLoading || matchesLoading) {
    return <LoadingSpinner />;
  }

  if (statsError || matchesError) {
    return (
      <div className="text-center py-8 text-red-500">
        {statsError || matchesError}
      </div>
    );
  }

  if (!stats) return null;

  const mainStats = [
    {
      icon: <Trophy className="w-5 h-5" />,
      value: stats.totalMatches,
      maxValue: 50,
      color: "#324178",
      label: "Matches",
      sublabel: "joués"
    },
    {
      icon: <Target className="w-5 h-5" />,
      value: stats.wins,
      maxValue: stats.totalMatches,
      color: "#4d8b4d",
      label: "Victoires",
      sublabel: "obtenues"
    },
    {
      icon: <Percent className="w-5 h-5" />,
      value: Math.round(stats.winPercentage),
      maxValue: 100,
      color: "#b84141",
      label: "Victoires",
      sublabel: "en %"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: stats.totalSets,
      maxValue: stats.totalMatches * 3,
      color: "#f59e0b",
      label: "Sets",
      sublabel: "joués"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <PageTitle>Mes statistiques</PageTitle>

      <div className="grid gap-6">
        {/* Statistiques principales */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mainStats.map((stat, index) => (
              <CircularProgress key={index} {...stat} size={100} strokeWidth={6} />
            ))}
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Intensité des matches */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
              <Target className="w-4 h-4 text-primary-500 mr-2" />
              Performance par Set
            </h3>
            <div className="space-y-3">
              <StatCard
                label="Jeux Gagnés/Set"
                value={stats.averageGamesWonPerSet}
                maxValue={6}
                info="Moyenne de jeux gagnés par set"
                color="bg-primary-500"
              />
              <StatCard
                label="Sets Gagnés/Match"
                value={stats.averageSetsWonPerMatch}
                maxValue={2}
                info="Moyenne de sets gagnés par match"
                color="bg-secondary-500"
              />
            </div>
          </div>

          {/* Activité du joueur */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 text-tertiary-500 mr-2" />
              Efficacité
            </h3>
            <div className="space-y-3">
              <StatCard
                label="Ratio V/D"
                value={stats.winLossRatio}
                maxValue={3}
                info="Ratio victoires/défaites"
                color="bg-tertiary-500"
              />
              <StatCard
                label="Jeux/Match"
                value={stats.averageGamesPerMatch}
                maxValue={30}
                info="Moyenne de jeux joués par match"
                color="bg-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Historique des matches */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Historique de mes matches
          </h3>
          <MatchHistory 
            matches={matches}
            currentUserId={currentUser.uid}
          />
        </div>
      </div>
    </div>
  );
}