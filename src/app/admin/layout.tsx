"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Users, UserCheck, FolderOpen, Receipt, Ticket, FileText, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/admin/clientes", label: t("portal.admin.clients"), Icon: Users },
    { href: "/admin/parceiros", label: t("portal.admin.partners"), Icon: UserCheck },
    { href: "/admin/projetos", label: t("portal.admin.projects"), Icon: FolderOpen },
    { href: "/admin/faturas", label: t("portal.admin.invoices"), Icon: Receipt },
    { href: "/admin/tickets", label: t("portal.admin.tickets"), Icon: Ticket },
    { href: "/admin/conteudo", label: t("portal.admin.content"), Icon: FileText },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4 shrink-0">
        <div className="mb-8 px-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("portal.admin.title")}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mt-4"
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>
      <div className="flex-1 p-8 bg-gray-50">{children}</div>
    </div>
  );
}
