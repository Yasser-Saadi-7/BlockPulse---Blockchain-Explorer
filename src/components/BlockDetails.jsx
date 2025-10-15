import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlockDetails = ({ theme }) => {
  const { hash } = useParams(); // Get block hash from URL
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/blockByHash/?hash=${hash}`
        );
        setBlock(response.data);
      } catch (err) {
        setError("Failed to fetch block details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlockDetails();
  }, [hash]);

  return (
    <div
      className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Block Details
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading block details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg">
            <strong>Block ID:</strong> {block.Id}
          </p>
          <p className="text-lg">
            <strong>Base Fee Per Gas:</strong> {block.baseFeePerGas}
          </p>
          <p className="text-lg">
            <strong>Gas Limit:</strong> {block.gasLimit}
          </p>
          <p className="text-lg">
            <strong>Gas Used:</strong> {block.gasUsed}
          </p>
          <p className="text-lg break-words">
            <strong>Block Hash:</strong> {block.hash}
          </p>
          <p className="text-lg break-words">
            <strong>Parent Hash:</strong> {block.parentHash}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
