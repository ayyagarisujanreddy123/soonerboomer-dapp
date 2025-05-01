// ignition/modules/AllowlistClaimModule.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DEFAULT_CLAIM_AMOUNT = 1000n * 10n ** 18n; // 1000 tokens (18 decimals)

module.exports = buildModule("AllowlistClaimModule", (m) => {
  // Deploy the ERC20 token
  const token = m.contract("SoonerBoomerToken");

  // Set claim amount as a parameter (can be overridden during deploy)
  const claimAmount = m.getParameter("claimAmount", DEFAULT_CLAIM_AMOUNT);

  // Deploy AllowlistClaim with the token address and claimAmount
  const allowlistClaim = m.contract("AllowlistClaim", [token, claimAmount], {
    after: [token], // Ensure token deploys first
  });

  return { token, allowlistClaim };
});
