const { ethers } = require("hardhat");

// 📍 Your deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x514D5613B7927FC8F27Bc353602e335C203868a1"; 

// 📍 Wallet address you want to check
const WALLET = "0x471E999A56943D5647119FE341Bab0C270f8C7be";

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, signer);

  const eligible = await contract.allowlist(WALLET);
  console.log(`🧪 Wallet eligible: ${eligible}`);
}

main().catch((err) => {
  console.error("X Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
