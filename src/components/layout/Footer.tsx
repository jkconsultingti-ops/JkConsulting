"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-white/[0.06] text-gray-500 py-14 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/Logo.png" alt="JK Consulting" className="h-8 w-8 object-contain" />
              <span className="text-white text-base font-semibold tracking-tight">
                JK <span className="text-blue-400 font-light">Consulting</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
              {t("about.mission")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/servicos/automacao-ia" className="hover:text-white transition-colors">
                  {t("services.list.automacao-ia.name")}
                </Link>
              </li>
              <li>
                <Link href="/servicos/consultoria-crm" className="hover:text-white transition-colors">
                  {t("services.list.consultoria-crm.name")}
                </Link>
              </li>
              <li>
                <Link href="/servicos/otimizacao-processos" className="hover:text-white transition-colors">
                  {t("services.list.otimizacao-processos.name")}
                </Link>
              </li>
              <li>
                <Link href="/servicos/analytics-dados" className="hover:text-white transition-colors">
                  {t("services.list.analytics-dados.name")}
                </Link>
              </li>
              <li>
                <Link href="/servicos/transformacao-digital" className="hover:text-white transition-colors">
                  {t("services.list.transformacao-digital.name")}
                </Link>
              </li>
              <li>
                <Link href="/servicos/treinamento-ia" className="hover:text-white transition-colors">
                  {t("services.list.treinamento-ia.name")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">
              Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/casos-de-sucesso" className="hover:text-white transition-colors">
                  {t("nav.cases")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  {t("nav.login")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-700">
          <p>© {year} JK Consulting. {t("footer.rights")}.</p>
          <div className="flex gap-5">
            <Link href="/politica-de-privacidade" className="hover:text-gray-400 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/termos-de-uso" className="hover:text-gray-400 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
