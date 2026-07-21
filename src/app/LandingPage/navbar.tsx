"use client";
import React from "react";
import { FloatingNav } from "../../components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser, IconUserOff } from "@tabler/icons-react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "NotPaid",
      link: "/notpaid",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Non Active",
      link: "/non-active",
      icon: <IconUserOff className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  // const supabase = createClient();

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
