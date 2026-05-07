import Link from "next/link";
import {
  FileSearch,
  Map,
  Bot,
  FileText,
  CheckCircle,
  XCircle,
  Globe,
  RefreshCw,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { sitemapQuestions } from "@/content/questions/seo/sitemap";

export const metadata = {
  title: "サイトマップ・robots.txt | Web開発図解",
  description:
    "sitemap.xml と robots.txt の役割を図解で解説。Next.js での自動生成方法と、クローラーへのサイト構造の伝え方まで。",
};

export default function SitemapPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/seo" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← SEO・アクセシビリティ に戻る
        </Link>
      </div>

      <Hero
        category="SEO・アクセシビリティ"
        title="サイトマップ・robots.txt"
        subtitle={"クローラーに「地図」と「入場ルール」を渡す"}
        body={"sitemap.xml でページ一覧を、robots.txt でアクセス許可範囲をクローラーに伝える。Next.js なら数行のコードで自動生成できる。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "sitemap.xml の役割と基本構造",
          "robots.txt でクローラーをコントロールする方法",
          "Next.js での sitemap.ts / robots.ts による自動生成",
        ]}
        prerequisites={[
          "URL の仕組みを知っている（https://example.com/blog/1 のような形）",
          "検索エンジンがサイトを巡回して情報を収集することを知っている",
        ]}
        outOfScope={[
          "動的サイトマップ（DB からページ一覧を取得して生成）の詳細実装",
          "画像サイトマップ・動画サイトマップの設定",
          "robots.txt の crawl-delay や Sitemap ディレクティブの詳細",
        ]}
      />

      <OnePageSummary
        keyMessage="sitemap.xml は「このサイトにはこんなページがあります」という目次リスト。robots.txt は「どのページに来ていいか、来てはいけないか」の入場ルール。どちらもクローラー（Googlebot など）が読む設定ファイルで、検索エンジンへの適切なインデックス登録を助ける。"
        metaphorTitle="テーマパークの「案内地図」と「立入禁止エリア」"
        metaphorPoints={[
          {
            label: "sitemap.xml",
            real: "テーマパークの全施設が載った案内地図。クローラーがどのページも見落とさないよう案内する",
            metaphor: "テーマパークの案内地図",
          },
          {
            label: "robots.txt",
            real: "「スタッフエリア立入禁止」の看板。管理用ページや重複コンテンツをクローラーに見せないよう制限する",
            metaphor: "スタッフエリアの立入禁止看板",
          },
          {
            label: "クローラー（Googlebot）",
            real: "サイト中を巡回して情報を収集するロボット。まず robots.txt を確認してからサイトに入る",
            metaphor: "地図を持ったテーマパークの巡回スタッフ",
          },
          {
            label: "インデックス登録",
            real: "クローラーがページを読んで検索エンジンのデータベースに追加すること。これがないと検索に出ない",
            metaphor: "テーマパークの情報が観光案内に掲載される",
          },
        ]}
        definition="sitemap.xml はサイトのページ一覧をクローラーに伝えるXML形式のファイル。robots.txt はクローラーのアクセスを制御するテキストファイル。どちらもサイトルート（/）に置く。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          「クローラーがサイトを巡回する流れ」を確認してから、各ファイルの役割を見ていきます。
        </p>

        {/* ── 概念図A: クローラーの動き ── */}
        <ConceptDiagram
          title="概念図A"
          description="クローラーはどんな順番でサイトを読んでいるか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Bot}
              title="Googlebot"
              subtitle="クローラーがサイトを訪問"
            />
            <FlowArrow label="最初に確認" direction="right" />
            <FlowCard
              Icon={FileText}
              title="robots.txt"
              subtitle="/robots.txt を読む → アクセス可否を判断"
              highlight
              accentColor="lime"
            />
            <FlowArrow label="次に確認" direction="right" />
            <FlowCard
              Icon={Map}
              title="sitemap.xml"
              subtitle="ページ一覧を確認して巡回ルートを把握"
              highlight
              accentColor="lime"
            />
            <FlowArrow label="巡回" direction="right" />
            <FlowCard
              Icon={Globe}
              title="各ページを収集"
              subtitle="コンテンツを読んでインデックスに追加"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">クローラーのチェックポイント</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              robots.txt で Disallow されたパスにはクローラーは入らない（ルールを守る設計）。
              ただし悪意のあるボットは無視することもある。
              robots.txt は「検索エンジンへの紳士協定」と理解しておく。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          クローラーの動きが分かりました。次は sitemap.xml と robots.txt それぞれの具体的な書き方を見ていきます。
        </p>

        {/* ── 概念図B: 2つのファイルの役割 ── */}
        <ConceptDiagram
          title="概念図B"
          description="sitemap.xml vs robots.txt — 何を伝えるファイルか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* sitemap.xml */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(132,204,22,0.06)",
                borderColor: "rgba(132,204,22,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Map className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">sitemap.xml</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                ページの URL 一覧と更新頻度・優先度を XML 形式で伝える。
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500">{"<?xml version='1.0'?>"}</p>
                <p>
                  <span className="text-lime-400">{"<urlset"}</span>
                  <span className="text-blue-300"> xmlns</span>
                  <span className="text-gray-400">{"=..."}</span>
                  <span className="text-lime-400">{">"}</span>
                </p>
                <p className="ml-2"><span className="text-lime-400">{"<url>"}</span></p>
                <p className="ml-4">
                  <span className="text-lime-400">{"<loc>"}</span>
                  <span className="text-gray-300">https://example.com/</span>
                  <span className="text-lime-400">{"</loc>"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-lime-400">{"<priority>"}</span>
                  <span className="text-gray-300">1.0</span>
                  <span className="text-lime-400">{"</priority>"}</span>
                </p>
                <p className="ml-2"><span className="text-lime-400">{"</url>"}</span></p>
                <p><span className="text-lime-400">{"</urlset>"}</span></p>
              </div>
            </div>

            {/* robots.txt */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <p className="text-sm font-bold text-white">robots.txt</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                クローラーのアクセス許可・禁止と、サイトマップの場所を伝えるテキストファイル。
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500">{"# すべてのクローラーへのルール"}</p>
                <p>
                  <span className="text-blue-300">User-agent</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-gray-300">*</span>
                </p>
                <p>
                  <span className="text-green-300">Allow</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-gray-300">/</span>
                </p>
                <p>
                  <span className="text-red-300">Disallow</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-gray-300">/admin/</span>
                </p>
                <p className="mt-1">
                  <span className="text-blue-300">Sitemap</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-gray-300">https://example.com/sitemap.xml</span>
                </p>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、sitemap.xml って手動で書くんですか？\n100 ページあったら 100 個の URL を XML に書かないといけないんでしょうか……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "ご安心ください、マジさん。Next.js では自動生成できます。\nテーマパークの案内地図を手書きで作るか、コンピューターで自動印刷するかの違いですね。\napp フォルダの直下に sitemap.ts というファイルを置くだけで、Next.js がビルド時に sitemap.xml を自動生成してくれます。\nページが増えるたびに手動で更新する必要はありません。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "それはいい！ じゃあブログ記事みたいに動的に増えるページも対応できるんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "できます。動的ルートの場合は、generateSitemaps 関数を使うか、sitemap.ts の中でデータベースから URL の一覧を取得してリストを作ります。\nたとえば「記事一覧を DB から取得して、全記事の URL を sitemap に含める」というコードが書けます。\n少し応用的ですが、基本的なコードパターンは Next.js 公式ドキュメントにそのまま載っています。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "ちょっと待ってください。sitemap.xml がなくても、Google ってページを見つけてくれるんじゃないですか？\nリンクを辿って巡回するって聞いたことがあります。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです、マジさん。リンクを辿る巡回は行われます。\nただし問題が2つあります。1つは、孤立したページ（どこからもリンクされていないページ）は発見されない可能性が高い。\n2つ目は、新しく追加したページがインデックスされるまでに時間がかかることです。\nsitemap.xml があると『このページを急いでチェックして』と伝えられるので、インデックスが早くなります。\n観光地の新しい施設をウェブサイトで事前告知するようなイメージです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ sitemap がないと、新しいページが検索に出るまでかなり時間がかかるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "サイトの規模や権威によりますが、数日から数週間かかることはあります。\nそのためローンチ直後は Google Search Console からサイトマップを手動送信するのが一般的な手順です。\nこれで「今日から巡回を始めてください」と直接 Google に依頼できます。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！ つまり sitemap.xml は Google へのダイレクトメッセージで、robots.txt は「ここは立入禁止ですよ」のサインなんですね。\n両方設定しておけばクローラーとの関係がばっちりになる！",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["sitemap.xml", "robots.txt"]}
          rows={[
            {
              label: "役割",
              cells: ["ページ一覧をクローラーに伝える", "クローラーのアクセス許可・禁止を指定"],
              highlightCol: 0,
            },
            {
              label: "形式",
              cells: ["XML", "プレーンテキスト"],
              highlightCol: 0,
            },
            {
              label: "置く場所",
              cells: ["/sitemap.xml（サイトルート）", "/robots.txt（サイトルート）"],
              highlightCol: 0,
            },
            {
              label: "Next.js での生成",
              cells: ["app/sitemap.ts を作成", "app/robots.ts を作成"],
              highlightCol: 1,
            },
          ]}
          note="どちらもサイトルート（/）に置く。Next.js では app フォルダ直下に .ts ファイルを置けば自動生成される。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は Next.js での具体的な実装コードです。基本の役割が分かったら読んでみてください。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Next.js での実装コード
        </h2>

        <ConceptDiagram
          title="概念図C"
          description="Next.js の App Router で sitemap.ts / robots.ts を自動生成する"
        >
          <CodeBlock
            title="app/sitemap.ts — 静的ページのサイトマップ"
            language="typescript"
            code={`import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://web-dev-zukan.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://web-dev-zukan.vercel.app/seo/meta-ogp",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ページが増えたらここに追加
  ];
}`}
          />
          <CodeBlock
            title="app/robots.ts — robots.txt の設定"
            language="typescript"
            code={`import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",  // 管理画面はクローラーに見せない
    },
    sitemap: "https://web-dev-zukan.vercel.app/sitemap.xml",
  };
}`}
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle,
                title: "ビルド時に自動生成",
                subtitle: "手動更新不要",
                description: "next build で /sitemap.xml と /robots.txt が自動的に生成される。",
                accentColor: "lime",
              },
              {
                Icon: RefreshCw,
                title: "動的ページにも対応",
                subtitle: "DB からページ一覧を取得",
                description: "sitemap.ts は非同期関数にできる。DB からブログ記事一覧を取得してサイトマップに含められる。",
                accentColor: "lime",
              },
            ]}
          />
          <KeyPoint>
            sitemap.ts を app フォルダ直下に置くだけで、Next.js が /sitemap.xml のルートを自動で作ってくれる。
            XML を手書きする必要はない。
          </KeyPoint>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="Disallow で守りたいページの例">
          <p>
            robots.txt の Disallow は、クローラーに<strong className="text-white">「このパスには入らないでください」</strong>と伝えるための設定です。
            強制力はないため、悪意のあるボットは無視する場合もありますが、Google など主要な検索エンジンは基本的に従います。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: XCircle,
                title: "/admin/",
                subtitle: "管理画面",
                description: "認証が必要なページ。検索に出ても意味がなく、情報が漏れるリスクがある。",
                accentColor: "red",
              },
              {
                Icon: XCircle,
                title: "/api/",
                subtitle: "APIエンドポイント",
                description: "HTML ページではないため検索に出てはいけない。API は robots.txt で制限が一般的。",
                accentColor: "red",
              },
              {
                Icon: CheckCircle,
                title: "/blog/",
                subtitle: "コンテンツページ",
                description: "検索に出てほしいページは Allow（指定しなければデフォルトで許可）。",
                accentColor: "lime",
              },
            ]}
          />
          <WarningPoint>
            robots.txt で Disallow したページは Google Search Console でも「クロールエラー」として扱われる場合がある。
            ページ自体を非公開にしたい場合は、robots.txt ではなく認証の実装 or noindex メタタグを使う方が確実。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/seo/meta-ogp",
            title: "メタタグと OGP",
            description: "title・description・OGP の設定",
            icon: "Tag",
          },
          {
            href: "/seo/metadata-api",
            title: "Next.js メタデータAPI",
            description: "metadata オブジェクトの書き方",
            icon: "Code2",
          },
          {
            href: "/seo/lighthouse",
            title: "Lighthouse スコア",
            description: "SEO スコアを数値で確認する",
            icon: "Gauge",
          },
        ]}
      />

      <PageDrill questions={sitemapQuestions} />
    </div>
  );
}
