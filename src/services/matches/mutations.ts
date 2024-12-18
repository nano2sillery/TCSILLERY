import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { CreateMatchInput } from './types';

export async function createMatch(input: CreateMatchInput): Promise<string> {
  try {
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const validScores = input.scores.filter(score => score.trim() !== '');
    
    if (validScores.length === 0) {
      throw new Error('Au moins un score est requis');
    }

    const docRef = await addDoc(matchesRef, {
      ...input,
      scores: validScores,
      date: input.date, // Date du match
      createdAt: serverTimestamp() // Date de création dans Firestore
    });

    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du match:', error);
    throw error;
  }
}