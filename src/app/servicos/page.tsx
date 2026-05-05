"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Bot, BarChart2, Zap, Database, Map, GraduationCap } from "lucide-react";

const services = [
  { slug: "automacao-ia", Icon: Bot },
  { slug: "consultoria-crm", Icon: Database },
  { slug: "otimizacao-processos", Icon: Zap },
  { slug: "analytics-dados", Icon: BarChart2 },
  { slug: "transformacao-digital", Icon: Map },
  { slug: "treinamento-ia", Icon: GraduationCap },
];

export default function ServicosPage() {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("services.title")}</h1>
          <p className="text-lg text-gray-600">{t("services.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ slug, Icon }) => (
            <div
              key={slug}
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-blue-100 transition-all group flex flex-col"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Icon size={28} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {t(`services.list.${slug}.name`)}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                {t(`services.list.${slug}.short`)}
              </p>
              <Link
                href={`/servicos/${slug}`}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                {t("services.learn_more")} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
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
