"use client";
import Link from "next/link";
import Button from "../../utils/Button";
import { createClient } from "../../utils/supabase/client";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";

const Table = () => {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const handleRedirect = () => {
    setRedirecting(true);
  };

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
        const { data: rows, error } = await supabase
          .from("personList")
          .select("*");
        if (error) {
          console.error("Error fetching personList:", error);
          return;
        }

        const updatedData = await Promise.all(
          rows.map(async (row) => {
            // Calculate remaining days and end date
            const { remainingDays, endDate } = calculateRemainingDays(
              row.doj,
              row.plan
            );

            // Update status if membership expired
            await updateMembershipStatus(row.id, remainingDays);

            // Add remainingDays and endDate to row data
            row.remainingDays = remainingDays;
            row.membershipEndDate = endDate;

            // Handle image processing
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
        const sortedData = updatedData.sort((a, b) => {
          if (a.feesstatus === b.feesstatus) {
            // If status is the same, sort by name
            return a.fullName.localeCompare(b.fullName);
          }
          // Put unpaid (false) before paid (true)
          return a.feesstatus ? 1 : -1;
        });

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

  if (loading || redirecting) {
    return (
      <div className="h-[60vh] flex justify-center items-center ">
        <Loader />
      </div>
    );
  }

  return (
    <div>
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
            value={searchTerm}
            onChange={handleSearch}
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
              {/* <th scope="col" className="px-6 py-3">End Date</th> */}
              <th scope="col" className="px-6 py-3">
                Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              {/* <th scope="col" className="px-6 py-3">Remaining Days</th> */}
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
                <tr key={index} className="border-b">
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
                      className="px-6 py-7 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      onClick={handleRedirect}
                    >
                      {row.fullName}
                    </th>
                  </Link>
                  <td className="px-6 py-4">
                    {new Date(row.doj).toLocaleDateString("en-GB")}
                  </td>
                  {/* <td className="px-6 py-4">{row.membershipEndDate}</td> */}
                  <td className="px-6 py-4">{row.totalfees}</td>
                  <td className="px-6 py-4">{row.plan}</td>
                  {/* <td className="px-6 py-4">
                  <span className={`font-medium ${row.remainingDays <= 0 ? 'text-red-600' : 
                    row.remainingDays <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {row.remainingDays <= 0 ? 'Expired' : `${row.remainingDays} days`}
                  </span>
                </td> */}
                  <td className="text-white">
                    <Button status={row.feesstatus ? "paid" : "unpaid"} />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/editpersoninfo?${new URLSearchParams(
                        row
                      ).toString()}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={handleRedirect}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center px-6 py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
