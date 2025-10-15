import React from 'react';
import Hero from './Hero'; // Import the Hero component

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Hero Section */}
      <Hero />

      {/* Additional Home Content */}
      <div className="flex flex-col justify-center items-center py-16 px-6 text-center">
        <h1 className="text-5xl font-bold">Welcome to MTW Blockchain</h1>
        <p className="text-xl mt-4 max-w-2xl">
          Explore the future of decentralized technology with BlockPulse.
        </p>
      </div>
    </div>
  );
};

export default Home;
