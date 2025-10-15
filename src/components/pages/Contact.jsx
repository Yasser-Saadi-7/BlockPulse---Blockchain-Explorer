import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Your message has been sent!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#121212] p-6">
      <div className="w-full max-w-lg bg-gray-100 dark:bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#00df9a]">Get in Touch</h2>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* First Name & Last Name */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Email Address */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg bg-white dark:bg-[#2c2c2c] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none h-32"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 p-3 bg-[#00df9a] text-black font-bold rounded-lg hover:bg-[#00c482] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
