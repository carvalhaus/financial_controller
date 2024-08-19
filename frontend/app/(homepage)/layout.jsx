import Link from "next/link";
import Homepage from "./page";
import { Button } from "@/components/ui/button";

function WebPageLayout() {
    return (<>
        <header className="h-[68px] shadow-lg flex items-center justify-between px-10 py-3">
            <p>LOGO</p>
            <div className="flex justify-end items-center gap-14 w-[480px]">

                <ul className="flex justify-between w-full">
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="#">Serviços</Link></li>
                    <li><Link href="#">Quem somos</Link></li>
                    <li><Link href="#">Fale conosco</Link></li>
                </ul>


                <Link href="#">
                    <Button variant="outline">Login</Button>
                </Link>
            </div>


        </header>
        <Homepage />
    </>)
}

export default WebPageLayout;