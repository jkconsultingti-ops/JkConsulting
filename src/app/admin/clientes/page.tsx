"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Plus, UserMinus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  active: boolean;
};

export default function AdminClientesPage() {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from("profiles").select("*").eq("role", "client").order("created_at", { ascending: false });
    setClients(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const tempPassword = Math.random().toString(36).slice(2, 10);
    const { data, error } = await (supabase.auth as any).admin.createUser({
      email: newEmail,
      password: tempPassword,
      user_metadata: { name: newName, role: "client" },
      email_confirm: true,
    });
    if (!error && data?.user) {
      await supabase.from("profiles").insert({ id: data.user.id, name: newName, email: newEmail, role: "client", active: true });
      await load();
    }
    setNewEmail("");
    setNewName("");
    setShowCreate(false);
    setCreating(false);
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from("profiles").update({ active: !active }).eq("id", id);
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, active: !active } : c));
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("portal.admin.clients")}</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Novo Cliente
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
            <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
            <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={creating}
            className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
            {creating ? "Criando..." : "Criar"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-16 text-center"><Users size={40} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400">Nenhum cliente cadastrado.</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Nome", "E-mail", "Desde", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{c.name}</td>
                  <td className="px-5 py-4 text-gray-500">{c.email}</td>
                  <td className="px-5 py-4 text-gray-400">{new Date(c.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {c.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(c.id, c.active)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title={c.active ? "Desativar" : "Ativar"}>
                      <UserMinus size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
