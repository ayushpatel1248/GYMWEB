"use client"; // Add this at the top of the file

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { createClient } from "../../utils/supabase/client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Form() {
  const supabase = createClient();

  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [membershipPlan, setMembershipPlan] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Access the files property
    if (files && files.length > 0) {
      setImageFile(files[0]); // Save the first file
    } else {
      setImageFile(null); // Reset to null if no file is selected
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing the page

    try {
      let imagePath = null;

      // Upload image to Supabase Storage if a file is selected
      if (imageFile) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("gymweb") // Replace with your Supabase storage bucket name
            .upload(`images/${imageFile.name}`, imageFile);

        if (storageError) {
          console.error("Error uploading image:", storageError.message);
          alert("Failed to upload image!");
          return;
        }

        imagePath = storageData.path; // Get the path of the uploaded file
      }

      // Insert form data into the database
      const { data, error } = await supabase.from("personList").insert([
        {
          fullName,
          mobileNumber,
          plan: membershipPlan,
          doj: dateOfJoin,
          totalfees: totalFees,
          feesstatus: feesPaid,
          imagePath, // Save the image path
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        alert("Failed to save data!");
      } else {
        console.log("Data inserted successfully:", data);
        alert("Data saved successfully!");
        // Reset form inputs
        setFullName("");
        setMobileNumber("");
        setMembershipPlan("");
        setDateOfJoin("");
        setTotalFees("");
        setFeesPaid(false);
        setImageFile(null); // Reset file input
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred!");
    }
  };

  return (
    <div className="container mt-20 mb-20">
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900 border bg-slate-200 text-center rounded-lg">
              Add Person
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Add Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-300"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Fields */}
          <div className="border-b border-gray-900/10 pb-5">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="full-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="mobile-number"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    id="mobile-number"
                    name="mobile-number"
                    type="number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Membership Plan
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  as="div"
                  className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  {["1 Month", "3 Month", "6 Month", "12 Month"].map((plan) => (
                    <MenuItem
                      key={plan}
                      as="button"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => setMembershipPlan(plan)}
                    >
                      {plan}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Date Of Join
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={dateOfJoin}
                    onChange={(e) => setDateOfJoin(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="number"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Total Fees
                </label>
                <div className="mt-2">
                  <input
                    id="number"
                    name="number"
                    type="number"
                    value={totalFees}
                    onChange={(e) => setTotalFees(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="fees-paid"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Fees Paid or Not
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feesPaid}
                    onChange={(e) => setFeesPaid(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
