"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, UserX, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BottomNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
        return;
      }
      
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: Home,
      onClick: undefined
    },
    {
      name: "NotPaid",
      link: "/notpaid",
      icon: Users,
      onClick: undefined,
    },
    {
      name: "Non Active",
      link: "/non-active",
      icon: UserX,
      onClick: undefined,
    },
    {
      name: "Logout",
      link: "#",
      icon: LogOut,
      onClick: handleLogout
    }
  ];

  return (
    <div className="fixed bottom-4 inset-x-0 mx-auto w-[94%] max-w-sm z-50">
      <div className="bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border border-gray-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full p-1.5 transition-all duration-300">
        <nav className="flex items-center justify-between relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;

            if (item.onClick) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 focus:outline-none"
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.link}
                href={item.link}
                className="flex-1 relative flex flex-col items-center justify-center py-2 px-1 rounded-full transition-colors duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-md shadow-indigo-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 flex flex-col items-center justify-center ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] tracking-tight whitespace-nowrap">
                    {item.name}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNavbar;
