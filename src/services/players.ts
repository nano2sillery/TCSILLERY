import { 
  collection, 
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Player } from '@/types';

export async function createPlayer(playerData: Omit<Player, 'id'> & { id: string }) {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, playerData.id);
    await setDoc(playerRef, {
      ...playerData,
      createdAt: new Date()
    });
    return playerData.id;
  } catch (error) {
    console.error('Erreur lors de la création du joueur:', error);
    throw error;
  }
}

export async function updatePlayer(playerId: string, data: Partial<Player>) {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, playerId);
    await updateDoc(playerRef, {
      ...data,
      updatedAt: new Date()
    });
    return playerId;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du joueur:', error);
    throw error;
  }
}

export async function getPlayer(playerId: string): Promise<Player | null> {
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
    console.error('Erreur lors de la récupération du joueur:', error);
    throw error;
  }
}

export async function getAllPlayers(): Promise<Player[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PLAYERS),
      orderBy('lastName', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Player[];
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error);
    throw error;
  }
}