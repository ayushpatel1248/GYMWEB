"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bell, UserCircle, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../../public/asseet/landingpage/gymcirclelogo.png";
import Link from "next/link";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-zinc-800 transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};

const LandingPageHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-zinc-800/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo and Name with Generous Spacing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center gap-4 sm:gap-5 group">
            <div className="h-10 w-10 relative flex-shrink-0">
              <Image
                className="h-full w-full object-contain"
                src={logo}
                alt="SR Fitness logo"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                SR Fitness
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Action Icons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center space-x-3"
        >
          {/* Day / Night 1-Click Toggle Button */}
          <ThemeToggleButton />

          {/* Notification Button */}
          <Link href="/notification" title="Notifications">
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-white transition-colors duration-200">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 block h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
            </button>
          </Link>

          {/* Dashboard Icon */}
          <Link
            href="/dashboard"
            title="Dashboard"
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-white transition-colors duration-200"
          >
            <UserCircle className="w-7 h-7" />
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default LandingPageHeader;
