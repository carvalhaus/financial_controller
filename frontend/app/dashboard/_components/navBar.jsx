"use client"

import Image from "next/image";
import Link from "next/link";

const { NavigationMenu, NavigationMenuList, NavigationMenuItem } = require("@/components/ui/navigation-menu");

const navItems = [
    {
        title: "Dashboard",
        icon: "/iconDashboard.svg",
        href: "dashboard"
    },
    {
        title: "Categorias",
        icon: "/iconCategories.svg",
        href: "dashboard/categories"
    },
    {
        title: "Despesas",
        icon: "/iconExpenses.svg",
        href: "dashboard/expenses"
    }
]

function NavBar() {
    return (
        <NavigationMenu className="items-start">
            <NavigationMenuList className="flex-col gap-3 w-48" >
                {
                    navItems.map((item, index) => (
                        <Link key={index} href={item.href} className="w-full">
                            <NavigationMenuItem className="flex items-center gap-2 px-[6px] py-2 hover:bg-accent hover:rounded-sm">
                                <Image src={item.icon} width={32} height={32} alt="Item ícone" />
                                <p className="text-2xl font-medium">{item.title}</p>
                            </NavigationMenuItem>
                        </Link>
                    ))
                }
            </NavigationMenuList>
        </NavigationMenu >
    );
}

export default NavBar;