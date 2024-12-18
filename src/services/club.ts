import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { ClubStats } from '@/types/stats';

function calculateGamesFromScore(score: string): number {
  const [score1, score2] = score.split('-').map(Number);
  return (score1 || 0) + (score2 || 0);
}

export async function fetchClubStats(): Promise<ClubStats> {
  try {
    // Récupérer les joueurs
    const playersRef = collection(db, COLLECTIONS.PLAYERS);
    const playersSnap = await getDocs(playersRef);
    const totalPlayers = playersSnap.size;

    // Récupérer les matches
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const matchesSnap = await getDocs(matchesRef);
    const matches = matchesSnap.docs;
    const totalMatches = matches.length;

    // Calculer les totaux de sets et de jeux
    let totalSets = 0;
    let totalGames = 0;

    matches.forEach(match => {
      const scores = match.data().scores || [];
      totalSets += scores.length;
      totalGames += scores.reduce((sum, score) => sum + calculateGamesFromScore(score), 0);
    });

    // Calculer les moyennes
    const averageMatchesPerPlayer = totalPlayers ? +(totalMatches / totalPlayers).toFixed(1) : 0;
    const averageSetsPerMatch = totalMatches ? +(totalSets / totalMatches).toFixed(1) : 0;
    const averageGamesPerSet = totalSets ? +(totalGames / totalSets).toFixed(1) : 0;
    const averageGamesPerMatch = totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0;

    return {
      totalPlayers,
      totalMatches,
      totalSets,
      totalGames,
      averageMatchesPerPlayer,
      averageSetsPerMatch,
      averageGamesPerSet,
      averageGamesPerMatch
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}