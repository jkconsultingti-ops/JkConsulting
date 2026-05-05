"use client";

import { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("contact.title")}</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <p className="text-green-700 font-semibold text-lg">{t("contact.form.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.company")} *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.challenge")} *
                  </label>
                  <textarea
                    name="challenge"
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.preferred_contact")}
                  </label>
                  <div className="flex gap-4">
                    {(["whatsapp", "email"] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferred_contact"
                          value={opt}
                          checked={form.preferred_contact === opt}
                          onChange={handleChange}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700">
                          {opt === "whatsapp" ? t("contact.form.whatsapp") : t("contact.form.email_option")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex gap-2 items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle size={16} />
                    {t("contact.form.error")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg",
                    status === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                  {status === "loading" ? t("common.loading") : t("contact.form.submit")}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-6 hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t("contact.whatsapp_btn")}</p>
                <p className="text-sm text-gray-500">Resposta rápida</p>
              </div>
            </a>

            {/* Calendly */}
            {CALENDLY_URL ? (
              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{t("contact.calendly_title")}</h3>
                </div>
                <iframe
                  src={CALENDLY_URL}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="rounded-xl"
                />
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{t("contact.calendly_title")}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Configure a URL do Calendly em <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_CALENDLY_URL</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
