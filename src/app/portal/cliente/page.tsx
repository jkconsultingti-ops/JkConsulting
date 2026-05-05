"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FolderOpen, AlertCircle, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

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
  completed: { color: "bg-green-100 text-green-700", Icon: CheckCircle2 },
};

export default function ClientDashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

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

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;
  }

  const active = projects.filter((p) => p.status !== "completed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("portal.client.welcome")}, {user?.user_metadata?.name || user?.email} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {t("portal.client.active_projects")}: <span className="font-semibold text-blue-600">{active.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["not_started", "in_progress", "completed"] as const).map((s) => (
          <div key={s} className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">
              {t(`portal.client.status.${s.replace("_", "_")}`)}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {projects.filter((p) => p.status === s).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FolderOpen size={20} className="text-blue-600" />
          {t("portal.client.projects")}
        </h2>
        {projects.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">{t("portal.client.no_projects")}</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const { color, Icon } = statusConfig[project.status];
              return (
                <div key={project.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
                  </div>
                  <span className={cn("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full", color)}>
                    <Icon size={12} />
                    {t(`portal.client.status.${project.status}`)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
