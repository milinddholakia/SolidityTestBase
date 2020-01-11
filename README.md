<h1 align="center">SOLIDITY SMART CONTRACT TESTING BASE FILE TEMPLATE</h1>
<center>

## Steps for Testing

Step 1 :
`git clone https://github.com/jetsoanalin/SolidityTestBase.git`

Step 2 :
`cd SolidityTestBase`

Step 3 :
`npm i`

Step 5
`npm run test` 

#### If you want to Deploy it in Blockchain testnet rather than Ganache then Follow these steps :

Deploy Networks : `rinkeby` or `kovan` using the `deploy.js` script. Do `node deploy.js deployall <network-name> <private-key>`.
Eg : `node deploy.js deployall rinkeby 0xf67ea7b3f291950cd29559f56d54ba46ba1dc5072c6747c09d4d64f456f76798`. 

Note : The Deploying wallet should have enough Ether balance in it if not use online faucets to get some test ethers.

## Using Template file 

Step 1 :
Signin to your Github Account.

Step 2 :
Click here : https://github.com/Jetsoanalin/SolidityTestBase/generate and create a new Repository.

Step 3 :
Clone the project and start modifying it.

Step 4 :
Delete `basic.sol` from `contracts` folder. Create your smart contract file with it's appropriate name, e.g. `bank.sol`. 
This file uses 0.5.16 version of solidity `pragma solidity 0.5.16`.

Step 5 :
Compile the Contract `node compile.js` the JSON file will be generated in build file.

Step 6 :
Go to `test` folder Change the file name `basic.test.js` to your contract specific name eg: `bank.test.js`

Step 7 :
Wtite your own test in `basic.test.js` 

Step 8 :
`npm run test` this will compile and run your tests.

## Steps to deploy contract
- You can test deployment on testnets like `rinkeby` or `kovan`. For deployment on mainnet use `homestead`, the process would be same as testnet, the deployment time might vary on different networks.

- To deploy all compiled contracts, do `node deploy.js deployall rinkeby 0xa6779f54dc1e9959b81f448769450b97a9fcb2b41c53d4b2ab50e5055a170ce7`.

- To deploy a specific contract, write it's JSON file name instead of deployall flag, e.g. `node deploy.js SimpleStorage_0.json rinkeby 0xa6779f54dc1e9959b81f448769450b97a9fcb2b41c53d4b2ab50e5055a170ce7`.

- If the contract requires constructor arguments, you can pass it by adding them after the command, e.g. `node deploy.js SimpleStorage_0.json rinkeby 0xa6779f54dc1e9959b81f448769450b97a9fcb2b41c53d4b2ab50e5055a170ce7 "Params"`.

## Credits
- Forked and Modified from : https://github.com/zemse/smart-solidity-template/
- This project uses `ethers.js` library in the tests. You can find docs at https://docs.ethers.io/ethers.js/html/. If you wish to use `web3.js` instead, you can do it by uninstalling `ethers.js` using `npm uninstall ethers`, then you can install `web3.js` using `npm i web3`. And then change the tests files.
