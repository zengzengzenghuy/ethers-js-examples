const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)
// create a wallet using private key
// The Wallet class inherits Signer and can sign transactions and messages using a private key as a standard Externally Owned Account (EOA).
// wallet can use function from Signer abstract class
// https://docs.ethers.org/v5/api/signer/#Wallet

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = ''
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()  // wait for tx to be mined

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()

// Another way to write to contract
// using Metamask
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const contract = new ethers.Contract(address,abi,provider.getSigner());    // pop up Metamask to sign tx

// const result =  await contract.functionName(parameter)  // calling contract with the signer that connected to Metamask