import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import Link from "next/link";
import Image from "next/image";
import UserInfo from "./userInfo";
import NavBar from "./navBar";
import FriendInvitation from "./friendInvitation";
import { MenuIcon } from "lucide-react";

function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="absolute top-2 left-2 md:hidden">
        <MenuIcon size={32} />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col items-center gap-12 h-full"
      >
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <Image
                src="/Logo.svg"
                width={180}
                height={62}
                alt="Treasure logo"
                priority={true}
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <UserInfo />

        <NavBar />

        <SheetFooter>
          <FriendInvitation />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
