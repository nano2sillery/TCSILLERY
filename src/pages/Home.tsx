import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';

export default function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pb-24">
      <ChallengeSummary />
    </div>
  );
}