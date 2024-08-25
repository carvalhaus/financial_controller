import Image from "next/image";
import Link from "next/link";
import UserInfo from "./_components/userInfo";
import NavBar from "./_components/navBar";
import FriendInvitation from "./_components/friendInvitation";

function DashboardLayout({ children }) {
    return (
        <div className="flex w-svw h-svh">
            <aside className="w-56 flex flex-col items-center py-5 px-4 gap-10 border-r border-r-[#E2E8F0]">
                <Link href="/">
                    <Image src="/Logo.svg" width={164} height={46} alt="Treasure logo" priority={true} />
                </Link>

                <UserInfo />

                <NavBar />

                <FriendInvitation />
            </aside>

            <div className="flex-1 bg-red-50">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;