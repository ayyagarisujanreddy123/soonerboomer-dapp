const { ethers } = require("hardhat");

const TOKEN_ADDRESS = "0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E";
const MERKLE_CONTRACT = "0x7edD1b58f191122a134EEAD162B992bA36808a81";

async function main() {
  const [sender] = await ethers.getSigners();
  const token = await ethers.getContractAt("SoonerBoomerToken", TOKEN_ADDRESS, sender);

  const amount = ethers.parseUnits("50000", 18); // 50,000 SBMR

  console.log("⏳ Sending tokens...");
  const tx = await token.transfer(MERKLE_CONTRACT, amount);
  await tx.wait();

  console.log(`✅ Funded ${MERKLE_CONTRACT} with ${ethers.formatUnits(amount, 18)} SBMR`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
