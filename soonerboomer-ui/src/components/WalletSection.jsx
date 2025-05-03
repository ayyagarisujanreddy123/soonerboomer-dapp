// components/WalletSection.jsx
import React from 'react';

export default function WalletSection({ wallet, connectWallet }) {
  return (
    <button
      onClick={connectWallet}
      className="w-full bg-blue-700 hover:bg-blue-600 py-3 rounded-lg text-lg font-semibold mt-4"
    >
      {wallet ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
}
