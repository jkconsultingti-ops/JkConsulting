"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Bot, BarChart2, Zap, Database, Map, GraduationCap, CheckCircle2 } from "lucide-react";

const serviceIcons = [
  { slug: "automacao-ia", Icon: Bot },
  { slug: "consultoria-crm", Icon: Database },
  { slug: "otimizacao-processos", Icon: Zap },
  { slug: "analytics-dados", Icon: BarChart2 },
  { slug: "transformacao-digital", Icon: Map },
  { slug: "treinamento-ia", Icon: GraduationCap },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t("home.hero.headline")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("home.hero.subheadline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg flex items-center justify-center gap-2"
            >
              {t("home.hero.cta_primary")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/servicos"
              className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors text-lg"
            >
              {t("home.hero.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t("home.problem.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("home.problem.text")}
          </p>
        </div>
      </section>

      {/* How we help */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("home.how.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceIcons.map(({ slug, Icon }) => (
              <Link
                key={slug}
                href={`/servicos/${slug}`}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t(`services.list.${slug}.name`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`services.list.${slug}.short`)}
                </p>
                <span className="text-blue-600 text-sm font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("services.learn_more")} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why JK */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("home.why.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t("home.why.items", { returnObjects: true }) as { title: string; desc: string }[]).map(
              (item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {t("home.testimonials.title")}
          </h2>
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-gray-400">
            {t("home.testimonials.placeholder")}
          </div>
        </div>
      </section>

      {/* Cases preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("home.cases_preview.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-400"
              >
                {t("home.cases_preview.placeholder")}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/casos-de-sucesso"
              className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
            >
              {t("home.cases_preview.cta")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t("home.final_cta.title")}
          </h2>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
          >
            {t("home.final_cta.cta")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
