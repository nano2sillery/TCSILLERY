import React from 'react';
import { useFirebaseConnection } from '@/hooks/useFirebaseConnection';
import { RefreshCw } from 'lucide-react';
import Button from './ui/Button';

export default function ConnectionStatus() {
  const { isConnected, isChecking, retryConnection } = useFirebaseConnection();

  if (isChecking || isConnected) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-2 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <span>Problème de connexion. Vérifiez votre connexion internet.</span>
        <Button
          variant="outline"
          size="sm"
          className="text-white border-white hover:bg-red-600"
          onClick={retryConnection}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    </div>
  );
}