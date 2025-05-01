const hre = require("hardhat");

async function main() {
  const SoonerBoomerToken = await hre.ethers.getContractFactory("SoonerBoomerToken");
  const sbmr = await SoonerBoomerToken.deploy();

  const tx = sbmr.deploymentTransaction();
  const receipt = await tx.wait();

  console.log(`✅ SoonerBoomerToken deployed to: ${await sbmr.getAddress()}`);
  console.log(`🔗 Transaction Hash: ${tx.hash}`);
  console.log(`⛽ Gas Used: ${receipt.gasUsed.toString()}`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error.message || error);
  process.exitCode = 1;
});
