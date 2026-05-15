"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-colors text-sm";

const labelCls = "block text-sm font-medium text-gray-400 mb-1.5";

function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [tab, setTab] = useState<"cliente" | "parceiro">("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.user) {
      setError(t("login.error"));
      setLoading(false);
      return;
    }

    const role = data.user.user_metadata?.role as string | undefined;
    if (redirect) {
      router.push(redirect);
    } else if (role === "admin") {
      router.push("/admin");
    } else if (role === "parceiro") {
      router.push("/portal/parceiro");
    } else {
      router.push("/portal/cliente");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login/reset`,
    });
    setForgotSent(true);
    setLoading(false);
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 relative overflow-hidden"
      style={{ background: "#0D1020" }}
    >
      {/* Glow orbs */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #7BA4FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{t("login.title")}</h1>
        </div>

        <div
          className="p-px rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(27,95,255,0.35) 0%, rgba(27,95,255,0.07) 100%)" }}
        >
          <div className="bg-[#0D1020] rounded-[15px] p-8">
            {/* Tabs */}
            <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 mb-8">
              {(["cliente", "parceiro"] as const).map((t_tab) => (
                <button
                  key={t_tab}
                  onClick={() => setTab(t_tab)}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150",
                    tab === t_tab
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {t_tab === "cliente" ? t("login.client_tab") : t("login.partner_tab")}
                </button>
              ))}
            </div>

            {forgotMode ? (
              forgotSent ? (
                <div className="text-center py-6">
                  <p className="text-green-400 font-medium">
                    E-mail de redefinição enviado. Verifique sua caixa de entrada.
                  </p>
                  <button
                    onClick={() => { setForgotMode(false); setForgotSent(false); }}
                    className="mt-4 text-blue-400 text-sm hover:underline"
                  >
                    Voltar ao login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className={labelCls}>{t("login.email")}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? t("common.loading") : "Enviar link de redefinição"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotMode(false)}
                    className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Voltar
                  </button>
                </form>
              )
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className={labelCls}>{t("login.email")}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>{t("login.password")}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className={cn(inputCls, "pr-12")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex gap-2 items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle size={15} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-white font-semibold py-3 rounded-xl disabled:opacity-60"
                >
                  {loading ? t("login.loading") : t("login.submit")}
                </button>

                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-gray-600 hover:text-blue-400 transition-colors"
                  >
                    {t("login.forgot_password")}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-xs text-gray-700 mt-6">{t("login.no_account")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
