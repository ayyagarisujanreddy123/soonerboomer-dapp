// constants/contracts.js
export const TOKEN_ADDRESS = "0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E";
export const ALLOWLIST_CONTRACT_ADDRESS = "0x514D5613B7927FC8F27Bc353602e335C203868a1";
export const MERKLE_CONTRACT_ADDRESS = "0x7edD1b58f191122a134EEAD162B992bA36808a81";

export const allowlistAbi = [
  "function claim() external",
  "function allowlist(address) view returns (bool)",
  "function addToAllowlist(address) external"
];

export const merkleAbi = [
  "function claim(bytes32[] calldata proof) external",
  "function claimed(address) view returns (bool)"
];
