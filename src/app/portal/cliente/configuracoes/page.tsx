"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ConfiguracoesClientePage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setName(user?.user_metadata?.name || "");
      setPhone(user?.user_metadata?.phone || "");
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    const updates: Record<string, string> = { name, phone };
    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) { setStatus("error"); return; }
    if (newPassword) {
      const { error: pwErr } = await supabase.auth.updateUser({ password: newPassword });
      if (pwErr) { setStatus("error"); return; }
    }
    setStatus("success");
    setNewPassword("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.client.settings")}</h1>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova senha (deixe em branco para manter)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70"
        >
          {status === "saving" ? t("common.loading") : t("common.save")}
        </button>
      </form>
    </div>
  );
}
