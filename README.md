# SynBioNet Web Client

To Stand Up:

1. run `docker build -t anvil_node .` to build ethereum test node docker image

2. after image build completes, run test node with `docker run -d -p 8545:8545 anvil_node`

   **_allow a few seconds for contracts to deploy before starting webui, otherwise contract addresses my be impacted_**

3. Launch the indexer from the synbionet-indexer repo [https://github.com/synbionet/synbionet-indexer](https://github.com/synbionet/synbionet-indexer) by navigating to the project folder and executing `make run`.

   **_will add this step to docker build in future_**

4. Install dependencies with `npm install`

   **_if experiencing any issues after spinning up, try deleting node_modules folder and package-lock.json and running npm install again_**

5. Run with `npm start` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

6. When connecting your wallet to the web app, you should be prompted to switch to the anvil node test network that was spun up in step one. If you experience any issues, you will likely have to add a new network in your wallet client with the following configuration:

   - rpc url: http://localhost:8545/
   - chain id: 31337

7. Import pre-funded accounts to your wallet so you can pay for transactions. You can import the following private keys into your wallet client. Switch between accounts to simulate different users of the bionet.

   - 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
   - 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

   **_When testing locally and restarting the anvil test node, you will need to reset the nonce information of the account to ensure transactions go through correctly. You can do this with "Clear wallet transaction and nonce information" in brave wallet or "reset account" in metamask_**

8. Experiment
