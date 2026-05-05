"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FolderOpen, FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Resource = {
  id: string;
  name: string;
  description: string;
  path: string;
  type: string;
  size: number;
};

export default function RecursosPage() {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("partner_resources")
        .select("*")
        .order("name");
      setResources(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleDownload = async (resource: Resource) => {
    const { data } = await supabase.storage.from("partner-resources").createSignedUrl(resource.path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.partner.resources")}</h1>

      {resources.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <FolderOpen size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">Nenhum recurso disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{res.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{res.description}</p>
                <p className="text-xs text-gray-400 mt-1">{(res.size / 1024).toFixed(0)} KB · {res.type.toUpperCase()}</p>
              </div>
              <button
                onClick={() => handleDownload(res)}
                className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors ml-4 shrink-0"
              >
                <FileDown size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
