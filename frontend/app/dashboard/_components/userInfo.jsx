import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import SettingsModal from "./settings";

const {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} = require("@/components/ui/dropdown-menu");

const userData = {
  username: "carvalhaus",
  name: "Johan Carvalhaus",
  email: "johan.dev@email.com",
  birthday: new Date("August 19, 1975 23:15:30"),
};

function UserInfo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center w-full px-[6px] gap-2 focus-visible:outline-none">
        <Avatar className="size-10">
          <AvatarFallback className="bg-softGray size-10 text-base">
            {userData.name[0]}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-xl font-semibold tracking-tight">
          {userData.username}
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
