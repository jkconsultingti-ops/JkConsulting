"use client";

import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

export default function BlogPage() {
  const { t } = useTranslation();
  const tags = t("blog.tags", { returnObjects: true }) as string[];

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("blog.title")}</h1>
          <p className="text-lg text-gray-600 mb-8">{t("blog.subtitle")}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <Clock size={48} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-400 mb-3">{t("blog.coming_soon")}</h2>
          <p className="text-gray-400">{t("blog.coming_soon_desc")}</p>
        </div>
      </div>
    </div>
  );
}
