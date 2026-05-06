import Link from "next/link";
import { Database, ShieldCheck, Zap, Lock } from "lucide-react";
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
    href: "/firebase/firestore",
    icon: Database,
    iconColor: "#fb923c",
    title: "Firestoreって何？",
    description: "コレクション・ドキュメント構造とリアルタイム同期の仕組み",
    status: "完成",
    isStart: true,
  },
  {
    href: "/firebase/auth",
    icon: Lock,
    iconColor: "#fb923c",
    title: "Firebase Auth",
    description: "認証の仕組みとメール・Googleログインの実装",
    status: "完成",
  },
  {
    href: "/firebase/security-rules",
    icon: ShieldCheck,
    iconColor: "#fb923c",
    title: "セキュリティルール",
    description: "アクセス制御の書き方と本番運用パターン",
    status: "完成",
  },
  {
    href: "/firebase/realtime",
    icon: Zap,
    iconColor: "#fb923c",
    title: "リアルタイム購読",
    description: "onSnapshot で変更を受け取る仕組みと React 連携",
    status: "完成",
  },
];

export default function FirebasePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-xs text-gray-500 hover:text-white transition-colors mb-8 block"
      >
        ← トップに戻る
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
          CATEGORY
        </p>
        <h1 className="text-3xl font-bold text-white mb-3">Firebase</h1>
        <p className="text-base text-gray-400 leading-relaxed">
          GoogleのBaaSプラットフォーム。Firestoreデータベース・Auth認証・セキュリティルールの仕組みを図解で学ぶ。
        </p>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.href} className="relative">
            {page.status === "完成" ? (
              <Link
                href={page.href}
                className="flex items-start gap-4 rounded-xl border p-5 transition-colors group"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)" }}
                >
                  <page.icon className="w-5 h-5" style={{ color: page.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                      {page.title}
                    </p>
                    {page.isStart && (
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: "rgba(249,115,22,0.15)",
                          color: "#fb923c",
                          border: "1px solid rgba(249,115,22,0.3)",
                        }}
                      >
                        ここから
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{page.description}</p>
                </div>
              </Link>
            ) : (
              <div
                className="flex items-start gap-4 rounded-xl border p-5 opacity-50"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0f1117", border: "1px solid #2d3048" }}
                >
                  <page.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-500">{page.title}</p>
                    <span className="text-[11px] px-2 py-0.5 rounded-full text-gray-600" style={{ border: "1px solid #2d3048" }}>
                      準備中
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{page.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
