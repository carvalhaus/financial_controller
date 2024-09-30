import Image from "next/image";
import bgAuth from "@/public/auth_bg.webp";
import icon from "@/public/icon.svg";
import Link from "next/link";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import getGoogleOAuthUlrl from "@/lib/getGoogleUrl";

function AuthLayout({ children }) {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-center text-center bg-primary lg:h-full lg:col-span-8">
          <Image
            src={bgAuth}
            alt="Background Auth Layout"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            priority={true}
          />

          <div className="hidden lg:relative lg:block lg:px-36 w-full">
            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Bem-vindo ao Treasure!
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Seu aliado para gerenciar e otimizar suas finanças de forma
              simples e eficiente.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:px-16 lg:py-12 lg:col-span-4">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <div className="relative -mt-16 block lg:hidden mb-10">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white sm:size-20"
                href="/"
              >
                <Image src={icon} alt="Icone do Logo" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl text-center">
                Bem-vindo ao Treasure!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 text-center">
                Seu aliado para gerenciar e otimizar suas finanças de forma
                simples e eficiente.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 bg-white shadow-lg px-4 py-7 lg:py-14 rounded-lg">
              <Link href="/" className="hidden lg:block">
                <Image src="/Logo.svg" width={238} height={66} alt="Logo" />
              </Link>

              {children}

              <div className="flex items-center justify-center w-full">
                <span className="w-2/5 h-[2px] bg-primary rounded-full"></span>
                <p className="w-1/5 text-center font-medium">ou</p>
                <span className="w-2/5 h-[2px] bg-primary rounded-full"></span>
              </div>

              <Link href={getGoogleOAuthUlrl()} className="flex items-center">
                <Button className="w-full" variant="outline">
                  <IconBrandGoogleFilled className="mr-3 w-6 h-6" />
                  Continue com o Google
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default AuthLayout;
