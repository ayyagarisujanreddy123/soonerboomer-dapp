// components/EligibilityCheck.jsx
import React from 'react';

export default function EligibilityCheck({
  useCustomAddress,
  setUseCustomAddress,
  customAddress,
  setCustomAddress,
  checkEligibility,
  addToAllowlist
}) {
  return (
    <>
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
    </>
  );
}
