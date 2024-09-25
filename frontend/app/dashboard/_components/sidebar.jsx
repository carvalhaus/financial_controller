import Image from "next/image";
import Link from "next/link";
import UserInfo from "./userInfo";
import NavBar from "./navBar";
import FriendInvitation from "./friendInvitation";

function Sidebar() {
  return (
    <aside className="w-56 h-full hidden lg:flex md:flex-col items-center py-5 px-4 gap-10 border-r border-r-[#E2E8F0]">
      <Link href="/">
        <Image
          src="/Logo.svg"
          width={164}
          height={46}
          alt="Treasure logo"
          priority={true}
        />
      </Link>

      <UserInfo />

      <NavBar />

      <FriendInvitation />
    </aside>
  );
}

export default Sidebar;
