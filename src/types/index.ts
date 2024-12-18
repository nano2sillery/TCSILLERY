export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  phoneNumber: string;
  fftRanking: string;
  email: string;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  scores: string[];
  winnerId: string;
  date: Date;
}