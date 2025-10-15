import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-white text-black dark:bg-black dark:text-white'>
      <h1 className='text-5xl font-bold mb-10'>Our Services</h1>

      <div className='flex space-x-6'>
        <Link to="/blocks">
          <button className='bg-[#00df9a] text-black dark:bg-[#007a4e] dark:text-white px-8 py-4 rounded-lg text-2xl font-semibold hover:bg-[#00c482] transition'>
            Blocks
          </button>
        </Link>

        <Link to="/transactions">
          <button className='bg-[#00df9a] text-black dark:bg-[#007a4e] dark:text-white px-8 py-4 rounded-lg text-2xl font-semibold hover:bg-[#00c482] transition'>
            Transactions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
