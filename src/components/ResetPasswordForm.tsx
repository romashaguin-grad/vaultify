/**
 * @copyright 2026 Romasha Guin
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useCallback, useEffect } from 'react';
import { useFetcher, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

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
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Form schema
 */
const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  });

export const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();

  // Get userId & secret from query string
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  // Handle error
  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Password has been reset successfully!');
      form.reset();
    } else {
      toast.error(fetcher.data.error ?? 'Failed to reset password');
    }
  }, [fetcher.data, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      fetcher.submit(
        {
          ...values,
          userId,
          secret,
        },
        {
          method: 'post',
          encType: 'application/json',
        },
      );
    },
    [userId, secret],
  );

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Set new password</CardTitle>

          <CardDescription>
            Your new password must be different to previously used passwords.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-6'
            >
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Set new password'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>

                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Confirm new password'
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
                  Reset password
                </Button>
              </div>

              <div className='text-center text-sm'>
                <Button
                  variant='link'
                  asChild
                >
                  <Link
                    to='/auth/login'
                    className='underline underline-offset-4'
                    viewTransition
                  >
                    <ArrowLeftIcon />
                    Back to login
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
