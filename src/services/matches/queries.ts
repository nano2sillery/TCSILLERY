import { collection, query, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { getPlayer } from '@/services/players';
import { normalizeMatch } from './utils';
import type { MatchWithPlayers } from './types';

export async function getAllMatches(): Promise<MatchWithPlayers[]> {
  try {
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const q = query(matchesRef, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    
    const matches = snapshot.docs.map(normalizeMatch);

    // Récupérer tous les joueurs impliqués
    const playerIds = new Set<string>();
    matches.forEach(match => {
      playerIds.add(match.player1Id);
      playerIds.add(match.player2Id);
    });

    // Récupérer les données des joueurs
    const players = new Map();
    await Promise.all(
      Array.from(playerIds).map(async (id) => {
        const player = await getPlayer(id);
        if (player) {
          players.set(id, player);
        }
      })
    );

    // Enrichir les matches avec les données des joueurs
    return matches.map(match => ({
      ...match,
      player1: players.get(match.player1Id),
      player2: players.get(match.player2Id)
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des matches:', error);
    throw error;
  }
}

export async function getPlayerMatches(playerId: string): Promise<MatchWithPlayers[]> {
  try {
    const matches = await getAllMatches();
    return matches.filter(match => 
      match.player1Id === playerId || match.player2Id === playerId
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des matches du joueur:', error);
    throw error;
  }
}