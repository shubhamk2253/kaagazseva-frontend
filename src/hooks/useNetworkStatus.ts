import { useState, useEffect } from 'react';

/**
 * KAAGAZSEVA - Network Status Hook
 * Detects whether the user is online or offline.
 * Used for showing connection warnings.
 */

export const useNetworkStatus = (): boolean => {

  //////////////////////////////////////////////////////
  // INITIAL STATE
  //////////////////////////////////////////////////////

  const getInitialStatus = () => {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  };

  const [isOnline, setIsOnline] = useState<boolean>(getInitialStatus);

  //////////////////////////////////////////////////////
  // LISTEN FOR NETWORK CHANGES
  //////////////////////////////////////////////////////

  useEffect(() => {

    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    //////////////////////////////////////////////////////
    // CLEANUP
    //////////////////////////////////////////////////////

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };

  }, []);

  //////////////////////////////////////////////////////
  // RETURN STATUS
  //////////////////////////////////////////////////////

  return isOnline;

};