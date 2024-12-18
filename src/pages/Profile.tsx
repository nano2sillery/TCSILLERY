import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Profile() {
  const { currentUser } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile(currentUser?.uid);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !profile) {
    return (
      <div className="text-center py-8 text-red-500">
        {error || 'Impossible de charger le profil'}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <ProfileHeader profile={profile} />
        <ProfileForm 
          profile={profile}
          onSubmit={updateProfile}
        />
      </div>
    </div>
  );
}