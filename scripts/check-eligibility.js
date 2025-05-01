const { ethers } = require("hardhat");

// 📍 Deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x514D5613B7927FC8F27Bc353602e335C203868a1";

// 📍 Wallet address to check
const WALLET = "0x471E999A56943D5647119FE341Bab0C270f8C7be";

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, signer);

  // Optional: Display signer (for clarity)
  console.log(`🔍 Using signer: ${signer.address}`);

  const eligible = await contract.allowlist(WALLET);
  console.log(`🧪 Is ${WALLET} eligible to claim? ${eligible ? "✅ Yes" : "❌ No"}`);
}

main().catch((err) => {
  console.error("❌ Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
