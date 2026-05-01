"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "基礎概念", href: "/kiso" },
  { label: "JavaScript", href: "/javascript" },
  { label: "React", href: "/react" },
  { label: "Next.js", href: "/nextjs" },
  { label: "Firebase", href: "/firebase" },
  { label: "PWA", href: "/pwa" },
  { label: "本番運用", href: "/honban" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ページ遷移時にドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ドロワー開放中はスクロールをロック
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 border-b"
        style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
      >
        <span className="text-sm font-bold text-white">Web開発図解</span>

        {/* デスクトップナビ */}
        <nav className="hidden sm:flex items-center gap-1 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 rounded transition-colors whitespace-nowrap"
              style={{ color: pathname === item.href ? "#ffffff" : "#9ca3af" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* モバイルハンバーガーボタン */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          style={{ color: "#9ca3af" }}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* モバイルドロワー */}
      {/* バックドロップ */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* ドロワー本体 */}
      <div
        className={`sm:hidden fixed top-14 left-0 bottom-0 z-40 w-64 border-r transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
      >
        <nav className="flex flex-col py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-5 py-3 text-sm transition-colors"
              style={{
                color: pathname === item.href ? "#ffffff" : "#9ca3af",
                backgroundColor: pathname === item.href ? "rgba(255,255,255,0.05)" : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
