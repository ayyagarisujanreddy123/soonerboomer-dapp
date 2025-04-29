// scripts/deploy-allowlist.js

const { ethers } = require("hardhat");

async function main() {
  const TOKEN_ADDRESS = "0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E"; // Your existing SoonerBoomerToken

  const AllowlistClaim = await ethers.getContractFactory("AllowlistClaim");
  const allowlistClaim = await AllowlistClaim.deploy(TOKEN_ADDRESS);

  await allowlistClaim.waitForDeployment();
  console.log(`✅ AllowlistClaim deployed to: ${allowlistClaim.target}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
