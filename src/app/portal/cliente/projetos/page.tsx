"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FolderOpen, Clock, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  name: string;
  status: "not_started" | "in_progress" | "in_review" | "completed";
  description: string;
  updated_at: string;
};

const statusConfig = {
  not_started: { color: "bg-gray-100 text-gray-600", Icon: Clock },
  in_progress: { color: "bg-blue-100 text-blue-600", Icon: RotateCcw },
  in_review: { color: "bg-yellow-100 text-yellow-700", Icon: AlertCircle },
  completed: { color: "bg-green-100 text-green-600", Icon: CheckCircle2 },
};

export default function ProjetosPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", user.id)
          .order("updated_at", { ascending: false });
        setProjects(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("portal.client.projects")}</h1>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <FolderOpen size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">{t("portal.client.no_projects")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => {
            const { color, Icon } = statusConfig[project.status];
            return (
              <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <span className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-3", color)}>
                    <Icon size={12} />
                    {t(`portal.client.status.${project.status}`)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>
                <p className="text-xs text-gray-400 mt-4">
                  Atualizado em {new Date(project.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
