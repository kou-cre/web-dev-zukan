import Link from "next/link";
import { ShieldCheck, KeyRound, Bug, Globe2, FileWarning, AlertTriangle } from "lucide-react";
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
    href: "/security/env-vars",
    icon: KeyRound,
    iconColor: "#fbbf24",
    title: "環境変数とシークレット管理",
    description: ".env ファイルの使い方・NEXT_PUBLIC_ の意味・公開してよい変数といけない変数の違い",
    status: "完成",
  },
  {
    href: "/security/xss",
    icon: Bug,
    iconColor: "#fbbf24",
    title: "XSS（クロスサイトスクリプティング）",
    description: "悪意あるスクリプト注入の仕組みと、React・Next.jsでの自動エスケープの仕組み",
    status: "完成",
  },
  {
    href: "/security/cors",
    icon: Globe2,
    iconColor: "#fbbf24",
    title: "CORS",
    description: "クロスオリジンリクエストの制限とサーバー側の設定・preflightリクエストの役割",
    status: "完成",
  },
  {
    href: "/security/csrf",
    icon: FileWarning,
    iconColor: "#fbbf24",
    title: "CSRF",
    description: "フォームを悪用した攻撃の仕組み・CSRFトークン対策・SameSite Cookieの設定",
    status: "完成",
  },
  {
    href: "/security/api-key-leak",
    icon: AlertTriangle,
    iconColor: "#fbbf24",
    title: "APIキー漏洩の対処",
    description: "誤ってGitにコミットしたときの緊急対応手順・BFG Repo Cleaner の使い方",
    status: "完成",
  },
];

export default function SecurityHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck size={24} className="text-amber-400 flex-shrink-0" />
        <h1 className="text-2xl font-bold text-white">セキュリティ基礎</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8">
        Webアプリを安全に保つための基本知識。攻撃の仕組みを知れば、対策は怖くない。
        環境変数・XSS・CORS・CSRF・APIキー漏洩の5トピックを図解で理解する。
      </p>

      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-amber-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#fbbf24" : "#9ca3af",
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
