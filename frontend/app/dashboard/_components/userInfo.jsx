"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconLogout } from "@tabler/icons-react";
import SettingsModal from "./settings";
import { useApi } from "@/contexts/contextApi";
import react from "react";
import { useRouter } from "next/navigation";

const {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} = require("@/components/ui/dropdown-menu");

function UserInfo() {
  const { userData } = useApi();
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/clear-cookies`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Error clearing cookies.");
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center px-[6px] gap-2 focus-visible:outline-none">
        <Avatar className="size-10">
          <AvatarFallback className="bg-softGray size-10 text-base">
            {userData && userData.name && userData.name.length > 0
              ? userData.name[0]
              : "?"}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-2xl font-semibold tracking-tight">
          {userData?.username}
        </h4>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <SettingsModal userData={userData} />

        <DropdownMenuItem
          className="gap-2 tracking-wide"
          onSelect={handleLogout}
        >
          <IconLogout />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserInfo;
