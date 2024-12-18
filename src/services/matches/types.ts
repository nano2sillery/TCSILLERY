import type { Match, Player } from '@/types';

export interface MatchWithPlayers extends Match {
  player1?: Player;
  player2?: Player;
}

export interface MatchFilters {
  playerId?: string;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateMatchInput {
  player1Id: string;
  player2Id: string;
  scores: string[];
  winnerId: string;
  date: Date; // Ajout du champ date
}

export interface MatchStats {
  totalMatches: number;
  wins: number;
  losses: number;
  winPercentage: number;
}