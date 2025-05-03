// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './index.css';
import logo from './assets/token-logo.png';
import proofs from './proofs.json';

// Components
import WalletSection from './components/WalletSection';
import EligibilityCheck from './components/EligibilityCheck';
import ClaimButtons from './components/ClaimButtons';
import StatusBanner from './components/StatusBanner';

// Constants
import {
  ALLOWLIST_CONTRACT_ADDRESS,
  MERKLE_CONTRACT_ADDRESS,
  allowlistAbi,
  merkleAbi,
} from './constants/contracts';

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

        <WalletSection wallet={wallet} connectWallet={connectWallet} />

        <EligibilityCheck
          useCustomAddress={useCustomAddress}
          setUseCustomAddress={setUseCustomAddress}
          customAddress={customAddress}
          setCustomAddress={setCustomAddress}
          checkEligibility={checkEligibility}
          addToAllowlist={addToAllowlist}
        />

        <ClaimButtons
          claimAllowlist={claimAllowlist}
          claimMerkle={claimMerkle}
        />

        <StatusBanner status={status} />
      </div>
    </div>
  );
}

export default App;
