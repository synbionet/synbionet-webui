# SynBioNet Web Client

To test:

1. run `docker build -t anvil_node .` to build ethereum test node docker image

2. after image build completes, run test node with `docker run -d -p 8545:8545 anvil_node`

   **_allow a few seconds for contracts to deploy before starting webui, otherwise contract addresses my be impacted_**

3. Launch the indexer from the synbionet-indexer repo by navigating to the project folder andusing 'make run'.

   **_will add this step to docker build in future_**

4. Install dependencies with `npm install && npm update`

   **_if experiencing any issues after spinning up, try deleting node_modules folder and running npm install again_**

5. Run with `npm start` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

6. Ensure that your wallet is connected to your local anvil node that was spun up in step 1. You will likely have to add a new network in your wallet client with the following configuration:

   - rpc url: http://localhost:8545/
   - chain id: 31337

7. Connect with a pre-funded wallet so you can pay for transactions. You can import the following private key into your wallet client:

   - 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

   **_When testing locally and restarting the anvil test node, you will need to reset the nonce information of the account to ensure transactions go through correctly. You can do this with "Clear wallet transaction and nonce information" in brave wallet or "reset account" in metamask_**

8. After you're connected, navigate to the "portfolio" page to buy and sell bioTokens.
