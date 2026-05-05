"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Receipt, FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Invoice = {
  id: string;
  number: string;
  description: string;
  amount: number;
  status: "sent" | "paid" | "overdue";
  due_date: string;
  pdf_path: string | null;
};

const statusColors = {
  sent: "bg-blue-100 text-blue-600",
  paid: "bg-green-100 text-green-600",
  overdue: "bg-red-100 text-red-600",
};

export default function FaturasPage() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("invoices")
          .select("*")
          .eq("client_id", user.id)
          .order("due_date", { ascending: false });
        setInvoices(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleDownload = async (invoice: Invoice) => {
    if (!invoice.pdf_path) return;
    const { data } = await supabase.storage.from("invoices").createSignedUrl(invoice.pdf_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const fmt = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.client.invoices")}</h1>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-16 text-center">
            <Receipt size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("portal.client.no_invoices")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Nº", "Descrição", "Vencimento", "Valor", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-gray-600">{inv.number}</td>
                  <td className="px-5 py-4 text-gray-900">{inv.description}</td>
                  <td className="px-5 py-4 text-gray-500">{new Date(inv.due_date).toLocaleDateString("pt-BR")}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{fmt(inv.amount)}</td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColors[inv.status])}>
                      {t(`portal.client.invoice_status.${inv.status}`)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {inv.pdf_path && (
                      <button
                        onClick={() => handleDownload(inv)}
                        className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Download PDF"
                      >
                        <FileDown size={16} />
                      </button>
                    )}
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
