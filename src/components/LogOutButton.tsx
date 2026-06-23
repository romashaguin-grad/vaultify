/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

/**
 * Custom modules
 */
import { account } from '@/lib/appwrite';

/**
 * Components
 */
import { Button } from '@/components/ui/button';

export const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });

      toast.success('Signed out successfully');
      navigate('/', { viewTransition: true });
    } catch (err) {
      console.error(err);
      toast.error('Failed to sign out');
    }
  }, []);

  return (
    <Button
      color='secondary'
      onClick={handleLogout}
    >
      Sign out
    </Button>
  );
};
