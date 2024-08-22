import { Separator } from "@/components/ui/separator";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-white h-80 p-4 md:h-96 flex flex-col items-center justify-center gap-16 shadow-inner">
            <div className="flex flex-col items-center justify-center  md:w-5/6">
                <div className="flex items-center gap-20">
                    <ul className="hidden md:flex md:flex-col lg:flex-row lg:gap-10">
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="/">Home</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Serviços</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Recursos</Link></li>
                    </ul>

                    <Link href="/">
                        <Image src="/Logo.svg" width={246} height={66} alt="Treasure logo" className="w-auto h-auto min-w-60" />
                    </Link>

                    <ul className="hidden md:flex md:flex-col lg:flex-row lg:gap-10">
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Sobre nós</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Blog</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Fale conosco</Link></li>
                    </ul>
                </div>

                <Separator className="my-10 h-[2px] rounded-full bg-primary" />

                <div className="flex gap-6 justify-center w-full">
                    <Link href="#"><IconBrandInstagram size={32} className="border border-primary rounded-full w-12 h-12 p-2" /></Link>
                    <Link href="#"><IconBrandLinkedin size={32} className="border border-primary rounded-full w-12 h-12 p-2" /></Link>
                    <Link href="#"><IconBrandFacebook size={32} className="border border-primary rounded-full w-12 h-12 p-2" /></Link>
                    <Link href="#"><IconBrandYoutube size={32} className="border border-primary rounded-full w-12 h-12 p-2" /></Link>
                    <Link href="#"><IconBrandX size={32} className="border border-primary rounded-full w-12 h-12 p-2" /></Link >
                </div >
            </div >

            <small className="text-sm font-medium leading-none hover:text-softBlue"> <Link href="#">© 2024 Política de Privacidade</Link></small>
        </footer >
    );
}

export default Footer;