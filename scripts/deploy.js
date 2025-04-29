const hre = require("hardhat");

async function main() {
  const SoonerBoomerToken = await hre.ethers.getContractFactory("SoonerBoomerToken");
  const sbmr = await SoonerBoomerToken.deploy();

  // No need for await sbmr.deployed(); in ethers v6

  console.log(`✅ SoonerBoomerToken deployed to: ${await sbmr.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
