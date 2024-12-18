import { getFirestore, enableIndexedDbPersistence, collection, query, where, orderBy } from 'firebase/firestore';
import { app } from './app';

export const db = getFirestore(app);

// Enable offline persistence avec une meilleure gestion des erreurs
try {
  await enableIndexedDbPersistence(db, { synchronizeTabs: true });
} catch (err: any) {
  if (err.code === 'failed-precondition') {
    console.warn('La persistence ne peut être activée que dans un seul onglet à la fois.');
  } else if (err.code === 'unimplemented') {
    console.warn('Le navigateur ne supporte pas la persistence.');
  }
}

// Helper functions pour créer des requêtes communes
export function createMatchesQuery(playerId: string) {
  const matchesRef = collection(db, 'matches');
  return query(
    matchesRef,
    where('player1Id', '==', playerId),
    orderBy('date', 'desc')
  );
}