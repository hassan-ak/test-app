import { ethers } from 'ethers';
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'

export default function Home() {
  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
  async function signup(data: FormData) {
    'use server';

    console.log('Full Name: ' + data.get('fullname'));
    console.log('Email: ' + data.get('email'));
    console.log('Password: ' + data.get('password'));
    console.log('Conform Password: ' + data.get('confirm_password'));

    // the Wallet class represents an Ethereum account and is used to sign transactions.
    const randomwallet = ethers.Wallet.createRandom();
    console.log('address:', randomwallet.address);
    console.log('mnemonic:', randomwallet.mnemonic?.phrase);
    console.log('privateKey:', randomwallet.privateKey);

    // create an Ethereum signer that will be used to sign transactions.
    // It takes two parameters: projectId and owner.
    // The projectId is the ID of the ZeroDev project,
    // and the owner is the Ethereum Wallet object created earlier.
    const signer = await getZeroDevSigner({
      projectId: '30a4ab5f-bb48-47e5-9e7d-ecceea467c7d',
      owner: getPrivateKeyOwner(randomwallet.privateKey),
    });
      let aaWallet = await signer.getAddress();
      console.log("Account Abstraction Wallet: " + aaWallet);
    // // Now we can store all the data in the database
  }
  return (
    <div className='flex flex-col min-h-screen bg-grey-lighter'>
      <div className='container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto'>
        <div className='w-full px-6 py-8 text-black bg-white rounded shadow-md'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <form action={signup}>
            <input
              type='text'
              className='block w-full p-3 mb-4 border rounded border-grey-light'
              name='fullname'
              placeholder='Full Name'
            />
            <input
              type='text'
              className='block w-full p-3 mb-4 border rounded border-grey-light'
              name='email'
              placeholder='Email'
            />
            <input
              type='password'
              className='block w-full p-3 mb-4 border rounded border-grey-light'
              name='password'
              placeholder='Password'
            />
            <input
              type='password'
              className='block w-full p-3 mb-4 border rounded border-grey-light'
              name='confirm_password'
              placeholder='Confirm Password'
            />
            <button
              type='submit'
              className='w-full py-3 my-1 text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:outline-none'
            >
              Create Account
            </button>
          </form>

          <div className='mt-4 text-sm text-center text-grey-dark'>
            By signing up, you agree to the
            <a
              className='no-underline border-b border-grey-dark text-grey-dark'
              href='#'
            >
              Terms of Service
            </a>{' '}
            and
            <a
              className='no-underline border-b border-grey-dark text-grey-dark'
              href='#'
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='mt-6 text-grey-dark'>
          Already have an account?
          <a
            className='no-underline border-b border-blue text-blue'
            href='../login/'
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}
