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
const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  // Handle error
  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Password reset email sent! Check your inbox.');
      form.reset();
    } else {
      toast.error(fetcher.data.error ?? 'Something went wrong');
    }
  }, [fetcher.data, form]);

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
          <CardTitle className='text-xl'>Forgot password?</CardTitle>

          <CardDescription>
            No worries, we'll send you reset instructions.
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Enter your email'
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
                  Send reset email
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
