import React from 'react';
import { useClubStats } from '@/hooks/useClubStats';
import CircularProgress from './ui/CircularProgress';
import { Trophy, Users, Target, Activity } from 'lucide-react';

export default function ClubStatistics() {
  const { stats, loading, error } = useClubStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-tertiary-500">Chargement...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-8 text-red-500">
        {error || 'Données non disponibles'}
      </div>
    );
  }

  // Statistiques principales
  const mainStats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: stats.totalPlayers,
      maxValue: 100,
      color: "#324178",
      label: "Joueurs",
      sublabel: "inscrits"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: stats.totalMatches,
      maxValue: 200,
      color: "#b84141",
      label: "Matches",
      sublabel: "joués"
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: stats.totalSets,
      maxValue: 500,
      color: "#4d8b4d",
      label: "Sets",
      sublabel: "joués"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      value: stats.totalGames,
      maxValue: 2000,
      color: "#f59e0b",
      label: "Jeux",
      sublabel: "joués"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-tertiary-500 mb-8 text-center">
        Statistiques du Club
      </h2>

      <div className="grid gap-6">
        {/* Statistiques principales */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {mainStats.map((stat, index) => (
              <CircularProgress
                key={index}
                {...stat}
              />
            ))}
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Intensité des matches */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary-500" />
              Intensité des Matches
            </h3>
            <div className="space-y-4">
              <StatCard
                label="Jeux par Set"
                value={stats.averageGamesPerSet}
                maxValue={12}
                info="La moyenne idéale est de 8-10 jeux par set"
                color="bg-primary-500"
              />
              <StatCard
                label="Sets par Match"
                value={stats.averageSetsPerMatch}
                maxValue={3}
                info="2 sets en moyenne indique des matches disputés"
                color="bg-secondary-500"
              />
            </div>
          </div>

          {/* Activité du club */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-tertiary-500" />
              Activité du Club
            </h3>
            <div className="space-y-4">
              <StatCard
                label="Matches par Joueur"
                value={stats.averageMatchesPerPlayer}
                maxValue={10}
                info="Indicateur de participation des membres"
                color="bg-tertiary-500"
              />
              <StatCard
                label="Jeux par Match"
                value={stats.averageGamesPerMatch}
                maxValue={30}
                info="Reflète la durée moyenne des matches"
                color="bg-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  maxValue: number;
  info: string;
  color: string;
}

function StatCard({ label, value, maxValue, info, color }: StatCardProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="relative">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-lg font-semibold">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">{info}</p>
    </div>
  );
}