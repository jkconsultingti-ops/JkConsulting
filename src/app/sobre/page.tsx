"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, User } from "lucide-react";

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

export default function SobrePage() {
  const { t } = useTranslation();
  const values = t("about.values", { returnObjects: true }) as string[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-24 md:pt-28 pb-16 md:pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-900/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
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
            {t("about.title")}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl leading-relaxed"
            {...fadeUp(0.14)}
          >
            {t("about.mission")}
          </motion.p>
        </div>
      </section>

      {/* ── MISSÃO ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <SectionLabel>{t("about.mission_title")}</SectionLabel>
          </motion.div>
          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.45) 0%, rgba(27,95,255,0.08) 60%, rgba(27,95,255,0.02) 100%)" }}
            {...fadeUp(0.1)}
          >
            <div className="bg-gray-900 rounded-[15px] p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed relative">
                {t("about.mission")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FUNDADOR ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <SectionLabel>{t("about.founder_title")}</SectionLabel>
          </motion.div>
          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.3) 0%, rgba(27,95,255,0.06) 100%)" }}
            {...slideIn("left")}
          >
            <div className="bg-[#0F1117] rounded-[15px] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <User size={34} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{t("about.founder_name")}</h2>
                <p className="text-blue-400 text-xs font-semibold mb-5 uppercase tracking-widest">
                  {t("about.founder_title")}
                </p>
                <p className="text-gray-400 leading-relaxed">{t("about.founder_bio")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <SectionLabel>{t("about.values_title")}</SectionLabel>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start bg-gray-50 border border-gray-100 rounded-xl px-5 py-4"
                {...slideIn(i % 2 === 0 ? "left" : "right", i * 0.07)}
              >
                <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-xl mx-auto relative">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {t("home.final_cta.title")}
            </h2>
            <p className="text-gray-400 mb-8 text-lg">{t("home.final_cta.subtitle")}</p>
            <Link
              href="/contato"
              className="btn-primary group inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl"
            >
              {t("about.cta")}
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
