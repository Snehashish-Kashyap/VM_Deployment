import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex mt-10 gap-3">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="bg-green-700 text-black px-4 py-2 rounded disabled:opacity-50 hover:bg-green-500 transition"
      >
        ◀ Prev
      </button>

      <span className="px-3 py-2 bg-gray-800 rounded text-green-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-green-700 text-black px-4 py-2 rounded disabled:opacity-50 hover:bg-green-500 transition"
      >
        Next ▶
      </button>
    </div>
  );
}
