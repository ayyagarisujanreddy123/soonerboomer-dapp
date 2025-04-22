// scripts/add-to-allowlist.js

const { ethers } = require("hardhat");

const CLAIM_CONTRACT = "0xF746bc542F9B1E44aEc37dF193e555800df1b867"; // your contract
const WALLET_TO_ADD = "0x471E999A56943D5647119FE341Bab0C270f8C7be"; // your MetaMask address

async function main() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, owner);

  const tx = await contract.addToAllowlist(WALLET_TO_ADD);
  await tx.wait();

  console.log(`✅ Wallet ${WALLET_TO_ADD} added to allowlist!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
