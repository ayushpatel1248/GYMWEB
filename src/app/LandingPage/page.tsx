"use client";
import FloatingNavDemo from "./navbar";
import WordPullUp from "@/components/ui/word-pull-up";
import Table from "./table";
import Link from "next/link";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

const LandingPage = () => {
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const handleRedirect = () => {
    setRedirecting(true);
  };

  if (redirecting) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <FloatingNavDemo />
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-blue-700 dark:text-white md:text-7xl md:leading-[5rem]"
        words="SR Fitness"
      />
      <div className="h-20"></div>
      <div className="h-20 bottom-8 right-9 fixed z-40">
        <Link href="/AddPerson">
          <button
            type="button"
            className="border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-5 text-center inline-flex items-center bg-blue-700 dark:border-blue-500 dark:text-white dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 text-white"
            onClick={handleRedirect}
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
