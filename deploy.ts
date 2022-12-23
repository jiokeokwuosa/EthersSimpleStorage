import {ethers} from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

/*
we will use solcjs to complile the contract.
before i deploy i need to compile first using yarn compile.
Ganache is like remix virtual machine(fake blockchain for testing)
we will use ethers to deploy the contract
*/
const main = async() => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider) // this takes wallet private key and blockchain provider
    
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying... please wait")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)// to wait for one block confirmation
    console.log(`contract address is ${contract.address}`)
    
    // get favourite Number
    const favouriteNumber = await contract.retrieve()
    console.log(`The current Favourite Number is ${favouriteNumber.toString()}`)
    // store favourite Number
    const transactionResponse = await contract.store("7")
    await transactionResponse.wait(1)
    // get updated favourite Number
    const updatedFavouriteNumber = await contract.retrieve()
    console.log(`The updated Favourite Number is ${updatedFavouriteNumber.toString()}`)
    
    
    
    // console.log('This is the transaction receipt')
    // console.log(transactionReceipt)// this returns the information about the deployed contract eg gas price used, contract address
    // console.log('This is the deployment transaction')
    // console.log(contract.deployTransaction)// this contains the transaction info like nonce(unique id for each transaction), chain id

    // console.log('lets deploy with only transaction data')
   
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //     nonce,
    //     gasPrice:20000000000,
    //     gasLimit:6721975,
    //     to:null,
    //     value:0,
    //     data:"0x60806040526040518060400160405280600281526020016040518060400160405280600581526020017f456d656b61000000000000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6108748061019f6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806377ec2b551161005b57806377ec2b55146100da578063a2f9eac6146100f9578063b2ac62ef1461012a578063bc832d4e1461015a5761007d565b80632e64cec11461008257806343ede4ae146100a05780636057361d146100be575b600080fd5b61008a610176565b604051610097919061062d565b60405180910390f35b6100a861017f565b6040516100b5919061062d565b60405180910390f35b6100d860048036038101906100d39190610514565b610185565b005b6100e261018f565b6040516100f0929190610648565b60405180910390f35b610113600480360381019061010e9190610514565b610229565b604051610121929190610648565b60405180910390f35b610144600480360381019061013f91906104cb565b6102e5565b604051610151919061062d565b60405180910390f35b610174600480360381019061016f9190610541565b610313565b005b60008054905090565b60005481565b8060008190555050565b60018060000154908060010180546101a690610741565b80601f01602080910402602001604051908101604052809291908181526020018280546101d290610741565b801561021f5780601f106101f45761010080835404028352916020019161021f565b820191906000526020600020905b81548152906001019060200180831161020257829003601f168201915b5050505050905082565b6003818154811061023957600080fd5b906000526020600020906002020160009150905080600001549080600101805461026290610741565b80601f016020809104026020016040519081016040528092919081815260200182805461028e90610741565b80156102db5780601f106102b0576101008083540402835291602001916102db565b820191906000526020600020905b8154815290600101906020018083116102be57829003601f168201915b5050505050905082565b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b816004826040516103249190610616565b9081526020016040518091039020819055506003604051806040016040528084815260200183815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061039c9291906103a3565b5050505050565b8280546103af90610741565b90600052602060002090601f0160209004810192826103d15760008555610418565b82601f106103ea57805160ff1916838001178555610418565b82800160010185558215610418579182015b828111156104175782518255916020019190600101906103fc565b5b5090506104259190610429565b5090565b5b8082111561044257600081600090555060010161042a565b5090565b60006104596104548461069d565b610678565b90508281526020810184848401111561047557610474610807565b5b6104808482856106ff565b509392505050565b600082601f83011261049d5761049c610802565b5b81356104ad848260208601610446565b91505092915050565b6000813590506104c581610827565b92915050565b6000602082840312156104e1576104e0610811565b5b600082013567ffffffffffffffff8111156104ff576104fe61080c565b5b61050b84828501610488565b91505092915050565b60006020828403121561052a57610529610811565b5b6000610538848285016104b6565b91505092915050565b6000806040838503121561055857610557610811565b5b6000610566858286016104b6565b925050602083013567ffffffffffffffff8111156105875761058661080c565b5b61059385828601610488565b9150509250929050565b60006105a8826106ce565b6105b281856106d9565b93506105c281856020860161070e565b6105cb81610816565b840191505092915050565b60006105e1826106ce565b6105eb81856106ea565b93506105fb81856020860161070e565b80840191505092915050565b610610816106f5565b82525050565b600061062282846105d6565b915081905092915050565b60006020820190506106426000830184610607565b92915050565b600060408201905061065d6000830185610607565b818103602083015261066f818461059d565b90509392505050565b6000610682610693565b905061068e8282610773565b919050565b6000604051905090565b600067ffffffffffffffff8211156106b8576106b76107d3565b5b6106c182610816565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561072c578082015181840152602081019050610711565b8381111561073b576000848401525b50505050565b6000600282049050600182168061075957607f821691505b6020821081141561076d5761076c6107a4565b5b50919050565b61077c82610816565b810181811067ffffffffffffffff8211171561079b5761079a6107d3565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610830816106f5565b811461083b57600080fd5b5056fea264697066735822122089d64f4f6b128b6704c67f50ff5422d952b2e79bda2dfa63efd31364000d4e2f64736f6c63430008070033",
    //     chainId:1337
    // } 
    // const sendTxResponse = await wallet.sendTransaction(tx)
    // await sendTxResponse.wait(1)
    // console.log(sendTxResponse)

}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error)
    process.exit(1)
})