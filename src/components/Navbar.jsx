import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout, setShowHotelReg, isOwner } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      <Link to="/" onClick={scrollToTop}>
        <h3 className={`h-9 text-white ${isScrolled && "invert opacity-80"}`}>
          Xtended Stay Gh
        </h3>
      </Link>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((navLink, index) => (
          <Link
            key={index}
            to={navLink.path}
            onClick={scrollToTop}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {navLink.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            ></div>
          </Link>
        ))}

        {!user ? (
          <>
            <Link
              to="/login"
              className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`bg-indigo-600 text-white px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled && "bg-indigo-700"
              }`}
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <span className="mr-2">{user.name}</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Link
                    to="/my-bookings"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  {isOwner && (
                    <Link
                      to="/owner"
                      onClick={scrollToTop}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden"
      >
        <svg
          className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <div className="px-4 py-3">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.path}
                to={navLink.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
                className="block py-2 text-gray-700 hover:text-indigo-600"
              >
                {navLink.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/my-bookings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                >
                  My Bookings
                </Link>
                {isOwner && (
                  <Link
                    to="/owner"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
