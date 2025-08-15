import React from "react";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to="/">
        <h3 className="h-9 text-black font-bold">Xtended Stay</h3>
      </Link>
      {/* Todo add logout button */}
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
