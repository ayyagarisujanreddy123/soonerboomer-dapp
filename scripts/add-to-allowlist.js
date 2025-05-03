// scripts/add-to-allowlist.js

const { ethers } = require("hardhat");

// Your deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x553f48dC19eecFAAfF94C89B975B854441843223";

// List all wallets you want to add
const WALLETS_TO_ADD = [
  //"0x3243601a44b08dd0c1301275f8265af9bcb0a571",
   "0x471E999A56943D5647119FE341Bab0C270f8C7be",
  // add more here…
];

async function main() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "AllowlistClaim",
    CLAIM_CONTRACT,
    owner
  );

  for (const addr of WALLETS_TO_ADD) {
    console.log("🟡 Adding", addr);
    const tx = await contract.addToAllowlist(addr);
    await tx.wait();
    console.log("✅ Added", addr);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
