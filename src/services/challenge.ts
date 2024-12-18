import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { calculateGamesFromScore } from '@/lib/utils';
import type { ChallengeStats } from '@/types/stats';

export async function fetchChallengeStats(): Promise<ChallengeStats> {
  try {
    // Récupérer tous les joueurs
    const playersSnap = await getDocs(collection(db, COLLECTIONS.PLAYERS));
    const totalPlayers = playersSnap.docs.filter(doc => doc.id !== '_init').length;

    // Récupérer tous les matches sauf _init
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const matchesQuery = query(matchesRef, where('__name__', '!=', '_init'));
    const matchesSnap = await getDocs(matchesQuery);
    const matches = matchesSnap.docs;
    const totalMatches = matches.length;

    let totalSets = 0;
    let totalGames = 0;

    matches.forEach(match => {
      const scores = match.data().scores || [];
      totalSets += scores.length;
      totalGames += scores.reduce((sum, score) => sum + calculateGamesFromScore(score), 0);
    });

    return {
      totalPlayers,
      totalMatches,
      totalSets,
      totalGames,
      averageMatchesPerPlayer: totalPlayers ? +(totalMatches / totalPlayers).toFixed(1) : 0,
      averageSetsPerMatch: totalMatches ? +(totalSets / totalMatches).toFixed(1) : 0,
      averageGamesPerSet: totalSets ? +(totalGames / totalSets).toFixed(1) : 0,
      averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}