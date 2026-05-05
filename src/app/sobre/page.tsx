"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, User } from "lucide-react";

export default function SobrePage() {
  const { t } = useTranslation();
  const values = t("about.values", { returnObjects: true }) as string[];

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("about.title")}</h1>
        </div>

        {/* Mission */}
        <section className="bg-blue-600 text-white rounded-3xl p-10 mb-12 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4">
            {t("about.mission_title")}
          </h2>
          <p className="text-2xl font-medium leading-relaxed">{t("about.mission")}</p>
        </section>

        {/* Founder */}
        <section className="flex flex-col md:flex-row gap-8 mb-16 items-start">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
            <User size={48} className="text-gray-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
              {t("about.founder_title")}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("about.founder_name")}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t("about.founder_bio")}</p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-6">
            {t("about.values_title")}
          </h2>
          <ul className="space-y-4">
            {values.map((value, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contato"
            className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg inline-flex items-center gap-2"
          >
            {t("about.cta")} <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
