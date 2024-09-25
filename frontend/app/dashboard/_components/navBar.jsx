"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} = require("@/components/ui/navigation-menu");

const navItems = [
  {
    title: "Dashboard",
    icon: "/iconDashboard.svg",
    href: "/dashboard",
  },
  {
    title: "Categorias",
    icon: "/iconCategories.svg",
    href: "/dashboard/categories",
  },
  {
    title: "Despesas",
    icon: "/iconExpenses.svg",
    href: "/dashboard/expenses",
  },
];

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="items-start flex-1 w-full">
      <ul className="flex flex-col gap-3 w-full">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} className="w-full">
            <li
              className={`flex items-center justify-center gap-2 px-[6px] py-2 w-full hover:bg-accent hover:rounded-sm ${
                pathname === item.href && "bg-accent rounded-sm"
              }`}
            >
              <Image src={item.icon} width={32} height={32} alt="Item ícone" />
              <p className="text-xl font-medium">{item.title}</p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
