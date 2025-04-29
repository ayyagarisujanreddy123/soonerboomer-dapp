const { ethers } = require("hardhat");

const CLAIM_CONTRACT = "0x514D5613B7927FC8F27Bc353602e335C203868a1"; // your deployed AllowlistClaim contract address

async function main() {
  const [claimer] = await ethers.getSigners(); // Wallet signer
  const claimContract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, claimer);

  console.log("🛠 Claiming tokens for:", claimer.address);

  try {
    const tx = await claimContract.claim();
    console.log("⏳ Transaction sent. Waiting for confirmation...");
    await tx.wait();
    console.log(`✅ Successfully claimed tokens! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error("❌ Claim failed:", error.reason || error.message);
  }
}

main().catch((error) => {
  console.error("❌ Script error:", error.reason || error.message);
  process.exitCode = 1;
});
