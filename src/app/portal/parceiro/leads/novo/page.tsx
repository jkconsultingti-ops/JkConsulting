"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function NovoLeadPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setStatus("error"); return; }
    const { error } = await supabase.from("leads").insert({ ...form, partner_id: user.id, status: "submitted" });
    if (error) { setStatus("error"); return; }
    setStatus("success");
    setTimeout(() => router.push("/portal/parceiro/leads"), 1500);
  };

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/portal/parceiro/leads" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium">
        <ArrowLeft size={16} /> {t("common.back")}
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.submit_lead")}</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Empresa *</label>
          <input type="text" name="company_name" required value={form.company_name} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do contato *</label>
          <input type="text" name="contact_name" required value={form.contact_name} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail *</label>
            <input type="email" name="contact_email" required value={form.contact_email} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
            <input type="tel" name="contact_phone" value={form.contact_phone} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Observações</label>
          <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        {status === "success" && (
          <div className="flex gap-2 items-center text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} /> Lead submetido com sucesso!
          </div>
        )}
        {status === "error" && (
          <div className="flex gap-2 items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={16} /> Erro ao submeter. Tente novamente.
          </div>
        )}

        <button type="submit" disabled={status === "saving" || status === "success"}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
          {status === "saving" ? t("common.loading") : t("common.send")}
        </button>
      </form>
    </div>
  );
}
