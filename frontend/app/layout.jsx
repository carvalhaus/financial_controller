import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Treasr!",
  description: "Controle suas Finanças com Facilidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head>
        <meta
          name="title"
          content="Treasure - Controle suas Finanças com Facilidade"
        />
        <meta
          name="description"
          content="Treasure é um aplicativo de controle financeiro projetado para ajudar os usuários a gerenciar suas finanças de forma eficaz e segura."
        />
        <meta
          name="keywords"
          content="controle, financeiro, controlador, controle financeiro, controlador financeiro, organizador financeiro, organizar, finanças, dinheiro"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Portuguese" />
      </Head>
      <body className={`${roboto.className} text-primary`}>{children}</body>
    </html>
  );
}
