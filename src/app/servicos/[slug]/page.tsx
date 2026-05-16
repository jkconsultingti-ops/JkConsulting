"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-blue-600/40" />
      <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.15em]">{children}</span>
    </div>
  );
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();

  if (!validSlugs.includes(slug)) notFound();

  const delivers = t(`services.list.${slug}.delivers`, { returnObjects: true }) as string[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-24 md:pt-28 pb-16 md:pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-10 text-sm font-medium group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              {t("common.back")}
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.05)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              {t(`services.list.${slug}.name`)}
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            {...fadeUp(0.1)}
          >
            {t(`services.list.${slug}.hero`)}
          </motion.h1>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}>
            <SectionLabel>{t("services.problem")}</SectionLabel>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {t(`services.list.${slug}.problem`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── O QUE ENTREGAMOS ── */}
      <section className="py-14 md:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="mb-8" {...fadeUp()}>
            <SectionLabel>{t("services.delivers")}</SectionLabel>
          </motion.div>
          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.35) 0%, rgba(27,95,255,0.07) 100%)" }}
            {...fadeUp(0.1)}
          >
            <div className="bg-[#0D1020] rounded-[15px] p-8">
              <ul className="space-y-4">
                {delivers.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 bg-blue-600/15 border border-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={11} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARA QUEM + RESULTADO ── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.2) 0%, rgba(27,95,255,0.04) 100%)" }}
            {...slideIn("left")}
          >
            <div className="bg-[#0F1117] rounded-[15px] p-7 h-full">
              <SectionLabel>{t("services.for_whom")}</SectionLabel>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(`services.list.${slug}.for_whom`)}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.45) 0%, rgba(27,95,255,0.1) 100%)" }}
            {...slideIn("right")}
          >
            <div className="bg-[#0D1020] rounded-[15px] p-7 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />
              <div className="relative">
                <SectionLabel>{t("services.result")}</SectionLabel>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t(`services.list.${slug}.result`)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-xl mx-auto relative">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
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
