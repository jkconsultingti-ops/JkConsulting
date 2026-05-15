"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

export default function BlogPage() {
  const { t } = useTranslation();
  const tags = t("blog.tags", { returnObjects: true }) as string[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-28 pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              JK Consulting
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5"
            {...fadeUp(0.07)}
          >
            {t("blog.title")}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8"
            {...fadeUp(0.14)}
          >
            {t("blog.subtitle")}
          </motion.p>
          <motion.div className="flex flex-wrap gap-2" {...fadeUp(0.2)}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section className="py-24 px-4 bg-gray-900 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.25) 0%, rgba(27,95,255,0.05) 100%)" }}
            {...fadeUp()}
          >
            <div className="bg-[#0D1020] rounded-[15px] p-16 text-center">
              <div className="w-14 h-14 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("blog.coming_soon")}</h2>
              <p className="text-gray-500 leading-relaxed">{t("blog.coming_soon_desc")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
