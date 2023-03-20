# SynBioNet Web Client

## Requirements

- Foundry (download [here](https://book.getfoundry.sh/getting-started/installation))
- npm (download [here](https://nodejs.org/en/download))

## Running Locally

**_docker build coming soon_**

1. launch a local anvil node by executing `anvil`

2. Deploy the fair-exchange contracts from the from the fair-exchange repo [https://github.com/synbionet/fair-exchange](https://github.com/synbionet/fair-exchange) by navigating to the project folder and executing `make deploy`.

3. Only after deploying the fair-exchange contracts, deploy the core contracts from the from the synbionet-core repo [https://github.com/synbionet/synbionet-core](https://github.com/synbionet/synbionet-core) by navigating to the project folder and executing `make deploy`.

4. Launch the indexer from the synbionet-indexer repo [https://github.com/synbionet/synbionet-indexer](https://github.com/synbionet/synbionet-indexer) by navigating to the project folder and executing `make run`.

5. Install dependencies with `npm install`

6. Run with `npm start` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

7. When connecting your wallet to the web app, you should be prompted to switch to the anvil node test network that was spun up in step one. If you experience any issues, you will likely have to add a new network in your wallet client with the following configuration:

   - rpc url: http://localhost:8545/
   - chain id: 31337

8. Import pre-funded accounts to your wallet so you can pay for transactions. You can import the following private keys into your wallet client. Switch between accounts to simulate different users of the bionet.

   - 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
   - 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

   **_When testing locally and restarting the anvil test node, you will need to reset the nonce information of the account to ensure transactions go through correctly. You can do this with "Clear wallet transaction and nonce information" in brave wallet or "reset account" in metamask_**

9. Experiment
