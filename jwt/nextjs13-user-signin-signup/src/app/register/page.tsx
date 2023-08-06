'use client';

import FormInput from '@/components/FormInput';
import {
  RegisterUserInput,
  RegisterUserSchema,
} from '@/lib/validations/user.schema';
import Link from 'next/link';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function Register() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  async function registerUser(credentials: RegisterUserInput) {
    const toastId = toast.loading('Registering new User');
    setIsDisabled(true);
    fetch(`${baseUrl}api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response.status === 'success') {
          reset()
          setIsRegistered(true);
          toast.success('Registered Successfuly');
        } else {
          toast.error('Registration Failed');
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('Registration Failed');
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    registerUser(values);
  };

  return (
    <div>
      {isRegistered ? (
        <div className='max-w-[300px] sm:max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5 border-2 border-blue-800 flex flex-col'>
          <p className='flex justify-center items-center gap-2'>
            <span>Successfuly Registered</span>
            <span>
              <Link href='/login' className='text-blue-600'>
                Login Here
              </Link>
            </span>
          </p>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='max-w-[300px] sm:max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5 border-2 border-blue-800 flex flex-col'
          >
            <FormInput label='Full Name' name='name' />
            <FormInput label='Email' name='email' type='email' />
            <FormInput label='Password' name='password' type='password' />
            <FormInput
              label='Confirm Password'
              name='passwordConfirm'
              type='password'
            />
            <p className='flex justify-center items-center gap-2'>
              <span>Already have an account?</span>
              <span>
                <Link href='/login' className='text-blue-600'>
                  Login Here
                </Link>
              </span>
            </p>
            <button disabled={isDisabled} className='bg-black text-white py-3 px-5 mx-auto rounded-md'>
              Register
            </button>
          </form>
        </FormProvider>
      )}
      <Toaster position='top-center' />
    </div>
  );
}
