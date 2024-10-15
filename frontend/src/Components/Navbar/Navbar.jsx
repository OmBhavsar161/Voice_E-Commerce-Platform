import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../Assets/logo.png";
import logo from "../Assets/logo_voice2.svg";
import cart_icon from "../Assets/cart_icon.png";
import smartwatch from "../Assets/smartwatchimg.png";
import headphone from "../Assets/headphonesimg.png";
import tws from "../Assets/tws.png";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);

  // Toggle main menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSubmenuOpen(false); // Close submenu when toggling the main menu
  };

  // Toggle submenu visibility
  const toggleSubmenu = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsSubmenuOpen((prev) => !prev);
  };

  // Close menu and submenu if clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setIsSubmenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Updated isActive function to handle the "Products" menu
  const isActive = (path) => {
    if (location.pathname === path) {
      return "border-b-2 border-white";
    } else if (
      ["/smartwatch", "/headphones", "/tws"].includes(location.pathname) &&
      path === "/products"
    ) {
      return "border-b-2 border-white";
    }
    return "text-white";
  };

  // Handle product link click and close submenu
  const handleProductClick = (path) => {
    navigate(path);
    setIsSubmenuOpen(false);
    setIsMenuOpen(false);
  };

  // Handle login/logout
  const handleAuthClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // User is logged in; handle logout
      localStorage.removeItem("authToken");
      window.location.reload(); // Force a full page reload to update the Navbar
      navigate("/");
    } else {
      // User is not logged in; navigate to login page
      navigate("/login");
    }
  };

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  return (
    <div className="navbar bg-gray-600" ref={menuRef}>
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost md:hidden"
            onClick={toggleMenu} // Toggle the menu on click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="space-y-4 dropdown-content bg-gray-500 rounded-box z-50 mt-3 w-52 p-6 shadow text-white gap-3"
            >
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <button className={isActive("/")}>Home</button>
                </Link>
              </li>
              <li>
                <button onClick={toggleSubmenu}>Products</button>
                {isSubmenuOpen && (
                  <ul className="p-4 w-48 ml-8 bg-gray-600 absolute left-0 z-50 shadow-lg rounded-xl space-y-3">
                    <li>
                      <button onClick={() => handleProductClick("/smartwatch")}>
                        Smart Watch
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleProductClick("/headphones")}>
                        Headphones
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleProductClick("/tws")}>
                        TWS
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/newlaunches" onClick={() => setIsMenuOpen(false)}>
                  <button className={isActive("/newlaunches")}>
                    New Launches
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/support" onClick={() => setIsMenuOpen(false)}>
                  <button className={isActive("/support")}>Support</button>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 xl:pl-10 md:gap-0">
          {/* Voice Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="hidden md:block w-10 md:w-20 xl:w-24 lg:w-20"
            />
          </Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <p className="text-2xl xl:text-4xl lg:text-3xl font-sriracha text-white cursor-pointer sm:pl-2">
              Voice
            </p>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden md:flex">
        {/* Desktop Menu */}
        <ul className=" menu-horizontal px-1 items-center xl:space-x-16 xl:ml-6 lg:space-x-10 lg:ml-6 md:space-x-6 md:ml-10 text-white text-lg  xl:text-lg lg:text-lg md:text-base">
          <li>
            <Link to="/">
              <button className={isActive("/")}>Home</button>
            </Link>
          </li>
          <li
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
            className="relative"
          >
            <button className={isActive("/products")}>Products</button>
            {isSubmenuOpen && (
              <ul className="menu p-2 xl:w-80 md:w-60 lg:w-72 bg-white text-black ring-2 ring-blue-400 absolute left-0 top-full z-50 shadow-lg rounded-xl xl:text-xl lg:text-lg">
                <li>
                  <button onClick={() => handleProductClick("/smartwatch")}>
                    <div className="flex items-center xl:gap-10 xl:py-4 lg:gap-8 lg:py-2 md:gap-6 md:py-1">
                      <img
                        src={smartwatch}
                        alt="Smart Watch"
                        className="w-16"
                      />
                      Smart Watch
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleProductClick("/headphones")}>
                    <div className="flex items-center xl:gap-10 xl:py-4 lg:gap-8 lg:py-2 md:gap-6 md:py-1">
                      <img src={headphone} alt="Headphones" className="w-16" />
                      Headphones
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleProductClick("/tws")}>
                    <div className="flex items-center xl:gap-10 xl:py-4 lg:gap-8 lg:py-2 md:gap-6 md:py-1">
                      <img src={tws} alt="TWS" className="w-16" />
                      TWS
                    </div>
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/newlaunches">
              <button className={isActive("/newlaunches")}>New Launches</button>
            </Link>
          </li>
          <li>
            <Link to="/support">
              <button className={isActive("/support")}>Support</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end xl:space-x-8 xl:pr-6 lg:pr-2 lg:space-x-4 sm:space-x-4">
        {/* Conditional Auth Button */}
        <button
          onClick={handleAuthClick}
          className={`bg-slate-200 xl:px-4 xl:py-2 lg:px-4 lg:py-[5px] sm:px-4 sm:py-1 rounded-2xl 
                      ${
                        isLoggedIn
                          ? "lg:active:bg-red-300 lg:active:text-black active:bg-red-700 active:text-white md:hover:ring-4 md:hover:ring-red-600"
                          : "lg:active:bg-slate-300 lg:active:text-black active:bg-gray-700 active:text-white"
                      } 
                      md:hover:ring-4 md:hover:ring-blue-600 transition-all ease-linear`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* Add Profile Section */}
        {isLoggedIn && (
          <button
            onClick={() => navigate("/profile")} // Redirect to profile page
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               rounded-full h-10 w-10 flex items-center justify-center 
               transition-all ease-in-out duration-200 hover:scale-105"
          >
            <span className="text-white font-bold">V</span>
          </button>
        )}

        <Link to="/cart">
          <button className="p-2 hover:bg-gray-700 hover:bg-opacity-30 rounded-lg transition-all ease-out delay-50">
            <div className="relative">
              <img
                src={cart_icon}
                alt="Cart Icon"
                className="pr-2 w-8 lg:w-10 filter grayscale invert"
              />
              <div className="absolute top-0 right-0 flex w-4 h-4 lg:w-6 lg:h-6 justify-center items-center bg-red-600 text-white lg:-mt-2 lg:-mr-2 -mt-1 -mr-1 rounded-full sm:text-xs xl:text-sm lg:text-sm">
                {getTotalCartItems()}
              </div>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
