"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileDown, FileText, FolderOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Document = {
  id: string;
  name: string;
  project: string;
  path: string;
  created_at: string;
  size: number;
};

export default function DocumentosPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("documents")
          .select("*")
          .eq("client_id", user.id)
          .order("created_at", { ascending: false });
        setDocs(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleDownload = async (doc: Document) => {
    const { data } = await supabase.storage.from("client-documents").createSignedUrl(doc.path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const byProject = docs.reduce<Record<string, Document[]>>((acc, doc) => {
    if (!acc[doc.project]) acc[doc.project] = [];
    acc[doc.project].push(doc);
    return acc;
  }, {});

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.client.documents")}</h1>

      {docs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <FileText size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">{t("portal.client.no_documents")}</p>
        </div>
      ) : (
        Object.entries(byProject).map(([project, projectDocs]) => (
          <div key={project} className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FolderOpen size={18} className="text-blue-600" />
              {project}
            </h2>
            <div className="space-y-2">
              {projectDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-400">{(doc.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title={t("common.download")}
                  >
                    <FileDown size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
