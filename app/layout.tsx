import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Web開発図解サイト",
  description: "Web開発の概念を図解でわかりやすく解説するサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col text-base leading-relaxed" style={{ backgroundColor: "#0f1117", color: "#e5e7eb" }}>
        <SiteHeader />
        <main className="flex-1 pt-14">{children}</main>
      </body>
    </html>
  );
}
