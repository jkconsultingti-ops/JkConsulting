"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const validSlugs = [
  "automacao-ia",
  "consultoria-crm",
  "otimizacao-processos",
  "analytics-dados",
  "transformacao-digital",
  "treinamento-ia",
];

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const delivers = t(`services.list.${slug}.delivers`, { returnObjects: true }) as string[];

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/servicos"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-10 text-sm font-medium"
        >
          <ArrowLeft size={16} /> {t("common.back")}
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-white mb-12">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-3">
            {t(`services.list.${slug}.name`)}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {t(`services.list.${slug}.hero`)}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {/* Problem */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
              {t("services.problem")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t(`services.list.${slug}.problem`)}
            </p>
          </section>

          {/* Delivers */}
          <section className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-5">
              {t("services.delivers")}
            </h2>
            <ul className="space-y-3">
              {delivers.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For whom */}
            <section className="border border-gray-100 rounded-2xl p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
                {t("services.for_whom")}
              </h2>
              <p className="text-gray-700">{t(`services.list.${slug}.for_whom`)}</p>
            </section>

            {/* Result */}
            <section className="border border-blue-100 bg-blue-50 rounded-2xl p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
                {t("services.result")}
              </h2>
              <p className="text-gray-700">{t(`services.list.${slug}.result`)}</p>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contato"
            className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg inline-flex items-center gap-2"
          >
            {t("services.cta")} <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
