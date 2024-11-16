"use client";
import Link from "next/link";
import Button from "../../utils/Button";
import { createClient } from "../../utils/supabase/client";
import { useState, useEffect } from "react";

const Table = () => {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]); // Store fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: rows, error } = await supabase.from("personList").select("*"); // Replace with your table name
        if (error) {
          console.error("Error fetching personList:", error);
          return;
        }

        // Log fetched rows
        console.log("Fetched rows:", rows);

        const updatedData = await Promise.all(
          rows.map(async (row) => {
            try {
              if (row.imagePath) {
                // Fetch the image from Supabase storage
                const { data: imageData, error: imageError } = await supabase
                  .storage
                  .from("gymweb") // Replace with your storage bucket
                  .download(row.imagePath); // Assuming 'imagePath' is the column with image filenames

                if (imageError) {
                  console.error(`Error fetching image for ${row.id}:`, imageError);
                  row.imageUrl = ""; // Fallback for missing image
                } else {
                  const imageUrl = URL.createObjectURL(imageData);
                  row.imageUrl = imageUrl; // Set image URL
                }
              } else {
                row.imageUrl = ""; // Handle missing image path
              }
            } catch (innerError) {
              console.error(`Error processing row ${row.id}:`, innerError);
              row.imageUrl = ""; // Ensure fallback
            }

            return row;
          })
        );

        // Log the updated data with image URLs
        console.log("Updated data:", updatedData);

        setData(updatedData); // Store updated data with image URLs
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false when the fetch is done
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Image</th> {/* New column for image */}
            <th scope="col" className="px-6 py-3">NAME</th>
            <th scope="col" className="px-6 py-3">DOJ</th>
            <th scope="col" className="px-6 py-3">Fees</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  {row.imageUrl ? (
                    <img
                      src={row.imageUrl}
                      alt="User Image"
                      className="w-10 h-10 object-cover rounded-full" // Styling the image
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div> // Placeholder if no image
                  )}
                </td>
                <Link href={`/aboutPerson?userId=${row.id}`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row.fullName}
                  </th>
                </Link>
                <td className="px-6 py-4">{row.doj}</td>
                <td className="px-6 py-4">{row.totalfees}</td>
                <td className="text-white">
                  <Button status={row.feesstatus ? "paid" : "unpaid"} />
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center px-6 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
