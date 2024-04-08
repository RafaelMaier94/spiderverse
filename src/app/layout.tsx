import type { Metadata } from "next";
import Image from "next/image";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Spiderverse",
  description:
    "Criando um carrossel parallax do AranhaVerso com React, NextJS e FramerMotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Menu hamburguer"
            width={36}
            height={25}
          />
          <Image
            src="/spider-logo.svg"
            alt="Spiderman"
            width={260}
            height={70}
          />
          <Image src="/icons/user.svg" alt="Login" width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  );
}
