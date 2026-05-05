"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ConfiguracoesParceiroPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", bank_name: "", bank_agency: "", bank_account: "", pix_key: "" });
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        setForm({
          name: user.user_metadata?.name || "",
          phone: user.user_metadata?.phone || "",
          bank_name: user.user_metadata?.bank_name || "",
          bank_agency: user.user_metadata?.bank_agency || "",
          bank_account: user.user_metadata?.bank_account || "",
          pix_key: user.user_metadata?.pix_key || "",
        });
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    const { error } = await supabase.auth.updateUser({ data: form });
    if (error) { setStatus("error"); return; }
    if (newPassword) {
      const { error: pwErr } = await supabase.auth.updateUser({ password: newPassword });
      if (pwErr) { setStatus("error"); return; }
    }
    setStatus("success");
    setNewPassword("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const fields = [
    { name: "name", label: "Nome", type: "text" },
    { name: "phone", label: "Telefone", type: "tel" },
  ];
  const bankFields = [
    { name: "bank_name", label: "Banco", type: "text" },
    { name: "bank_agency", label: "Agência", type: "text" },
    { name: "bank_account", label: "Conta", type: "text" },
    { name: "pix_key", label: "Chave Pix", type: "text" },
  ];

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.settings")}</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900">Dados de contato</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
            <input type="email" value={user?.email || ""} disabled
              className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-gray-400" />
          </div>
          {fields.map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input type={type} name={name} value={(form as Record<string, string>)[name]} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova senha</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900">Dados bancários para comissões</h2>
          {bankFields.map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input type={type} name={name} value={(form as Record<string, string>)[name]} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>

        {status === "success" && (
          <div className="flex gap-2 items-center text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} /> Configurações salvas com sucesso.
          </div>
        )}
        {status === "error" && (
          <div className="flex gap-2 items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={16} /> Erro ao salvar. Tente novamente.
          </div>
        )}

        <button type="submit" disabled={status === "saving"}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
          {status === "saving" ? t("common.loading") : t("common.save")}
        </button>
      </form>
    </div>
  );
}
