"use client";

import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./_components/sidebar";
import react from "react";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const router = useRouter();

  react.useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/protected`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchProtectedData();
  }, [router]);
  return (
    <>
      <div className="flex flex-col md:flex-row w-svw h-svh">
        <Sidebar />

        <div className="flex-1">{children}</div>
        <Toaster />
      </div>
    </>
  );
}

export default DashboardLayout;
