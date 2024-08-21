import Link from "next/link";
import Homepage from "./page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeaderMenu from "./_components/headerMenu";

function WebPageLayout() {
    return (
        <>
            <header className="h-[68px] shadow-lg flex items-center justify-between  px-5 md:px-10 py-3">
                <Link href="/">
                    <Image src="/Logo.svg" width={164} height={44} alt="Treasure logo" />
                </Link>

                <div className=" hidden md:flex justify-end items-center gap-14 w-[480px]">
                    <ul className="flex justify-between w-full">
                        <li className="hover:text-softBlue"><Link href="/">Home</Link></li>
                        <li className="hover:text-softBlue"><Link href="#">Serviços</Link></li>
                        <li className="hover:text-softBlue"><Link href="#">Quem somos</Link></li>
                        <li className="hover:text-softBlue"><Link href="#">Fale conosco</Link></li>
                    </ul>

                    <Button variant="outline"><Link href="#">Login</Link></Button>
                </div>

                <HeaderMenu />
            </header>
            <Homepage />
        </>)
}

export default WebPageLayout;