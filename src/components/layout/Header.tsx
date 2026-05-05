"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/servicos", label: t("nav.services") },
    { href: "/sobre", label: t("nav.about") },
    { href: "/casos-de-sucesso", label: t("nav.cases") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contato", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">JK</span>
            <span className="text-xl font-light text-blue-600">Consulting</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/contato"
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("home.hero.cta_primary")}
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/contato"
            onClick={() => setMobileOpen(false)}
            className="bg-blue-600 text-white text-center font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("home.hero.cta_primary")}
          </Link>
          <LanguageToggle className="mt-auto" />
        </div>
      )}
    </header>
  );
}
