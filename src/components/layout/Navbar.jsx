import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ theme, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#00df9a]">BlockPulse</h1>

        {/* Search Bar (Hidden on Small Screens) */}
        <form onSubmit={handleSearch} className="relative hidden md:flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hash"
            className={`px-4 py-2 rounded-md focus:outline-none transition-all duration-300 border ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-gray-200 text-black border-gray-400"}`}
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-500 hover:text-[#00df9a]">
            <FaSearch size={18} />
          </button>
        </form>

        {/* Navbar Links (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-[#00df9a]">Home</Link></li>
          <li><Link to="/services" className="hover:text-[#00df9a]">Services</Link></li>
          <li><Link to="/about" className="hover:text-[#00df9a]">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#00df9a]">Contact</Link></li>
          <li><Link to="/explore" className="hover:text-[#00df9a]">Explore</Link></li>
          <li><Link to="/dashboard" className="hover:text-[#00df9a]">Dashboard</Link></li>
        </ul>

        {/*  Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full transition-all duration-300 bg-gray-800 text-white hover:bg-gray-600"
        >
          {theme === "dark" ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-800" />}
        </button>

        {/*  Hamburger Menu Button */}
        <button
          className="md:hidden p-2 rounded-full transition-all duration-300 hover:bg-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} className="text-[#00df9a]" /> : <FaBars size={24} className="text-[#00df9a]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-16 left-0 w-full transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} ${menuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-4 p-4 text-center">
          <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">Home</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">Services</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">Contact</Link></li>
          <li><Link to="/explore" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">Explore</Link></li>
          <li><Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#00df9a]">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
