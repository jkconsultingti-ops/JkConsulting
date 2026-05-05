import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "JK Consulting — IA e Automação para Pequenas Empresas",
  description:
    "Consultoria de IA e automação para pequenas empresas. Automatize processos manuais, implemente CRM e tome decisões com dados.",
  openGraph: {
    title: "JK Consulting",
    description: "IA e automação para pequenas empresas",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <I18nProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
