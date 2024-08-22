import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./headerMenu";

function Header() {
    return (
        <header className="h-[68px] shadow-lg flex items-center justify-between  px-5 md:px-20 py-3 bg-white">
            <Link href="/">
                <Image src="/Logo.svg" width={164} height={44} alt="Treasure logo" priority={true} />
            </Link>

            <div className=" hidden md:flex justify-end items-center gap-14 w-[480px]">
                <ul className="flex justify-between w-full">
                    <li className="hover:text-softBlue"><Link href="/">Home</Link></li>
                    <li className="hover:text-softBlue"><Link href="#">Serviços</Link></li>
                    <li className="hover:text-softBlue"><Link href="#">Sobre nós</Link></li>
                    <li className="hover:text-softBlue"><Link href="#">Fale conosco</Link></li>
                </ul>

                <Link href="#"><Button variant="outline" className="w-24">Login</Button></Link>
            </div>

            <HeaderMenu />
        </header>);
}

export default Header;