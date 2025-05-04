// src/constants/contracts.js

export const TOKEN_ADDRESS = "0x2804f3Ace39c0B87F18FbEBb6dB5775aAbF7aB63";
export const ALLOWLIST_CONTRACT_ADDRESS = "0xb14F7A93445263c956F2aeb17f9c318941417Ff4";
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
