"use client";

import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./_components/sidebar";
import react from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/contexts/contextApi";

function DashboardLayout({ children }) {
  const router = useRouter();
  const { userData, setUserData } = useApi();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  react.useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/protected`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          router.push("/login");
        }

        if (response.ok) {
          const userResponse = await fetch(
            `${BASE_URL}/api/users/${data.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const userData = await userResponse.json();

          if (userResponse.ok) {
            setUserData(userData.userData);
          } else {
            console.error(userData.message);
            router.push("/login");
          }
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchProtectedData();
  }, [userData]);
  return (
    <div className="flex flex-col md:flex-row w-svw h-svh">
      <Sidebar />

      <div className="flex-1">{children}</div>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;
