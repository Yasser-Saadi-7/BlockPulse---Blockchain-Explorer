import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CryptoPrices from "../dashboard/CryptoPrices"; // Import CryptoPrices Component

const Dashboard = ({ theme }) => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const limit = 5; // Limit for recent transactions and blocks

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const blockRes = await axios.get(`https://explorer.mtw-testnet.com/blocks/?page=1&limit=${limit}`);
        const txRes = await axios.get(`https://explorer.mtw-testnet.com/transactions/?page=1&limit=${limit}`);

        setBlocks(blockRes.data.data);
        setTransactions(txRes.data.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* 📌 Transactions Section */}
          <h2 className="text-2xl font-bold text-[#00df9a] mb-4 text-center">Latest Transactions</h2>

          {/* Table layout for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className={`w-full border-collapse border ${theme === "dark" ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}`}>
              <thead>
                <tr className="bg-[#00df9a] text-black">
                  <th className="border p-4">ID</th>
                  <th className="border p-4">Block Number</th>
                  <th className="border p-4">Transaction Hash</th>
                  <th className="border p-4">From</th>
                  <th className="border p-4">To</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.hash} className={`${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
                    <td className="border p-4">{tx.Id}</td>
                    <td className="border p-4">{tx.blockNumber}</td>
                    <td className="border p-4 break-all">
                      <Link to={`/transaction/${tx.hash}`} className="text-blue-500 hover:underline">
                        {tx.hash}
                      </Link>
                    </td>
                    <td className="border p-4 break-all">{tx.from}</td>
                    <td className="border p-4 break-all">{tx.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for smaller screens */}
          <div className="md:hidden flex flex-col space-y-4">
            {transactions.map((tx) => (
              <div key={tx.hash} className={`p-4 rounded-lg shadow-md border-2 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}>
                <p><strong>ID:</strong> {tx.Id}</p>
                <p><strong>Block Number:</strong> {tx.blockNumber}</p>
                <p className="break-all"><strong>Transaction Hash:</strong> <Link to={`/transaction/${tx.hash}`} className="text-blue-400 hover:underline">{tx.hash}</Link></p>
                <p className="break-all"><strong>From:</strong> {tx.from}</p>
                <p className="break-all"><strong>To:</strong> {tx.to}</p>
              </div>
            ))}
          </div>

          {/* View All Transactions Button */}
          <div className="text-center mt-4">
            <Link to="/transactions">
              <button className="px-6 py-2 bg-[#00df9a] text-black rounded-lg hover:bg-green-400">
                View all transactions
              </button>
            </Link>
          </div>

          {/* 📌 Blocks Section */}
          <h2 className="text-2xl font-bold text-[#00df9a] mt-8 mb-4 text-center">Latest Blocks</h2>

          {/* Table layout for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className={`w-full border-collapse border ${theme === "dark" ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}`}>
              <thead>
                <tr className="bg-[#00df9a] text-black">
                  <th className="border p-4">ID</th>
                  <th className="border p-4">Gas Used</th>
                  <th className="border p-4">Base Fee</th>
                  <th className="border p-4">Block Hash</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr key={block.Id} className={`${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
                    <td className="border p-4">{block.Id}</td>
                    <td className="border p-4">{block.gasUsed}</td>
                    <td className="border p-4">{block.baseFeePerGas}</td>
                    <td className="border p-4 break-all">
                      <Link to={`/block/${block.hash}`} className="text-blue-500 hover:underline">
                        {block.hash}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for smaller screens */}
          <div className="md:hidden flex flex-col space-y-4">
            {blocks.map((block) => (
              <div key={block.Id} className={`p-4 rounded-lg shadow-md border-2 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}>
                <p><strong>Block ID:</strong> {block.Id}</p>
                <p><strong>Gas Used:</strong> {block.gasUsed}</p>
                <p><strong>Base Fee:</strong> {block.baseFeePerGas}</p>
                <p className="break-all"><strong>Block Hash:</strong> <Link to={`/block/${block.hash}`} className="text-blue-400 hover:underline">{block.hash}</Link></p>
              </div>
            ))}
          </div>

          {/* View All Blocks Button */}
          <div className="text-center mt-4">
            <Link to="/blocks">
              <button className="px-6 py-2 bg-[#00df9a] text-black rounded-lg hover:bg-green-400">
                View all blocks
              </button>
            </Link>
          </div>

          {/* Add Crypto Prices Component */}
          <CryptoPrices theme={theme} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
