import dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';

dotenv.config({ path: './.env.local' });

task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    kovan: {
      url: process.env.KOVAN_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './src',
    tests: './src/tests',
  },
  typechain: {
    outDir: './src/types',
  },
};

export default config;
