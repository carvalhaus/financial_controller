import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-white h-96 flex flex-col items-center justify-center">
            <div>
                <div className="flex items-center gap-20">
                    <ul className="flex gap-12">
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="/">Home</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Serviços</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Recursos</Link></li>
                    </ul>

                    <Link href="/">
                        <Image src="/Logo.svg" width={246} height={66} alt="Treasure logo" />
                    </Link>

                    <ul className="flex gap-12">
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Sobre nós</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Blog</Link></li>
                        <li className="text-lg font-bold hover:text-softBlue"><Link href="#">Fale conosco</Link></li>
                    </ul>
                </div>

                <Separator className="my-10 h-[2px] rounded-full bg-primary" />
            </div>
        </footer >
    );
}

export default Footer;