import { useState, useEffect } from 'react';
import { fetchChallengeStats } from '@/services/challenge';
import type { ChallengeStats } from '@/types/stats';

export function useChallengeStats() {
  const [stats, setStats] = useState<ChallengeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchChallengeStats();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setError('Impossible de charger les statistiques du challenge');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return { stats, loading, error };
}