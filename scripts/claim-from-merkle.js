const { ethers } = require("hardhat");
const { proofs } = require("../proofs.json");

const MERKLE_CONTRACT = "0x7edD1b58f191122a134EEAD162B992bA36808a81";
const WALLET = "0x471e999a56943d5647119fe341bab0c270f8c7be"; // address to claim for

async function main() {
  const [signer] = await ethers.getSigners();

  if (signer.address.toLowerCase() !== WALLET.toLowerCase()) {
    console.log("⚠️ Warning: connected signer ≠ target wallet");
  }

  const proof = proofs[WALLET.toLowerCase()];
  if (!proof || proof.length === 0) {
    throw new Error("❌ No Merkle proof found for this address");
  }

  const contract = await ethers.getContractAt("MerkleClaim", MERKLE_CONTRACT, signer);
  const tx = await contract.claim(proof);
  console.log("⏳ Claiming...");
  await tx.wait();
  console.log(`✅ Claimed! Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message || err);
  process.exit(1);
});
