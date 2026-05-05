"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Users, UserCheck, FolderOpen, Receipt, Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ clients: 0, partners: 0, projects: 0, invoices: 0, open_tickets: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [clientsRes, partnersRes, projectsRes, invoicesRes, ticketsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact" }).eq("role", "client"),
        supabase.from("profiles").select("id", { count: "exact" }).eq("role", "partner"),
        supabase.from("projects").select("id", { count: "exact" }).eq("status", "in_progress"),
        supabase.from("invoices").select("id", { count: "exact" }).eq("status", "overdue"),
        supabase.from("tickets").select("id", { count: "exact" }).eq("status", "open"),
      ]);
      setStats({
        clients: clientsRes.count || 0,
        partners: partnersRes.count || 0,
        projects: projectsRes.count || 0,
        invoices: invoicesRes.count || 0,
        open_tickets: ticketsRes.count || 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: t("portal.admin.clients"), value: stats.clients, Icon: Users, href: "/admin/clientes", color: "text-blue-600 bg-blue-50" },
    { label: t("portal.admin.partners"), value: stats.partners, Icon: UserCheck, href: "/admin/parceiros", color: "text-purple-600 bg-purple-50" },
    { label: "Projetos Ativos", value: stats.projects, Icon: FolderOpen, href: "/admin/projetos", color: "text-green-600 bg-green-50" },
    { label: "Faturas em Atraso", value: stats.invoices, Icon: Receipt, href: "/admin/faturas", color: "text-red-600 bg-red-50" },
    { label: "Chamados Abertos", value: stats.open_tickets, Icon: Ticket, href: "/admin/tickets", color: "text-yellow-600 bg-yellow-50" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.admin.title")}</h1>

      {loading ? (
        <p className="text-gray-400">{t("common.loading")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ label, value, Icon, href, color }) => (
            <Link key={href} href={href} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
