import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getPlayer, updatePlayer } from '@/services/players';
import { FFT_RANKINGS } from '@/lib/constants';
import type { Player } from '@/types';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Phone, Trophy, LogOut, AtSign } from 'lucide-react';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [playerData, setPlayerData] = React.useState<Player | null>(null);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<Partial<Player>>();

  const genderColors = {
    M: {
      bg: 'bg-[#2b69d8]',
      text: 'text-[#2b69d8]',
      border: 'border-[#2b69d8]',
      hover: 'hover:bg-[#2457b8]',
      ring: 'focus:ring-[#2b69d8]',
    },
    F: {
      bg: 'bg-[#da2084]',
      text: 'text-[#da2084]',
      border: 'border-[#da2084]',
      hover: 'hover:bg-[#c41c76]',
      ring: 'focus:ring-[#da2084]',
    }
  };

  const colors = playerData ? genderColors[playerData.gender] : genderColors.M;

  React.useEffect(() => {
    async function loadProfile() {
      if (!currentUser) return;

      try {
        const data = await getPlayer(currentUser.uid);
        if (data) {
          setPlayerData(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        setError('Impossible de charger votre profil');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [currentUser]);

  const onSubmit = async (data: Partial<Player>) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await updatePlayer(currentUser.uid, {
        phoneNumber: data.phoneNumber,
        fftRanking: data.fftRanking,
      });
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setError('Impossible de mettre à jour votre profil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/welcome');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setError('Impossible de vous déconnecter');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className={colors.text}>Chargement...</div>
      </div>
    );
  }

  if (!playerData) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* En-tête du profil */}
        <div className={`${colors.bg} px-6 py-8 text-white`}>
          <div className="flex items-center justify-center mb-4">
            <Avatar gender={playerData.gender} size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-center">
            {playerData.firstName} {playerData.lastName}
          </h1>
          <p className="text-center text-white/80 mt-1">
            {playerData.fftRanking}
          </p>
        </div>

        {/* Contenu du profil */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${colors.text}`}>
                <AtSign className="w-4 h-4" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={playerData.email}
                disabled
                className="block w-full rounded-lg border-gray-300 bg-gray-50 px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${colors.text}`}>
                <Phone className="w-4 h-4" />
                <span>Téléphone</span>
              </label>
              <input
                type="tel"
                defaultValue={playerData.phoneNumber}
                {...register('phoneNumber', {
                  required: 'Numéro de téléphone requis',
                  pattern: {
                    value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                    message: 'Format invalide'
                  }
                })}
                className={`block w-full rounded-lg border-gray-300 px-3 py-2 ${colors.ring} focus:border-transparent`}
                placeholder="06 12 34 56 78"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${colors.text}`}>
                <Trophy className="w-4 h-4" />
                <span>Classement FFT</span>
              </label>
              <select
                defaultValue={playerData.fftRanking}
                {...register('fftRanking', { required: 'Classement requis' })}
                className={`block w-full rounded-lg border-gray-300 px-3 py-2 ${colors.ring} focus:border-transparent`}
              >
                {FFT_RANKINGS.map((ranking) => (
                  <option key={ranking} value={ranking}>{ranking}</option>
                ))}
              </select>
              {errors.fftRanking && (
                <p className="text-sm text-red-600">{errors.fftRanking.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              disabled={!isDirty || loading}
              className={`w-full ${colors.bg} ${colors.hover}`}
            >
              Mettre à jour
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className={`w-full border-2 ${colors.border} ${colors.text} flex items-center justify-center space-x-2`}
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}