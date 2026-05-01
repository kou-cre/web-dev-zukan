import Link from "next/link";

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
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 px-4 h-14 border-b overflow-x-auto"
      style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
    >
      <span className="text-sm font-bold text-white whitespace-nowrap mr-2">Web開発図解</span>
      <nav className="flex items-center gap-1 text-xs">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-2 py-1 rounded text-gray-400 hover:text-white transition-colors whitespace-nowrap"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
