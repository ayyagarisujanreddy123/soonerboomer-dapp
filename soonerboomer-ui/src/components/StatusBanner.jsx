// components/StatusBanner.jsx
import React from 'react';

export default function StatusBanner({ status }) {
  return (
    <div className="text-sm text-red-400 font-medium mt-4 min-h-[1.5rem]">
      {status}
    </div>
  );
}
