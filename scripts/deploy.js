const hre = require("hardhat");

async function main() {
  const SoonerBoomerToken = await hre.ethers.getContractFactory("SoonerBoomerToken");
  const sbmr = await SoonerBoomerToken.deploy();
  await sbmr.deployed();

  console.log(`SoonerBoomerToken deployed to: ${sbmr.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
