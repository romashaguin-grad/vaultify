/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Link } from 'react-router';
import { LoginForm } from '@/components/LoginForm';

/**
 * Assets
 */
import { Logo } from '@/assets/logo';

export const Login = () => {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2 self-center font-medium'
          viewTransition
        >
          <div className='flex size-6 items-center justify-center'>
            <Logo variant='icon' />
          </div>
          Vaultify
        </Link>

        <p className='text-center text-sm text-muted-foreground'> Store, organize, and generate files with AI. </p>

        <LoginForm />
      </div>
    </div>
  );
};
