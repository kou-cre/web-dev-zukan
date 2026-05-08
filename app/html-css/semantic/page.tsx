import {
  FileCode2,
  Building2,
  Layers,
  Info,
  CheckCircle2,
  XCircle,
  Newspaper,
  Layout,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { semanticQuestions } from "@/content/questions/html-css/semantic";

export const metadata = {
  title: "セマンティックHTML | Web開発図解",
  description:
    "HTMLタグの「意味」を理解し、header・main・section・article・nav・aside を正しく使い分けるための図解ページ。",
};

export default function SemanticPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/html-css" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← HTML / CSS基礎に戻る"}
        </Link>
      </div>

      <Hero
        category="HTML / CSS基礎"
        title="セマンティックHTML"
        subtitle={"タグに「意味」を持たせると、人間にもコンピューターにも伝わるページになる"}
        body={"divで全部書くのをやめて、header・main・article など目的に合ったタグを使う。"}
        accentColor="orange"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "セマンティックタグとは何か（「意味を持つHTML」）",
          "header・main・section・article・nav・aside の使い分け",
          "div を使いすぎるとなぜ問題になるのか",
        ]}
        prerequisites={[
          "HTMLはWebページの「骨格」を作るための言語",
          "タグ（<div> など）で内容を囲むとブロックになる",
          "ブラウザはHTMLを読んで画面を描画する",
        ]}
        outOfScope={[
          "WAI-ARIAロール（スクリーンリーダー向け属性）の詳細",
          "Schema.org・マイクロデータ（SEOの発展的手法）",
          "figure / figcaption / time などのマイナータグ",
        ]}
      />

      <OnePageSummary
        keyMessage="HTMLタグには見た目の役割だけでなく「意味」がある。divを全部に使うと「何がどこにあるか分からない会社」になる。header・main・nav など意味ある箱を使うと、人間にもGoogle・スクリーンリーダーにも分かりやすいページになる。"
        metaphorTitle="会社のフロアマップ"
        metaphorPoints={[
          {
            label: "header",
            real: "ページの入り口・看板。ロゴやタイトルが入る受付エリア",
            metaphor: "会社の受付・エントランス",
          },
          {
            label: "nav",
            real: "どこに何があるかを示すナビゲーションリンクの集まり",
            metaphor: "フロア案内板",
          },
          {
            label: "main",
            real: "そのページの本題。1ページに1つだけ存在する主要コンテンツ",
            metaphor: "執務フロア（本業の場所）",
          },
          {
            label: "article",
            real: "それだけで独立して意味が通じるコンテンツ（ブログ記事など）",
            metaphor: "個人の仕事・担当案件",
          },
        ]}
        definition="セマンティックHTMLとは、タグに意味を持たせることでブラウザ・検索エンジン・スクリーンリーダーがページ構造を正しく理解できるHTMLの書き方。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「divだらけのHTML」と「セマンティックなHTML」を並べて比較してから、各タグの使いどころを確認しましょう。
        </p>

        {/* ── 概念図A: divスープ vs セマンティックHTML ── */}
        <ConceptDiagram
          title="概念図A"
          description="divだらけのHTMLとセマンティックなHTMLを比較する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* divスープ */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-red-300">divスープ（意味なし）</p>
              </div>
              <div className="font-mono text-xs space-y-0.5 leading-loose text-gray-400">
                <p><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span> ロゴ <span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span> メニュー <span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-6"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span> 記事1 <span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-6"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span> 広告 <span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span> フッター <span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
                <p><span className="text-gray-600">{"</"}</span><span className="text-red-300">div</span><span className="text-gray-600">{">"}</span></p>
              </div>
              <p className="text-xs text-red-300/70 mt-3 leading-relaxed">
                どこが何の役割か、人間にも機械にも分からない
              </p>
            </div>

            {/* セマンティック */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-orange-300">セマンティックHTML（意味あり）</p>
              </div>
              <div className="font-mono text-xs space-y-0.5 leading-loose text-gray-300">
                <p><span className="text-gray-600">{"<"}</span><span className="text-orange-300">header</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-orange-300">nav</span><span className="text-gray-600">{">"}</span> メニュー <span className="text-gray-600">{"</"}</span><span className="text-orange-300">nav</span><span className="text-gray-600">{">"}</span></p>
                <p><span className="text-gray-600">{"</"}</span><span className="text-orange-300">header</span><span className="text-gray-600">{">"}</span></p>
                <p><span className="text-gray-600">{"<"}</span><span className="text-orange-300">main</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-orange-300">article</span><span className="text-gray-600">{">"}</span> 記事1 <span className="text-gray-600">{"</"}</span><span className="text-orange-300">article</span><span className="text-gray-600">{">"}</span></p>
                <p className="ml-3"><span className="text-gray-600">{"<"}</span><span className="text-orange-300">aside</span><span className="text-gray-600">{">"}</span> 広告 <span className="text-gray-600">{"</"}</span><span className="text-orange-300">aside</span><span className="text-gray-600">{">"}</span></p>
                <p><span className="text-gray-600">{"</"}</span><span className="text-orange-300">main</span><span className="text-gray-600">{">"}</span></p>
                <p><span className="text-gray-600">{"<"}</span><span className="text-orange-300">footer</span><span className="text-gray-600">{">"}</span> フッター <span className="text-gray-600">{"</"}</span><span className="text-orange-300">footer</span><span className="text-gray-600">{">"}</span></p>
              </div>
              <p className="text-xs text-orange-300/70 mt-3 leading-relaxed">
                タグを見れば各ブロックの役割が一目瞭然
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            見た目は同じでも、意味の有無でSEO・アクセシビリティが大きく変わる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          divとセマンティックタグの違いが分かりました。次は各タグがどんな役割を持っているかを確認します。
        </p>

        {/* ── 概念図B: ページ構造のブロック図 ── */}
        <ConceptDiagram
          title="概念図B"
          description="Webページの典型的なブロック構造——どのタグをどこに置くか"
        >
          <div className="rounded-xl border-2 border-dashed border-orange-700/40 p-4 space-y-2">
            {/* header */}
            <div
              className="rounded-lg border px-4 py-3 text-center"
              style={{ backgroundColor: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.35)" }}
            >
              <p className="text-xs font-bold text-orange-300 font-mono">{"<header>"}</p>
              <p className="text-xs text-gray-400 mt-0.5">ロゴ・サイト名・グローバルナビ</p>
            </div>

            {/* nav */}
            <div
              className="rounded-lg border px-4 py-2.5 text-center"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-bold text-gray-300 font-mono">{"<nav>"}</p>
              <p className="text-xs text-gray-500 mt-0.5">ページ内リンク・パンくず</p>
            </div>

            {/* main + aside */}
            <div className="flex gap-2">
              <div
                className="flex-1 rounded-lg border px-4 py-4"
                style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.25)" }}
              >
                <p className="text-xs font-bold text-orange-300 font-mono text-center">{"<main>"}</p>
                <p className="text-xs text-gray-400 text-center mt-0.5 mb-3">そのページの主役コンテンツ</p>
                <div className="space-y-1.5">
                  <div
                    className="rounded border px-3 py-2 text-center"
                    style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-mono text-gray-300">{"<article>"}</p>
                    <p className="text-xs text-gray-500">独立したコンテンツ</p>
                  </div>
                  <div
                    className="rounded border px-3 py-2 text-center"
                    style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-mono text-gray-300">{"<section>"}</p>
                    <p className="text-xs text-gray-500">テーマ別まとまり</p>
                  </div>
                </div>
              </div>
              <div
                className="w-24 rounded-lg border px-2 py-4 flex flex-col items-center justify-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-bold text-gray-300 font-mono text-center">{"<aside>"}</p>
                <p className="text-xs text-gray-500 text-center mt-1">補足・広告・サイドバー</p>
              </div>
            </div>

            {/* footer */}
            <div
              className="rounded-lg border px-4 py-2.5 text-center"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-bold text-gray-300 font-mono">{"<footer>"}</p>
              <p className="text-xs text-gray-500 mt-0.5">著作権・連絡先・サイトマップ</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            {"<main> は1ページに1つだけ。<header> と <footer> はセクション内にも置ける。"}
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、divとspanって全部同じじゃないですか？ ボクずっと全部divで書いてたんですけど……別に動くし、問題ないですよね？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "動くのは正しいです、マジさん。\nただし、会社の部署名を全部『部屋』と呼んでいるようなものです。\nどこが受付でどこが経理か分からない。\ndivはただの『意味のない箱』なので、何百個並んでも構造が伝わりません。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、じゃあGoogleとか検索エンジンも、divだと困るんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです。検索エンジンはページの構造を読んでインデックスします。\nheaderやmainやarticleがあることで『どこが重要なコンテンツか』が分かる。\ntitleタグと同じように、セマンティックなタグはSEOに直接影響します。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあボクが全部divで書いてたのは……検索で不利だったってことですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "SEOへの影響は構造の複雑さで変わります。\nただ、divより大きな問題があります。\nスクリーンリーダーを使う視覚障害の方のブラウザは、headerやnavというタグを目印にページを読み上げます。\ndivだけのページは、その方々にとって読み上げられない壁になってしまうんです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "それは大変です……。でも、結局どのタグをいつ使えばいいんですか？ 判断基準が分からなくて……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "シンプルな判断基準を3つ伝えます、マジさん。\n1つ目：まずheader・main・footerの3つは必ず使う。\n2つ目：コンテンツが『それだけで独立して意味が通じる』なら article、そうでないまとまりなら section。\n3つ目：スタイリングのためだけに囲むなら div でOK。\nこの3つだけで、セマンティックHTMLの8割はカバーできます。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["使いどころ", "具体例"]}
          rows={[
            {
              label: "header",
              cells: ["ページ・セクションの冒頭", "ロゴ・サイト名・トップナビ"],
              highlightCol: 0,
            },
            {
              label: "nav",
              cells: ["ナビゲーションリンクの集まり", "メニュー・パンくずリスト"],
              highlightCol: 0,
            },
            {
              label: "main",
              cells: ["ページの主要コンテンツ（1ページに1つ）", "記事本文・商品一覧"],
              highlightCol: 0,
            },
            {
              label: "article",
              cells: ["独立して成立するコンテンツ", "ブログ記事・ニュース・コメント"],
              highlightCol: 0,
            },
            {
              label: "section",
              cells: ["テーマでまとまったブロック", "「特徴」「料金」「FAQ」セクション"],
              highlightCol: 0,
            },
            {
              label: "aside",
              cells: ["補足・関連情報（本題ではない）", "広告・関連リンク・サイドバー"],
              highlightCol: 0,
            },
          ]}
          note="迷ったら「それだけで転載しても意味が通じる → article / まとまりとして存在する → section / スタイリング目的 → div」の順で判断する。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はSEO・アクセシビリティへの具体的な影響や、article / section の判断を深掘りする内容です。"
      />

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 まず3つだけ覚えれば十分">
          <p>
            セマンティックタグを全部一度に覚えようとすると混乱します。まず{" "}
            <strong className="text-white">header・main・footer</strong>{" "}
            の3つを正しく置くことが最初のゴール。この3つがあるだけでページの大枠の構造が明確になります。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Building2,
                title: "header",
                subtitle: "ページの顔",
                description: "ロゴ・サイト名・グローバルナビゲーション。ページの入口となるエリア。",
                accentColor: "orange",
              },
              {
                Icon: Layers,
                title: "main",
                subtitle: "本業の場所（1つだけ）",
                description: "そのページで一番伝えたい主要コンテンツ。1ページに1つだけ配置する。",
                accentColor: "orange",
              },
              {
                Icon: Info,
                title: "footer",
                subtitle: "末尾情報",
                description: "著作権・連絡先・利用規約へのリンク。ページの出口となるエリア。",
                accentColor: "orange",
              },
            ]}
          />
          <KeyPoint>
            headerとfooterはmain内のsection内にも置ける（ネストOK）。1ページに複数のheaderやfooterを持つことは合法。ただし{" "}
            <strong className="text-white">mainは必ず1つだけ</strong>というルールは厳守する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 article vs section の判断基準（応用編）">
          <p>
            この2つが一番混乱しやすいポイントです。判断ポイントは{" "}
            <strong className="text-white">「そのコンテンツを他のサイトに転載しても意味が通じるか」</strong>
            というテストです。
          </p>
          <p>
            ブログ記事や製品レビュー・ニュース記事は転載して単体でも意味が成立する → article。
            「私たちのサービスの特徴」「料金プラン」「よくある質問」などはそのページの中の区分けであり、単体では成立しにくい → section。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Newspaper,
                title: "article を使う場面",
                subtitle: "単体で意味が成立する",
                description: "ブログ記事・ニュース・製品レビュー・コメント・フォーラムの投稿。RSSに流しても意味が通じるもの。",
                accentColor: "orange",
              },
              {
                Icon: Layout,
                title: "section を使う場面",
                subtitle: "ページ内のまとまり",
                description: "「特徴」「料金」「FAQ」「チーム紹介」など、ページの構成要素としてのブロック。見出し（h2〜h6）を持つのが前提。",
                accentColor: "slate",
              },
            ]}
          />
          <CorrectionCard
            misconception="sectionは汎用のラッパーとして何にでも使える"
            correction="sectionはテーマでまとまったブロックであり、見出し（h2〜h6）を持つのが原則"
            reason="見出しのないsectionはdivと変わらない。テーマが明確でない単なるスタイリング目的のラッパーにはdivを使う。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 SEOとアクセシビリティへの影響（応用編）">
          <p>
            Googleのクローラーはheadlineとmain・articleを特に重視します。適切なセマンティック構造は、検索結果でのランキングに間接的に影響します（コンテンツの品質判断をしやすくするため）。
          </p>
          <p>
            さらに重要なのがアクセシビリティです。スクリーンリーダーはheader・nav・main・footerを{" "}
            <strong className="text-white">ランドマーク</strong>として識別し、ユーザーがジャンプ移動できるようにします。divだけでは、視覚障害のあるユーザーが目的のコンテンツに辿り着くのが極めて困難になります。
          </p>
          <CodeBlock
            title="semantic-example.html"
            language="html"
            code={`<!DOCTYPE html>
<html lang="ja">
<head>
  <title>セマンティックHTMLの例</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/about">会社概要</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>記事タイトル</h1>
      <p>記事の本文...</p>
    </article>

    <aside>
      <h2>関連記事</h2>
      <!-- サイドバーコンテンツ -->
    </aside>
  </main>

  <footer>
    <p>© 2026 サイト名</p>
  </footer>
</body>
</html>`}
          />
          <WarningPoint>
            divに role="main" などのARIAロールを付けることでセマンティック情報を追加することはできるが、最初からセマンティックタグを使う方がシンプル。ARIAは「ネイティブHTMLで表現できない場合の補完手段」として使う。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/html-css/flexbox",
            title: "Flexbox",
            description: "セマンティックHTMLを覚えたら次はレイアウト",
            icon: "LayoutGrid",
          },
          {
            href: "/html-css/responsive",
            title: "レスポンシブデザイン",
            description: "モバイル対応のCSSの基礎",
            icon: "Smartphone",
          },
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "HTMLがどこから配信されるかを理解する",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={semanticQuestions} />
    </div>
  );
}
