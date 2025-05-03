// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './index.css';
import logo from './assets/token-logo.png';
import proofs from './proofs.json';

const TOKEN_ADDRESS = "0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E";
const ALLOWLIST_CONTRACT_ADDRESS = "0x514D5613B7927FC8F27Bc353602e335C203868a1";
const MERKLE_CONTRACT_ADDRESS = "0x7edD1b58f191122a134EEAD162B992bA36808a81";

// ✅ Updated ABI with addToAllowlist
const allowlistAbi = [
  "function claim() external",
  "function allowlist(address) view returns (bool)",
  "function addToAllowlist(address) external"
];

const merkleAbi = [
  "function claim(bytes32[] calldata proof) external",
  "function claimed(address) view returns (bool)"
];

function App() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("Connect your wallet");
  const [allowlistContract, setAllowlistContract] = useState(null);
  const [merkleContract, setMerkleContract] = useState(null);
  const [customAddress, setCustomAddress] = useState("");
  const [useCustomAddress, setUseCustomAddress] = useState(false);

  useEffect(() => {
    const setupContracts = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const allowlist = new ethers.Contract(ALLOWLIST_CONTRACT_ADDRESS, allowlistAbi, signer);
        const merkle = new ethers.Contract(MERKLE_CONTRACT_ADDRESS, merkleAbi, signer);

        setAllowlistContract(allowlist);
        setMerkleContract(merkle);
      }
    };

    setupContracts();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(accounts[0]);
    setStatus("✅ Wallet connected: " + accounts[0]);
  };

  const checkEligibility = async () => {
    if (!allowlistContract || !wallet) {
      setStatus("❌ Contracts not ready");
      return;
    }

    const target = useCustomAddress ? customAddress : wallet;

    try {
      const isAllowlist = await allowlistContract.allowlist(target);
      const isClaimed = await merkleContract?.claimed(target.toLowerCase());
      const hasProof = proofs[target.toLowerCase()]?.length > 0;

      if (isAllowlist) {
        setStatus("✅ Eligible via Allowlist!");
      } else if (!isClaimed && hasProof) {
        setStatus("✅ Eligible via Merkle proof!");
      } else {
        setStatus("❌ Not eligible or already claimed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error checking eligibility.");
    }
  };

  const addToAllowlist = async () => {
    if (!allowlistContract || !wallet) {
      setStatus("❌ Wallet or contract not ready.");
      return;
    }

    try {
      const tx = await allowlistContract.addToAllowlist(customAddress);
      setStatus("⏳ Adding to allowlist...");
      await tx.wait();
      setStatus(`✅ Added! View Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
    } catch (err) {
      console.error("❌ Failed to add to allowlist:", err);
      setStatus("❌ Failed to add to allowlist.");
    }
  };

  const claimAllowlist = async () => {
    if (!allowlistContract || !wallet) {
      setStatus("❌ Wallet or contract not ready.");
      return;
    }

    try {
      const tx = await allowlistContract.claim();
      setStatus("⏳ Claiming from allowlist...");
      await tx.wait();
      setStatus(`✅ Claimed from allowlist! View Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
    } catch (err) {
      console.error("❌ Allowlist claim failed:", err);
      setStatus("❌ Allowlist claim failed.");
    }
  };

  const claimMerkle = async () => {
    if (!merkleContract || !wallet) {
      setStatus("❌ Wallet or contract not ready.");
      return;
    }

    const address = wallet.toLowerCase();
    const proof = proofs[address];

    try {
      if (!proof || proof.length === 0) {
        setStatus("❌ No Merkle proof found for this address.");
        return;
      }

      const alreadyClaimed = await merkleContract.claimed(address);
      if (alreadyClaimed) {
        setStatus("❌ Already claimed via Merkle.");
        return;
      }

      const tx = await merkleContract.claim(proof);
      setStatus("⏳ Claiming from Merkle...");
      await tx.wait();
      setStatus(`✅ Claimed via Merkle! View Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
    } catch (err) {
      console.error("❌ Merkle claim failed:", err);
      setStatus("❌ Merkle claim failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-800/60 backdrop-blur-md border border-zinc-700 p-8 rounded-3xl shadow-xl w-full max-w-xl text-center space-y-6">

        <img src={logo} alt="SoonerBoomer Logo" className="w-28 h-28 mx-auto animate-spin-slow drop-shadow-md mb-4" />
        <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 via-red-500 to-fuchsia-500 text-transparent bg-clip-text animate-pulse">
          SoonerBoomer+
        </h1>
        <p className="text-gray-300">Claim your on-chain engagement rewards</p>

        <button
          onClick={connectWallet}
          className="w-full bg-blue-700 hover:bg-blue-600 py-3 rounded-lg text-lg font-semibold mt-4"
        >
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={useCustomAddress}
            onChange={() => setUseCustomAddress(!useCustomAddress)}
          />
          <label className="text-sm text-gray-400">Use custom address</label>
        </div>

        {useCustomAddress && (
          <input
            type="text"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            placeholder="Enter 0x address..."
            className="w-full px-4 py-3 mt-2 rounded-lg bg-zinc-900 border border-zinc-600 placeholder-zinc-500 text-white"
          />
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={checkEligibility}
            className="bg-yellow-600 hover:bg-yellow-500 px-6 py-2 rounded-lg font-medium"
          >
            Check Eligibility
          </button>
          <button
            onClick={addToAllowlist}
            className="bg-pink-700 hover:bg-pink-600 px-6 py-2 rounded-lg font-medium"
          >
            Add to Allowlist
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={claimAllowlist}
            className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-lg font-medium"
          >
            Claim from Allowlist
          </button>
          <button
            onClick={claimMerkle}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium"
          >
            Claim from Merkle
          </button>
        </div>

        <div className="text-sm text-red-400 font-medium mt-4 min-h-[1.5rem]">
          {status}
        </div>

      </div>
    </div>
  );
}

export default App;
