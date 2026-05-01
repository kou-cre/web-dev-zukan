import Link from "next/link";
import { Server, Database, Cloud, Triangle, Smartphone } from "lucide-react";
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
    href: "/kiso/server",
    icon: Server,
    iconColor: "#34d399",
    title: "サーバーって何？",
    description: "リクエスト・レスポンスの仕組みと、BaaSとの関係を掴む",
    status: "完成",
  },
  {
    href: "/kiso/database",
    icon: Database,
    iconColor: "#a78bfa",
    title: "データベースって何？",
    description: "DBの役割と、Firebase / Supabase の違い",
    status: "完成",
  },
  {
    href: "/kiso/baas",
    icon: Cloud,
    iconColor: "#60a5fa",
    title: "BaaSって何？",
    description: "Backend as a Service の概念をフロントエンド視点から",
    status: "完成",
  },
  {
    href: "/kiso/vercel",
    icon: Triangle,
    iconColor: "#e2e8f0",
    title: "Vercelって何？",
    description: "デプロイ先としての Vercel の位置づけ",
    status: "完成",
  },
  {
    href: "/kiso/pwa",
    icon: Smartphone,
    iconColor: "#fb923c",
    title: "PWAって何？",
    description: "manifest.json と Service Worker でWebサイトをアプリ化する仕組み",
    status: "完成",
  },
];

export default function KisoHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">基礎概念</h1>
      <p className="text-sm text-gray-400 mb-8">
        ロードマップ着手前に理解しておきたい前提知識。「何を使っているか」より「なぜそれを使うのか」を掴む。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-emerald-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {page.title}
                  </p>
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
