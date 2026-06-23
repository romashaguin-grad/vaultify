/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useCallback, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';
import { handleOAuthLogin } from '@/lib/auth';

/**
 * Components
 */
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

/**
 * Assets
 */
import { GoogleLogo } from '@/assets/logo/google';
import { Loader2Icon } from 'lucide-react';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Form schema
 */
const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  // Handle error
  useEffect(() => {
    const error = fetcher.data?.error;

    if (error) {
      toast.error(error.message);
    }
  }, [fetcher.data]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      fetcher.submit(values, {
        method: 'post',
        encType: 'application/json',
      });
    },
    [],
  );

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back!</CardTitle>

          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-6'
            >
              <div className='flex flex-col gap-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={handleOAuthLogin}
                >
                  <GoogleLogo colorful />
                  Continue with Google
                </Button>
              </div>

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          type='email'
                          placeholder='john@example.com'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center'>
                        <FormLabel>Password</FormLabel>

                        <Link
                          to='/auth/forgot-password'
                          className='ml-auto text-sm underline-offset-4 hover:underline'
                          viewTransition
                        >
                          Forgot your password?
                        </Link>
                      </div>

                      <FormControl>
                        <Input
                          type='password'
                          placeholder='••••••••'
                          className='tracking-wider'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className='animate-spin' />}
                  Login
                </Button>
              </div>

              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link
                  to='/auth/signup'
                  className='underline underline-offset-4'
                  viewTransition
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
};
