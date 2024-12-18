import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Player } from '@/types';

export async function getPlayerProfile(playerId: string): Promise<Player | null> {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, playerId);
    const playerDoc = await getDoc(playerRef);
    
    if (!playerDoc.exists()) {
      return null;
    }

    return {
      id: playerDoc.id,
      ...playerDoc.data()
    } as Player;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
}