"use client";
import { useState } from "react";

import Rules from "./rules";

export default function NavBar() {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#0d1117]/95 backdrop-blur"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="flex items-center px-6 sm:px-6 h-20">
          <div className="flex-1" />
          <h1 className="text-xl tracking-[0.3em] uppercase text-white font-bold">
            Organ-iq
          </h1>
          <div className="flex-1 flex justify-end">
            <button
              className="px-3 py-1.5 text-xs tracking-widest uppercase text-white border border-white
              hover:border-green-500 hover:text-green-400 transition-colors rounded"
              onClick={() => setShowRules(true)}
            >
              FAQ
            </button>
          </div>
        </div>
      </header>

      {showRules && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowRules(false)}
        >
          <div
            className="relative bg-[#0d1117] border border-gray-700 rounded-xl p-8 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xs tracking-widest uppercase"
              onClick={() => setShowRules(false)}
            >
              Close
            </button>
            <Rules />
          </div>
        </div>
      )}
    </>
  );
}
