'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {createAccount, login} from '@/lib/actions/user-actions';
import {AuthFormData, authFormSchema} from '@/lib/schema/auth-form';
import {AuthFormType} from '@/types';

import OTPModal from './otp-modal';

interface AuthFormProps {
  type: AuthFormType;
}

const AuthForm = ({type}: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountID, setAccountID] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<AuthFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: ''
    }
  });

  const onSubmit = async (values: AuthFormData) => {
    setIsLoading(true);

    try {
      const user =
        type === 'register'
          ? await createAccount({
              fullName: values.fullName ?? '',
              email: values.email
            })
          : await login({
              email: values.email
            });

      setAccountID(user ? user.accountID : null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create account. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='auth-form'>
          <h1 className='h1 form-title'>
            {type === 'register' ? 'Create Account' : 'Login'}
          </h1>

          {type === 'register' && (
            <FormField
              control={form.control}
              name='fullName'
              render={({field}) => (
                <FormItem>
                  <div className='form-item'>
                    <FormLabel className='form-label body-2'>
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your full name'
                        {...field}
                        className='form-input body-2'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='form-message body-2' />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
                <div className='form-item'>
                  <FormLabel className='form-label body-2'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      {...field}
                      className='form-input body-2'
                    />
                  </FormControl>
                </div>
                <FormMessage className='form-message body-2' />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='button submit-button h-16'
            disabled={isLoading}>
            {type === 'register' ? 'Create Account' : 'Login'}

            {isLoading && (
              <Image
                src='/icons/loader.svg'
                alt='loader'
                width={24}
                height={24}
                className='ml-2 animate-spin'
              />
            )}
          </Button>

          <div className='body-2 flex items-center justify-center gap-1'>
            <p className='text-gray-400'>
              {type === 'register'
                ? 'Already have an account?'
                : "Don't have an account?"}
            </p>
            <Link
              href={type === 'register' ? '/login' : '/register'}
              className='text-brand font-medium'>
              {type === 'register' ? 'Login' : 'Create Account'}
            </Link>
          </div>
        </form>
      </Form>

      {accountID && (
        <OTPModal accountID={accountID} email={form.getValues('email')} />
      )}
    </>
  );
};

export default AuthForm;
