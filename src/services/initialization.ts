import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';

// Vérifier si une collection a des données
async function hasData(collectionName: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, collectionName),
      where('__name__', '!=', '_init')
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error(`Erreur lors de la vérification de ${collectionName}:`, error);
    return false;
  }
}

// Vérifier l'état des collections
export async function checkCollectionsStatus() {
  const status: Record<string, boolean> = {};
  
  for (const [name, path] of Object.entries(COLLECTIONS)) {
    try {
      status[name] = await hasData(path);
    } catch (error) {
      console.error(`Erreur lors de la vérification de ${name}:`, error);
      status[name] = false;
    }
  }
  
  return status;
}