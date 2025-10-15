import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Explore = ({ theme }) => {
  const [symbol, setSymbol] = useState("BTC");
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [price, setPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const chartRef = useRef(null);

  // WebSocket for real-time ticker
  useEffect(() => {
    const ws = new WebSocket("wss://mtickers.mtw-testnet.com");
    ws.onmessage = (event) => {
      const tickerData = JSON.parse(event.data)[symbol];
      if (tickerData) {
        const newPrice = parseFloat(tickerData.p).toFixed(2);
        const newChange = parseFloat(tickerData.c).toFixed(2);
        const newTime = new Date(tickerData.t).toLocaleTimeString();

        setPrice(newPrice);
        setPriceChange(newChange);

        setChartData((prevState) => {
          const updatedLabels = [...prevState.labels, newTime].slice(-20);
          const updatedData = [...prevState.data, newPrice].slice(-20);
          return { labels: updatedLabels, data: updatedData };
        });
      }
    };
    return () => ws.close();
  }, [symbol]);

  // Chart Rendering
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: `${symbol} Price`,
              data: chartData.data,
              borderColor: "#00df9a",
              backgroundColor: "rgba(0, 223, 154, 0.2)",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
                color: theme === "light" ? "#000" : "#fff",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price",
                color: theme === "light" ? "#000" : "#fff",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: theme === "light" ? "#000" : "#fff",
              },
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartData, symbol, theme]);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
    setChartData({ labels: [], data: [] });
  };

  return (
    <div
      className={`max-w-6xl mx-auto mt-10 p-6 rounded-lg shadow-lg min-h-screen transition-all duration-300
      ${theme === "light" ? "bg-white text-black" : "bg-[#121212] text-white"}`}
    >
      <h1 className="text-3xl font-bold text-[#00df9a] mb-6">Explore</h1>

      {/* Coin Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <label htmlFor="symbol" className="text-lg font-semibold">
          Select Coin:
        </label>
        <select
          id="symbol"
          value={symbol}
          onChange={handleSymbolChange}
          className={`border border-gray-300 rounded-md w-[100px] px-2 py-1 transition-all duration-300
          ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-800 text-white"}`}
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="LTC">LTC</option>
        </select>
      </div>

      {/* Ticker and Chart */}
      <div className="flex flex-wrap justify-center gap-10">
        {/* Real-Time Ticker */}
        <div
          className={`w-[300px] text-center p-6 rounded-lg shadow-lg transition-all duration-300
          ${theme === "light" ? "bg-gray-300 text-black" : "bg-gray-900 text-white"}`}
        >
          <h2 className="text-lg font-semibold text-[#00df9a]">
            Real Time Ticker ({symbol})
          </h2>
          <div className="text-3xl font-bold mt-4">{price || "Loading..."}</div>
          <div
            className={`text-lg mt-2 ${
              priceChange < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {priceChange < 0 ? "▼" : "▲"} {priceChange}%
          </div>
        </div>

        {/* Real-Time Chart */}
        <div
          className={`w-[600px] h-[350px] p-4 rounded-lg transition-all duration-300
          ${theme === "light" ? "bg-gray-200 text-black" : "bg-[#1a1a1a] text-white"}`}
        >
          <canvas ref={chartRef} className="h-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Explore;
