import React from "react";
import { Outlet } from "react-router";
import LandingPageNavbar from "./components/LandingPageNavbar";
import Footer from "./components/Footer";

export default function ResumeForgeLanding() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0e0e11] font-sans text-gray-300 selection:bg-[#6348ea] selection:text-white">
      {/* Subtle Background Grid - Fixed globally behind all pages */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/*  Navbar */}
        <LandingPageNavbar />

        <main className="flex flex-grow flex-col pt-16">
          <Outlet />
        </main>

        {/*  Footer */}
        <Footer />
      </div>
    </div>
  );
}
