/*
  Author: Jetso Analin (https://github.com/jetsoanalin)
*/

// Importing all the required packages
const ethers = require('ethers');
const ganache = require('ganache-cli');
const assert = require('assert');


// Library initialization that will talk with Blockchain
const provider = new ethers.providers.Web3Provider(ganache.provider({ gasLimit: 8000000 }));

// Initializing the build files
const basiccontractJSON = require('../build/basic_MyContract.json');

let accounts, basiccontractInstance;

// Describing the 1st Test
// This will setup Ganache with some test address
describe('Ganache Setup', async() => {

  it('Ganache setup with Test Accounts', async() => {

    // List of accounts are fetched here
    accounts = await provider.listAccounts();

    // We will check that atleast 2 accounts are loaded
    assert.ok(accounts.length >= 1, '2 Accounts are present minimum');
  });
});

// 2nd Test starts here
describe('Basic Contract Testing', () => {

  // Describing a SubTest case
  describe('Setting up the contract', async() => {

    // 1st Test case for the SubTest case
    it('This Deploys Basic Smart contract from 1st account with no Parameters/Constructor', async() => {

      // Creating a contract factory for deploying contract. 
      const basiccontract = new ethers.ContractFactory(
        basiccontractJSON.abi,
        basiccontractJSON.evm.bytecode.object,
        provider.getSigner(accounts[0])
      );
      basiccontractInstance =  await basiccontract.deploy();

      assert.ok(basiccontractInstance.address, 'conract address should be present');
    });

    // Initializing 2nd SubTest 
    it('Since no value is deployed in start it should return none', async() => {

      // Get the value using the function defined in contract
      const currentValue = await basiccontractInstance.functions.get();

      // Compare the empty value and see if it matches
      assert.equal(
        currentValue,
        '',
        'No value will be visible'
      );
    });
  });

  // Describing the 3rd Test case
  describe('Checking the function in Contract', async() => {

    // Initializing the 1st sub test 
    it('This should add new value to the Contract and it will match with the compared value', async() => {

      // This will send the value to local ganache blockchain
      const tx = await basiccontractInstance.functions.set('India');

      // Transfer confirmation
      await tx.wait();

      // Getting the set value in ganache blockchain
      const currentValue = await basiccontractInstance.functions.get();

      // Comparing the set value to confirm
      assert.equal(
        currentValue,
        'India',
        'value set must be able to get'
      );
    });
  });


   // Describing the 4th Test case
   describe('Checking the function in Contract but in Wrong way', async() => {

    // Initializing the 1st sub test 
    it('This should add new value to the Contract but it will not match with the compared value', async() => {

      // This will send the value to local ganache blockchain
      const tx = await basiccontractInstance.functions.set('Jetso');

      // Transfer confirmation
      await tx.wait();

      // Getting the set value in ganache blockchain
      const currentValue = await basiccontractInstance.functions.get();

      // Comparing the set value to confirm
      assert.notEqual(
        currentValue,
        'India',
        'Value should not be matching'
      );
    });
  });


});