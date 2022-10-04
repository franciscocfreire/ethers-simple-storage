// synchronous [solidity]
// asynchro

const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // solc can do
  // compile them in our code
  // compile them separetly
  // http://127.0.0.1:8545

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "43d9c9db247a79d288ac11c793cfcb702aa9ae6c26c12083d689f7ae10287b13",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Here is deployment transaction: ")
  console.log(contract.deployTransaction);
  console.log("Here is the transaction receipt: ")
  console.log(transactionReceipt);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
