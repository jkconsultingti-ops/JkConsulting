"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Ticket, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type TicketItem = {
  id: string;
  number: string;
  title: string;
  category: "technical" | "commercial" | "commission" | "collaboration" | "other";
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  created_at: string;
};

const statusColors = {
  open: "bg-blue-100 text-blue-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  waiting: "bg-purple-100 text-purple-600",
  resolved: "bg-green-100 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};

const priorityColors = {
  low: "text-gray-400",
  medium: "text-yellow-500",
  high: "text-red-500",
};

export default function TicketsPage() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("tickets")
          .select("*")
          .eq("partner_id", user.id)
          .order("created_at", { ascending: false });
        setTickets(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.tickets")}</h1>
        <Link
          href="/portal/parceiro/tickets/novo"
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> {t("portal.partner.open_ticket")}
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {tickets.length === 0 ? (
          <div className="p-16 text-center">
            <Ticket size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("portal.partner.no_tickets")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Nº", "Título", "Categoria", "Prioridade", "Data", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tickets.map((tk) => (
                <tr key={tk.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-mono text-gray-500 text-xs">{tk.number}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{tk.title}</td>
                  <td className="px-5 py-4 text-gray-500">{t(`portal.partner.ticket_category.${tk.category}`)}</td>
                  <td className={cn("px-5 py-4 font-semibold", priorityColors[tk.priority])}>
                    {t(`portal.partner.ticket_priority.${tk.priority}`)}
                  </td>
                  <td className="px-5 py-4 text-gray-400">{new Date(tk.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColors[tk.status])}>
                      {t(`portal.partner.ticket_status.${tk.status}`)}
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
