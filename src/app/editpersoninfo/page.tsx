"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Edit, Plus, Minus, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "../../utils/supabase/client";
import Loader from "./../../components/ui/Loader";
// import { redirect } from 'next/navigation'
import { useRouter } from "next/navigation";
import FloatingNavDemo from "../LandingPage/navbar";
import WordPullUp from "@/components/ui/word-pull-up";
// Interface for form data
interface FormData {
  fullName: string | null;
  mobileNumber: string | null;
  weight: string | null;
  membershipPlan: number;
}

// Interface for edit states
interface EditStates {
  fullName: boolean;
  mobileNumber: boolean;
  weight: boolean;
  membershipPlan: boolean;
}

// Type for form field keys
type FormField = keyof FormData;

const EditProfilePage: React.FC = () => {
  const [isloading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobileNumber: "",
    weight: "",
    membershipPlan: 0,
  });

  const [editStates, setEditStates] = useState<EditStates>({
    fullName: false,
    mobileNumber: false,
    weight: false,
    membershipPlan: true,
  });

  const handleToggle = (field: FormField): void => {
    setEditStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (field: FormField, value: string | number): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true);

    try {
      // Prepare the data for submission
      const { fullName, mobileNumber, weight, membershipPlan } = formData;

      // Perform the update operation
      const { data, error } = await supabase
        .from("personList") // Replace 'profiles' with your table name
        .update({
          fullName: fullName, // Match the column names in your database
          mobileNumber: mobileNumber,
          weight,
          plan: membershipPlan,
        })
        .eq("id", param?.get("id")); // Ensure the `id` is provided (e.g., from URL params)

      // Handle success or error
      if (error) {
        console.error("Error updating data:", error.message);
        // alert('Failed to update profile. Please try again.');
      } else {
        router.push("/");
        // console.log('Data updated successfully:', data);
        // alert('Profile updated successfully!');
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log("An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Input change handler with type safety
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: FormField
  ): void => {
    const value = e.target.value;
    handleChange(field, value);
  };
  const [param, setParam] = useState<URLSearchParams | null>(null);
  const [plan, setPlan] = useState(0);
  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const param = new URLSearchParams(urlObj.search);
    setParam(param);
    setFormData((prev) => ({
      ...prev,
      fullName: param.get("fullName"),
      mobileNumber: param.get("mobileNumber"),
      weight: param.get("weight"),
      membershipPlan: Number(param.get("plan")?.split(" ")[0]) ?? 0,
    }));
    setPlan(Number(param.get("plan")?.split(" ")[0]));
    console.log(param.get("plan"));
  }, []);

  return isloading == true ? (
    <div className="w-full flex justify-center h-screen items-center">
      <Loader />
    </div>
  ) : (
    <>
      <FloatingNavDemo />
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-blue-700 dark:text-white md:text-7xl md:leading-[5rem]"
        words="SR Fitness"
      />
      <div className="h-20"></div>
      <div className="min-h-screen bg-gray-50 p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Edit Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-gray-500" />
                    <Switch
                      checked={editStates.fullName}
                      onCheckedChange={() => handleToggle("fullName")}
                    />
                  </div>
                </div>
                <Input
                  type="text"
                  value={formData.fullName ?? ""}
                  onChange={(e) => handleInputChange(e, "fullName")}
                  disabled={!editStates.fullName}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-gray-500" />
                    <Switch
                      checked={editStates.mobileNumber}
                      onCheckedChange={() => handleToggle("mobileNumber")}
                    />
                  </div>
                </div>
                <Input
                  type="tel"
                  value={formData.mobileNumber ?? ""}
                  onChange={(e) => handleInputChange(e, "mobileNumber")}
                  disabled={!editStates.mobileNumber}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Weight Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-gray-500" />
                    <Switch
                      checked={editStates.weight}
                      onCheckedChange={() => handleToggle("weight")}
                    />
                  </div>
                </div>
                <Input
                  type="number"
                  value={formData.weight ?? ""}
                  onChange={(e) => handleInputChange(e, "weight")}
                  disabled={!editStates.weight}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Membership Plan Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Membership Plan</label>
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-gray-500" />
                    <Switch
                      checked={editStates.membershipPlan}
                      onCheckedChange={() => handleToggle("membershipPlan")}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={
                      formData.membershipPlan <= plan ||
                      !editStates.membershipPlan
                    }
                    onClick={() =>
                      handleChange(
                        "membershipPlan",
                        Math.max(1, formData.membershipPlan - 1)
                      )
                    }
                    className={`transition-transform hover:scale-105`}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={formData.membershipPlan ?? ""}
                    readOnly
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={!editStates.membershipPlan}
                    onClick={() =>
                      handleChange(
                        "membershipPlan",
                        formData.membershipPlan + 1
                      )
                    }
                    className="transition-transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full transition-transform hover:scale-105 bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditProfilePage;
