import React from 'react';
import { AtSign } from 'lucide-react';
import UserInitials from '@/components/ui/UserInitials';
import type { Player } from '@/types';

interface ProfileHeaderProps {
  profile: Player;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const colors = {
    M: {
      bg: 'bg-[#2b69d8]',
      ring: 'ring-[#2b69d8]/30'
    },
    F: {
      bg: 'bg-[#da2084]',
      ring: 'ring-[#da2084]/30'
    }
  }[profile.gender];

  return (
    <div className={`${colors.bg} px-4 sm:px-6 py-6 sm:py-8 text-white`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar avec initiales */}
          <UserInitials 
            firstName={profile.firstName}
            lastName={profile.lastName}
            gender={profile.gender} 
            size="xl"
            className="ring-4 ring-white/30 flex-shrink-0"
          />

          {/* Informations */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="space-y-4">
              {/* Nom et prénom */}
              <div>
                <div className="text-base sm:text-lg font-medium text-white/80 truncate">
                  {profile.firstName}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide break-words leading-tight">
                  {profile.lastName}
                </h1>
              </div>

              {/* Classement FFT et Email */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="text-lg font-semibold bg-white/10 px-3 py-1 rounded-full">
                  {profile.fftRanking}
                </div>
                <div className="flex items-center text-white/80 space-x-2">
                  <AtSign className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm break-all">{profile.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}