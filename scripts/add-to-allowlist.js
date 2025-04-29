const { ethers } = require("hardhat");

// 📍 Your deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x180FB9eBc801c2a194c79470806fbb53C8d0e760"; 

// 📍 Wallet you want to allow
const WALLET_TO_ADD = "0x471E999A56943D5647119FE341Bab0C270f8C7be"; 

async function main() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, owner);

  console.log("🟡 Adding to allowlist:", WALLET_TO_ADD);
  const tx = await contract.addToAllowlist(WALLET_TO_ADD);
  await tx.wait();
  console.log(`✅ Successfully added ${WALLET_TO_ADD} to allowlist`);
}

main().catch((err) => {
  console.error("X Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
