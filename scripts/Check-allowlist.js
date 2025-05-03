// scripts/check-allowlist.js
const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x514D5613B7927FC8F27Bc353602e335C203868a1"; // update this
const CHECK_ADDRESS = "0x471e999a56943d5647119fe341bab0c270f8c7be";

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CONTRACT_ADDRESS, signer);

  const isOnList = await contract.allowlist(CHECK_ADDRESS);
  console.log(`✅ Allowlist: ${CHECK_ADDRESS} is ${isOnList ? "eligible" : "NOT eligible"}`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
