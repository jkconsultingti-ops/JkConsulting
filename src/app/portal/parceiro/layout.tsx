"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Users, DollarSign, Ticket, FolderOpen, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function PartnerPortalLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { href: "/portal/parceiro", label: t("portal.partner.dashboard"), Icon: LayoutDashboard },
    { href: "/portal/parceiro/leads", label: t("portal.partner.leads"), Icon: Users },
    { href: "/portal/parceiro/comissoes", label: t("portal.partner.commissions"), Icon: DollarSign },
    { href: "/portal/parceiro/tickets", label: t("portal.partner.tickets"), Icon: Ticket },
    { href: "/portal/parceiro/recursos", label: t("portal.partner.resources"), Icon: FolderOpen },
    { href: "/portal/parceiro/configuracoes", label: t("portal.partner.settings"), Icon: Settings },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4 shrink-0 hidden md:flex">
        <div className="mb-8 px-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{t("portal.partner.title")}</p>
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
          {t("portal.partner.logout")}
        </button>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-40">
        {nav.slice(0, 5).map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-colors",
              pathname === href ? "text-blue-600" : "text-gray-400"
            )}
          >
            <Icon size={20} />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>

      <div className="flex-1 p-6 md:p-8 pb-20 md:pb-8 bg-gray-50">{children}</div>
    </div>
  );
}
