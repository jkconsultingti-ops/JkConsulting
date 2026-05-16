"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/servicos", label: t("nav.services") },
    { href: "/sobre", label: t("nav.about") },
    { href: "/casos-de-sucesso", label: t("nav.cases") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contato", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/[0.08] shadow-xl shadow-black/25"
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

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[60] bg-gray-900 flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/[0.07] flex-shrink-0">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Image src="/Logo.png" alt="JK Consulting" width={28} height={28} />
                <span className="text-white text-[15px] font-semibold tracking-tight">
                  JK <span className="text-blue-400 font-light">Consulting</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-colors"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col px-4 sm:px-6 pt-4 pb-4 overflow-y-auto gap-1">
              {navLinks.map(({ href, label }, i) => {
                const isActive = pathname.startsWith(href);
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 + 0.08, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center min-h-[56px] px-4 rounded-xl text-lg font-semibold transition-colors",
                        isActive
                          ? "text-white bg-white/[0.08]"
                          : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                      )}
                    >
                      {label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3, ease: "easeOut" }}
              className="px-4 sm:px-6 pb-10 pt-4 border-t border-white/[0.07] flex flex-col gap-3 flex-shrink-0"
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center min-h-[48px] px-4 text-base font-medium text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-colors"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/contato"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-white text-base"
              >
                {t("home.hero.cta_primary")}
                <ArrowRight size={16} />
              </Link>
              <div className="mt-2 px-1">
                <LanguageToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
