"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../hooks/use-toast";
// import supabase from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client"; // Use client-side Supabase client
import { Toaster } from "@/components/ui/toaster";

// import toast
const login = () => {
  const { toast } = useToast();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "srfitness@gmail.com",
    password: "",
  });
  const router = useRouter();
  supabase.auth.onAuthStateChange((event, session) => {
    // console.log("resolve = ",event, session); // This will help debug session changes
  });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // console.log(dataUser);
      const check = await supabase.auth.getUser();
      // console.log("here", JSON.stringify(check));
      if (!error) {
        // console.log("inside if condition");
        // console.log(data);
        router.push("/");
      }
      if (error) {
        // console.log(error);
        toast({
          variant: "destructive",
          title: "oh No!",
          description: `${error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: `${err}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      // console.log(err);
    }
    finally{
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-10">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-blue-700 dark:text-white"
          >
            SR Fitness
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={login}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500"
                >
                  {isLoading ? <span>Signingin.....</span> : <span>Sign in</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default login;
