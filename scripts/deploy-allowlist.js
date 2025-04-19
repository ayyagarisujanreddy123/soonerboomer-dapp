const hre = require("hardhat");

async function main() {
  // Deploy SBMR Token
  const Token = await hre.ethers.getContractFactory("SoonerBoomerToken");
  const token = await Token.deploy();
  await token.waitForDeployment(); // ✅ the FIX
  const tokenAddress = await token.getAddress();
  console.log("✅ SBMR Token deployed to:", tokenAddress);

  // Deploy AllowlistClaim Contract
  const AllowList = await hre.ethers.getContractFactory("AllowlistClaim");
  const allowList = await AllowList.deploy(tokenAddress);
  await allowList.waitForDeployment(); // ✅ the FIX
  const allowListAddress = await allowList.getAddress();
  console.log("✅ AllowlistClaim deployed to:", allowListAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


