import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, or, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { PlayerStats } from '@/types/stats';

const initialStats: PlayerStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  totalSets: 0,
  totalGames: 0,
  winPercentage: 0,
  winLossRatio: 0,
  averageSetsWonPerMatch: 0,
  averageGamesWonPerSet: 0,
  averageGamesPerMatch: 0
};

export function usePlayerStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<PlayerStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setStats(initialStats);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        const matchesRef = collection(db, COLLECTIONS.MATCHES);
        const q = query(
          matchesRef,
          or(
            where('player1Id', '==', currentUser.uid),
            where('player2Id', '==', currentUser.uid)
          )
        );

        const querySnapshot = await getDocs(q);
        const matches = querySnapshot.docs;

        if (matches.length === 0) {
          if (mounted) {
            setStats(initialStats);
          }
          return;
        }

        let wins = 0;
        let totalSets = 0;
        let setsWon = 0;
        let totalGames = 0;
        let gamesWon = 0;

        matches.forEach(doc => {
          const match = doc.data();
          const scores = match.scores || [];
          const isPlayer1 = match.player1Id === currentUser.uid;
          
          totalSets += scores.length;
          
          scores.forEach(score => {
            const [score1, score2] = score.split('-').map(Number);
            const playerScore = isPlayer1 ? score1 : score2;
            const opponentScore = isPlayer1 ? score2 : score1;
            
            if (playerScore > opponentScore) setsWon++;
            gamesWon += playerScore;
            totalGames += score1 + score2;
          });

          if (match.winnerId === currentUser.uid) wins++;
        });

        const totalMatches = matches.length;
        const losses = totalMatches - wins;

        if (mounted) {
          setStats({
            totalMatches,
            wins,
            losses,
            totalSets,
            totalGames,
            winPercentage: totalMatches ? (wins / totalMatches) * 100 : 0,
            winLossRatio: losses ? +(wins / losses).toFixed(2) : wins,
            averageSetsWonPerMatch: totalMatches ? +(setsWon / totalMatches).toFixed(1) : 0,
            averageGamesWonPerSet: totalSets ? +(gamesWon / totalSets).toFixed(1) : 0,
            averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        if (mounted) {
          setError('Impossible de charger les statistiques');
          setStats(initialStats);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  return { stats, loading, error };
}