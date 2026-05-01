import Link from "next/link";
import { BookOpen, Braces, Atom, Triangle, Flame, Smartphone, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/kiso",
    icon: BookOpen,
    iconColor: "#34d399",
    title: "基礎概念",
    description: "サーバー・DB・BaaS・Vercel・PWA",
    status: "作成中",
  },
  {
    href: "/javascript",
    icon: Braces,
    iconColor: "#facc15",
    title: "JavaScript",
    description: "変数・非同期・DOM・fetch・モジュール",
    status: "未作成",
  },
  {
    href: "/react",
    icon: Atom,
    iconColor: "#60a5fa",
    title: "React",
    description: "コンポーネント・props・state・Hooks",
    status: "未作成",
  },
  {
    href: "/nextjs",
    icon: Triangle,
    iconColor: "#e2e8f0",
    title: "Next.js",
    description: "App Router・Server Components・API Routes",
    status: "未作成",
  },
  {
    href: "/firebase",
    icon: Flame,
    iconColor: "#fb923c",
    title: "Firebase",
    description: "Firestore・Auth・セキュリティルール",
    status: "未作成",
  },
  {
    href: "/pwa",
    icon: Smartphone,
    iconColor: "#a78bfa",
    title: "PWA",
    description: "manifest・Service Worker・キャッシュ戦略",
    status: "未作成",
  },
  {
    href: "/honban",
    icon: Rocket,
    iconColor: "#f472b6",
    title: "本番運用",
    description: "デプロイ・DNS・環境変数",
    status: "未作成",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">Web開発図解サイト</h1>
        <p className="text-gray-400 leading-relaxed">
          Web開発の概念を図解・比喩・対話形式でわかりやすく解説するサイト。<br />
          「読んで終わり」ではなく、ドリルで理解を確認しながら進められます。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-xl border p-5 transition-colors hover:border-emerald-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon size={22} style={{ color: cat.iconColor }} />
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      cat.status === "作成中"
                        ? "rgba(16,185,129,0.1)"
                        : "rgba(75,85,99,0.3)",
                    color: cat.status === "作成中" ? "#34d399" : "#9ca3af",
                  }}
                >
                  {cat.status}
                </span>
              </div>
              <p className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {cat.title}
              </p>
              <p className="text-xs text-gray-400">{cat.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
