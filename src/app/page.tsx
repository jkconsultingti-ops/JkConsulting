"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, XCircle, Zap, GitMerge, BarChart2, Database, ArrowDown } from "lucide-react";

const serviceIcons = [Zap, GitMerge, Database, BarChart2];
const stepNumbers = ["01", "02", "03", "04"];

function AutomationFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="relative w-full h-28 select-none">
      <svg viewBox="0 0 400 80" className="w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B5FFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1B5FFF" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line x1="40" y1="40" x2="360" y2="40" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 3" />
        {nodes.map((label, i) => {
          const x = [10, 35, 60, 85][i] * 4;
          return (
            <g key={i}>
              <circle cx={x} cy="40" r="14" fill="#18181E" stroke="#1B5FFF" strokeWidth="2" />
              <text x={x} y="44" textAnchor="middle" fill="#1B5FFF" fontSize="10" fontWeight="bold">{i + 1}</text>
              <text x={x} y="66" textAnchor="middle" fill="#94a3b8" fontSize="8">{label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const flowNodes: string[] = t("home.hero.flow_nodes", { returnObjects: true }) as string[];
  const problemItems: string[] = t("home.problem.items", { returnObjects: true }) as string[];
  const beforeItems: string[] = t("home.comparison.before", { returnObjects: true }) as string[];
  const afterItems: string[]  = t("home.comparison.after",  { returnObjects: true }) as string[];
  const serviceItems: { title: string; desc: string }[] = t("home.services_section.items", { returnObjects: true }) as { title: string; desc: string }[];
  const offerItems: string[]  = t("home.offer.items",  { returnObjects: true }) as string[];
  const steps: { title: string; desc: string }[] = t("home.how.steps", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1B5FFF20,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            {t("home.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-3xl">
            {t("home.hero.headline").split(/(máquinas de receita\.|revenue machines\.)/)[0]}
            <span className="text-blue-400">
              {t("home.hero.headline").match(/máquinas de receita\.|revenue machines\./)?.[0]}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            {t("home.hero.subheadline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contato"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg flex items-center justify-center gap-2 group"
            >
              {t("home.hero.cta_diagnosis")}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/servicos"
              className="border border-gray-700 hover:border-blue-600/60 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg text-center"
            >
              {t("home.hero.cta_secondary")}
            </Link>
          </div>

          <div className="mt-16 bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">
              {t("home.hero.flow_label")}
            </p>
            <AutomationFlow nodes={flowNodes} />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t("home.problem.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {t("home.problem.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problemItems.map((item) => (
              <div key={item} className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <ArrowDown size={28} className="text-blue-600 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t("home.solution.label")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
            {t("home.solution.title")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("home.solution.text_1")}{" "}
            <strong className="text-gray-700">{t("home.solution.text_bold")}</strong>
            {t("home.solution.text_2")}
          </p>
        </div>
      </section>

      {/* ── ANTES vs DEPOIS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t("home.comparison.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {t("home.comparison.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle size={20} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t("home.comparison.before_title")}</h3>
              </div>
              <ul className="space-y-4">
                {beforeItems.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-gray-500">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 border border-blue-600/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1B5FFF15,transparent_70%)]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t("home.comparison.after_title")}</h3>
                </div>
                <ul className="space-y-4">
                  {afterItems.map((item) => (
                    <li key={item} className="flex gap-3 items-start text-gray-300">
                      <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t("home.services_section.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {t("home.services_section.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceItems.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={title} className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OFERTA ── */}
      <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1B5FFF12,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">{t("home.offer.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{t("home.offer.title")}</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {t("home.offer.text_1")}{" "}
              <strong className="text-white">{t("home.offer.text_bold")}</strong>{" "}
              {t("home.offer.text_2")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {offerItems.map((item) => (
              <div key={item} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl transition-all text-lg group"
            >
              {t("home.hero.cta_diagnosis")}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-gray-500 text-sm mt-3">{t("home.offer.fine_print")}</p>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t("home.how.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">{t("home.how.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {steps.map(({ title, desc }, i) => (
              <div key={title} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/20">
                  <span className="text-white font-bold text-lg">{stepNumbers[i]}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-4 bg-blue-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff15,transparent_60%)]" />
        <div className="max-w-2xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t("home.final_cta.title")}
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            {t("home.final_cta.subtitle")}
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-5 rounded-xl transition-all text-lg group shadow-xl"
          >
            {t("home.final_cta.cta")}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-blue-200 text-sm mt-4">{t("home.final_cta.fine_print")}</p>
        </div>
      </section>
    </>
  );
}
