"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #3B6FFF 0%, #60A5FA 100%)",
        }}
      />
    </div>
  );
}
