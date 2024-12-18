import React from 'react';
import { AtSign } from 'lucide-react';
import UserInitials from '@/components/ui/UserInitials';
import PlayerName from '@/components/ui/PlayerName';
import type { Player } from '@/types';
import { getHeaderColors } from './styles';

interface ProfileHeaderProps {
  profile: Player;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const colors = getHeaderColors(profile.gender);

  return (
    <div className={`${colors.bg} px-4 sm:px-6 py-6 sm:py-8`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <UserInitials 
            firstName={profile.firstName}
            lastName={profile.lastName}
            gender={profile.gender} 
            size="xl"
            className="ring-4 ring-white/30 flex-shrink-0"
          />

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="space-y-3">
              <PlayerName
                firstName={profile.firstName}
                lastName={profile.lastName}
                firstNameClassName="text-base sm:text-lg text-white/80"
                lastNameClassName="text-2xl sm:text-3xl font-bold text-white tracking-wide"
              />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="text-lg font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full">
                  {profile.fftRanking}
                </div>
                <div className="flex items-center text-white/70 space-x-2">
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