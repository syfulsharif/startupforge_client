"use client";

import React from "react";
import { AppProvider } from "../context/AppContext";
import { GlobalLoader } from "../layouts/GlobalLoader";
import { Navbar } from "../layouts/Navbar";
import { Footer } from "../layouts/Footer";

export default function Providers({ children }) {
  return (
    <AppProvider>
      <GlobalLoader />
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-hidden">
        {/* Decorative Frosted Glass Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-[40%] left-[80%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

        {/* Navigation Bar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Core Layout Main */}
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>

        {/* Fluid footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}
