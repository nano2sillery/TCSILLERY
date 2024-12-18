import { useState, useEffect, useCallback } from 'react';
import { checkFirebaseConnection } from '@/lib/firebase';

export function useFirebaseConnection() {
  const [isConnected, setIsConnected] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = useCallback(async () => {
    try {
      const connected = await checkFirebaseConnection();
      setIsConnected(connected);
    } catch (error) {
      console.error('Erreur de connexion Firebase:', error);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const runCheck = async () => {
      if (!mounted) return;
      await checkConnection();
    };

    runCheck();
    intervalId = setInterval(runCheck, 30000); // Vérifier toutes les 30 secondes

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [checkConnection]);

  return { isConnected, isChecking, retryConnection: checkConnection };
}