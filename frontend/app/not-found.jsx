import Header from "./(pages)/_components/header";
import Footer from "./(pages)/_components/footer";
import Image from "next/image";

function NotFound() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex-1 flex flex-col gap-8 items-center justify-center py-16 px-4">
        <Image
          src="/not_found.svg"
          width={700}
          height={465}
          alt="Página não encontrada"
        />
        <h1 className="text-5xl text-center">
          Está página não pode ser carregada!
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
