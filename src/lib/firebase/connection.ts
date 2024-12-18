import { Timestamp } from 'firebase/firestore';

export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    const timestamp = Timestamp.now();
    return !!timestamp;
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return false;
  }
}