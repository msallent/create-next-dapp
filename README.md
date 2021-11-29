**`create-next-dapp`** is a template repository to quickly spin up a dapp with Next.js and Hardhat. TypeScript, along other development libraries such as ESLint, Prettier, husky, solhint and lint-staged are all already installed and set up.

Following Hardhat's recommendations, Ethers is used to interact with our contracts, and Mocha, along Chai and Waffle are used for testing.

For styling the frontend, nothing comes installed by default, giving freedom to the user to choose what they prefer.

## 🚀 Quick start

Start by installing dependencies:

```bash
npm install
```

Start the JSON-RPC server so that we can deploy the contract and connect to MetaMask:

```bash
npx hardhat node
```

Open a new terminal and deploy the contract. Save the address it deployed to as it'll be needed to interact with the contract from within `src/pages/index.tsx`

```bash
npx hardhat run --network localhost src/scripts/deploy.ts
```

Finally, run the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Learn More

To learn more about the libraries used, take a look at the following resources:

- [Next.js](https://nextjs.org/docs) - learn about Next.js features and API.
- [Hardhat](https://hardhat.org/getting-started/) - ethereum development environment.
- [Ethers](https://docs.ethers.io/v5/) - make your app interact with the ethereum blockchain and its ecosystem.
- [TypeScript](https://www.typescriptlang.org/docs/) - strongly typed version of JavaScript.
