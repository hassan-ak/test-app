'use client';
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk';
import { useMemo, useState } from 'react';
import { ZeroDevWeb3AuthWithModal } from '@zerodevapp/web3auth';

export default function RpcProviderExample() {
  // State management for address and loading
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * setWallet function that creates a zerodev signer based on project id
   * it uses provider as the owner
   */
  const setWallet = async (provider: any) => {
    const signer = await getZeroDevSigner({
      projectId: '30a4ab5f-bb48-47e5-9e7d-ecceea467c7d',
      owner: await getRPCProviderOwner(provider),
    });
    setAddress(await signer.getAddress());
  };

  /*
   * a function that only executed once due to useMemo and retains the results
   * new instance of ZeroDevWeb3AuthWithModal is created based on project id from zerodev dashboard
   * it handles Web3 authentication with a modal (a user interface element that typically appears as a popup) in the ZeroDev ecosystem.
   * whan user connects to a wallet successfully using ZeroDevWeb3AuthWithModal it calls setWallet function with provider
   */
  const zeroDevWeb3Auth = useMemo(() => {
    const instance = new ZeroDevWeb3AuthWithModal([
      '30a4ab5f-bb48-47e5-9e7d-ecceea467c7d',
    ]);
    instance.init({
      onConnect: async () => {
        console.log('Console Provider', zeroDevWeb3Auth.provider);
        console.log("I'm connected");
        setLoading(true);
        setWallet(zeroDevWeb3Auth.provider);
        setLoading(false);
      },
    });
    return instance;
  }, []);

  /**
   * function to logout from account
   */
  const disconnect = async () => {
    await zeroDevWeb3Auth.logout();
    setAddress('');
  };

  /*
   * Function to handle create wallte functionality
   * set laoding to true
   * call zeroDevWeb3Auth function with social login option and on success calls setwallet function
   * finally sets loading to false
   */
  const handleClick = async () => {
    setLoading(true);
    zeroDevWeb3Auth
      .connect('social')
      .then((provider: any) => {
        setWallet(provider);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //  will evaluate to true if address is a non-empty string otherwise false
  const connected = !!address;
  return (
    /*
     * When wallet is connected
     *    display wallet address
     *    display disconnect button  connected to disconnect function
     * When wallet is not connected
     *    dipslay create wallet button or loading state based on loading variable
     *    create wallte button is connected to create wallet function
     */
    <div>
      {connected && (
        <div>
          <label>Wallet: {address}</label>
        </div>
      )}
      <div>
        {!connected && (
          <button onClick={handleClick} disabled={loading}>
            {loading ? 'loading...' : 'Create Wallet'}
          </button>
        )}
        {connected && (
          <button onClick={disconnect} disabled={loading}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
