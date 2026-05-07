import Link from "next/link";
import {
  SplitSquareHorizontal,
  GitBranch,
  Share2,
  Package,
  DatabaseZap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pages: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/state/client-vs-server",
    icon: SplitSquareHorizontal,
    iconColor: "#2dd4bf",
    title: "クライアント状態とサーバー状態",
    description: "UIの状態とデータ取得の状態を分けて考える・なぜ区別が必要か",
    status: "完成",
  },
  {
    href: "/state/usereducer",
    icon: GitBranch,
    iconColor: "#5eead4",
    title: "useState と useReducer",
    description: "単純な状態と複雑な状態の使い分け・useReducerのパターン",
    status: "完成",
  },
  {
    href: "/state/context",
    icon: Share2,
    iconColor: "#2dd4bf",
    title: "Context API",
    description: "グローバルな状態共有と re-render の罠・適切な使い所",
    status: "完成",
  },
  {
    href: "/state/zustand",
    icon: Package,
    iconColor: "#5eead4",
    title: "Zustand",
    description: "シンプルなグローバル状態管理ライブラリ・useStore の基本",
    status: "完成",
  },
  {
    href: "/state/tanstack-query",
    icon: DatabaseZap,
    iconColor: "#2dd4bf",
    title: "TanStack Query",
    description: "サーバーデータのキャッシュ・同期・ローディング管理・useQuery の基本",
    status: "完成",
  },
];

export default function StateHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">状態管理</h1>
      <p className="text-sm text-gray-400 mb-8">
        Reactアプリの「状態」をどう持ち、どう更新し、どう共有するか。
        UIの状態・サーバーデータ・グローバルな状態を目的別に使い分ける設計の基礎。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-teal-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-teal-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(20,184,166,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#2dd4bf" : "#9ca3af",
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
