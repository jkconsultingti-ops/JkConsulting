"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/servicos", label: t("nav.services") },
    { href: "/sobre", label: t("nav.about") },
    { href: "/casos-de-sucesso", label: t("nav.cases") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contato", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-900/75 backdrop-blur-2xl border-b border-white/[0.07] shadow-2xl shadow-black/30"
          : "bg-gray-900 border-b border-white/[0.07]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/Logo.png"
              alt="JK Consulting"
              width={30}
              height={30}
              priority
              className="opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-white text-[15px] font-semibold tracking-tight">
              JK <span className="text-blue-400 font-light">Consulting</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-150",
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <Link
              href="/login"
              className="text-[13px] text-gray-400 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/[0.05]"
            >
              {t("nav.login")}
            </Link>
            <Link href="/contato" className="btn-primary text-[13px] font-semibold px-4 py-2 rounded-lg text-white">
              {t("home.hero.cta_primary")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-2xl z-40 flex flex-col p-5 gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-base font-medium px-4 py-3 rounded-xl transition-colors",
                  isActive
                    ? "text-white bg-white/[0.08]"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="border-t border-white/[0.07] mt-3 pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-gray-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/contato"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-center font-semibold px-6 py-3 rounded-xl text-white text-sm"
            >
              {t("home.hero.cta_primary")}
            </Link>
            <div className="mt-2 px-2">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
