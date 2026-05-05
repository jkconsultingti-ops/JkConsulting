"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Users, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Lead = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  status: "submitted" | "contacted" | "proposal_sent" | "won" | "lost";
  created_at: string;
  notes: string;
};

const statusColors = {
  submitted: "bg-gray-100 text-gray-600",
  contacted: "bg-blue-100 text-blue-600",
  proposal_sent: "bg-yellow-100 text-yellow-700",
  won: "bg-green-100 text-green-600",
  lost: "bg-red-100 text-red-600",
};

export default function LeadsPage() {
  const { t } = useTranslation();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("leads")
          .select("*")
          .eq("partner_id", user.id)
          .order("created_at", { ascending: false });
        setLeads(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.leads")}</h1>
        <Link
          href="/portal/parceiro/leads/novo"
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> {t("portal.partner.submit_lead")}
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-16 text-center">
            <Users size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("portal.partner.no_leads")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Empresa", "Contato", "E-mail", "Data", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">{lead.company_name}</td>
                  <td className="px-5 py-4 text-gray-600">{lead.contact_name}</td>
                  <td className="px-5 py-4 text-gray-500">{lead.contact_email}</td>
                  <td className="px-5 py-4 text-gray-400">{new Date(lead.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColors[lead.status])}>
                      {t(`portal.partner.lead_status.${lead.status}`)}
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
