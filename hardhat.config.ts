import dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';

// Load environment variables from the `.env.local` file
dotenv.config({ path: './.env.local' });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    kovan: {
      url: process.env.KOVAN_ENDPOINT || '',
      accounts: process.env.KOVAN_PRIVATE_KEY ? [process.env.KOVAN_PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
  paths: {
    sources: './src',
    tests: './src/tests',
  },
  typechain: {
    outDir: './src/types/contracts',
  },
};

export default config;
