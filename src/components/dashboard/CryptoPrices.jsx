import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrices = ({ theme }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,dogecoin,algorand,polkadot,uniswap,compound",
              order: "market_cap_desc",
              per_page: 7,
              page: 1,
              sparkline: false,
            },
          }
        );
        setPrices(response.data);
      } catch (err) {
        setError("Failed to fetch crypto prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-4">
        Crypto Prices
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading prices...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* 🌟 Table layout for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-[#00df9a] text-black">
                  <th className="border p-4">Asset</th>
                  <th className="border p-4">Last Trade</th>
                  <th className="border p-4">24H %</th>
                  <th className="border p-4">24H Change</th>
                  
                </tr>
              </thead>
              <tbody>
                {prices.map((coin) => (
                  <tr
                    key={coin.id}
                    className={`${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                  >
                    <td className="border p-4 flex items-center space-x-2">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                      <span>{coin.symbol.toUpperCase()} / USD</span>
                    </td>
                    <td className="border p-4">${coin.current_price.toLocaleString()}</td>
                    <td
                      className={`border p-4 ${
                        coin.price_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td
                      className={`border p-4 ${
                        coin.price_change_24h < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ${coin.price_change_24h.toFixed(2)}
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Responsive Card layout for small screens */}
          <div className="md:hidden flex flex-col space-y-4">
            {prices.map((coin) => (
              <div
                key={coin.id}
                className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <h3 className="text-lg font-bold">{coin.symbol.toUpperCase()} / USD</h3>
                </div>
                <p className="mt-2">
                  <strong>Last Trade:</strong> ${coin.current_price.toLocaleString()}
                </p>
                <p
                  className={`mt-1 ${
                    coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <strong>24H %:</strong> {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p
                  className={`mt-1 ${
                    coin.price_change_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <strong>24H Change:</strong> ${coin.price_change_24h.toFixed(2)}
                </p>
                
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoPrices;
