import type { Player } from './index';

export interface PlayerRanking extends Player {
  totalMatches: number;
  wins: number;
  losses: number;
  winPercentage: number;
}