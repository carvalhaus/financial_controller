import { Button } from "@/components/ui/button";
import Link from "next/link";

function CallbackSection() {
    return (
        <section className="w-full flex flex-col text-center lg:text-left lg:flex-row items-center justify-center py-10 lg:py-20 gap-8 lg:gap-32">
            <div>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Pronto para começar?</h2>
                <p className="leading-7">Registre-se ou entre em contato conosco</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <Button className="text-lg w-52"><Link href="#">Comece aqui</Link></Button>
                <Button variant="outline" className="text-lg w-52"><Link href="#">Fale conosco</Link></Button>
            </div>
        </section>
    );
}

export default CallbackSection;