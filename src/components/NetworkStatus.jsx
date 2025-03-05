import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      dispatch(addNotification({
        type: 'success',
        message: 'Back online',
        duration: 3000
      }));
    };

    const handleOffline = () => {
      setIsOnline(false);
      dispatch(addNotification({
        type: 'error',
        message: 'No internet connection',
        duration: null
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      Offline Mode
    </div>
  );
}