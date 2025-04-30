// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './index.css';
import logo from './assets/token-logo.png';

const TOKEN_ADDRESS = "0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E";
const CLAIM_CONTRACT_ADDRESS = "0x514D5613B7927FC8F27Bc353602e335C203868a1";


const abi = [
  "function claim() external",
  "function allowlist(address) view returns (bool)"
];


function App() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("Connect your wallet");
  const [contract, setContract] = useState(null);
  const [customAddress, setCustomAddress] = useState("");
  const [useCustomAddress, setUseCustomAddress] = useState(false);

  useEffect(() => {
    const setupContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const claimContract = new ethers.Contract(
  CLAIM_CONTRACT_ADDRESS,
  abi,
  signer
);

        setContract(claimContract);
      }
    };
  
    setupContract(); // Call the async function
  }, []);
  
  

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(accounts[0]);
    setStatus("✅ Wallet connected: " + accounts[0]);
  };

  const checkEligibility = async () => {
    console.log("Checking eligibility...");
    if (!contract) {
      console.log("❌ Contract not found");
      return;
    }
  
    const targetAddress = useCustomAddress ? customAddress : wallet;
    console.log("Address being checked:", targetAddress);
  
    try {
      const isEligible = await contract.allowlist(targetAddress);
  
      console.log("Eligible?", isEligible);
  
      if (!isEligible) {
        setStatus("Not eligible to claim.");
      } else {
        setStatus("✅ Eligible! You can claim now!");
      }
    } catch (error) {
      console.error(error);
      setStatus(" Error checking eligibility.");
    }
  };
  
  
  

  const claimTokens = async () => {
    console.log("Trying to claim...");
    if (!contract) return;
    try {
      const tx = await contract.claim();
      setStatus("⏳ Claiming tokens...");
      await tx.wait();
      console.log("✅ Claimed successfully!");
  
      setStatus(
        `✅ Claimed! View Tx: https://sepolia.etherscan.io/tx/${tx.hash}`
      );
  
      await checkEligibility(); // 🔥 Recheck after claiming
    } catch (err) {
      console.error(" Claim failed:", err);
      setStatus(" Claim Failed. Please try again.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-800/60 backdrop-blur-md border border-zinc-700 p-8 rounded-3xl shadow-xl w-full max-w-xl text-center space-y-6">
        <img
          src={logo}
          alt="SoonerBoomer Logo"
          className="w-28 h-28 mx-auto animate-spin-slow drop-shadow-md mb-4"
        />
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

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={checkEligibility}
            className="bg-yellow-600 hover:bg-yellow-500 px-6 py-2 rounded-lg font-medium"
          >
            Check Eligibility
          </button>
          <button
            onClick={claimTokens}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium"
          >
            Claim Tokens
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
