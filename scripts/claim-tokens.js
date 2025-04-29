const { ethers } = require("hardhat");

// 📍 Your deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x180FB9eBc801c2a194c79470806fbb53C8d0e760"; 

async function main() {
  const [claimer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, claimer);

  console.log("🛠 Claiming tokens for:", claimer.address);
  const tx = await contract.claim();
  await tx.wait();
  console.log("🎯 Tokens claimed successfully!");
}

main().catch((err) => {
  console.error("X Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
