import type { Metadata } from "next";
import { Nunito_Sans, Outfit } from "next/font/google";
import { RoleProvider } from "@/components/RoleProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FeriApp - Tu mercado digital",
  description: "Marketplace digital para ferias libres de Chile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ghost-white text-oxford-navy">
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
