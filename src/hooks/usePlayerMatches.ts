import { useState, useEffect } from 'react';
import { fetchPlayerMatches } from '@/services/matches/queries';
import type { Match, Player } from '@/types';

export type MatchWithPlayers = Match & {
  player1?: Player;
  player2?: Player;
};

export function usePlayerMatches(playerId?: string) {
  const [matches, setMatches] = useState<MatchWithPlayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerId) {
      setMatches([]);
      setLoading(false);
      return;
    }

    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlayerMatches(playerId);
        
        if (mounted) {
          const validMatches = data.filter(match => 
            match.player1 && 
            match.player2 && 
            match.scores.length > 0
          );
          setMatches(validMatches);
          setError(null);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des matches:', err);
        if (mounted) {
          if (retryCount < maxRetries) {
            retryCount++;
            // Retry after a short delay
            setTimeout(loadMatches, 1000 * retryCount);
          } else {
            setError('Impossible de charger les matches');
            setMatches([]);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMatches();

    return () => {
      mounted = false;
    };
  }, [playerId]);

  return { matches, loading, error };
}