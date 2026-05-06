import Link from "next/link";
import { BookOpen, Map, Download, Server, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pages: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
  isStart?: boolean;
}[] = [
  {
    href: "/nextjs/intro",
    icon: BookOpen,
    iconColor: "#38bdf8",
    title: "はじめに読む",
    description: "Next.jsをはじめる前のチェックリスト — Reactの何を知っておくべきか",
    status: "完成",
    isStart: true,
  },
  {
    href: "/nextjs/routing",
    icon: Map,
    iconColor: "#60a5fa",
    title: "App Router と ファイルベースルーティング",
    description: "ファイルを置くだけでURLが決まる — Next.jsのルーティング設計",
    status: "完成",
  },
  {
    href: "/nextjs/data-fetching",
    icon: Download,
    iconColor: "#22d3ee",
    title: "データフェッチ",
    description: "awaitをコンポーネントに直接書いてデータを取得する方法",
    status: "完成",
  },
  {
    href: "/nextjs/server-component",
    icon: Server,
    iconColor: "#a78bfa",
    title: "Server Components",
    description: "Reactがサーバーで動く — 'use client' の境界線を理解する",
    status: "完成",
  },
  {
    href: "/nextjs/api-routes",
    icon: Code2,
    iconColor: "#34d399",
    title: "API Routes",
    description: "自分でAPIエンドポイントを作る — app/api/route.tsの使い方",
    status: "完成",
  },
];

export default function NextJsHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Next.js</h1>
      <p className="text-sm text-gray-400 mb-2">
        Reactのフレームワーク。ルーティング・サーバー処理・APIを標準装備したReactの進化形。
      </p>
      <p className="text-xs text-gray-500 mb-8">
        ← 上から順番に読むことを推奨。Reactカテゴリを先に読んでいると理解しやすい。
      </p>
      <div className="space-y-2">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-sky-500/40"
              style={{
                backgroundColor: page.isStart ? "rgba(56,189,248,0.05)" : "#1a1d2a",
                borderColor: page.isStart ? "rgba(56,189,248,0.3)" : "#2d3048",
              }}
            >
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4 text-right">{index + 1}</span>
                <Icon size={20} style={{ color: page.iconColor }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {page.title}
                  </p>
                  {page.isStart && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      ここから
                    </span>
                  )}
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#34d399" : "#9ca3af",
                    }}
                  >
                    {page.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{page.description}</p>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-sm">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
