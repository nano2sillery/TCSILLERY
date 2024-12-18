export interface PlayerStats {
  totalMatches: number;
  wins: number;
  losses: number;
  totalSets: number;
  totalGames: number;
  winPercentage: number;
  winLossRatio: number;
  averageSetsWonPerMatch: number;
  averageGamesWonPerSet: number;
  averageGamesPerMatch: number;
}

export interface ChallengeStats {
  totalPlayers: number;
  totalMatches: number;
  totalSets: number;
  totalGames: number;
  averageMatchesPerPlayer: number;
  averageSetsPerMatch: number;
  averageGamesPerSet: number;
  averageGamesPerMatch: number;
}

export type ClubStats = ChallengeStats;