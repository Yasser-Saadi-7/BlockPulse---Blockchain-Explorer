import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-[#121212] rounded-lg shadow-lg min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#00df9a] dark:text-[#00df9a]">
        About Us
      </h1>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
        Learn more about MTW Blockchain and our mission.
      </p>

      <div className="flex justify-center">
        <img 
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
          alt="Team working"
          className="rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3"
        />
      </div>

      <div className="mt-10 space-y-8">
        {/* Section 1 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">Who We Are</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            We are a group of dedicated students from Braude College, collaborating on an 
            exciting project as part of our bachelor's degree course. Our team is passionate about 
            harnessing the power of technology to make financial information more accessible and transparent.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Our mission is to provide a comprehensive and user-friendly platform for retrieving detailed 
            information about blockchain transactions and related financial data. We believe that transparency 
            in financial transactions is crucial for fostering trust and innovation in the digital economy.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">Our Team</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 text-center">
            We are a diverse team of software engineering students. Our combined skills enable us 
            to develop a robust and reliable platform that meets the needs of our users. Each member 
            of our team brings a unique perspective and a shared commitment to excellence.
          </p>

          {/* Team Members List */}
          <ul className="mt-4 text-lg font-semibold text-center text-[#00df9a] dark:text-[#00df9a] space-y-2">
            <li> Bashar Hosari</li>
            <li> Kamel Dokhan</li>
            <li> Yasser Sadi</li>
            <li> Yousef Jirees</li>
            <li> Adam Hasarme</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
