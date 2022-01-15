import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next dApp</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Dapp template powered by Next.js, TypeScript and Hardhat"
        />
        <meta
          name="keywords"
          content="nextjs, solidity, smart, contracts, blockchain, ethereum, hardhat, typescript, tailwind"
        />
        <meta property="og:title" content="Create Next dApp" />
        <meta property="og:url" content="https://create-next-dapp.vercel.app/" />
        <meta
          property="og:description"
          content="Dapp template powered by Next.js, TypeScript and Hardhat"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nextjs.org/static/twitter-cards/home.jpg" />
        <meta property="og:image:alt" content="Create Next dApp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
