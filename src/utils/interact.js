
import Web3 from "web3";
const web3 = new Web3(window.ethereum);
const contractABI = require('../contract-abi.json')
const contractAddress = '0xd2d28013E97161cb58bfD36643cC93a3E137ec37'

export const connectWallet = async () => {
  if (window.ethereum) {
    const chainId = 56 // 3 for ropsten, 4 for rinkeby, 1 for mainnet
    // switch to chainId
    let account;
    try{
      await window.ethereum.send('eth_requestAccounts')
    .then(acc=>{
      account = acc;
    })
    }
    catch(err){
      return{
        message: 'Connect wallet',
        status:false
      }
    }
    let useraddress = account.result[0];
    let current_chainId = await web3.eth.getChainId()
    if (current_chainId !== chainId) {
      try{
         await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(chainId) }],
        })
        return{
          address: useraddress,
          message: 'Connected: '+String(useraddress).substring(0, 6) +
          '...' +
          String(useraddress).substring(38),
          status:true
        }
      }
      catch(err){
        
        return{
          address:'',
          message: 'switch network',
          status: false
        }
      }
        
         
    }
    else
        return {
          address: useraddress,
          message: 'Connected: '+String(useraddress).substring(0, 6) +
          '...' +
          String(useraddress).substring(38),
          status:true
        }
  } 
  else {
    return {
      address: '',
      message: 'please install metamask',
      status:false
    }
  }
}


export const buyToad = async (
  Toad,refer
) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();
  const amountToSend = web3.utils.toBN(parseInt(Toad* 1e18))
  //console.log(refer)
  let txHash = 'still pending'
  if (!refer) 
    refer = window.ethereum.selectedAddress;
  try{
    await web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      to: contractAddress,
      value: amountToSend,
      data: window.contract.methods
        .buyEggs(
          refer
        )
        .encodeABI(),
    })

    .then(function (receipt) {
      ////console.log('state 2')
      txHash =
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash +
        '">https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash
    })
    return {
      success: true,
      address:
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        txHash +
        '">https://ropsten.etherscan.io/tx/' +
        txHash,
    }
  }
  //getOwnerOfHarberger
  
catch(error){
  //console.log(error)
  return {
    success: false,
    status: '😥 Something went wrong: ' + error.message,
  }
}
}
export const sellToad = async (
) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();
  let txHash = "pending"
  try{
    await web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      to: contractAddress,
      data: window.contract.methods
        .sellEggs(
        )
        .encodeABI(),
    })

    .then(function (receipt) {
      ////console.log('state 2')
      txHash =
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash +
        '">https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash
    })
    return {
      success: true,
      address:
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        txHash +
        '">https://ropsten.etherscan.io/tx/' +
        txHash,
    }
  }
  catch(error){
    return {
      success: false,
      address: '😥 Something went wrong: ' + error.message,
    }
  }
}
export const compoundToad = async (
  refer
) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();
  if (!refer) 
    refer = window.ethereum.selectedAddress;
  let txHash = "pending"
  try{
    await web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      to: contractAddress,
      data: window.contract.methods
        .hatchEggs(
          refer
        )
        .encodeABI(),
    })

    .then(function (receipt) {
      ////console.log('state 2')
      txHash =
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash +
        '">https://ropsten.etherscan.io/tx/' +
        receipt.transactionHash
    })
    return {
      success: true,
      address:
        '✅ Check out your transaction on Etherscan: <a href="https://ropsten.etherscan.io/tx/' +
        txHash +
        '">https://ropsten.etherscan.io/tx/' +
        txHash,
    }
  }
  catch(error){
    //console.log(error)
    return {
      success: false,
      address: '😥 Something went wrong: ' + error.message,
    }
  }
}

export const getBallance = async () => {
  //load smart contract
  
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();
  var rewards;var eggs;var contractBalance;var balance;

  if (window.ethereum){
    //console.log(window.ethereum.selectedAddress)
  try{
    balance = await web3.eth.getBalance(window.ethereum.selectedAddress)
    //console.log(balance)
    debugger
  } catch(error){
    //console.log(error)
    balance = 0.00000000000000001 ;
    debugger
  }

  try {
    contractBalance = await window.contract.methods.getBalance().call()
    //console.log(contractBalance, "contractBalance")
    }
    catch(err){
      contractBalance = 0.0001;
    }
    //console.log(window.ethereum.selectedAddress)
  try {
      eggs = await window.contract.methods.getMyEggs(window.ethereum.selectedAddress).call()
      
      if (eggs == 0)
      {
        rewards = 0;
      }
      else{
        rewards = await window.contract.methods.beanRewards(window.ethereum.selectedAddress).call()
        
      }
      //console.log(eggs, "eggssssss")
    }
    catch(err){
      //console.log(err)
      
      eggs = 0.;
      rewards = 0;
    }
  }

  return {
    success:true,
    balance: parseFloat(balance/1e18),
    reward: parseFloat(rewards/1e18),
    eggs : parseFloat(eggs/1e3),
    contractBalance : parseFloat(contractBalance/1e18)
  }
}

