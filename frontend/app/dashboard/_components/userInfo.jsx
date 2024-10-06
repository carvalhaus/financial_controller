import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconLogout } from "@tabler/icons-react";
import SettingsModal from "./settings";
import { useApi } from "@/contexts/contextApi";

const {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} = require("@/components/ui/dropdown-menu");

function UserInfo() {
  const { userData } = useApi();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center px-[6px] gap-2 focus-visible:outline-none">
        <Avatar className="size-10">
          <AvatarFallback className="bg-softGray size-10 text-base">
            {userData?.name[0]}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-2xl font-semibold tracking-tight">
          {userData?.username}
        </h4>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <SettingsModal userData={userData} />

        <DropdownMenuItem className="gap-2 tracking-wide">
          <IconLogout />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserInfo;
