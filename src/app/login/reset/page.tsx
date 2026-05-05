"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setErrorMsg("As senhas não coincidem."); return; }
    if (password.length < 8) { setErrorMsg("A senha deve ter pelo menos 8 caracteres."); return; }
    setStatus("saving");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setErrorMsg(error.message); setStatus("error"); return; }
    setStatus("success");
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nova senha</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {status === "success" ? (
            <div className="text-center py-4">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <p className="text-green-600 font-medium">Senha alterada com sucesso! Redirecionando...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova senha</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar nova senha</label>
                <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {errorMsg && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{errorMsg}</p>}
              <button type="submit" disabled={status === "saving"}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
                {status === "saving" ? "Salvando..." : "Salvar nova senha"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
