import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const limit = 10; // Set limit per page

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/blocks/?page=${page}&limit=${limit}`
        );

        setBlocks(response.data.data);
        setTotalBlocks(response.data.amount || 0); // Store total blocks
      } catch (err) {
        setError("Failed to fetch blocks");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [page]);

  const handleNext = () => {
    if (page < Math.ceil(totalBlocks / limit)) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Latest Blocks
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading blocks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-right text-lg font-bold">
            Total Blocks: {totalBlocks}
          </p>

          {/* 📌 Table layout for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-[#00df9a] text-white">
                  <th className="border p-4">Block ID</th>
                  <th className="border p-4">Gas Used</th>
                  <th className="border p-4">Gas Limit</th>
                  <th className="border p-4">Base Fee Per Gas</th>
                  <th className="border p-4">Extra Data</th>
                  <th className="border p-4">Hash</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr key={block.Id} className="text-center">
                    <td className="border p-4">{block.Id}</td>
                    <td className="border p-4">{block.gasUsed}</td>
                    <td className="border p-4">{block.gasLimit}</td>
                    <td className="border p-4">{block.baseFeePerGas}</td>
                    <td className="border p-4 text-xs break-all">{block.extraData}</td>
                    <td className="border p-4 text-xs break-all">
                      <Link
                        to={`/block/${block.hash}`}
                        className="text-blue-500 hover:underline"
                      >
                        {block.hash}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*  Card layout for small screens */}
          <div className="md:hidden flex flex-col space-y-4">
            {blocks.map((block) => (
              <div 
                key={block.Id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold text-[#00df9a] ">
                  Block ID: {block.Id}
                </h2>
                <p><strong>Gas Used:</strong> {block.gasUsed}</p>
                <p><strong>Gas Limit:</strong> {block.gasLimit}</p>
                <p><strong>Base Fee Per Gas:</strong> {block.baseFeePerGas}</p>
                <p className="break-all overflow-hidden text-ellipsis">
                  <strong>Extra Data:</strong> {block.extraData}
                </p>
                <p className="break-all overflow-hidden text-ellipsis">
                  <strong>Block Hash:</strong>{" "}
                  <Link to={`/block/${block.hash}`} className="text-blue-400 hover:underline">
                    {block.hash}
                  </Link>
                </p>
              </div>
            ))}
          </div>

          {/* 📌 Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`w-full sm:w-auto px-6 py-2 rounded-md text-white ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#00df9a] hover:bg-green-700"
              }`}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {page} / {Math.ceil(totalBlocks / limit)}
            </p>
            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(totalBlocks / limit)}
              className={`w-full sm:w-auto px-6 py-2 rounded-md text-white ${
                page >= Math.ceil(totalBlocks / limit) ? "bg-gray-400 cursor-not-allowed" : "bg-[#00df9a] hover:bg-green-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blocks;
