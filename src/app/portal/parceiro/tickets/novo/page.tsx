"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function NovoTicketPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    title: "",
    category: "technical" as "technical" | "commercial" | "commission" | "collaboration" | "other",
    priority: "medium" as "low" | "medium" | "high",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setStatus("error"); return; }

    const { count } = await supabase.from("tickets").select("id", { count: "exact" });
    const number = `#TKT-${String((count || 0) + 1).padStart(4, "0")}`;

    const { error } = await supabase.from("tickets").insert({
      ...form,
      partner_id: user.id,
      status: "open",
      number,
    });
    if (error) { setStatus("error"); return; }
    setStatus("success");
    setTimeout(() => router.push("/portal/parceiro/tickets"), 1500);
  };

  return (
    <div className="max-w-lg space-y-6">
      <Link href="/portal/parceiro/tickets" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium">
        <ArrowLeft size={16} /> {t("common.back")}
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.open_ticket")}</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
          <input type="text" name="title" required value={form.title} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {(["technical", "commercial", "commission", "collaboration", "other"] as const).map((c) => (
                <option key={c} value={c}>{t(`portal.partner.ticket_category.${c}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Prioridade</label>
            <select name="priority" value={form.priority} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {(["low", "medium", "high"] as const).map((p) => (
                <option key={p} value={p}>{t(`portal.partner.ticket_priority.${p}`)}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição *</label>
          <textarea name="description" required rows={5} value={form.description} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        {status === "success" && (
          <div className="flex gap-2 items-center text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} /> Chamado aberto com sucesso!
          </div>
        )}
        {status === "error" && (
          <div className="flex gap-2 items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={16} /> Erro ao abrir chamado. Tente novamente.
          </div>
        )}

        <button type="submit" disabled={status === "saving" || status === "success"}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
          {status === "saving" ? t("common.loading") : "Abrir Chamado"}
        </button>
      </form>
    </div>
  );
}
