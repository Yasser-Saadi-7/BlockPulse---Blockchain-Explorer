import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransactionDetails = () => {
  const { hash } = useParams(); // Get transaction hash from the URL
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/tx/${hash}`
        );
        setTransaction(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transaction details");
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [hash]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Transaction Details
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading transaction details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg">
            <strong>ID:</strong> {transaction.Id}
          </p>
          <p className="text-lg">
            <strong>Block Number:</strong> {transaction.blockNumber}
          </p>
          <p className="text-lg break-words">
            <strong>Block Hash:</strong> {transaction.blockHash}
          </p>
          <p className="text-lg break-words">
            <strong>Hash:</strong> {transaction.hash}
          </p>
          <p className="text-lg break-words">
            <strong>From:</strong> {transaction.from}
          </p>
          <p className="text-lg break-words">
            <strong>To:</strong> {transaction.to}
          </p>
          <p className="text-lg">
            <strong>Gas Limit:</strong> {transaction.gasLimit}
          </p>
          <p className="text-lg">
            <strong>Gas Price:</strong> {transaction.gasPrice}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
