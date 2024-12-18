import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { COLLECTIONS } from './constants';

const testPlayers = [
  {
    email: 'pierre.dupont@test.com',
    password: 'test123',
    firstName: 'Pierre',
    lastName: 'Dupont',
    gender: 'M',
    phoneNumber: '0612345678',
    fftRanking: '15/2'
  },
  {
    email: 'marie.martin@test.com',
    password: 'test123',
    firstName: 'Marie',
    lastName: 'Martin',
    gender: 'F',
    phoneNumber: '0623456789',
    fftRanking: '15/4'
  },
  {
    email: 'lucas.bernard@test.com',
    password: 'test123',
    firstName: 'Lucas',
    lastName: 'Bernard',
    gender: 'M',
    phoneNumber: '0634567890',
    fftRanking: '30/1'
  },
  {
    email: 'sophie.petit@test.com',
    password: 'test123',
    firstName: 'Sophie',
    lastName: 'Petit',
    gender: 'F',
    phoneNumber: '0645678901',
    fftRanking: '30/2'
  },
  {
    email: 'thomas.dubois@test.com',
    password: 'test123',
    firstName: 'Thomas',
    lastName: 'Dubois',
    gender: 'M',
    phoneNumber: '0656789012',
    fftRanking: '15/3'
  }
];

export async function seedTestPlayers() {
  // Créer la collection players si elle n'existe pas
  const playersCollectionRef = collection(db, COLLECTIONS.PLAYERS);
  const matchesCollectionRef = collection(db, COLLECTIONS.MATCHES);

  for (const player of testPlayers) {
    try {
      // Créer l'utilisateur dans Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        player.email,
        player.password
      );

      // Créer le profil du joueur dans Firestore
      await setDoc(doc(playersCollectionRef, user.uid), {
        firstName: player.firstName,
        lastName: player.lastName,
        gender: player.gender,
        phoneNumber: player.phoneNumber,
        fftRanking: player.fftRanking,
        email: player.email,
        createdAt: serverTimestamp()
      });

      console.log(`Joueur créé avec succès: ${player.firstName} ${player.lastName}`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`Le joueur ${player.email} existe déjà`);
      } else {
        console.error(`Erreur lors de la création du joueur ${player.email}:`, error);
        throw error;
      }
    }
  }
}