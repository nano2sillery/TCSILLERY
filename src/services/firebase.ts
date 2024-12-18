import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';

// Initialiser une collection si elle n'existe pas
export async function initializeCollection(collectionName: string) {
  try {
    const collectionRef = collection(db, collectionName);
    const initDoc = doc(collectionRef, '_init');
    
    await setDoc(initDoc, {
      initialized: true,
      timestamp: new Date().toISOString()
    }, { merge: true });
    
    console.log(`Collection ${collectionName} initialisée`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'initialisation de ${collectionName}:`, error);
    return false;
  }
}

// Initialiser toutes les collections nécessaires
export async function initializeAllCollections() {
  try {
    const results = await Promise.all(
      Object.values(COLLECTIONS).map(initializeCollection)
    );
    
    const allSuccessful = results.every(Boolean);
    if (allSuccessful) {
      console.log('Toutes les collections ont été initialisées avec succès');
    } else {
      console.warn('Certaines collections n\'ont pas pu être initialisées');
    }
    
    return allSuccessful;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des collections:', error);
    return false;
  }
}

// Vérifier l'état des collections
export async function checkCollectionsStatus() {
  const status = {};
  
  for (const [name, path] of Object.entries(COLLECTIONS)) {
    try {
      const querySnapshot = await getDocs(collection(db, path));
      status[name] = !querySnapshot.empty;
    } catch (error) {
      console.error(`Erreur lors de la vérification de ${name}:`, error);
      status[name] = false;
    }
  }
  
  return status;
}