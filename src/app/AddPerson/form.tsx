"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { createClient } from "../../utils/supabase/client";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import "./addperson.css"
// Function to compress image
const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Maximum dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to Blob with reduced quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new file from blob
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Canvas to Blob conversion failed"));
            }
          },
          "image/jpeg",
          0.1 // Compression quality (0.7 = 70% quality)
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState("");

  // Effect to update membership plan when fees status changes
  useEffect(() => {
    if (!feesPaid) {
      setMembershipPlan("0 Month");
    }
  }, [feesPaid]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files)
    if (files && files.length > 0) {
      try {
        const compressedImage = await compressImage(files[0]);
        setImageFile(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to compress image!");
      }
    } else {
      setImageFile(null);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let imagePath = null;

      if (imageFile) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("gymweb")
            .upload(`images/${imageFile.name}+${mobileNumber}`, imageFile);
        if (storageError) {
          console.error("Error uploading image:", storageError.message);
          alert("Failed to upload image!");
          setIsLoading(false);
          return;
        }

        imagePath = storageData.path;
      }

      const { data, error } = await supabase.from("personList").insert([
        {
          fullName,
          mobileNumber,
          plan: !feesPaid ? "0 Month" : membershipPlan, // Ensure 0 Month is saved when fees not paid
          doj: dateOfJoin,
          totalfees: totalFees,
          feesstatus: feesPaid,
          imagePath,
          weight
        },
      ]);

      if (error) {
        alert("Failed to save data!");
      } else {
        alert("Data saved successfully!");
        // Reset form inputs
        setFullName("");
        setMobileNumber("");
        setMembershipPlan("");
        setDateOfJoin("");
        setTotalFees("");
        setFeesPaid(false);
        setImageFile(null);
        setWeight("");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred!");
    } finally {
      setIsLoading(false);
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

                <div className="flex items-center gap-x-3">
                  {imageFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Selected"
                        style={{ objectFit: "cover", marginTop: "10px" }}
                        className="h-16 w-16 rounded-full"
                      />
                    </div>
                  ) : (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="h-16 w-16 text-blue-300"
                    />
                  )}

                  {/* add photo start */}
                  <div>
                    <span>
                      <div className={`file-input ${imageFile ? "pt-3" : ""}`}>
                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          className="file-input__input-profile "
                          accept='image/*'
                          onChange={handleFileChange}

                        />
                        <label className="file-input__label-profile bg-blue-700" htmlFor="file-input">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="upload"
                            className="svg-inline--fa fa-upload fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                            ></path>
                          </svg>
                          <span>{imageFile?.name ?? "Update Image Photo"}</span>
                        </label>
                      </div>
                    </span>
                  </div>
                  {/* camera option */}
                  <div className="buttonn">
                    <span>
                      <div className={`${imageFile ? "pt-3" : ""}`}>
                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          className="file-input__input-profile "
                          accept='image/*'
                          capture="environment"
                          onChange={handleFileChange}
                        />
                        <label className="" htmlFor="file-input">
                          <span className="lablee"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" fill="none" className="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path><path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path></g></svg>
                          </span>
                        </label>
                      </div>
                    </span>
                  </div>
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="weight"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Weight
                </label>
                <div className="mt-2">
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {membershipPlan} Membership Plan
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
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form >
    </div >
  );
}
