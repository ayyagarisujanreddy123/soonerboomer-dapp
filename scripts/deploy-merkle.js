require('dotenv').config();
const { ethers } = require('hardhat');

// Load Merkle root
const { root } = require('../proofs.json');

async function main() {
  const [deployer] = await ethers.getSigners();
  const tokenAddr = process.env.TOKEN_ADDRESS;

  if (!tokenAddr) throw new Error('❌ Set TOKEN_ADDRESS in .env');
  console.log('🟡 Deploying MerkleClaim with root:', root);

  const Factory = await ethers.getContractFactory('MerkleClaim');
  const contract = await Factory.deploy(tokenAddr, root); // deploy contract

  await contract.waitForDeployment(); // ✅ use this for ethers v6

  console.log('✅ MerkleClaim deployed at', contract.target);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
