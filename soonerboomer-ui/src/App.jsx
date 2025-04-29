// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './index.css';
import logo from './assets/token-logo.png';

const CLAIM_CONTRACT_ADDRESS = "0x180FB9eBc801c2a194c79470806fbb53C8d0e760";

const abi = [
  "function claim() external",
  "function checkAllowlist(address) view returns (bool)"
];

function App() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("Connect your wallet");
  const [contract, setContract] = useState(null);
  const [txLink, setTxLink] = useState("");

  useEffect(() => {
    const setup = async () => {
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
    setup();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(accounts[0]);
    setStatus(`✅ Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
  };

  const checkEligibility = async () => {
    if (!contract) {
      setStatus("❌ Contract not loaded");
      return;
    }
    const eligible = await contract.checkAllowlist(wallet);
    if (eligible) {
      setStatus("✅ Eligible to claim!");
    } else {
      setStatus("❌ Not eligible to claim.");
    }
  };

  const claimTokens = async () => {
    if (!contract) return;
    try {
      const tx = await contract.claim();
      setStatus("⏳ Claiming tokens...");
      await tx.wait();
      setStatus("✅ Tokens claimed successfully!");
      setTxLink(`https://sepolia.etherscan.io/tx/${tx.hash}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Claim failed. You may not be eligible or already claimed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center p-6">
      <div className="bg-zinc-800/70 backdrop-blur-md border border-zinc-700 p-8 rounded-3xl shadow-2xl w-full max-w-xl text-center space-y-6">
        <img
          src={logo}
          alt="SoonerBoomer Logo"
          className="w-24 h-24 mx-auto animate-spin-slow mb-4"
        />
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-red-500 to-fuchsia-500 text-transparent bg-clip-text animate-pulse">
          SoonerBoomer+
        </h1>
        <p className="text-gray-400">Earn your reward tokens with one click!</p>

        <button
          onClick={connectWallet}
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg text-lg font-semibold mt-4"
        >
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={checkEligibility}
            className="bg-yellow-500 hover:bg-yellow-400 px-6 py-2 rounded-lg font-semibold"
          >
            Check Eligibility
          </button>
          <button
            onClick={claimTokens}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-semibold"
          >
            Claim Tokens
          </button>
        </div>

        <div className="text-sm text-amber-300 font-medium mt-4 min-h-[1.5rem]">
          {status}
        </div>

        {txLink && (
          <a
            href={txLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:underline mt-2"
          >
            View Transaction on Etherscan
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
