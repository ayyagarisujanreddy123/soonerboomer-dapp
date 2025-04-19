require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("RPC URL:", process.env.SEPOLIA_RPC_URL);
console.log("Private Key:", process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
