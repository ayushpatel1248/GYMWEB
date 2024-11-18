"use client"
import FloatingNavDemo from "./navbar";
import WordPullUp from "@/components/ui/word-pull-up";
import Table from "./table";
import Link from "next/link";
import { useState } from "react";

const LandingPage = () => {

  return (
    <div>
      <FloatingNavDemo />
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-blue-700 dark:text-white md:text-7xl md:leading-[5rem]"
        words="SR Fitness"
      />
      <div className="h-20"></div>

      <form className="max-w-md mx-5 mb-5" onSubmit={(e) => e.preventDefault()}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            {/* SVG icon here */}
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Person"
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="h-20 bottom-8 right-9 fixed z-40">
        <Link href="/AddPerson">
          <button
            type="button"
            className="border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-5 text-center inline-flex items-center bg-blue-700 dark:border-blue-500 dark:text-white dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 text-white"
          >
            Add
            <span className="sr-only">Icon description</span>
          </button>
        </Link>
      </div>
      <Table />
    </div>
  );
};

export default LandingPage;