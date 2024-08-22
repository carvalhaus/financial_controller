import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";


function HeaderMenu() {

    return (
        <Sheet>
            <SheetTrigger className="md:hidden">
                <MenuIcon size={32} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-center">
                        <Button className="w-10/12 text-lg">
                            <Link href="#">Login</Link>
                        </Button>
                    </SheetTitle>
                </SheetHeader >

                <ul className="flex flex-col items-center mt-10 justify-between gap-5">
                    <li className="text-xl"><Link href="/">Home</Link></li>
                    <li className="text-xl"><Link href="#">Serviços</Link></li>
                    <li className="text-xl"><Link href="#">Recursos</Link></li>
                    <li className="text-xl"><Link href="#">Sobre nós</Link></li>
                    <li className="text-xl"><Link href="#">Blog</Link></li>
                    <li className="text-xl"><Link href="#">Fale conosco</Link></li>
                </ul>
            </SheetContent >
        </Sheet >

    )
}

export default HeaderMenu;