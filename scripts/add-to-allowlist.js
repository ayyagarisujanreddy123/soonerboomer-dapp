// scripts/add-to-allowlist.js

const { ethers } = require("hardhat");

const CLAIM_CONTRACT = "0x553f48dC19eecFAAfF94C89B975B854441843223";

const WALLET_TO_ADD = "0x471E999A56943D5647119FE341Bab0C270f8C7be";

async function main() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, owner);

  console.log("🟡 Adding wallet to allowlist:", WALLET_TO_ADD);
  const tx = await contract.addToAllowlist(WALLET_TO_ADD);
  await tx.wait();

  console.log(`✅ Successfully added ${WALLET_TO_ADD} to the allowlist!`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
