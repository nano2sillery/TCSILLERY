import React from 'react';
import Confetti from '@/components/animations/Confetti';
import TennisBall from '@/components/animations/TennisBall';

export default function NewMatchSuccess() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-xl p-8 shadow-xl max-w-sm w-full mx-4 relative overflow-hidden">
        <Confetti />
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <TennisBall className="animate-bounce" />
            <TennisBall className="animate-bounce delay-100" />
            <TennisBall className="animate-bounce delay-200" />
          </div>
          <h3 className="text-xl font-bold text-tertiary-500">
            Match enregistré !
          </h3>
          <p className="text-gray-600">
            Votre match a été ajouté avec succès.
          </p>
        </div>
      </div>
    </div>
  );
}