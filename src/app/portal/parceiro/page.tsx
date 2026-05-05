"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Users, DollarSign, Ticket, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

export default function PartnerDashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ leads: 0, pending_commissions: 0, open_tickets: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const [leadsRes, commissionsRes, ticketsRes] = await Promise.all([
          supabase.from("leads").select("id", { count: "exact" }).eq("partner_id", user.id),
          supabase.from("commissions").select("id", { count: "exact" }).eq("partner_id", user.id).eq("status", "pending"),
          supabase.from("tickets").select("id", { count: "exact" }).eq("partner_id", user.id).eq("status", "open"),
        ]);
        setStats({
          leads: leadsRes.count || 0,
          pending_commissions: commissionsRes.count || 0,
          open_tickets: ticketsRes.count || 0,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  const cards = [
    { label: t("portal.partner.leads"), value: stats.leads, Icon: Users, href: "/portal/parceiro/leads", color: "text-blue-600 bg-blue-50" },
    { label: "Comissões Pendentes", value: stats.pending_commissions, Icon: DollarSign, href: "/portal/parceiro/comissoes", color: "text-yellow-600 bg-yellow-50" },
    { label: "Chamados Abertos", value: stats.open_tickets, Icon: Ticket, href: "/portal/parceiro/tickets", color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("portal.partner.welcome")}, {user?.user_metadata?.name || user?.email} 👋
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/portal/parceiro/leads/novo"
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> {t("portal.partner.submit_lead")}
          </Link>
          <Link
            href="/portal/parceiro/tickets/novo"
            className="border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <Ticket size={16} /> {t("portal.partner.open_ticket")}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(({ label, value, Icon, href, color }) => (
          <Link key={href} href={href} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all group">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", color)}>
              <Icon size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
