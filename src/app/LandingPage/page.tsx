"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import BottomNavbar from "./bottom-navbar";
import LandingPageHeader from "./header";
import Table from "./table";
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = () => {
    setRedirecting(true);
  };

  if (redirecting) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-24">
      <LandingPageHeader />
      <BottomNavbar />
      
      <div className="container mx-auto px-4 py-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 right-8 z-40"
        >
          <Link href="/AddPerson">
            <button 
              onClick={handleRedirect}
              className="group relative overflow-hidden 
              rounded-full p-4 bg-blue-600 text-white 
              shadow-xl hover:shadow-2xl transition-all duration-300 
              transform hover:scale-105 focus:outline-none 
              focus:ring-4 focus:ring-blue-300"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="sr-only">Add New Person</span>
            </button>
          </Link>
        </motion.div>

        <Table />
      </div>
    </div>
  );
};

export default LandingPage;