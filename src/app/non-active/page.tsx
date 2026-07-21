"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, PlusIcon, UserX, UserCheck } from "lucide-react";
import React from "react";
import BottomNavbar from "../LandingPage/bottom-navbar";
import LandingPageHeader from "../LandingPage/header";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
    {status}
  </span>
);

const NonActiveMembers = () => {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const parsePlanMonths = (planString: string): number => {
    if (!planString) return 1;
    const matches = planString.match(/(\d+)/);
    return matches ? parseInt(matches[0]) : 1;
  };

  const calculateRemainingDays = (doj: string, planString: string) => {
    const joinDate = new Date(doj);
    const monthsToAdd = parsePlanMonths(planString);

    const membershipEndDate = new Date(joinDate);
    membershipEndDate.setMonth(membershipEndDate.getMonth() + monthsToAdd);

    if (joinDate.getDate() !== membershipEndDate.getDate()) {
      membershipEndDate.setDate(2);
    }

    membershipEndDate.setHours(23, 59, 59, 999);
    const currentDate = new Date();

    const remainingTime = membershipEndDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return {
      remainingDays,
      endDate: membershipEndDate.toLocaleDateString(),
    };
  };

  const updateMembershipStatus = async (
    userId: string,
    remainingDays: number
  ) => {
    if (remainingDays <= 0) {
      try {
        const { error } = await supabase
          .from("personList")
          .update({ feesstatus: false })
          .eq("id", userId);

        if (error) {
          console.error("Error updating membership status:", error);
        }
      } catch (err) {
        console.error("Error in updateMembershipStatus:", err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all members with unpaid status (feesstatus = false)
        const { data: rows, error } = await supabase
          .from("personList")
          .select("*")
          .eq("feesstatus", false);

        if (error) {
          console.error("Error fetching personList:", error);
          return;
        }

        const updatedData = await Promise.all(
          (rows || []).map(async (row) => {
            const { remainingDays, endDate } = calculateRemainingDays(
              row.doj,
              row.plan
            );

            await updateMembershipStatus(row.id, remainingDays);

            row.remainingDays = remainingDays;
            row.membershipEndDate = endDate;

            try {
              if (row.imagePath) {
                const { data: imageData, error: imageError } =
                  await supabase.storage.from("gymweb").download(row.imagePath);

                if (imageError) {
                  console.error(
                    `Error fetching image for ${row.id}:`,
                    imageError
                  );
                  row.imageUrl = "";
                } else {
                  const imageUrl = URL.createObjectURL(imageData);
                  row.imageUrl = imageUrl;
                }
              } else {
                row.imageUrl = "";
              }
            } catch (innerError) {
              console.error(`Error processing row ${row.id}:`, innerError);
              row.imageUrl = "";
            }

            return row;
          })
        );

        // Filter members whose fees are unpaid for MORE than 1 month (overdue > 30 days, i.e. remainingDays < -30)
        const nonActiveMembers = updatedData.filter(
          (row) => row.remainingDays < -30
        );

        // Sort alphabetically by full name
        const sortedData = nonActiveMembers.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );

        setData(nonActiveMembers);
        setFilteredData(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActivateMember = async (id: string, name: string) => {
    const confirmAction = window.confirm(
      `Are you sure you want to move ${name} to Active Members? (Date of join will remain unchanged)`
    );
    if (!confirmAction) return;

    try {
      // Update member feesstatus to true without changing their original doj
      const { error } = await supabase
        .from("personList")
        .update({ feesstatus: true })
        .eq("id", id);

      if (error) {
        console.error("Error activating member:", error.message);
        alert("Failed to activate member. Please try again.");
        return;
      }

      // Remove from local list so they disappear from non-active view
      setData((prev) => prev.filter((member) => member.id !== id));
      setFilteredData((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      console.error("Unexpected error activating member:", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = data.filter((row) =>
      row.fullName.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-24">
      <LandingPageHeader />
      <BottomNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Banner / Header Title */}
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-red-900/20 via-red-800/10 to-transparent border border-red-200 dark:border-red-950 flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-lg text-red-600 dark:text-red-400">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Non-Active Members
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 font-semibold">
                {filteredData.length}
              </span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Members whose fees have been unpaid for more than 1 month (30+ days overdue).
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
          <div className="p-4 bg-gray-50 dark:bg-zinc-900">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search Non-Active Members..."
                className="w-full pl-10 pr-4 py-2 rounded-lg 
              border border-gray-300 dark:border-zinc-700 
              bg-white dark:bg-black 
              text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-red-500 focus:border-red-500 
              transition-colors duration-300"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-zinc-900">
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Date of Join",
                    "Overdue",
                    "Fees",
                    "Plan",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => {
                      const daysOverdue = Math.abs(row.remainingDays);
                      return (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b dark:border-zinc-800 hover:bg-red-50/30 dark:hover:bg-red-950/20 transition-colors"
                        >
                          <td className="px-4 py-4">
                            {row.imageUrl ? (
                              <img
                                src={row.imageUrl}
                                alt={row.fullName}
                                className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full border-2 border-red-500"></div>
                            )}
                          </td>
                          <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                            <Link
                              href={`/aboutPerson?${new URLSearchParams({
                                ...row,
                                wp: JSON.stringify(row.wp),
                                transaction: JSON.stringify(row.transaction),
                              }).toString()}`}
                            >
                              <span className="hover:underline hover:text-red-500 transition-colors">
                                {row.fullName}
                              </span>
                            </Link>
                          </td>

                          <td className="px-4 py-4 text-gray-500 dark:text-gray-300">
                            {new Date(row.doj).toLocaleDateString("en-GB")}
                          </td>

                          <td className="px-4 py-4 text-red-600 dark:text-red-400 font-semibold text-sm">
                            {daysOverdue} days overdue
                          </td>

                          <td className="px-4 py-4 font-semibold text-gray-700 dark:text-gray-200">
                            {row.totalfees}
                          </td>
                          <td className="px-4 py-4 text-gray-500 dark:text-gray-300">
                            {row.plan}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status="Non-Active" />
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleActivateMember(row.id, row.fullName)
                                }
                                title="Move member to Active / Home"
                                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-green-100 hover:bg-green-200 dark:bg-green-950 dark:hover:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800 transition-all transform hover:scale-105 active:scale-95"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Move to Home</span>
                              </button>
                              <Link
                                href={`/editpersoninfo?${new URLSearchParams({
                                  ...row,
                                  wp: JSON.stringify(row.wp),
                                  transaction: JSON.stringify(row.transaction),
                                }).toString()}`}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors font-medium text-xs px-2 py-1"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-12 text-gray-500 dark:text-gray-400"
                      >
                        <UserX className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        No non-active members found
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 right-8 z-40"
        >
          <Link href="/AddPerson">
            <button
              onClick={() => setLoading(true)}
              className="group relative overflow-hidden 
            rounded-full p-4 bg-blue-600 text-white 
            shadow-xl hover:shadow-2xl transition-all duration-300 
            transform hover:scale-105 focus:outline-none 
            focus:ring-4 focus:ring-blue-300"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NonActiveMembers;
