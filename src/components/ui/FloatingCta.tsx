"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "jk_floating_cta";

export function FloatingCta() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isPublicPage =
    !pathname.startsWith("/portal") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/login");

  useEffect(() => {
    if (!isPublicPage) return;
    if (sessionStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(total > 0 && window.scrollY / total >= 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isPublicPage]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
    setVisible(false);
  };

  if (!isPublicPage || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[55] pointer-events-none"
        >
          <div
            className="pointer-events-auto bg-gray-900/95 backdrop-blur-xl border-t border-white/[0.08] shadow-2xl shadow-black/50 px-4 sm:px-6 pt-3.5 flex items-center gap-4"
            style={{ paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
          >
            <p className="text-gray-300 text-sm font-medium flex-1 leading-snug hidden sm:block">
              {t("home.final_cta.subtitle")}
            </p>
            <p className="text-gray-300 text-sm font-medium flex-1 leading-snug sm:hidden">
              {t("home.final_cta.title")}
            </p>
            <Link
              href="/contato"
              className="btn-primary inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex-shrink-0 whitespace-nowrap"
            >
              {t("home.hero.cta_diagnosis")}
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={dismiss}
              className="text-gray-600 hover:text-gray-400 transition-colors p-2 rounded-lg hover:bg-white/[0.05] flex-shrink-0"
              aria-label="Dispensar"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
