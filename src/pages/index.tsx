import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/Button';
import { Greeter } from '@/types/contracts/Greeter';
import GreeterArtifact from '@/artifacts/Greeter.sol/Greeter.json';

const Home: NextPage = () => {
  const [newGreeting, setNewGreeting] = useState('');
  const [fetchedGreeting, setFetchedGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // We're going to use MetaMask as our provider to connect to the Ethereum network
  // Read more: https://docs.ethers.io/v5/getting-started/#getting-started--connecting
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  // Run network: npx hardhat node
  // Get contract's address: npx hardhat run src/scripts/deploy.ts --network localhost
  // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // Contract deployed to the Kovan network
  // If developing locally, use address commented above
  const contractAddress = '0x7D21bc56D7b35c60Dd31d91DEA54B1bEf136cf1d';

  const fetchGreeting = async () => {
    // Initialize a new instance of our Greeter contract using MetaMask as the provider
    // Local network needs to be up and running for this function to work
    const contract = new ethers.Contract(contractAddress, GreeterArtifact.abi, provider) as Greeter;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Call the `greet` method and update the UI with the response
      const greeting = await contract.greet();
      setFetchedGreeting(greeting);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const updateGreeting = async () => {
    // The `getSigner` method will return the account to be used to send the transaction
    const signer = provider?.getSigner();

    // Initialize our contract as before but with a `signer` as we'll be writing to the
    // blockchain. Write operations cost gas, so an account is needed to pay the fees
    const contract = new ethers.Contract(contractAddress, GreeterArtifact.abi, signer) as Greeter;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Send the transaction, wait until it's mined and refetch the greeting
      const setGreetingTx = await contract.setGreeting(newGreeting);
      await setGreetingTx.wait();
      await fetchGreeting();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }

    setNewGreeting('');
    setIsLoading(false);
  };

  useEffect(() => {
    // MetaMask injects a global API into websites visited by its users at window.ethereum.
    // This API allows websites to request users' Ethereum accounts, read data from blockchains
    // the user is connected to, and suggest that the user sign messages and transactions.
    // Read more: https://docs.metamask.io/guide/ethereum-provider.html

    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      setProvider(new ethers.providers.Web3Provider(window.ethereum as any));
    }
  }, []);

  return (
    <main className="h-screen text-center bg-yellow-300">
      <h1 className="text-4xl">create-next-dapp</h1>
      {!provider ? (
        <div>Please install the MetaMask extension to interact with the app.</div>
      ) : (
        <div className="inline-block w-96 p-6 mt-4 space-y-4 border-2 border-black rounded-lg">
          <h3>
            Greeting: <span>{fetchedGreeting || '?'}</span>
          </h3>
          <div className="flex">
            <label htmlFor="new-greeting">New Greeting:</label>
            <input
              type="text"
              id="new-greeting"
              value={newGreeting}
              placeholder="..."
              onChange={(event) => setNewGreeting(event.target.value)}
              className="px-1.5 ml-1 border border-yellow-400 rounded-md bg-transparent outline-none placeholder:text-black"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button label="Fetch Greeting" isLoading={isLoading} onClick={fetchGreeting} />
            <Button label="Update Greeting" isLoading={isLoading} onClick={updateGreeting} />
          </div>
          {errorMessage && <div className="text-red-600">Error: {errorMessage}</div>}
        </div>
      )}
    </main>
  );
};

export default Home;
