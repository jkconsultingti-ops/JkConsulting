"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-colors text-sm";

const labelCls = "block text-sm font-medium text-gray-400 mb-1.5";

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
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 relative overflow-hidden"
      style={{ background: "#0D1020" }}
    >
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="w-full max-w-md relative">
        <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
          Nova senha
        </h1>

        <div
          className="p-px rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.35) 0%, rgba(27,95,255,0.07) 100%)" }}
        >
          <div className="bg-[#0D1020] rounded-[15px] p-8">
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-500/15 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={28} className="text-green-400" />
                </div>
                <p className="text-white font-semibold">Senha alterada com sucesso! Redirecionando...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelCls}>Nova senha</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Confirmar nova senha</label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={cn(inputCls)}
                  />
                </div>
                {errorMsg && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "saving"}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-70 shadow-lg shadow-blue-600/20"
                >
                  {status === "saving" ? "Salvando..." : "Salvar nova senha"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
