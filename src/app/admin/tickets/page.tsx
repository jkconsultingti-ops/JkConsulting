"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type TicketItem = {
  id: string;
  number: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  partner_name: string;
  created_at: string;
  description: string;
};

const statusColors = {
  open: "bg-blue-100 text-blue-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  waiting: "bg-purple-100 text-purple-600",
  resolved: "bg-green-100 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};

const priorityColors = { low: "text-gray-400", medium: "text-yellow-500", high: "text-red-500" };

const NEXT_STATUSES: Record<string, string[]> = {
  open: ["in_progress", "closed"],
  in_progress: ["waiting", "resolved"],
  waiting: ["in_progress", "resolved"],
  resolved: ["closed"],
  closed: [],
};

export default function AdminTicketsPage() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase
      .from("tickets")
      .select("*, profiles(name)")
      .order("created_at", { ascending: false });
    setTickets((data || []).map((tk: any) => ({ ...tk, partner_name: tk.profiles?.name || "—" })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("tickets").update({ status }).eq("id", id);
    setTickets((prev) => prev.map((tk) => tk.id === id ? { ...tk, status: status as TicketItem["status"] } : tk));
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.admin.tickets")}</h1>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Ticket size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum chamado aberto.</p>
          </div>
        ) : tickets.map((tk) => (
          <div key={tk.id} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-gray-400">{tk.number}</span>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColors[tk.status])}>
                    {t(`portal.partner.ticket_status.${tk.status}`)}
                  </span>
                  <span className={cn("text-xs font-semibold", priorityColors[tk.priority])}>
                    {t(`portal.partner.ticket_priority.${tk.priority}`)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{tk.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{tk.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Parceiro: {tk.partner_name} · {new Date(tk.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="shrink-0">
                <select
                  value={tk.status}
                  onChange={(e) => updateStatus(tk.id, e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value={tk.status}>{t(`portal.partner.ticket_status.${tk.status}`)}</option>
                  {NEXT_STATUSES[tk.status]?.map((s) => (
                    <option key={s} value={s}>{t(`portal.partner.ticket_status.${s}`)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
