"use client";
import Link from "next/link";
import Button from "../../utils/Button";
import { createClient } from "../../utils/supabase/client";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import FloatingNavDemo from "../LandingPage/navbar";
import WordPullUp from "@/components/ui/word-pull-up";

const NotPaid = () => {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const parsePlanMonths = (planString: string): number => {
    const matches = planString.match(/(\d+)/);
    return matches ? parseInt(matches[0]) : 1;
  };

  const calculateRemainingDays = (doj: string, planString: string) => {
    const joinDate = new Date(doj);
    const monthsToAdd = parsePlanMonths(planString);

    // Get the end date
    const membershipEndDate = new Date(joinDate);

    // Add months considering variable month lengths
    // If the current day is 31st and next month has 30 days, it will correctly adjust
    membershipEndDate.setMonth(membershipEndDate.getMonth() + monthsToAdd);

    // Handle edge case where joining on 31st and ending month has fewer days
    if (joinDate.getDate() !== membershipEndDate.getDate()) {
      // This means we've hit the edge case of e.g., Jan 31 -> Feb 28
      // Go back to the last day of the intended month
      membershipEndDate.setDate(2);
    }

    // Set the time to end of day to include the full last day
    membershipEndDate.setHours(23, 59, 59, 999);

    const currentDate = new Date();

    // Calculate remaining time in milliseconds
    const remainingTime = membershipEndDate.getTime() - currentDate.getTime();

    // Convert to days and round up to give benefit of partial days to user
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
        // Modify the query to only fetch users with feesstatus false
        const { data: rows, error } = await supabase
          .from("personList")
          .select("*")
          .eq("feesstatus", false); // Only fetch unpaid members

        if (error) {
          console.error("Error fetching personList:", error);
          return;
        }

        const updatedData = await Promise.all(
          rows.map(async (row) => {
            // Rest of the processing remains the same
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

        // Sort by name within unpaid members
        const sortedData = updatedData.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );

        setData(updatedData);
        setFilteredData(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="h-[60vh] flex justify-center items-center ">
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

      <form className="max-w-md mx-5 mb-5" onSubmit={(e) => e.preventDefault()}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Unpaid Person"
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                DOJ
              </th>
              <th scope="col" className="px-6 py-3">
                Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    {row.imageUrl ? (
                      <img
                        src={row.imageUrl}
                        alt="User Image"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    )}
                  </td>
                  <Link
                    href={`/aboutPerson?${new URLSearchParams(row).toString()}`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {row.fullName}
                    </th>
                  </Link>
                  <td className="px-6 py-4">
                    {new Date(row.doj).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4">{row.totalfees}</td>
                  <td className="px-6 py-4">{row.plan}</td>
                  <td className="text-white">
                    <Button status="unpaid" />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/editpersoninfo?${new URLSearchParams(
                        row
                      ).toString()}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center px-6 py-4">
                  No unpaid members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotPaid;
