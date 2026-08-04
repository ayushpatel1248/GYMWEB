"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, PlusIcon, UserX, UserCheck, Loader2 } from "lucide-react";
import React from "react";
import BottomNavbar from "../LandingPage/bottom-navbar";
import LandingPageHeader from "../LandingPage/header";
import { generateAndUploadInvoice, InvoiceData } from "@/components/invoicegenerator";

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
  const [activatingMember, setActivatingMember] = useState<any | null>(null);
  const [newDoj, setNewDoj] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("1 Month");
  const [totalFees, setTotalFees] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<"cash" | "upi">("cash");
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [feesPaid, setFeesPaid] = useState<boolean>(true);

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

  const handleOpenActivateModal = (member: any) => {
    setActivatingMember(member);
    setSelectedPlan(member.plan || "1 Month");
    setTotalFees(member.totalfees?.toString() || "");
    setPaymentMode("cash");
    setFeesPaid(true);

    // Set default date to today's date formatted as YYYY-MM-DD in local time
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setNewDoj(`${year}-${month}-${day}`);
  };

  const handleConfirmActivate = async () => {
    if (!activatingMember) return;
    setIsActivating(true);

    try {
      let updatePayload: any = {};

      if (feesPaid) {
        // Calculate validUntil date based on selected plan
        const joinDate = new Date(newDoj);
        const validUntil = new Date(joinDate);
        switch (selectedPlan) {
          case "1 Month":
            validUntil.setMonth(validUntil.getMonth() + 1);
            break;
          case "3 Month":
            validUntil.setMonth(validUntil.getMonth() + 3);
            break;
          case "6 Month":
            validUntil.setMonth(validUntil.getMonth() + 6);
            break;
          case "12 Month":
            validUntil.setFullYear(validUntil.getFullYear() + 1);
            break;
          default:
            break;
        }

        // Generate invoice
        const invoiceData: InvoiceData = {
          customerName: activatingMember.fullName,
          mobileNumber: activatingMember.mobileNumber || "",
          amount: Number(totalFees) || 0,
          paymentMode: paymentMode,
          planDuration: selectedPlan,
          validFrom: newDoj,
          validUntil: validUntil.toISOString().split("T")[0],
          invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        };

        let invoiceUrl = "";
        try {
          invoiceUrl = await generateAndUploadInvoice(invoiceData);
        } catch (invoiceErr) {
          console.error("Error generating/uploading invoice:", invoiceErr);
        }

        // Create new transaction
        const newTransaction = {
          paymentDate: newDoj,
          mode: paymentMode,
          validUntil: validUntil.toISOString().split("T")[0],
          amount: Number(totalFees) || 0,
          invoiceUrl,
        };

        const currentTransactions = Array.isArray(activatingMember.transaction)
          ? activatingMember.transaction
          : [];

        const updatedTransactions = [...currentTransactions, newTransaction];

        updatePayload = {
          feesstatus: true,
          doj: newDoj,
          plan: selectedPlan,
          totalfees: Number(totalFees) || 0,
          transaction: updatedTransactions
        };
      } else {
        // Unpaid reactivation
        updatePayload = {
          feesstatus: false,
          doj: newDoj,
          plan: "0 Month",
          totalfees: Number(totalFees) || 0
        };
      }

      // Update both feesstatus to true, new doj, plan, totalfees and transaction history in DB
      const { error } = await supabase
        .from("personList")
        .update(updatePayload)
        .eq("id", activatingMember.id);

      if (error) {
        console.error("Error activating member:", error.message);
        alert("Failed to activate member. Please try again.");
        return;
      }

      // Remove from local list so they disappear from non-active view
      setData((prev) => prev.filter((member) => member.id !== activatingMember.id));
      setFilteredData((prev) => prev.filter((member) => member.id !== activatingMember.id));
      setActivatingMember(null);
    } catch (err) {
      console.error("Unexpected error activating member:", err);
      alert("An error occurred during activation. Please try again.");
    } finally {
      setIsActivating(false);
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
                                  handleOpenActivateModal(row)
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

      {/* Activation Modal */}
      <AnimatePresence>
        {activatingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Activate Member
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Moving <span className="font-semibold text-gray-800 dark:text-gray-200">{activatingMember.fullName}</span> to active status. Configure their membership options below.
                </p>

                <div className="space-y-4 mb-6">
                  {/* Date of Joining */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      value={newDoj}
                      onChange={(e) => setNewDoj(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  {/* Fees Paid or Not Toggle */}
                  <div className="flex items-center justify-between py-2 border-b dark:border-zinc-800">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Fees Paid or Not
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feesPaid}
                        onChange={(e) => setFeesPaid(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:border-zinc-600"></div>
                    </label>
                  </div>

                  {feesPaid && (
                    <>
                      {/* Membership Plan */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Membership Plan
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {["1 Month", "3 Month", "6 Month", "12 Month"].map((planOption) => (
                            <button
                              key={planOption}
                              type="button"
                              onClick={() => setSelectedPlan(planOption)}
                              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                                selectedPlan === planOption
                                  ? "bg-blue-600 border-blue-600 text-white shadow-md font-bold"
                                  : "border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-900"
                              }`}
                            >
                              {planOption}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Total Fees */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {feesPaid ? "Total Fees Paid (₹)" : "Fees Amount to Pay (₹)"}
                    </label>
                    <input
                      type="number"
                      value={totalFees}
                      onChange={(e) => setTotalFees(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                    />
                  </div>

                  {feesPaid && (
                    <>
                      {/* Payment Mode */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                          Payment Mode
                        </label>
                        <div className="flex gap-2">
                          {(["cash", "upi"] as const).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setPaymentMode(mode)}
                              className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                                paymentMode === mode
                                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                                  : "border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900"
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t dark:border-zinc-800 pt-4">
                  <button
                    onClick={() => setActivatingMember(null)}
                    disabled={isActivating}
                    className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmActivate}
                    disabled={isActivating}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-zinc-800 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {isActivating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Activating...</span>
                      </>
                    ) : (
                      <span>Activate & Move to Home</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NonActiveMembers;
