"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

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
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("login.title")}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Tabs */}
          <div className="flex bg-gray-50 rounded-xl p-1 mb-8">
            {(["cliente", "parceiro"] as const).map((t_tab) => (
              <button
                key={t_tab}
                onClick={() => setTab(t_tab)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                  tab === t_tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {t_tab === "cliente" ? t("login.client_tab") : t("login.partner_tab")}
              </button>
            ))}
          </div>

          {forgotMode ? (
            forgotSent ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium">E-mail de redefinição enviado. Verifique sua caixa de entrada.</p>
                <button onClick={() => { setForgotMode(false); setForgotSent(false); }} className="mt-4 text-blue-600 text-sm hover:underline">
                  Voltar ao login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("login.email")}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {loading ? t("common.loading") : "Enviar link de redefinição"}
                </button>
                <button type="button" onClick={() => setForgotMode(false)} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-2">
                  Voltar
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("login.email")}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("login.password")}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex gap-2 items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {loading ? t("login.loading") : t("login.submit")}
              </button>

              <div className="flex justify-between text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("login.forgot_password")}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-400 mt-6">{t("login.no_account")}</p>
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
