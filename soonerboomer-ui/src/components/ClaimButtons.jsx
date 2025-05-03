// components/ClaimButtons.jsx
import React from 'react';

export default function ClaimButtons({ claimAllowlist, claimMerkle }) {
  return (
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
  );
}
