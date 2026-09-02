import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const LandingPageNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0e0e11]/80 backdrop-blur-lg">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-lg font-bold tracking-wide text-white">
            ResumeForge
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/features" className="transition-colors hover:text-white">
            Features
          </Link>
          <Link
            to="/how-it-works"
            className="transition-colors hover:text-white"
          >
            How it Works
          </Link>
          <Link to="/contactus" className="transition-colors hover:text-white">
            Contact Us
          </Link>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/login"
            className="hidden transition-colors hover:text-white sm:block"
          >
            Login
          </Link>
          <button
            onClick={() => navigate("/register")}
            className="hidden rounded-md bg-[#6348ea] px-4 py-2 text-white transition-colors hover:bg-[#5035cc] sm:block"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center text-gray-300 hover:text-white md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Simple Mobile Dropdown (Right-Aligned) */}
      {isMobileMenuOpen && (
        <div className="absolute top-18 right-2 w-48 rounded-xl border border-white/10 bg-[#121214] p-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block transition-colors hover:text-[#6348ea]"
            >
              Home
            </Link>
            <Link
              to="/features"
              onClick={toggleMenu}
              className="block transition-colors hover:text-[#6348ea]"
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              onClick={toggleMenu}
              className="block transition-colors hover:text-[#6348ea]"
            >
              How it Works
            </Link>
            <Link
              to="/contactus"
              onClick={toggleMenu}
              className="block transition-colors hover:text-[#6348ea]"
            >
              Contact Us
            </Link>

            <div className="h-[1px] w-full bg-white/10"></div>

            <Link
              to="/login"
              onClick={toggleMenu}
              className="block transition-colors hover:text-[#6348ea]"
            >
              Login
            </Link>
            <button
              onClick={() => {
                navigate("/register");
                toggleMenu();
              }}
              className="w-full rounded-md bg-[#6348ea] py-2 text-center text-white transition-colors hover:bg-[#5035cc]"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavbar;
