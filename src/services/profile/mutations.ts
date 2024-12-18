import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Player } from '@/types';

export async function updatePlayerProfile(playerId: string, data: Partial<Player>): Promise<void> {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, playerId);
    await updateDoc(playerRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
}