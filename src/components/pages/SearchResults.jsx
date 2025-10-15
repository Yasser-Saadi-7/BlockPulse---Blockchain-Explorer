import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://explorer.mtw-testnet.com/search/?key=${query}`);
        const data = await response.json();

        //  Filter out empty objects to remove the empty card
        const filteredData = data.filter(
          (result) => Object.values(result).some((value) => value !== null && value !== "")
        );

        setSearchResults(filteredData);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (searchResults.length === 0) return <p className="text-center text-gray-500">No results found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#00df9a] mb-6">
        Search Results
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchResults.map((result, index) => (
          result.Id || result.blockNumber || result.hash ? ( //  Ensure the object has valid data
            <div
              key={index}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-md border border-gray-700"
            >
              {result.Id && <p className="text-lg"><strong>ID:</strong> {result.Id}</p>}
              {result.blockNumber && <p className="text-lg"><strong>Block Number:</strong> {result.blockNumber}</p>}
              {result.blockHash && <p className="text-lg break-all"><strong>Block Hash:</strong> {result.blockHash}</p>}
              {result.hash && <p className="text-lg break-all"><strong>Transaction Hash:</strong> {result.hash}</p>}
              {result.from && <p className="text-lg break-all"><strong>From:</strong> {result.from}</p>}
              {result.to && <p className="text-lg break-all"><strong>To:</strong> {result.to}</p>}
              {result.gasLimit && <p className="text-lg"><strong>Gas Limit:</strong> {result.gasLimit}</p>}
              {result.gasPrice && <p className="text-lg"><strong>Gas Price:</strong> {result.gasPrice}</p>}
            </div>
          ) : null // 🚀 Prevent empty cards from rendering
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
