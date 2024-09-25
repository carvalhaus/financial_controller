import {
  Sheet,
  SheetContent,
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

function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger>p</SheetTrigger>

      <SheetContent side="left" className="flex flex-col w-1/3 h-full">
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <Image
                src="/Logo.svg"
                width={164}
                height={46}
                alt="Treasure logo"
                priority={true}
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <UserInfo />

        <NavBar />

        <FriendInvitation />
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
