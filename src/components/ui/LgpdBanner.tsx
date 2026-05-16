"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "jk_lgpd";

export function LgpdBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = (accepted: boolean) => {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 flex justify-center">
      <div
        className="w-full max-w-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl px-5 py-4 border border-white/[0.08] shadow-2xl"
        style={{ background: "rgba(13,16,32,0.94)", backdropFilter: "blur(18px)" }}
      >
        <p className="text-gray-400 text-sm flex-1 leading-relaxed">
          {t("lgpd.message")}{" "}
          <Link href="/privacidade" className="text-blue-400 hover:underline">
            {t("lgpd.privacy_link")}
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => dismiss(true)}
            className="btn-primary text-white font-semibold text-sm px-5 py-2 rounded-xl"
          >
            {t("lgpd.accept")}
          </button>
          <button
            onClick={() => dismiss(false)}
            className="text-gray-600 hover:text-gray-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]"
            aria-label={t("lgpd.decline")}
          >
            <X size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
