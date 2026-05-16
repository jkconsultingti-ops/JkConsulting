"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const slideIn = (from: "left" | "right", delay = 0) => ({
  initial: { opacity: 0, x: from === "left" ? -48 : 48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-10 bg-blue-600/40" />
      <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.15em]">{children}</span>
      <div className="h-px w-10 bg-blue-600/40" />
    </div>
  );
}

export default function ServicosPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-24 md:pt-28 pb-16 md:pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-[-15%] right-[-8%] w-[520px] h-[520px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              JK Consulting
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
            {...fadeUp(0.07)}
          >
            {t("services.title")}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
            {...fadeUp(0.14)}
          >
            {t("services.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="py-16 md:py-24 px-4 bg-gray-900 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <SectionLabel>{t("home.services_section.label")}</SectionLabel>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ slug, Icon }, i) => (
              <motion.div
                key={slug}
                className="p-px rounded-2xl group"
                style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.3) 0%, rgba(27,95,255,0.06) 100%)" }}
                {...slideIn(i % 2 === 0 ? "left" : "right", i * 0.06)}
              >
                <div className="bg-[#0F1117] rounded-[15px] p-7 h-full flex flex-col transition-colors duration-200 group-hover:bg-[#121520]">
                  <div className="w-10 h-10 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon size={19} className="text-blue-400" />
                  </div>
                  <h2 className="text-base font-bold text-white mb-2">
                    {t(`services.list.${slug}.name`)}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {t(`services.list.${slug}.short`)}
                  </p>
                  <Link
                    href={`/servicos/${slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-blue-400 font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                  >
                    {t("services.learn_more")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gray-900 border-t border-white/[0.05] text-center relative overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-xl mx-auto relative">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {t("home.final_cta.title")}
            </h2>
            <p className="text-gray-400 mb-8">{t("home.final_cta.subtitle")}</p>
            <Link
              href="/contato"
              className="btn-primary group inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl"
            >
              {t("services.cta")}
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
