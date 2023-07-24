# SynBioNet Web Client

## Requirements

- Docker (download [here](https://docs.docker.com/get-docker/))
- npm (download [here](https://nodejs.org/en/download))

## Running Locally

<!-- 1. Build the local anvil ethereum node for testing by executing `make anvil_build`

2. Run the local anvil ethereum node by executing `make anvil_start`

> **NOTE:** allow approximately 30s for deploy script to run before interacting with the contracts. -->

1. Spin up backend from [synbionet-demo-backend repo](https://github.com/synbionet/synbionet-demo-backend).

2. Install dependencies with `npm install`

3. Load fair-exchange contracts and pre-fund accounts with `node loadState.js`

4. Run with `npm run dev` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. Import pre-funded accounts to your wallet so you can pay for transactions. You can import the following private keys into your wallet client. Switch between accounts to simulate different users of the bionet.

   - `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
   - `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`
   - `0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6`

**_When testing locally and restarting the anvil test node, you will need to reset the nonce information of the account to ensure transactions go through correctly. You can do this with "Clear wallet transaction and nonce information" in brave wallet or "reset account" in metamask_**
