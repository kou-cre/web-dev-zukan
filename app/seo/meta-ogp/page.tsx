import Link from "next/link";
import {
  Tag,
  Globe,
  ImageIcon,
  Search,
  Share2,
  Eye,
  Code2,
  CheckCircle,
  AlertTriangle,
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
import { metaOgpQuestions } from "@/content/questions/seo/meta-ogp";

export const metadata = {
  title: "メタタグと OGP | Web開発図解",
  description:
    "title・description・OGP タグの役割を図解で解説。SNS シェア時のカード表示の仕組みとNext.jsでの設定方法まで。",
};

export default function MetaOgpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/seo" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← SEO・アクセシビリティ に戻る
        </Link>
      </div>

      <Hero
        category="SEO・アクセシビリティ"
        title="メタタグと OGP"
        subtitle={"ブラウザ・検索エンジン・SNSに「このページは何か」を伝える設定書"}
        body={"title・description・OG 画像を設定することで、SNS シェア時のカードを自分でデザインできる。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "title・description・OG タグそれぞれの役割",
          "SNS シェア時のカード（リッチプレビュー）の仕組み",
          "Next.js でのメタタグ設定の基本パターン",
        ]}
        prerequisites={[
          "HTML の <head> セクションが何をする場所か知っている",
          "ブラウザのタブにサイト名が出ることを知っている",
          "SNS でリンクをシェアするとカードが表示されることを知っている",
        ]}
        outOfScope={[
          "JSON-LD 構造化データ（リッチスニペットの設定）",
          "Twitter Card の種類と使い分け（summary / summary_large_image）",
          "OG 画像の動的自動生成（ImageResponse API）",
        ]}
      />

      <OnePageSummary
        keyMessage="メタタグは HTML の <head> に書く「ページの説明書」。検索エンジンに title と description を、SNS クローラーに og:title・og:image などの OGP タグを伝えることで、検索結果やシェアカードの見え方をコントロールできる。"
        metaphorTitle="本の「表紙・帯・裏カバー」"
        metaphorPoints={[
          {
            label: "title タグ",
            real: "検索結果とブラウザタブに表示されるページのタイトル。本で言う表紙のタイトル",
            metaphor: "本の表紙タイトル",
          },
          {
            label: "meta description",
            real: "検索結果に表示される 120〜160 文字のあらすじ。クリックを後押しする要約文",
            metaphor: "本の裏カバーのあらすじ",
          },
          {
            label: "og:image",
            real: "SNS シェア時にカードに表示されるサムネイル画像。スクロールを止める帯の写真",
            metaphor: "本の帯の写真",
          },
          {
            label: "OGP タグ全体",
            real: "SNS クローラー専用の情報パッケージ。シェアカードを設計する設定書",
            metaphor: "SNS 向けの帯コピー・帯デザイン",
          },
        ]}
        definition="メタタグとは HTML の head 内に書く、ページの内容をブラウザ・検索エンジン・SNS に伝えるための設定情報。OGP はそのうち SNS シェア時のカード表示を制御するプロトコル。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「誰が何を読むのか」という全体像を確認してから、OGP の動く仕組みを見ていきます。
        </p>

        {/* ── 概念図A: メタタグの全体像 ── */}
        <ConceptDiagram
          title="概念図A"
          description="メタタグは誰が読む？ タグごとに「読み手」が違う。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* title */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white font-mono">{"<title>"}</p>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <p className="text-xs text-gray-400">検索エンジン → 検索結果のリンクテキスト</p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <p className="text-xs text-gray-400">ブラウザ → タブに表示されるラベル</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                推奨: 30〜60文字。キーワードを含め、サイト名と組み合わせる。
              </p>
            </div>

            {/* description */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white font-mono">{"<meta description>"}</p>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <p className="text-xs text-gray-400">検索エンジン → 検索結果のスニペット文</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                推奨: 120〜160文字。「読みたい」と思わせるあらすじ。クリック率に影響。
              </p>
            </div>

            {/* OGP */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(132,204,22,0.06)",
                borderColor: "rgba(132,204,22,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white font-mono">{"og:* タグ"}</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-lime-500/15 text-lime-300 border border-lime-500/30">
                  OGP
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <p className="text-xs text-gray-400">SNS クローラー → シェアカードのデザイン</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                X・Facebook・Slack・LINE など SNS がカードを表示するために読み取る。
              </p>
            </div>
          </div>

          {/* HTML コード例 */}
          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"<!-- head の中に書く -->"}</p>
            <p>
              <span className="text-lime-400">{"<title>"}</span>
              <span className="text-gray-300">メタタグと OGP | Web開発図解</span>
              <span className="text-lime-400">{"</title>"}</span>
            </p>
            <p>
              <span className="text-lime-400">{"<meta"}</span>
              <span className="text-blue-300"> name</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"description"'}</span>
              <span className="text-blue-300"> content</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"SNSシェア時のカード表示を解説"'}</span>
              <span className="text-lime-400">{" />"}</span>
            </p>
            <p className="mt-2">
              <span className="text-lime-400">{"<meta"}</span>
              <span className="text-blue-300"> property</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"og:title"'}</span>
              <span className="text-blue-300"> content</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"メタタグと OGP | Web開発図解"'}</span>
              <span className="text-lime-400">{" />"}</span>
            </p>
            <p>
              <span className="text-lime-400">{"<meta"}</span>
              <span className="text-blue-300"> property</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"og:image"'}</span>
              <span className="text-blue-300"> content</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-green-300">{'"https://example.com/og.png"'}</span>
              <span className="text-lime-400">{" />"}</span>
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          タグの役割が分かりました。次は「SNS にリンクを貼ったときになぜカードが出るのか」の仕組みを見ていきます。
        </p>

        {/* ── 概念図B: OGP の動く流れ ── */}
        <ConceptDiagram
          title="概念図B"
          description="SNS にリンクを貼ったとき、裏側で何が起きているか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Share2}
              title="URL を貼る"
              subtitle="X / Facebook / Slack などに URL を投稿"
            />
            <FlowArrow label="自動" direction="right" />
            <FlowCard
              Icon={Search}
              title="SNS クローラー"
              subtitle="その SNS のロボットが URL にアクセス"
            />
            <FlowArrow label="読み取り" direction="right" />
            <FlowCard
              Icon={Tag}
              title="og:* タグを取得"
              subtitle="<head> 内の OGP タグを解析"
              highlight
              accentColor="lime"
            />
            <FlowArrow label="生成" direction="right" />
            <FlowCard
              Icon={ImageIcon}
              title="カード表示"
              subtitle="タイトル・説明・画像を組み立てて表示"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">知っておきたいポイント</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              SNS クローラーは URL が投稿されたタイミングで訪問して OGP を読み取り、キャッシュします。
              OGP を更新した後にカードが変わらない場合は、各 SNS の「カードバリデーター」でキャッシュをクリアします
              （X: Cards Validator / Facebook: Sharing Debugger）。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、SNS にリンクを貼ると画像とタイトルが出てきますよね。\nあれ、どうやって設定するんですか？ ボクが作ったサイトのリンクを貼っても、ただの URL テキストになってしまって……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "マジさん、それは OGP（Open Graph Protocol）が設定されていないからですね。\nたとえるなら、レストランのショーウィンドウに何も置かれていない状態です。\n通りすがりの人（= SNS クローラー）が見ても「何を出してくれる店なのか」分からないので、素っ気ない看板だけが表示されてしまいます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ショーウィンドウ！ なるほど、だから画像を飾っておく必要があるんですね。\nでも、どこに書けばいいんですか？ JavaScript で何か書くんでしょうか……？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "いいえ、HTML の <head> タグの中に書きます。JavaScript ではありません。\nたとえると、本の表紙や帯に書いてある情報と同じです。\n本を手に取ったとき（= SNS クローラーがアクセスしたとき）、まず表紙を見ますよね。\nその表紙にあたるのが <head> の中のメタタグです。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "ということは、og:title と普通の title タグって別物なんですか？\nなんか二重管理になりそうで、どっちを直せばいいのか分からなくなりませんか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭い疑問ですね、マジさん。これは「読者が違う」と考えると整理できます。\n通常の title タグを読むのは、検索エンジンとブラウザです。\n一方 og:title を読むのは、X や Facebook などの SNS クローラーです。\n読む相手が違うので、内容を変えることもできます。\nたとえば title は「メタタグとOGP｜Web開発図解」と書きつつ、og:title は「SNSのカード表示を自分でデザインする方法」という SNS 向けのキャッチコピーにする、といった使い分けができます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nSNS 専用のタイトルを別に書けるんですか！ それはすごい……。\nじゃあ SNS にシェアするとき「バズりそうなタイトル」を別に用意できるってことですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです、マジさん。SNS でのクリック率と検索エンジンでの表示は、それぞれ最適化できます。\nただし誤解を招くような「釣りタイトル」は信頼を損なうので、内容に沿ったものにするのが大前提ですよ。\nNext.js では metadata オブジェクトを export するだけで、title も og:title も一括で管理できます。\nページを移動するたびに HTML を直接編集する必要はありません。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！ つまりボクは metadata を一行書くだけで、検索結果と SNS カードを同時にデザインできるんですね。\nこれで SNS のカードをプロっぽくできます。ボク、SNS マーケターになれそうです！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "マジさん、og:image の画像サイズを 1200×630px にするのを忘れずに。\nここを間違えると、画像が切れたり縦横比がおかしくなったりして台無しになります。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["title タグ", "meta description", "og:title / og:image"]}
          rows={[
            {
              label: "誰が読む",
              cells: ["ブラウザ・検索エンジン", "検索エンジン", "SNS クローラー"],
              highlightCol: 2,
            },
            {
              label: "表示される場所",
              cells: ["ブラウザタブ・検索結果リンク", "検索結果スニペット", "SNS シェアカード"],
              highlightCol: 2,
            },
            {
              label: "推奨文字数/サイズ",
              cells: ["30〜60文字", "120〜160文字", "og:image は 1200×630px 推奨"],
              highlightCol: 2,
            },
            {
              label: "SEO への影響",
              cells: ["直接影響あり", "間接影響（CTR）", "SNS 流入に影響"],
              highlightCol: 2,
            },
          ]}
          note="すべて HTML の <head> 内に書く。Next.js では metadata オブジェクトで一元管理できる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は OGP タグの詳細と Next.js での実装パターンです。まず基礎の理解を固めてから読んでください。"
      />

      {/* ── 応用編: OGP タグ一覧 ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — よく使う OGP タグ一覧
        </h2>

        <TermNote
          terms={[
            {
              word: "og:type",
              definition:
                "ページの種類。通常は 'website'、ブログ記事なら 'article'。SNS のアルゴリズムが参考にすることがある。",
            },
            {
              word: "og:url",
              definition:
                "ページの正規 URL。リダイレクトや複数 URL がある場合に「本命 URL」を SNS に伝えるために使う。",
            },
            {
              word: "twitter:card",
              definition:
                "X (Twitter) 専用の設定。'summary' は小さいカード、'summary_large_image' は大きい画像カードになる。",
            },
            {
              word: "canonical",
              definition:
                "OGP とは別に検索エンジン向けの正規 URL を伝えるタグ。<link rel='canonical'> で書く。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="OGP タグのセット — 最低限これだけ書けばカードが出る"
        >
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Tag,
                title: "og:title",
                subtitle: "カードのタイトル",
                description: "SNS カードに表示されるタイトル。title タグと同じ内容でも OK。SNS 向けのコピーを書くこともできる。",
                accentColor: "lime",
              },
              {
                Icon: Search,
                title: "og:description",
                subtitle: "カードの説明文",
                description: "カードに出る補足テキスト。meta description と同じでも OK。SNS で読まれることを意識した文体にする。",
                accentColor: "lime",
              },
              {
                Icon: ImageIcon,
                title: "og:image",
                subtitle: "カードのサムネイル画像",
                description: "必ず絶対 URL で指定。推奨サイズは 1200×630px。HTTPS で配信できる場所に置く。",
                accentColor: "amber",
              },
              {
                Icon: Globe,
                title: "og:url",
                subtitle: "ページの正規 URL",
                description: "シェアされるページの正規 URL。クエリパラメータなしの URL が望ましい。",
                accentColor: "lime",
              },
            ]}
          />

          <CodeBlock
            title="最小限の OGP 設定（HTML）"
            language="html"
            code={`<head>
  <title>メタタグと OGP | Web開発図解</title>
  <meta name="description" content="SNSシェア時のカード表示の仕組みを解説" />

  <!-- OGP タグ（SNS クローラー向け） -->
  <meta property="og:title" content="メタタグと OGP | Web開発図解" />
  <meta property="og:description" content="SNSシェア時のカード表示を自分でデザインする" />
  <meta property="og:image" content="https://example.com/og/meta-ogp.png" />
  <meta property="og:url" content="https://example.com/seo/meta-ogp" />
  <meta property="og:type" content="website" />

  <!-- X (Twitter) 向け追加設定 -->
  <meta name="twitter:card" content="summary_large_image" />
</head>`}
          />
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="OG 画像の設計ポイント">
          <p>
            SNS でのクリック率を左右する最大の要素は <strong className="text-white">OG 画像（og:image）</strong> です。
            テキストだけのカードより、適切な画像がある方がクリック率が大幅に上がります。
          </p>
          <p>
            推奨サイズは <strong className="text-white">1200×630px（アスペクト比 1.91:1）</strong>。
            このサイズで作ると、X・Facebook・Slack・LINE など主要 SNS で綺麗に表示されます。
            小さすぎる画像（600×315px 未満）はプレビューに表示されないことがあります。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: CheckCircle,
                title: "1200×630px",
                subtitle: "推奨サイズ",
                description: "主要 SNS すべてで綺麗に表示。アスペクト比 1.91:1 を守る。",
                accentColor: "lime",
              },
              {
                Icon: ImageIcon,
                title: "HTTPS で配信",
                subtitle: "絶対 URL を指定",
                description: "相対パスは使えない。本番ドメインの絶対 URL で指定する。",
                accentColor: "lime",
              },
              {
                Icon: AlertTriangle,
                title: "サイズ上限に注意",
                subtitle: "8MB 以下",
                description: "ファイルサイズが大きすぎるとクローラーが取得に失敗する。WebP + 圧縮を推奨。",
                accentColor: "amber",
              },
            ]}
          />
          <KeyPoint>
            Next.js 13 以降は app/opengraph-image.tsx を置くだけで OG 画像を自動生成できる。
            手動で画像を用意する場合は、public/ フォルダに置いて絶対 URL で指定する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="よくある誤解 — title と og:title は必ず別に書く必要があるか？">
          <p>
            多くの場合 <strong className="text-white">同じ内容で構いません</strong>。
            title と og:title を別に書けるのは「柔軟性のため」であって、必須ではありません。
          </p>
          <p>
            Next.js の metadata オブジェクトでは、一度書いた title を og:title にも自動で使い回す設定ができます。
            管理の手間を減らすなら、まずは同一内容で設定し、必要に応じて SNS 向けに変更する方針が現実的です。
          </p>
          <WarningPoint>
            og:image を設定していないと SNS でシェアしてもカードが出ず、ただの URL テキストになる。
            SNS への流入を期待するなら og:image は必須。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/seo/metadata-api",
            title: "Next.js メタデータAPI",
            description: "Next.js で metadata をコードで管理する方法",
            icon: "Code2",
          },
          {
            href: "/seo/lighthouse",
            title: "Lighthouse スコア",
            description: "SEO スコアを数値で確認・改善する",
            icon: "Gauge",
          },
          {
            href: "/seo/sitemap",
            title: "サイトマップ・robots.txt",
            description: "クローラーにサイト構造を伝える",
            icon: "FileSearch",
          },
        ]}
      />

      <PageDrill questions={metaOgpQuestions} />
    </div>
  );
}
