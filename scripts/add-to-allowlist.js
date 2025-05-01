const { ethers } = require("hardhat");

// ✏️ Deployed AllowlistClaim contract
const CLAIM_CONTRACT = "0x180FB9eBc801c2a194c79470806fbb53C8d0e760";

// ✏️ List of addresses to add
const ALLOWLIST = [
  "0x471E999A56943D5647119FE341Bab0C270f8C7be",
  // Add more addresses here
];

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("AllowlistClaim", CLAIM_CONTRACT, signer);

  const contractOwner = await contract.owner();
  if (signer.address.toLowerCase() !== contractOwner.toLowerCase()) {
    throw new Error(`❌ You are not the owner. Connected: ${signer.address}, Owner: ${contractOwner}`);
  }

  for (const addr of ALLOWLIST) {
    console.log(`🟡 Adding to allowlist: ${addr}`);
    const tx = await contract.addToAllowlist(addr);
    await tx.wait();
    console.log(`✅ Successfully added: ${addr}`);
  }

  console.log("🎉 All addresses added to allowlist.");
}

main().catch((err) => {
  console.error("❌ Script Error:", err.reason || err.message);
  process.exitCode = 1;
});
