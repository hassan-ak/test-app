'use client';

import FormInput from '@/components/FormInput';
import {
  LoginUserInput,
  LoginUserSchema,
} from '@/lib/validations/user.schema';
import Link from 'next/link';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Register() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  async function registerUser(credentials: LoginUserInput) {
    const toastId = toast.loading('Loging in');
    setIsDisabled(true);
    fetch(`${baseUrl}api/auth/login`, {
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
          toast.success('Loged-In');
          setIsLogged(true)
          router.push("/");
        } else {
          toast.error('Login Failed');
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('Login Failed');
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    registerUser(values);
  };

  return (
    <div>
      {isLogged ? (
        <div className='max-w-[300px] sm:max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5 border-2 border-blue-800 flex flex-col'>
          <p className='flex justify-center items-center gap-2'>
            <span>Successfuly Loged-in</span>
            <span>
              <span className='text-blue-600'>
                Please Wait!
              </span>
            </span>
          </p>
        </div>
      ) : (

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='max-w-[300px] sm:max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5 border-2 border-blue-800 flex flex-col'
          >
            <FormInput label='Email' name='email' type='email' />
            <FormInput label='Password' name='password' type='password' />
            <p className='flex justify-center items-center gap-2'>
              <span>Don&#39;t have an account?</span>
              <span>
                <Link href='/register' className='text-blue-600'>
                  Register Here
                </Link>
              </span>
            </p>
            <button disabled={isDisabled} className='bg-blue-400 text-black py-3 px-5 mx-auto rounded-md'>
              Login
            </button>
          </form>
        </FormProvider>
      )}
      <Toaster position='top-center' />
    </div>
  );
}
