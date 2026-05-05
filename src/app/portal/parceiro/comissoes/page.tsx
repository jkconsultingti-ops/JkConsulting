"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DollarSign } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Commission = {
  id: string;
  lead_company: string;
  amount: number;
  status: "pending" | "approved" | "paid";
  created_at: string;
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-600",
  paid: "bg-green-100 text-green-600",
};

export default function ComissoesPage() {
  const { t } = useTranslation();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("commissions")
          .select("*")
          .eq("partner_id", user.id)
          .order("created_at", { ascending: false });
        setCommissions(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const fmt = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
  const total = commissions.filter(c => c.status === "paid").reduce((s, c) => s + c.amount, 0);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.commissions")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["pending", "approved", "paid"] as const).map((s) => {
          const items = commissions.filter(c => c.status === s);
          const sum = items.reduce((acc, c) => acc + c.amount, 0);
          return (
            <div key={s} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-2">{t(`portal.partner.commission_status.${s}`)}</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(sum)}</p>
              <p className="text-xs text-gray-400 mt-1">{items.length} registro(s)</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {commissions.length === 0 ? (
          <div className="p-16 text-center">
            <DollarSign size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("portal.partner.no_commissions")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Empresa", "Valor", "Data", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {commissions.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{c.lead_company}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{fmt(c.amount)}</td>
                  <td className="px-5 py-4 text-gray-400">{new Date(c.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColors[c.status])}>
                      {t(`portal.partner.commission_status.${c.status}`)}
                    </span>
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
