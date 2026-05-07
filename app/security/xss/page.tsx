import Link from "next/link";
import {
  Bug,
  ShieldCheck,
  Code2,
  AlertTriangle,
  CheckCheck,
  FileCode,
  Globe,
  Lock,
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
import { CorrectionCard } from "@/components/CorrectionCard";
import { xssQuestions } from "@/content/questions/security/xss";

export const metadata = {
  title: "XSS（クロスサイトスクリプティング） | Web開発図解",
  description:
    "XSSの仕組みとReact・Next.jsが自動で行うエスケープの仕組みを図解で解説。dangerouslySetInnerHTMLの使い方と注意点も。",
};

export default function XssPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/security" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← セキュリティ基礎に戻る
        </Link>
      </div>

      <Hero
        category="セキュリティ基礎"
        title="XSS（クロスサイトスクリプティング）"
        subtitle={"悪意あるスクリプトを注入される攻撃——Reactが自動で守ってくれる仕組みを知る"}
        body={"XSSは怖い攻撃に聞こえるが、Reactを正しく使えばほぼ防げる。仕組みを理解して安心しよう。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "XSS（クロスサイトスクリプティング）とは何か",
          "ReactがJSXを自動でエスケープする仕組み",
          "dangerouslySetInnerHTML を使う場合の注意点",
        ]}
        prerequisites={[
          "HTMLの基本構造（タグの入れ子）を知っている",
          "JavaScriptがHTMLを操作できることを知っている",
          "ユーザーが入力したデータをWebページに表示する仕組みを知っている",
        ]}
        outOfScope={[
          "CSP（Content Security Policy）ヘッダーの詳細設定",
          "DOMベースXSSの詳細な分類（Reflected / Stored / DOM-based）",
          "サーバーサイドのサニタイズ（Sanitization）ライブラリの使い方",
        ]}
      />

      <OnePageSummary
        keyMessage="XSSとは、攻撃者が悪意あるJavaScriptをWebページに埋め込む攻撃。Reactは通常のJSX表示で自動的にエスケープを行うため、ほとんどのXSSを防いでくれる。危険なのは dangerouslySetInnerHTML を使う場合だけ。"
        metaphorTitle="飲食店の掲示板に悪意のある貼り紙"
        metaphorPoints={[
          {
            label: "XSSの本質",
            real: "お客さんが書いたコメントをそのまま掲示板に張り出すと、悪意のある人が『お客さん全員を別のお店に誘導するQRコード』を貼ってしまう",
            metaphor: "コメント欄にスクリプトを仕込む攻撃",
          },
          {
            label: "Reactのエスケープ",
            real: "Reactは貼り出す前に『<script>』のような特殊文字を無効化してから貼る。貼り紙が単なるテキストとして表示され、コードとして動かない",
            metaphor: "貼り出す前に危険な文字を無効化する店員",
          },
          {
            label: "dangerouslySetInnerHTML",
            real: "わざと「チェックなしでそのまま貼り出す」という特別な指示。正規の目的があるときだけ使い、内容を必ず確認する",
            metaphor: "店長だけが使える「チェックなし張り出し」権限",
          },
        ]}
        definition="XSSとはWebページに悪意あるJavaScriptを注入する攻撃。文字列をHTMLとして解釈させることで発生するため、エスケープ（特殊文字の無効化）が主な対策。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずXSSがどうやって起きるかを理解してから、Reactがどう守っているかを確認しましょう。
          仕組みを知れば「自分のコードが安全かどうか」が判断できるようになります。
        </p>

        {/* ── 概念図A: XSSの仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="XSSが起きる典型的な流れ（Reactを使わない素のHTMLの場合）"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <FlowCard
                Icon={Bug}
                title="攻撃者の入力"
                subtitle={`<script>悪意ある処理</script>`}
              />
              <FlowArrow label="フォームから送信" direction="right" />
              <FlowCard
                Icon={Globe}
                title="サーバーがそのまま保存"
                subtitle="文字列として保存される"
              />
              <FlowArrow label="別ユーザーが閲覧" direction="right" />
              <FlowCard
                Icon={AlertTriangle}
                title="HTMLとして解釈"
                subtitle="scriptが実行される"
                highlight
                accentColor="amber"
              />
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">素のHTMLで起きる例</p>
            <div className="font-mono text-xs leading-loose">
              <p className="text-gray-500">{"// ユーザーのコメントをそのまま表示するHTML（危険）"}</p>
              <p>
                <span className="text-red-300">{"<div>"}</span>
              </p>
              <p className="ml-4">
                <span className="text-red-300">{"${userComment}"}</span>
                <span className="text-gray-500 ml-2">{"← ここに <script>... が入ると実行される"}</span>
              </p>
              <p>
                <span className="text-red-300">{"</div>"}</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            ユーザーの入力を「HTMLとして解釈」してしまうことがXSSの根本原因。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          XSSの仕組みが分かりました。次はReactがどうやって自動的にこれを防いでいるかを確認します。
        </p>

        {/* ── 概念図B: Reactのエスケープ ── */}
        <ConceptDiagram
          title="概念図B"
          description={"ReactのJSXは中括弧 {} で表示する値を自動でエスケープする"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                ユーザーの入力
              </p>
              <div
                className="rounded border px-3 py-2 font-mono text-xs mb-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-red-300">{"<img src=x onerror=alert(1)>"}</span>
              </div>
              <p className="text-xs text-gray-500">
                攻撃者が入力した文字列。HTMLとして解釈されると画像読み込みエラーでJSが実行される。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                Reactの表示（自動エスケープ）
              </p>
              <div
                className="rounded border px-3 py-2 font-mono text-xs mb-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-gray-300">
                  {"&lt;img src=x onerror=alert(1)&gt;"}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {"<"} が {"&lt;"} に、{">"} が {"&gt;"} に変換される。HTMLタグとして解釈されず、ただの文字列として表示される。
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// Reactで安全に表示する（これでOK）"}</p>
            <p>
              <span className="text-blue-300">{"function"}</span>
              <span className="text-yellow-300">{" Comment"}</span>
              <span className="text-gray-300">{"({ text }) {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <"}</span>
              <span className="text-green-300">p</span>
              <span className="text-gray-300">{">"}</span>
              <span className="text-sky-300">{"{"}</span>
              <span className="text-white">text</span>
              <span className="text-sky-300">{"}"}</span>
              <span className="text-gray-300">{"</"}</span>
              <span className="text-green-300">p</span>
              <span className="text-gray-300">{">"}</span>
              <span className="text-gray-500 ml-2">{"← {} による表示は自動エスケープ"}</span>
            </p>
            <p className="text-gray-300">{"}"}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            {"{"} {"}"} で値を表示するJSXの書き方が、XSSを自動的に防ぐ安全装置になっている。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター、XSSって聞いただけで怖いんですが……。\nボクのReactアプリも狙われているんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "落ち着いてください、マジさん。\nReactを使って、JSXの {} で値を表示しているなら、実はほぼ安全なんです。\n飲食店の掲示板に例えると——お客さんが書いたコメントをそのまま貼ると危ない。\nでもReactは貼り出す前に、<script> のような特殊文字を『ただの文字』に書き換えてから貼ってくれる。\nだから悪意のあるコードが動かない仕組みになっています。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、じゃあ特に何もしなくてよかったんですか？\nボク、ずっと心配していたのに……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "通常の {} を使った表示は、Reactが自動でエスケープします。\nただ、ひとつだけ注意が必要な場所があります。\n『dangerouslySetInnerHTML』という特別な書き方を使うときです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ 名前からして危なそう……。\nなんで『dangerous（危険）』という単語が入っているんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "Reactがわざと『dangerous』という名前をつけたのは、開発者に『これは危険なことをやっています』と意識させるためです。\ndangerouslySetInnerHTML は、文字列をHTMLとして直接ブラウザに渡す機能。\nReactのエスケープ機能を意図的にバイパスします。\nブログ記事のHTML本文を表示するなど、確かに必要な場面はある。\nしかし渡す文字列が信頼できるものかどうか、自分で確認する責任が生まれます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "……なるほど。ボク、以前にブログのHTMLをそのまま表示するために dangerouslySetInnerHTML を使ったことがあって……。\nそれって、もしかして危なかったですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その場合は『HTMLの出所』が重要です。\n自分やチームが生成した信頼できるHTMLなら問題ありません。\nユーザーが入力した内容を dangerouslySetInnerHTML に渡している場合は危険です。\nユーザー入力を dangerouslySetInnerHTML で表示する場合は、DOMPurify のようなサニタイズライブラリを通してから渡すのが正解です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "わかりました！\n・{} で表示 → Reactが自動で守ってくれる（通常はこれだけでOK）\n・dangerouslySetInnerHTML → ユーザー入力を渡すときはサニタイズが必要\nこれがXSSの基本ですね。\nボクのアプリは通常のJSXしか使っていないので、安心していいんですね！",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["通常のJSX（{value}）", "dangerouslySetInnerHTML"]}
          rows={[
            {
              label: "XSSリスク",
              cells: ["自動エスケープで防ぐ", "自分で対策が必要"],
              highlightCol: 0,
            },
            {
              label: "HTMLとして解釈",
              cells: ["されない（文字列のまま）", "される"],
              highlightCol: 0,
            },
            {
              label: "用途",
              cells: ["ほぼすべての表示用途", "HTML本文の表示・リッチテキスト等"],
              highlightCol: 0,
            },
            {
              label: "ユーザー入力を渡すと",
              cells: ["安全（エスケープ済み）", "危険（サニタイズ必須）"],
              highlightCol: 0,
            },
          ]}
          note="結論：通常はJSXの {value} で表示するだけで安全。dangerouslySetInnerHTML はユーザー入力を渡す場合のみDOMPurifyなどでサニタイズする。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はCSP（Content Security Policy）・eval()・href属性のXSSなど、より高度な内容です。"
      />

      {/* ── 応用編 ─────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Reactを使っても注意が必要な場所
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Reactの自動エスケープはJSXの {"{"} {"}"} の部分だけです。
          以下の書き方は、Reactを使っていても注意が必要なケースです。
        </p>

        <TermNote
          terms={[
            {
              word: "サニタイズ",
              definition:
                "ユーザーが入力したデータから、悪意あるコード（scriptタグなど）を取り除く処理。DOMPurify などのライブラリが使われる。",
            },
            {
              word: "DOMPurify",
              definition:
                "ブラウザで動くサニタイズライブラリ。HTMLを渡すと、XSSにつながる要素を取り除いた安全なHTMLを返す。",
            },
            {
              word: "CSP",
              definition:
                "Content Security Policy の略。HTTPヘッダーで「このページから許可するスクリプトの出所」を指定する仕組み。インラインスクリプトを禁止する等の設定ができる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="Reactでも注意が必要な2つのパターン"
        >
          <div className="space-y-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
                パターン1: href属性に動的値を使う場合
              </p>
              <div className="font-mono text-xs leading-loose mb-3">
                <p className="text-gray-500">{"// 危険: javascript: スキームを注入される可能性"}</p>
                <p>
                  <span className="text-green-300">{"<a"}</span>
                  <span className="text-sky-300">{" href"}</span>
                  <span className="text-gray-300">{"={"}</span>
                  <span className="text-white">userUrl</span>
                  <span className="text-gray-300">{"}"}</span>
                  <span className="text-green-300">{">"}</span>
                  <span className="text-gray-300">リンク</span>
                  <span className="text-green-300">{"</a>"}</span>
                </p>
                <p className="text-gray-500 mt-2">{"// userUrl が 'javascript:alert(1)' だったら？"}</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                href にユーザー入力の URL を動的に設定する場合、{`javascript:`} スキームを含む値が設定されると XSS になる可能性があります。
                URL が http:// または https:// で始まることをチェックしてから使うか、
                Next.js の Link コンポーネントを使うのが安全です。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
                パターン2: dangerouslySetInnerHTML にユーザー入力を渡す場合
              </p>
              <CodeBlock
                title="安全な使い方（DOMPurifyでサニタイズ）"
                language="tsx"
                code={`import DOMPurify from "dompurify";

function BlogPost({ htmlContent }: { htmlContent: string }) {
  const clean = DOMPurify.sanitize(htmlContent); // ← 必ずサニタイズ

  return (
    <div dangerouslySetInnerHTML={{ __html: clean }} />
  );
}`}
              />
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                ユーザーが入力したHTMLや、外部のCMSから取得したHTMLを表示する場合は
                DOMPurify.sanitize() を必ず通してからdangerouslySetInnerHTMLに渡します。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. Reactのエスケープが効かない場所をまとめる">
          <p>
            ReactのJSXの {"{"} {"}"} 式は自動的にエスケープされます。
            しかし以下の場合はエスケープが行われないため注意が必要です。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: ShieldCheck,
                title: "安全（自動エスケープあり）",
                subtitle: "通常のJSXの書き方",
                description: "{value} で変数を表示する。<p>{comment}</p> のような書き方。ユーザー入力をそのまま渡しても安全。",
                accentColor: "amber",
              },
              {
                Icon: AlertTriangle,
                title: "要注意（エスケープなし）",
                subtitle: "4つのケース",
                description: "①dangerouslySetInnerHTML ②href に直接URLを設定 ③eval()の使用 ④innerHTML の直接操作（Reactの外側でDOMを触る場合）",
                accentColor: "red",
              },
            ]}
          />
          <KeyPoint>
            Reactを普通に使っている限り、XSSを心配する必要はほとんどありません。「dangerouslySetInnerHTML を使うときだけ注意する」が実践的なルールです。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. Next.jsのCSP設定でさらに堅牢に">
          <p>
            Content Security Policy（CSP）は、ブラウザに「このページから読み込んでよいスクリプトの出所」を指示するHTTPヘッダーです。
            万が一XSSが成功しても、外部の悪意あるスクリプトの読み込みをブロックできます。
          </p>
          <CodeBlock
            title="next.config.js（CSPヘッダーの設定例）"
            language="javascript"
            code={`const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self'",   // 自分のサーバーのスクリプトのみ許可
              "style-src 'self' 'unsafe-inline'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};`}
          />
          <CorrectionCard
            misconception="CSPを設定すればXSS対策は完了（コードのエスケープは不要）"
            correction="CSPはXSS対策の最後の砦であり、エスケープの代わりにはならない"
            reason="CSPはインラインスクリプトの実行をブロックできるが、すべてのXSSパターンをカバーするわけではない。エスケープ + CSPの二重の対策が推奨される。"
          />
          <WarningPoint>
            インラインスクリプト（script タグに直接書いたJS）を使う場合、CSPの制限が厳しいと自分のスクリプトまで動かなくなる。Next.jsのApp Routerはデフォルトでインラインスクリプトを使うため、CSPの設定は慎重に行う。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/security/cors",
            title: "CORS",
            description: "XSSの次に学ぶ、クロスオリジンのセキュリティ",
            icon: "Globe2",
          },
          {
            href: "/security/env-vars",
            title: "環境変数とシークレット管理",
            description: "APIキーをコードに直書きしない仕組み",
            icon: "KeyRound",
          },
          {
            href: "/security",
            title: "セキュリティ基礎 ハブ",
            description: "CSRFやAPIキー漏洩など関連トピック一覧",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={xssQuestions} />
    </div>
  );
}
