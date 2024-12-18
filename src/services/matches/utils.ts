import { DocumentData, Timestamp } from 'firebase/firestore';
import type { Match } from '@/types';

export function normalizeDate(date: unknown): Date {
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  if (date instanceof Date) {
    return date;
  }
  if (date && typeof date === 'object' && 'seconds' in date) {
    return new Date((date as { seconds: number }).seconds * 1000);
  }
  return new Date();
}

export function normalizeMatch(doc: DocumentData): Match {
  const data = doc.data();
  return {
    id: doc.id,
    scores: data.scores || [],
    player1Id: data.player1Id || '',
    player2Id: data.player2Id || '',
    winnerId: data.winnerId || '',
    date: normalizeDate(data.date)
  };
}

export function calculateMatchStats(matches: Match[], playerId: string) {
  const totalMatches = matches.length;
  const wins = matches.filter(m => m.winnerId === playerId).length;
  
  return {
    totalMatches,
    wins,
    losses: totalMatches - wins,
    winPercentage: totalMatches ? (wins / totalMatches) * 100 : 0
  };
}