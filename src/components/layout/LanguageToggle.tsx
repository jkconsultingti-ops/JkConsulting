"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "pt";

  const toggle = (lang: "pt" | "en") => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      <button
        onClick={() => toggle("pt")}
        className={cn(
          "px-2 py-0.5 rounded transition-colors",
          current === "pt"
            ? "text-blue-600 font-semibold"
            : "text-gray-400 hover:text-gray-700"
        )}
      >
        PT
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => toggle("en")}
        className={cn(
          "px-2 py-0.5 rounded transition-colors",
          current === "en"
            ? "text-blue-600 font-semibold"
            : "text-gray-400 hover:text-gray-700"
        )}
      >
        EN
      </button>
    </div>
  );
}
