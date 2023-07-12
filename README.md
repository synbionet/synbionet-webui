# SynBioNet Web Client

## Requirements

- Docker (download [here](https://docs.docker.com/get-docker/))
- npm (download [here](https://nodejs.org/en/download))

## Running Locally

1. Build the local anvil ethereum node for testing by executing `make anvil_build`

2. Run the local anvil ethereum node by executing `make anvil_start`

> **NOTE:** allow approximately 30s for deploy script to run before interacting with the contracts.

3. Install dependencies with `npm install`

4. Run with `npm run dev` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. Import pre-funded accounts to your wallet so you can pay for transactions. You can import the following private keys into your wallet client. Switch between accounts to simulate different users of the bionet.

   - 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
   - 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

   **_When testing locally and restarting the anvil test node, you will need to reset the nonce information of the account to ensure transactions go through correctly. You can do this with "Clear wallet transaction and nonce information" in brave wallet or "reset account" in metamask_**
