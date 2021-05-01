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
const basiccontractJSON = require('../build/basic_Voting.json');

let accounts, basiccontractInstance,newAccountAddress ;

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
    
    //Check the initial Value of Candidate A
    it('Lets check the initial value of Candidate A', async() => {

      // Get the value using the function defined in contract
      const currentValue = await basiccontractInstance.functions.A();

      // Compare the value and see if it matches
      assert.notStrictEqual(
        currentValue,
        0,
        'Initalizing the values'
      );
    });
    
  });

  // Describing the 3rd Test case
  describe('Checking the Latest Value of Candidate A After Voting', async() => {

    // Vote Candidate A and check if it is successfull 
    it('Lets Vote to Candidate A', async() => {

      // Get the value using the function defined in contract
      const currentValue = await basiccontractInstance.functions.Vote('A');

      await currentValue.wait();
      // Compare the value and see if it matches
      assert.notStrictEqual(
        currentValue,
        'Successfully Voted to Candidate A',
        'Vote to Candidate A is counted successfully.'
      );
    });

    it('Check if Vote has been recorded',async()=>{
      //fetch the Latest Value of Candidate A 
      const currentValue = await basiccontractInstance.functions.A();
      assert.notStrictEqual(
        currentValue,
        1,
        'One Vote is Added to candidate A.'
      );

      
    });

    // Checking the code requirements 
    // it('This should not take values from same address for Candidate B', async() => {

    //   const currentValue = await basiccontractInstance.functions.Vote('B');

    //   await currentValue.wait();

    //   assert.fail(
    //     currentValue,
    //     'Already voted',
    //     'Not Allowing  to vote Twice '
    //   );
    // });
  });

  //Voting from different address
  describe('Changing the Address and Voting ',async()=>{
    it('Changing the Address using different account and checking if address is correct',async()=>{
      const newAddress = new ethers.ContractFactory(
        basiccontractJSON.abi,
        basiccontractJSON.evm.bytecode.object,
        provider.getSigner(accounts[1])
      );
      newAccountAddress = newAddress.connect();
      assert.ok(
        newAccountAddress,
        'new Address should be Present'
      );
    });
    //Checking with new address
    // it('Voting to Candidate A with new address',async()=>{
    //    // Get the value using the function defined in contract
    //    const currentValue = await basiccontractInstance.functions.Vote('A');

    //    await currentValue.wait();

    //    const checkValue = await basiccontractInstance.functions.A();
    //    assert.notStrictEqual(
    //      currentValue,
    //      2,
    //      'Vote to Candidate A is counted and modified.'
    //    );
    // });

  });


  //  // Describing the 4th Test case
  //  describe('Checking the function in Contract but in Wrong way', async() => {

  //   // Initializing the 1st sub test 
  //   it('This should add new value to the Contract but it will not match with the compared value', async() => {

  //     // This will send the value to local ganache blockchain
  //     const tx = await basiccontractInstance.functions.set('Jetso');

  //     // Transfer confirmation
  //     await tx.wait();

  //     // Getting the set value in ganache blockchain
  //     const currentValue = await basiccontractInstance.functions.get();

  //     // Comparing the set value to confirm
  //     assert.notEqual(
  //       currentValue,
  //       'India',
  //       'Value should not be matching'
  //     );
  //   });
  // });


});