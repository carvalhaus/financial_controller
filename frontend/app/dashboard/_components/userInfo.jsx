import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IconLogout, IconSettings } from "@tabler/icons-react";
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
        <Dialog>
          <DialogTrigger className="flex gap-2 tracking-wide px-2 py-[6px] hover:bg-accent hover:rounded-sm">
            <IconSettings />
            <span>Configurações</span>
          </DialogTrigger>

          <SettingsModal userData={userData} />
        </Dialog>

        <DropdownMenuItem className="gap-2 tracking-wide">
          <IconLogout />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserInfo;
