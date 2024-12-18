import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Player } from '@/types';
import type { PlayerRanking } from '@/types/rankings';

export function useRankings() {
  const [rankings, setRankings] = useState<PlayerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRankings() {
      try {
        setLoading(true);
        setError(null);

        // Récupérer tous les joueurs
        const playersSnap = await getDocs(collection(db, COLLECTIONS.PLAYERS));
        const players = playersSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Player[];

        // Récupérer tous les matches
        const matchesSnap = await getDocs(collection(db, COLLECTIONS.MATCHES));
        const matches = matchesSnap.docs.map(doc => doc.data());

        // Calculer les statistiques pour chaque joueur
        const playerStats = players.map(player => {
          const playerMatches = matches.filter(match => 
            match.player1Id === player.id || match.player2Id === player.id
          );

          const totalMatches = playerMatches.length;
          const wins = playerMatches.filter(match => match.winnerId === player.id).length;
          const winPercentage = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

          return {
            ...player,
            totalMatches,
            wins,
            losses: totalMatches - wins,
            winPercentage
          };
        });

        setRankings(playerStats);
      } catch (err) {
        console.error('Erreur lors du chargement des classements:', err);
        setError('Impossible de charger les classements');
      } finally {
        setLoading(false);
      }
    }

    loadRankings();
  }, []);

  return { rankings, loading, error };
}