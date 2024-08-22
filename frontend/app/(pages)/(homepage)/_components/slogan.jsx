import { Button } from "@/components/ui/button";
import Link from "next/link";

function SloganSection() {
    return (
        <section className="w-full flex flex-col items-center justify-center text-center py-6 md:py-20">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl w-auto md:w-1/2 lg:w-2/5">Controle suas Finanças com Facilidade</h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 w-auto md:w-1/2 lg:w-1/4">Organize suas finanças, monitore gastos, e alcance objetivos financeiros com facilidade e praticidade.</p>
            <Button className="[&:not(:first-child)]:mt-6 h-14 w-52 text-xl"><Link href="#">Comece aqui</Link></Button>
        </section >
    );
}

export default SloganSection;