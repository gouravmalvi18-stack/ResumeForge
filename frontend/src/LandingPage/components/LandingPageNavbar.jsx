import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "How it Works", path: "/how-it-works" },
  { name: "Contact Us", path: "/contactus" },
];

const LandingPageNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0e0e11]/80 backdrop-blur-lg"
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.svg
            whileHover={{ rotate: 180 }}
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </motion.svg>
          <span className="text-lg font-bold tracking-wide text-white">
            ResumeForge
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ scale: 1.05, y: -2 }}>
              <Link
                to={link.path}
                className="text-gray-300 transition-colors hover:text-[#6348ea]"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Login Buttons */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/login"
            className="hidden text-gray-300 transition-colors hover:text-white sm:block"
          >
            Login
          </Link>

          {/* Action Get Started Buttons */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="hidden rounded-md bg-[#6348ea] px-4 py-2 text-white shadow-[0_0_15px_rgba(99,72,234,0.3)] transition-colors hover:bg-[#5035cc] sm:block"
          >
            Get Started
          </motion.button>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
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
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-18 right-2 w-48 origin-top-right rounded-xl border border-white/10 bg-[#121214] p-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-[#6348ea]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-[1px] w-full bg-white/10" />

              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-[#6348ea]"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default LandingPageNavbar;
