import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';

// Vérifier si une collection est initialisée
async function isCollectionInitialized(collectionName: string) {
  try {
    const initDocRef = doc(collection(db, collectionName), '_init');
    const initDoc = await getDoc(initDocRef);
    return initDoc.exists();
  } catch (error) {
    console.warn(`Erreur lors de la vérification de ${collectionName}:`, error);
    return false;
  }
}

// Initialiser une collection si nécessaire
async function initializeCollection(collectionName: string) {
  try {
    const isInitialized = await isCollectionInitialized(collectionName);
    if (isInitialized) {
      return true;
    }

    const collectionRef = collection(db, collectionName);
    const initDoc = doc(collectionRef, '_init');
    
    await setDoc(initDoc, {
      initialized: true,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.warn(`Erreur lors de l'initialisation de ${collectionName}:`, error);
    return false;
  }
}

// Initialiser toutes les collections nécessaires
export async function initializeDatabase() {
  try {
    const collections = Object.values(COLLECTIONS);
    const results = await Promise.all(
      collections.map(async (collectionName) => {
        const success = await initializeCollection(collectionName);
        if (!success) {
          console.warn(`Échec de l'initialisation de ${collectionName}`);
        }
        return success;
      })
    );
    
    const allSuccessful = results.every(Boolean);
    if (!allSuccessful) {
      console.warn('Certaines collections n\'ont pas pu être initialisées');
    }
    
    return true;
  } catch (error) {
    console.warn('Erreur lors de l\'initialisation de la base de données:', error);
    return false;
  }
}