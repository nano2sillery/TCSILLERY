import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Match, Player } from '@/types';

export interface ClubStats {
  totalPlayers: number;
  totalMatches: number;
  totalSets: number;
  averageMatchesPerPlayer: number;
  averageSetsPerMatch: number;
}

export async function fetchClubStatistics(): Promise<ClubStats> {
  try {
    // Récupérer tous les joueurs
    const playersSnapshot = await getDocs(collection(db, COLLECTIONS.PLAYERS));
    const totalPlayers = playersSnapshot.size;

    // Récupérer tous les matches
    const matchesSnapshot = await getDocs(collection(db, COLLECTIONS.MATCHES));
    const matches = matchesSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Match[];

    const totalMatches = matches.length;
    const totalSets = matches.reduce((total, match) => total + match.scores.length, 0);

    return {
      totalPlayers,
      totalMatches,
      totalSets,
      averageMatchesPerPlayer: totalPlayers ? Number((totalMatches / totalPlayers).toFixed(1)) : 0,
      averageSetsPerMatch: totalMatches ? Number((totalSets / totalMatches).toFixed(1)) : 0
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}