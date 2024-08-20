import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";


function HeaderMenu() {
    return (
        <Sheet>
            <SheetTrigger>+</SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Button className="w-10/12">
                            <Link href="#">Login</Link>
                        </Button>
                    </SheetTitle>

                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default HeaderMenu;