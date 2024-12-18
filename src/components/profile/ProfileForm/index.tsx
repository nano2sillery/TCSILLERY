import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FFT_RANKINGS } from '@/lib/constants';
import { Phone, Trophy } from 'lucide-react';
import ProfileField from './ProfileField';
import ProfileActions from './ProfileActions';
import type { Player } from '@/types';
import { getFormColors } from './styles';

interface ProfileFormProps {
  profile: Player;
  onSubmit: (data: Partial<Player>) => Promise<void>;
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<Partial<Player>>();
  const [error, setError] = React.useState<string | null>(null);

  const colors = getFormColors(profile.gender);

  const handleFormSubmit = async (data: Partial<Player>) => {
    try {
      await onSubmit(data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Impossible de mettre à jour le profil');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/welcome');
    } catch (err) {
      setError('Impossible de vous déconnecter');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 sm:p-6 space-y-6">
      <div className="space-y-4">
        <ProfileField
          label="Téléphone"
          icon={<Phone className="w-4 h-4" />}
          error={errors.phoneNumber?.message}
          colorClass={colors.text}
        >
          <input
            type="tel"
            defaultValue={profile.phoneNumber}
            disabled={!isEditing}
            {...register('phoneNumber', {
              required: 'Numéro de téléphone requis',
              pattern: {
                value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                message: 'Format invalide'
              }
            })}
            className={`block w-full rounded-lg border-gray-300 px-3 py-2 ${
              isEditing ? `${colors.ring} focus:border-transparent` : 'bg-gray-50'
            }`}
            placeholder="06 12 34 56 78"
          />
        </ProfileField>

        <ProfileField
          label="Classement FFT"
          icon={<Trophy className="w-4 h-4" />}
          error={errors.fftRanking?.message}
          colorClass={colors.text}
        >
          <select
            defaultValue={profile.fftRanking}
            disabled={!isEditing}
            {...register('fftRanking', { required: 'Classement requis' })}
            className={`block w-full rounded-lg border-gray-300 px-3 py-2 ${
              isEditing ? `${colors.ring} focus:border-transparent` : 'bg-gray-50'
            }`}
          >
            {FFT_RANKINGS.map((ranking) => (
              <option key={ranking} value={ranking}>{ranking}</option>
            ))}
          </select>
        </ProfileField>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <ProfileActions
          isEditing={isEditing}
          isDirty={isDirty}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onLogout={handleLogout}
          colors={colors}
        />
      </div>
    </form>
  );
}