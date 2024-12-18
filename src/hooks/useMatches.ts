import { useState, useEffect } from 'react';
import { getAllMatches, getPlayerMatches } from '@/services/matches/queries';
import type { MatchWithPlayers } from '@/services/matches/types';

export function useMatches(playerId?: string) {
  const [matches, setMatches] = useState<MatchWithPlayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        setLoading(true);
        setError(null);
        
        const data = playerId 
          ? await getPlayerMatches(playerId)
          : await getAllMatches();
        
        if (mounted) {
          setMatches(data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des matches:', err);
        if (mounted) {
          setError('Impossible de charger les matches');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, [playerId]);

  return { matches, loading, error };
}