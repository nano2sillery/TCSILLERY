import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createMatch } from '@/services/matches';
import { getAllPlayers } from '@/services/players';
import type { Player } from '@/types';
import Button from '@/components/ui/Button';
import ScoreInput from '@/components/ui/ScoreInput';
import NewMatchSuccess from '../NewMatchSuccess';
import DateSelect from './DateSelect';

export default function NewMatch() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [scores, setScores] = useState<string[]>(['']);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    const loadPlayers = async () => {
      if (!currentUser) return;
      
      try {
        const allPlayers = await getAllPlayers();
        const otherPlayers = allPlayers
          .filter(p => p.id !== currentUser.uid)
          .sort((a, b) => a.lastName.localeCompare(b.lastName));
        setPlayers(otherPlayers);
      } catch (error) {
        console.error('Erreur lors du chargement des joueurs:', error);
        setError('Impossible de charger la liste des joueurs');
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedPlayer) {
      setError('Veuillez sélectionner un adversaire');
      return;
    }

    if (!matchDate) {
      setError('Veuillez sélectionner une date');
      return;
    }

    const validScores = scores.filter(score => score.trim() !== '');
    if (validScores.length === 0) {
      setError('Veuillez saisir au moins un score');
      return;
    }

    try {
      let player1Sets = 0;
      let player2Sets = 0;
      validScores.forEach(score => {
        const [score1, score2] = score.split('-').map(Number);
        if (score1 > score2) player1Sets++;
        else if (score2 > score1) player2Sets++;
      });

      const winnerId = player1Sets > player2Sets ? currentUser.uid : selectedPlayer;

      await createMatch({
        player1Id: currentUser.uid,
        player2Id: selectedPlayer,
        scores: validScores,
        winnerId,
        date: new Date(matchDate)
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/matches');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création du match:', error);
      setError('Impossible de créer le match');
    }
  };

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Nouveau Match</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Adversaire
            </label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Sélectionnez votre adversaire</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.lastName} ${player.firstName} (${player.fftRanking})`}
                </option>
              ))}
            </select>
          </div>

          <DateSelect
            value={matchDate}
            onChange={setMatchDate}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-700">Score</h2>
              {scores.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setScores([...scores, ''])}
                  className="text-sm"
                >
                  Ajouter un set
                </Button>
              )}
            </div>

            {scores.map((score, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <ScoreInput
                    value={score}
                    onChange={(newScore) => {
                      const newScores = [...scores];
                      newScores[index] = newScore;
                      setScores(newScores);
                    }}
                  />
                </div>
                {scores.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newScores = scores.filter((_, i) => i !== index);
                      setScores(newScores);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full">
            Enregistrer le match
          </Button>
        </form>
      </div>

      {showSuccess && <NewMatchSuccess />}
    </>
  );
}