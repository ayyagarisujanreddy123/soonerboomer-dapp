// Load environment variables from .env file
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// Optional: Safe log to confirm loading without revealing secrets
console.log("RPC URL loaded:", !!process.env.SEPOLIA_RPC_URL);
console.log("Private key loaded:", !!process.env.PRIVATE_KEY);

// Validate required environment variables
if (!process.env.SEPOLIA_RPC_URL || !process.env.PRIVATE_KEY) {
  throw new Error("❌ Missing environment variables in .env file. Please set SEPOLIA_RPC_URL and PRIVATE_KEY.");
}

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {}, // local in-memory blockchain for testing

    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }

    // You can add other networks here (e.g., Mumbai, Goerli)
    // mumbai: {
    //   url: process.env.MUMBAI_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  }
};
