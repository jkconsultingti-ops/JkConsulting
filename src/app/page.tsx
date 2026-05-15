"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, XCircle, Zap, GitMerge, BarChart2, Database } from "lucide-react";

const serviceIcons = [Zap, GitMerge, Database, BarChart2];
const stepNumbers = ["01", "02", "03", "04"];

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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-10 bg-blue-600/40" />
      <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.15em]">{children}</span>
      <div className="h-px w-10 bg-blue-600/40" />
    </div>
  );
}

type EventStatus = "live" | "done" | "pending";
const dashboardEvents: { status: EventStatus; icon: string; label: string; detail: string; time: string }[] = [
  { status: "live",    icon: "●", label: "Lead qualificado detectado",       detail: "Bruno Costa · CEO · score 91/100",                   time: "agora" },
  { status: "done",    icon: "✓", label: "CRM atualizado automaticamente",   detail: "Pipeline → Proposta · responsável atribuído",        time: "3s"    },
  { status: "done",    icon: "✓", label: "WhatsApp enviado",                 detail: "Resposta personalizada com histórico do cliente",    time: "5s"    },
  { status: "pending", icon: "○", label: "Follow-up agendado",               detail: "Amanhã às 10:00 · mensagem personalizada",          time: "15min" },
];

function LiveDashboard({ flowLabel }: { flowLabel: string }) {
  return (
    <>
      <div className="border-b border-white/[0.07] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-xs font-medium">{flowLabel}</span>
        </div>
        <span className="text-gray-700 text-[11px] font-mono">jk-automations.app</span>
      </div>
      <div className="px-5 py-5 space-y-4">
        {dashboardEvents.map((ev, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={`text-[11px] mt-0.5 font-mono flex-shrink-0 ${ev.status === "live" ? "text-green-400" : ev.status === "done" ? "text-blue-400" : "text-gray-700"}`}>
              {ev.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium leading-snug ${ev.status === "pending" ? "text-gray-600" : "text-white"}`}>
                {ev.label}
              </p>
              <p className="text-xs text-gray-600 mt-0.5 truncate">{ev.detail}</p>
            </div>
            <span className={`text-[11px] flex-shrink-0 font-mono tabular-nums ${ev.status === "live" ? "text-green-400" : "text-gray-700"}`}>
              {ev.time}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-green-500 text-[11px] font-mono">▸</span>
          <span className="w-1.5 h-3.5 bg-green-500/50 rounded-sm cursor-blink" />
        </div>
      </div>
    </>
  );
}

const tools = [
  { name: "n8n", src: "/tools/n8n.svg" },
  { name: "Salesforce", src: "/tools/salesforce.svg" },
  { name: "OpenAI", src: "/tools/openai.svg" },
  { name: "WhatsApp Business", src: "/tools/whatsapp.svg" },
  { name: "OpenClaw", src: "/tools/openclaw.svg" },
];

export default function Home() {
  const { t } = useTranslation();

  const problemItems: string[] = t("home.problem.items", { returnObjects: true }) as string[];
  const beforeItems: string[] = t("home.comparison.before", { returnObjects: true }) as string[];
  const afterItems: string[] = t("home.comparison.after", { returnObjects: true }) as string[];
  const serviceItems: { title: string; desc: string; cta: string; slug: string }[] = t("home.services_section.items", { returnObjects: true }) as { title: string; desc: string; cta: string; slug: string }[];
  const metrics: { value: string; unit: string; desc: string }[] = t("home.metrics.items", { returnObjects: true }) as { value: string; unit: string; desc: string }[];
  const offerItems: string[] = t("home.offer.items", { returnObjects: true }) as string[];
  const steps: { title: string; desc: string }[] = t("home.how.steps", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-28 pb-24 px-4 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Glow orbs */}
        <div className="absolute top-[-15%] right-[-8%] w-[520px] h-[520px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[380px] h-[380px] bg-blue-800/15 rounded-full blur-[100px] pointer-events-none" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              {t("home.hero.badge")}
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-7 max-w-3xl tracking-tight"
            {...fadeUp(0.07)}
          >
            {t("home.hero.headline_1")}
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent animate-gradient-pan">
              {t("home.hero.headline_2")}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
            {...fadeUp(0.14)}
          >
            {t("home.hero.subheadline")}
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.2)}>
            <Link
              href="/contato"
              className="btn-primary group inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl text-base"
            >
              {t("home.hero.cta_diagnosis")}
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/servicos"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.12] hover:border-white/25 text-gray-400 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-base hover:bg-white/[0.04]"
            >
              {t("home.hero.cta_secondary")}
            </Link>
          </motion.div>

          {/* Live dashboard card */}
          <motion.div
            className="mt-14 rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{ background: "rgba(13,16,32,0.7)", backdropFilter: "blur(20px)" }}
            {...fadeUp(0.28)}
          >
            <LiveDashboard flowLabel={t("home.hero.flow_label")} />
          </motion.div>
        </div>
      </section>

      {/* ── MÉTRICAS ── */}
      <section className="bg-gray-900 border-t border-white/[0.06] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {metrics.map(({ value, unit, desc }, i) => (
              <motion.div key={desc} className="px-6 py-2 first:pl-0 last:pr-0" {...fadeUp(i * 0.1)}>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none tabular-nums">
                    {value}
                  </span>
                  <span className="text-blue-400 font-semibold text-sm">{unit}</span>
                </div>
                <p className="text-gray-500 text-sm leading-snug">{desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.p className="text-gray-700 text-xs mt-10 flex items-center gap-2" {...fadeUp(0.4)}>
            <span className="w-4 h-px bg-gray-700 flex-shrink-0" />
            {t("home.metrics.disclaimer")}
          </motion.p>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <SectionLabel>{t("home.problem.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 tracking-tight">
              {t("home.problem.title")}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {problemItems.map((item, i) => (
              <motion.div
                key={item}
                className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-xl px-5 py-4"
                {...slideIn("left", i * 0.07)}
              >
                <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <SectionLabel>{t("home.solution.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5 tracking-tight">
              {t("home.solution.title")}
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              {t("home.solution.text_1")}{" "}
              <strong className="text-gray-800">{t("home.solution.text_bold")}</strong>
              {t("home.solution.text_2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ANTES vs DEPOIS ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <SectionLabel>{t("home.comparison.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 tracking-tight">
              {t("home.comparison.title")}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              className="border border-gray-200 rounded-2xl p-8 bg-white"
              {...slideIn("left")}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
                  <XCircle size={15} className="text-red-400" />
                </div>
                <h3 className="font-bold text-gray-800">{t("home.comparison.before_title")}</h3>
              </div>
              <ul className="space-y-3.5">
                {beforeItems.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-gray-500 text-sm">
                    <span className="w-1 h-1 bg-red-300 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Gradient border card */}
            <motion.div
              className="p-px rounded-2xl"
              style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.5) 0%, rgba(27,95,255,0.08) 60%, rgba(27,95,255,0.03) 100%)" }}
              {...slideIn("right")}
            >
              <div className="bg-gray-900 rounded-[15px] p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-600/15 border border-blue-600/25 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={15} className="text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white">{t("home.comparison.after_title")}</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {afterItems.map((item) => (
                      <li key={item} className="flex gap-3 items-start text-gray-300 text-sm">
                        <CheckCircle2 size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <SectionLabel>{t("home.services_section.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
              {t("home.services_section.title")}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceItems.map(({ title, desc, cta, slug }, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div
                  key={title}
                  className="p-px rounded-2xl group hover:-translate-y-0.5 transition-transform duration-200"
                  style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.3) 0%, rgba(27,95,255,0.06) 100%)" }}
                  {...slideIn(i % 2 === 0 ? "left" : "right", i * 0.08)}
                >
                  <div className="bg-[#0F1117] rounded-[15px] p-7 h-full flex flex-col transition-colors duration-200 group-hover:bg-[#121520]">
                    <div className="w-10 h-10 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center mb-5">
                      <Icon size={19} className="text-blue-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
                    <Link
                      href={`/contato?s=${slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-blue-400 font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                    >
                      {cta}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OFERTA ── */}
      <section className="py-24 px-4 bg-gray-900 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1B5FFF0C,transparent_65%)]" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <SectionLabel>{t("home.offer.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4 tracking-tight">
              {t("home.offer.title")}
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-base">
              {t("home.offer.text_1")}{" "}
              <strong className="text-white">{t("home.offer.text_bold")}</strong>{" "}
              {t("home.offer.text_2")}
            </p>
          </motion.div>

          <motion.div
            className="p-px rounded-2xl mb-8"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.35) 0%, rgba(27,95,255,0.07) 100%)" }}
            {...fadeUp(0.1)}
          >
            <div className="bg-[#0D1020] rounded-[15px] p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {offerItems.map((item) => (
                  <div key={item} className="flex gap-3 items-center">
                    <div className="w-5 h-5 bg-blue-600/15 border border-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={11} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="text-center" {...fadeUp(0.2)}>
            <Link
              href="/contato?s=setup"
              className="btn-primary group inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-xl"
            >
              {t("home.offer.cta")}
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-gray-600 text-xs mt-3">{t("home.offer.fine_print")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <SectionLabel>{t("home.how.label")}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 tracking-tight">
              {t("home.how.title")}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {steps.map(({ title, desc }, i) => (
              <motion.div key={title} className="relative text-center" {...fadeUp(i * 0.1)}>
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/20">
                  <span className="text-white font-bold text-sm tracking-wide">{stepNumbers[i]}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FERRAMENTAS ── */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-10"
            {...fadeUp()}
          >
            {t("home.tools.label")}
          </motion.p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="marquee-track gap-14">
              {[...tools, ...tools].map(({ name, src }, i) => (
                <div key={`${name}-${i}`} className="flex flex-col items-center gap-2.5 flex-shrink-0 group">
                  <div className="w-14 h-14 flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                    <img src={src} alt={name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium group-hover:text-gray-600 transition-colors whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-28 px-4 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[280px] h-[280px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[280px] h-[280px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {t("home.final_cta.title")}
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              {t("home.final_cta.subtitle")}
            </p>
            <Link
              href="/contato"
              className="btn-white group inline-flex items-center gap-2.5 text-gray-900 font-bold px-10 py-4 rounded-xl text-base"
            >
              {t("home.final_cta.cta")}
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-gray-600 text-xs mt-4">{t("home.final_cta.fine_print")}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
