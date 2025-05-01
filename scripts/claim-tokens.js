const { ethers } = require("hardhat");

// 📍 Deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x180FB9eBc801c2a194c79470806fbb53C8d0e760";

async function main() {
  const [claimer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, claimer);

  console.log("🛠 Connected as:", claimer.address);

  // Step 1: Check eligibility
  const isAllowed = await contract.allowlist(claimer.address);
  if (!isAllowed) {
    console.log("❌ This address is not on the allowlist.");
    return;
  }

  // Step 2: Check if already claimed
  const hasClaimed = await contract.claimed(claimer.address);
  if (hasClaimed) {
    console.log("⚠️ Tokens have already been claimed.");
    return;
  }

  // Step 3: Proceed to claim
  console.log("🚀 Claiming tokens...");
  const tx = await contract.claim();
  await tx.wait();
  console.log("✅ Tokens claimed successfully!");
}

main().catch((err) => {
  console.error("❌ Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
