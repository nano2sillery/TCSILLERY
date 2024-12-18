import { useState, useEffect } from 'react';
import { getPlayerProfile } from '@/services/profile/queries';
import { updatePlayerProfile } from '@/services/profile/mutations';
import type { Player } from '@/types';

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPlayerProfile(userId);
        
        if (mounted && data) {
          setProfile(data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        if (mounted) {
          setError('Impossible de charger le profil');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const handleUpdateProfile = async (data: Partial<Player>) => {
    if (!profile?.id) return;

    try {
      await updatePlayerProfile(profile.id, data);
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      throw err;
    }
  };

  return { 
    profile, 
    loading, 
    error,
    updateProfile: handleUpdateProfile
  };
}