import Link from "next/link";
import {
  Code2,
  FileCode,
  Layers,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Tag,
  Zap,
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
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { metadataApiQuestions } from "@/content/questions/seo/metadata-api";

export const metadata = {
  title: "Next.js メタデータAPI | Web開発図解",
  description:
    "Next.js App Router の metadata オブジェクトと generateMetadata を図解で解説。静的・動的メタデータの使い分けと layout.tsx での一括設定まで。",
};

export default function MetadataApiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/seo" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← SEO・アクセシビリティ に戻る
        </Link>
      </div>

      <Hero
        category="SEO・アクセシビリティ"
        title="Next.js メタデータAPI"
        subtitle={"コードでメタ情報を管理する — App Router 時代の正攻法"}
        body={"metadata オブジェクトと generateMetadata を使うと、HTML を直接編集せずに title・OGP を設定できる。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "metadata オブジェクトの書き方（静的メタデータ）",
          "generateMetadata 関数で動的にメタ情報を設定する方法",
          "layout.tsx と page.tsx でのメタデータの継承・上書きルール",
        ]}
        prerequisites={[
          { text: "メタタグと OGP の基本を知っている（/seo/meta-ogp を読んだ）", href: "/seo/meta-ogp" },
          "Next.js の App Router の基本（page.tsx・layout.tsx の役割）を知っている",
          "async/await の書き方を知っている",
        ]}
        outOfScope={[
          "robots / canonical / alternates などの詳細オプション",
          "opengraph-image.tsx による OG 画像の自動生成",
          "Twitter Card の種類と詳細設定",
        ]}
      />

      <OnePageSummary
        keyMessage="Next.js App Router では、page.tsx や layout.tsx から metadata オブジェクトをエクスポートするだけでメタタグが設定される。URLのパラメータやデータベースの内容に応じてメタ情報を変えたいときは generateMetadata 関数を使う。"
        metaphorTitle="名刺の印刷プロセス"
        metaphorPoints={[
          {
            label: "静的 metadata",
            real: "同じページ名・同じ説明で全員に配る名刺。変わらない内容はここで設定する",
            metaphor: "事前印刷済みの名刺",
          },
          {
            label: "generateMetadata",
            real: "その場でお客さんに合わせた名刺を作る機能。URL のパラメータや DB のデータを元に動的生成",
            metaphor: "オンデマンド名刺印刷",
          },
          {
            label: "layout.tsx の metadata",
            real: "サイト全体で使い回すデフォルト名刺。page.tsx の設定で上書き可能",
            metaphor: "会社共通の名刺テンプレート",
          },
          {
            label: "継承と上書き",
            real: "layout → segment → page の順に適用。下位の設定が上位を上書きする",
            metaphor: "部署ごとのカスタム追加",
          },
        ]}
        definition="Next.js Metadata API とは App Router でメタタグを TypeScript のオブジェクトとして宣言的に管理する仕組み。静的な metadata エクスポートと動的な generateMetadata 関数の2種類がある。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「静的な設定方法」を確認してから、URL のパラメータに応じて動的に変える方法を見ていきます。
        </p>

        {/* ── 概念図A: 静的メタデータ ── */}
        <ConceptDiagram
          title="概念図A"
          description="静的メタデータ — export const metadata で宣言する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* layout.tsx */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-gray-400" />
                <p className="text-sm font-bold text-white font-mono">layout.tsx</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30">
                  サイト全体
                </span>
              </div>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">export</span>
                  <span className="text-gray-300"> const </span>
                  <span className="text-yellow-300">metadata</span>
                  <span className="text-gray-300"> = {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-lime-300">title</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-300">{'"Web開発図解"'}</span>
                  <span className="text-gray-400">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-lime-300">description</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-300">{'"Web開発を図解するサイト"'}</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                デフォルト値。全ページに自動で適用される。
              </p>
            </div>

            {/* page.tsx */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(132,204,22,0.06)",
                borderColor: "rgba(132,204,22,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileCode className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white font-mono">page.tsx</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-lime-500/15 text-lime-300 border border-lime-500/30">
                  ページ個別
                </span>
              </div>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">export</span>
                  <span className="text-gray-300"> const </span>
                  <span className="text-yellow-300">metadata</span>
                  <span className="text-gray-300"> = {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-lime-300">title</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-300">{'"メタタグとOGP | Web開発図解"'}</span>
                  <span className="text-gray-400">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-lime-300">openGraph</span>
                  <span className="text-gray-400">: {"{"}</span>
                </p>
                <p className="ml-8">
                  <span className="text-lime-300">images</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-300">{'"https://example.com/og.png"'}</span>
                </p>
                <p className="ml-4"><span className="text-gray-300">{"}"}</span></p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
              <p className="text-xs text-lime-400 mt-2 leading-relaxed">
                layout.tsx の設定を上書き。このページ専用のタイトルと OGP が適用される。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            layout.tsx → segment → page.tsx の順に適用。下位が上位を上書きする。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          静的な設定方法が分かりました。次は「ブログ記事ページのように URL によってタイトルが変わる」パターンを見ていきます。
        </p>

        {/* ── 概念図B: 動的メタデータ ── */}
        <ConceptDiagram
          title="概念図B"
          description="動的メタデータ — URL のパラメータやデータを元に生成する"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={RefreshCw}
              title="URL アクセス"
              subtitle="/blog/[slug] にアクセス"
            />
            <FlowArrow label="params" direction="right" />
            <FlowCard
              Icon={Code2}
              title="generateMetadata"
              subtitle="非同期関数で DB などから情報取得"
              highlight
              accentColor="lime"
            />
            <FlowArrow label="return" direction="right" />
            <FlowCard
              Icon={Tag}
              title="動的メタデータ"
              subtitle="記事タイトル・OG 画像を動的に設定"
            />
          </div>
          <CodeBlock
            title="generateMetadata の使い方"
            language="typescript"
            code={`// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

// generateMetadata は非同期関数として定義する
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // DB やAPIからデータを取得できる
  const post = await fetchPost(params.slug);

  return {
    title: \`\${post.title} | Web開発図解\`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.ogImage],
    },
  };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  // ページのコンポーネント
}`}
          />
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">ポイント</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              generateMetadata は Server Component として動くため、データベースや外部 API を直接呼び出せます。
              同じページのコンポーネント本体と同じデータをフェッチしていれば、Next.js が自動でキャッシュを共有するのでパフォーマンスへの影響も最小限です。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、metadata を page.tsx に書くと、layout.tsx の metadata はどうなるんですか？\n上書きされる感じですか？ それとも両方が使われるんでしょうか……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い疑問ですね、マジさん。これはフォルダの階層をイメージすると分かりやすいです。\n会社のルールブックに例えると、layout.tsx は「全社共通ルール」です。\npage.tsx は「その部署の独自ルール」。独自ルールは共通ルールを上書きできます。\n具体的には、title フィールドは page.tsx の方が優先されます。\nただし openGraph.images だけを page.tsx に書いた場合、title は layout.tsx のものが引き継がれます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ということは、layout.tsx に description だけ書いておけば、全ページで共通の説明文を使えるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "その通りです。ただし description は各ページ固有の内容の方が、SEO 上は望ましいですよ。\nレストランのメニュー説明を想像してください。全料理に同じ説明文がついていたら、かえって信頼感が下がりますよね。\n同様に、全ページ同じ description は検索エンジンにとっても情報が薄く映ります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "うーん、じゃあブログ記事みたいに 100 ページ以上あったら、全部手動で description を書かないといけないんですか？\nそれは……かなり大変ですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そこで generateMetadata の出番です、マジさん。\nこれは関数なので、DB から記事の内容を取得して description を自動で生成できます。\nたとえばブログ記事の本文の最初の 160 文字を切り取って description にする、というのが定番のパターンです。\n人間が 100 ページ手動で書く必要はありません。コードに任せましょう。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ 関数の中でデータベースにアクセスしていいんですか？\n\"use client\" じゃないとブラウザで動かないんじゃ……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ここは大事なポイントですね、マジさん。\nmetadata と generateMetadata は Server Component として動きます。\nつまりサーバー側でしか実行されません。だからデータベースに直接アクセスしても問題ありません。\nブラウザには最終的なHTMLタグとして届くだけです。\n逆に言えば、\"use client\" と書いたファイルでは metadata を export できません。これが一番よくある間違いです。",
          },
          {
            speaker: "maji",
            emotion: "down",
            text: "あ……ボク、最初 Client Component のファイルに metadata を書こうとしていました。\nエラーになって意味が分からなかったんですが、そういうことだったんですね……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "多くの人が最初に同じ経験をしますから気にしないでください、マジさん。\n「metadata は Server Component 専用」と覚えるだけで OK です。\nApp Router では page.tsx は基本的に Server Component なので、普通に使えます。\nClient Component にしたい場合は、metadata を別のサーバー専用ファイルに切り出す必要があります。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["静的 metadata", "generateMetadata"]}
          rows={[
            {
              label: "書き方",
              cells: ["export const metadata = {...}", "export async function generateMetadata(...)"],
              highlightCol: 0,
            },
            {
              label: "使う場面",
              cells: ["タイトルが固定のページ（トップ・About など）", "URL パラメータや DB 内容によって変わるページ"],
              highlightCol: 1,
            },
            {
              label: "データ取得",
              cells: ["不要（固定値を書くだけ）", "可能（DB・外部 API にアクセスできる）"],
              highlightCol: 1,
            },
            {
              label: "実行タイミング",
              cells: ["ビルド時にHTMLに埋め込まれる", "リクエスト時 または ビルド時（SSG）"],
              highlightCol: 0,
            },
          ]}
          note="どちらも Server Component 専用。'use client' のファイルでは使えない。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は metadata オブジェクトの詳細フィールドと title テンプレートの使い方です。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — title テンプレートと詳細フィールド
        </h2>

        <TermNote
          terms={[
            {
              word: "title.template",
              definition:
                "layout.tsx に書く title テンプレート。%s に各ページのタイトルが入る。例: '%s | Web開発図解' と書くと、page.tsx の title が '変数とスコープ' の場合 '変数とスコープ | Web開発図解' になる。",
            },
            {
              word: "title.default",
              definition:
                "サブページで title を設定していない場合に使われるフォールバック。'Web開発図解' のようなサイト名を設定しておく。",
            },
            {
              word: "robots",
              definition:
                "検索エンジンのクローラーへの指示。{ index: true, follow: true } でインデックス許可。noindex にするとそのページは検索結果に出ない。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="title テンプレート — サイト名を自動で付けてページごとに管理しやすくする"
        >
          <CodeBlock
            title="layout.tsx — title テンプレートの設定"
            language="typescript"
            code={`// app/layout.tsx
export const metadata: Metadata = {
  title: {
    // %s に各ページの title が入る
    template: "%s | Web開発図解",
    // サブページで title を設定しなかった場合のフォールバック
    default: "Web開発図解",
  },
  description: "Web開発の概念を図解で学ぶサイト",
};

// app/seo/meta-ogp/page.tsx
export const metadata: Metadata = {
  // "メタタグと OGP" だけ書けば
  // → "メタタグと OGP | Web開発図解" になる
  title: "メタタグと OGP",
};`}
          />
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: CheckCircle,
                title: "管理コスト削減",
                subtitle: "サイト名を一箇所に",
                description: "サイト名が変わったとき、layout.tsx の1箇所を直すだけで全ページに反映される。",
                accentColor: "lime",
              },
              {
                Icon: Zap,
                title: "一貫性の確保",
                subtitle: "全ページ同じ形式",
                description: "「ページ名 | サイト名」の形式が全ページで統一される。",
                accentColor: "lime",
              },
              {
                Icon: AlertTriangle,
                title: "OG title は別管理",
                subtitle: "自動同期されない",
                description: "title.template は og:title に自動適用されない。openGraph.title は別に設定が必要。",
                accentColor: "amber",
              },
            ]}
          />
          <KeyPoint>
            title.template を使うと各ページは短いタイトルを書くだけで済む。
            サイト名を変更したいときは layout.tsx の1行を直すだけで全ページに反映される。
          </KeyPoint>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="よくある間違い — Client Component で metadata を書いてしまう">
          <p>
            Next.js の初心者が最もよく遭遇するエラーが、<strong className="text-white">{'"use client"'} ディレクティブがあるファイルで metadata を export しようとする</strong>ことです。
          </p>
          <p>
            metadata は Server Component 専用の機能です。インタラクティブな UI（ボタンや useState など）が必要な場合でも、
            metadata は Server Component のままにして、インタラクティブな部分だけ別の Client Component に切り出す設計にします。
          </p>
          <CodeBlock
            title="正しい分離パターン"
            language="typescript"
            code={`// app/page.tsx（Server Component のまま）
export const metadata = {
  title: "ホーム | Web開発図解",
};

// metadata を export し、Client Component をインポートして使う
import { InteractiveSection } from "./InteractiveSection";

export default function HomePage() {
  return (
    <main>
      <h1>Web開発図解</h1>
      {/* クリックなどが必要な部分だけ Client Component に */}
      <InteractiveSection />
    </main>
  );
}

// app/InteractiveSection.tsx（Client Component）
"use client";
import { useState } from "react";
export function InteractiveSection() {
  const [open, setOpen] = useState(false);
  // ...
}`}
          />
          <WarningPoint>
            generateMetadata は非同期関数だが、generateStaticParams と同様にビルド時に実行される場合もある。
            外部 API の呼び出しがある場合はキャッシュ設定（fetch の cache オプション）を確認すること。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/seo/meta-ogp",
            title: "メタタグと OGP",
            description: "OGP の基本とタグの役割を理解する",
            icon: "Tag",
          },
          {
            href: "/seo/sitemap",
            title: "サイトマップ・robots.txt",
            description: "クローラーへのサイト構造の伝え方",
            icon: "FileSearch",
          },
          {
            href: "/seo/lighthouse",
            title: "Lighthouse スコア",
            description: "SEO スコアを数値で確認して改善する",
            icon: "Gauge",
          },
        ]}
      />

      <PageDrill questions={metadataApiQuestions} />
    </div>
  );
}
