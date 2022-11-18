# SynBioNet Web Client

To test:

1. Follow README in synbionet-api project folder to make sure API is hooked up correctly and passing tests.

2. Make sure this project folder is in same directiory level as synbionet-api project folder because npm installs relative path "../synbionet-api" as a dependency

3. Install dependencies with `npm install`

4. Run with `npm start` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. Ensure that your wallet is connected to your local anvil node that was spun up in step 1. You will likely have to add a new network in your wallet client with the following configuration:

   - rpc url: http://localhost:8545/
   - chain id: 31337

6. Connect with a pre-funded wallet so you can pay for transactions. You can import the following private key into your wallet client:

   - 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

7. After you're connected, navigate to the "portfolio" page to buy and sell bioTokens.
