import Image from "next/image";
import Link from "next/link";
import UserInfo from "./_components/userInfo";
import NavBar from "./_components/navBar";
import { Button } from "@/components/ui/button";

function DashboardLayout({ children }) {
    return (
        <div className="flex w-svw h-svh">
            <aside className="w-56 flex flex-col items-center py-5 px-4 gap-10">
                <Link href="/">
                    <Image src="/Logo.svg" width={164} height={46} alt="Treasure logo" priority={true} />
                </Link>

                <UserInfo />

                <NavBar />

                <Button>Convide um amigo</Button>
            </aside>

            <div className="flex-1 bg-red-50">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;