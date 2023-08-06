'use client';
import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  const loggedIn = document.cookie.includes('logged-in=true');
  console.log(loggedIn);
  return (
    <div className='w-full flex bg-white p-5 sm:p-8 shadow-md items-center justify-between z-50'>
      <Link href='/' className='text-2xl font-bold text-blue-500'>
        JWT
      </Link>
      <div className='inline-flex sm:gap-8 gap-5'>
        <Link
          href='/'
          className='text-base font-normal text-black hover:font-medium hover:text-blue-300'
        >
          Home
        </Link>
        <Link
          href={loggedIn ? '/profile' : '/register'}
          className='text-base font-normal text-black hover:font-medium hover:text-blue-300'
        >
          {loggedIn ? 'Profile' : 'Register'}
        </Link>
        {loggedIn ? (
          <button className='text-base font-normal text-red-700 hover:font-medium hover:text-red-900'>
            Logout
          </button>
        ) : (
          <Link
            href='/login'
            className='text-base font-normal text-black hover:font-medium hover:text-blue-300'
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
