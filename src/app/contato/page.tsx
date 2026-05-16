"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Send, MessageCircle, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  challenge: string;
  preferred_contact: "whatsapp" | "email";
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const inputCls =
  "w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-colors text-sm";

const labelCls = "block text-sm font-medium text-gray-400 mb-1.5";

export default function ContatoPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    challenge: "",
    preferred_contact: "whatsapp",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", challenge: "", preferred_contact: "whatsapp" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white pt-24 md:pt-28 pb-14 md:pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-[-20%] right-[-5%] w-[480px] h-[480px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              {t("home.hero.badge")}
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
            {...fadeUp(0.07)}
          >
            {t("contact.title")}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
            {...fadeUp(0.14)}
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section className="py-20 px-4 bg-gray-900 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── Formulário ── */}
            <motion.div {...fadeUp(0)}>
              <div
                className="p-px rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.35) 0%, rgba(27,95,255,0.07) 100%)" }}
              >
                <div className="bg-[#0D1020] rounded-[15px] p-8">
                  {status === "success" ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 bg-green-500/15 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 size={28} className="text-green-400" />
                      </div>
                      <p className="text-white font-semibold text-lg">{t("contact.form.success")}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>{t("contact.form.name")} *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>{t("contact.form.company")} *</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={form.company}
                            onChange={handleChange}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>{t("contact.form.email")} *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>{t("contact.form.phone")}</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>{t("contact.form.challenge")} *</label>
                        <textarea
                          name="challenge"
                          required
                          rows={4}
                          value={form.challenge}
                          onChange={handleChange}
                          className={cn(inputCls, "resize-none")}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>{t("contact.form.preferred_contact")}</label>
                        <div className="flex gap-3">
                          {(["whatsapp", "email"] as const).map((opt) => (
                            <label
                              key={opt}
                              className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-150",
                                form.preferred_contact === opt
                                  ? "bg-blue-600/20 border-blue-600/50 text-white"
                                  : "bg-white/[0.03] border-white/10 text-gray-500 hover:border-white/20"
                              )}
                            >
                              <input
                                type="radio"
                                name="preferred_contact"
                                value={opt}
                                checked={form.preferred_contact === opt}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              {opt === "whatsapp" ? t("contact.form.whatsapp") : t("contact.form.email_option")}
                            </label>
                          ))}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="flex gap-2 items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                          <AlertCircle size={15} />
                          {t("contact.form.error")}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className={cn(
                          "btn-primary w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2",
                          status === "loading" && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        <Send size={16} />
                        {status === "loading" ? t("common.loading") : t("contact.form.submit")}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div className="space-y-4" {...fadeUp(0.1)}>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-px rounded-2xl block"
                style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.4) 0%, rgba(37,211,102,0.08) 100%)" }}
              >
                <div className="bg-[#0F1117] rounded-[15px] p-6 flex items-center gap-4 transition-colors duration-200 group-hover:bg-[#121a14]">
                  <div className="w-12 h-12 bg-green-500/15 border border-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={22} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t("contact.whatsapp_btn")}</p>
                    <p className="text-sm text-gray-500">Resposta em minutos</p>
                  </div>
                </div>
              </a>

              {/* Calendly */}
              <div
                className="p-px rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.2) 0%, rgba(27,95,255,0.04) 100%)" }}
              >
                <div className="bg-[#0F1117] rounded-[15px] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center">
                      <Calendar size={16} className="text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{t("contact.calendly_title")}</h3>
                  </div>
                  {CALENDLY_URL ? (
                    <iframe
                      src={CALENDLY_URL}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      className="rounded-xl"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">
                      Configure{" "}
                      <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-500 text-xs">
                        NEXT_PUBLIC_CALENDLY_URL
                      </code>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
