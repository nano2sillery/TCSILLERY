import { collection, query, where, getDocs, or } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { calculateGamesFromScore } from '@/lib/utils';
import type { PlayerStats } from '@/types/stats';

export async function fetchPlayerStats(playerId: string): Promise<PlayerStats> {
  try {
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const q = query(
      matchesRef,
      or(
        where('player1Id', '==', playerId),
        where('player2Id', '==', playerId)
      )
    );

    const querySnapshot = await getDocs(q);
    const matches = querySnapshot.docs;

    let totalMatches = matches.length;
    let wins = 0;
    let totalSets = 0;
    let setsWon = 0;
    let totalGames = 0;
    let gamesWon = 0;

    matches.forEach(match => {
      const data = match.data();
      const scores = data.scores || [];
      const isPlayer1 = data.player1Id === playerId;
      
      totalSets += scores.length;
      
      scores.forEach(score => {
        const [score1, score2] = score.split('-').map(Number);
        const playerScore = isPlayer1 ? score1 : score2;
        const opponentScore = isPlayer1 ? score2 : score1;
        
        if (playerScore > opponentScore) setsWon++;
        gamesWon += playerScore;
        totalGames += score1 + score2;
      });

      if (data.winnerId === playerId) wins++;
    });

    const losses = totalMatches - wins;

    return {
      totalMatches,
      wins,
      losses,
      totalSets,
      totalGames,
      winPercentage: totalMatches ? (wins / totalMatches) * 100 : 0,
      winLossRatio: losses ? +(wins / losses).toFixed(2) : wins,
      averageSetsWonPerMatch: totalMatches ? +(setsWon / totalMatches).toFixed(1) : 0,
      averageGamesWonPerSet: totalSets ? +(gamesWon / totalSets).toFixed(1) : 0,
      averageGamesPerMatch: totalMatches ? +(totalGames / totalMatches).toFixed(1) : 0
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}