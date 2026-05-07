import Link from "next/link";
import {
  Gauge,
  Zap,
  Accessibility,
  Search,
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ImageIcon,
  Clock,
} from "lucide-react";

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
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { lighthouseQuestions } from "@/content/questions/seo/lighthouse";

export const metadata = {
  title: "Lighthouse スコア | Web開発図解",
  description:
    "Chrome Lighthouse のスコアを図解で解説。パフォーマンス・アクセシビリティ・SEO・ベストプラクティスの4スコアの読み方と改善の優先順位まで。",
};

export default function LighthousePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/seo" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← SEO・アクセシビリティ に戻る
        </Link>
      </div>

      <Hero
        category="SEO・アクセシビリティ"
        title="Lighthouse スコア"
        subtitle={"サイトの品質を0〜100の数値で診断 — 改善の地図を手に入れる"}
        body={"パフォーマンス・アクセシビリティ・SEO・ベストプラクティスの4指標を計測して、優先度の高い問題から改善する。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Lighthouse の4つのスコアカテゴリと何を測るか",
          "スコアを下げる主な原因と改善アクションの代表例",
          "どのスコアを優先すべきか（ビジネス観点の優先順位の考え方）",
        ]}
        prerequisites={[
          "Chrome ブラウザの DevTools を開いたことがある",
          "Webサイトの読み込みが遅いとユーザーが離脱することを知っている",
        ]}
        outOfScope={[
          "Core Web Vitals（LCP・CLS・FID/INP）の詳細な仕組み",
          "Lighthouse CI を使った CI パイプラインへの組み込み方",
          "PageSpeed Insights API を使った自動スコア収集",
        ]}
      />

      <OnePageSummary
        keyMessage="Lighthouse は Chrome DevTools に組み込まれた自動診断ツール。パフォーマンス・アクセシビリティ・SEO・ベストプラクティスの4カテゴリを 0〜100 のスコアで評価し、何が問題でどう直せばいいかを具体的に教えてくれる。"
        metaphorTitle="車の「車検」と「診断レポート」"
        metaphorPoints={[
          {
            label: "Performance（パフォーマンス）",
            real: "ページがどれだけ速く表示されるか。エンジンの性能チェック。LCP・FID・CLS などの Core Web Vitals を測る",
            metaphor: "車のエンジン性能・加速・燃費",
          },
          {
            label: "Accessibility（アクセシビリティ）",
            real: "すべてのユーザーが使えるか。スクリーンリーダー対応・コントラスト比・キーボード操作を確認する",
            metaphor: "ユニバーサルデザイン適合検査",
          },
          {
            label: "SEO",
            real: "検索エンジンに正しく認識されるか。メタタグ・モバイル対応・クロール可否を確認する",
            metaphor: "ナンバープレートが正しく付いているか",
          },
          {
            label: "Best Practices",
            real: "セキュリティや現代的な Web 標準に則っているか。HTTPS・コンソールエラーなどを確認する",
            metaphor: "交通法規・安全基準への適合",
          },
        ]}
        definition="Lighthouse とは Google が開発したオープンソースの Web 品質自動診断ツール。Chrome DevTools の「Lighthouse」タブから実行できる。各スコアは 0〜100 で評価される。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「4つのスコアが何を測るか」を確認してから、スコアの読み方と改善の優先順位を見ていきます。
        </p>

        {/* ── 概念図A: 4つのスコアカテゴリ ── */}
        <ConceptDiagram
          title="概念図A"
          description="4つのスコアカテゴリ — 何を測っているか"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Performance */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">Performance</p>
                <div
                  className="ml-auto px-2 py-0.5 rounded text-xs font-mono font-bold"
                  style={{ backgroundColor: "rgba(132,204,22,0.15)", color: "#a3e635" }}
                >
                  最重要
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                ページが表示されるまでの速さを測る。ビジネスへの影響が最も直接的。
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">LCP: 最大コンテンツ要素の描画時間</p>
                <p className="text-xs text-gray-500">CLS: 表示ズレの量（レイアウトシフト）</p>
                <p className="text-xs text-gray-500">FCP: 最初のコンテンツ描画時間</p>
              </div>
            </div>

            {/* Accessibility */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Accessibility className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">Accessibility</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                すべてのユーザーが使えるかを測る。障害のあるユーザーへの対応。
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">コントラスト比（文字の読みやすさ）</p>
                <p className="text-xs text-gray-500">alt テキスト（画像の説明）</p>
                <p className="text-xs text-gray-500">ARIA ラベル・役割の適切さ</p>
              </div>
            </div>

            {/* SEO */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">SEO</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                検索エンジンに正しく認識されるかを測る。クロール可否も含む。
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">title / meta description の有無</p>
                <p className="text-xs text-gray-500">モバイルフレンドリー</p>
                <p className="text-xs text-gray-500">robots.txt との整合性</p>
              </div>
            </div>

            {/* Best Practices */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">Best Practices</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                現代 Web 標準・セキュリティへの適合を測る。
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">HTTPS 配信</p>
                <p className="text-xs text-gray-500">コンソールエラーの有無</p>
                <p className="text-xs text-gray-500">安全でない JS ライブラリの使用</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            スコアの色: 90〜100 は緑（良好）/ 50〜89 は橙（要改善）/ 0〜49 は赤（問題あり）
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          4つのスコアの意味が分かりました。次は「どのスコアを最初に改善すべきか」の優先順位の考え方を見ていきます。
        </p>

        {/* ── 概念図B: 改善の優先順位 ── */}
        <ConceptDiagram
          title="概念図B"
          description="改善の優先順位 — ビジネス影響×改善しやすさで判断する"
        >
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
              優先順位の考え方
            </p>
            <div className="space-y-3">
              {/* 優先度 High */}
              <div
                className="rounded-lg border p-3 flex gap-3 items-start"
                style={{ backgroundColor: "rgba(132,204,22,0.06)", borderColor: "rgba(132,204,22,0.4)" }}
              >
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(132,204,22,0.2)", color: "#a3e635" }}
                >
                  優先
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Accessibility + SEO を 90 以上に</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Accessibility は法的要件・ユーザー範囲に直結。SEO は検索流入に直結。
                    どちらも改善アクションが具体的（Lighthouse が「この要素に alt がない」と教えてくれる）。
                  </p>
                </div>
              </div>

              {/* 優先度 Mid */}
              <div
                className="rounded-lg border p-3 flex gap-3 items-start"
                style={{ backgroundColor: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.3)" }}
              >
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
                >
                  次点
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Performance の高影響アイテムから改善</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    画像の最適化（WebP + next/image）は効果が大きく比較的対応しやすい。
                    JS バンドルサイズ削減は効果大だが対応コストも高い。
                  </p>
                </div>
              </div>

              {/* 優先度 Low */}
              <div
                className="rounded-lg border p-3 flex gap-3 items-start"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(100,116,139,0.3)", color: "#94a3b8" }}
                >
                  最後
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Performance 100 の追求は最後</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    90 以上あれば実用上は問題ない。100 を追求するより機能開発や他スコアの改善を優先する方がビジネス価値が高い場合が多い。
                  </p>
                </div>
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
            text: "マスター、Lighthouse を初めて実行したら Performance が 47 でした……。\nこれは赤点ですよね。どこから手をつければいいのかパニックになってしまって。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まず落ち着いてください、マジさん。47 は確かに要改善ですが、Lighthouse は「何をすれば上がるか」も教えてくれます。\n車検で不合格になったとき、整備士が「ここを直せば通ります」と教えてくれるのと同じです。\nレポートの「Opportunities（改善機会）」セクションを見てください。最も効果の高い改善項目が上から順に並んでいます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "本当ですね！ 「Serve images in next-gen formats」って出ていますが……これって何をすればいいんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "画像を WebP 形式に変換することを求めています。\nたとえると、荷物を宅配便で送るとき、ダンボール箱を真空パックの袋に入れ替えてサイズを小さくするようなものです。\nNext.js を使っているなら、img タグを next/image コンポーネントに差し替えるだけで自動的に WebP 変換・リサイズ・遅延読み込みが適用されます。\nコード数行の変更で大きなスコア改善が見込めます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ next/image に差し替えるだけでそんなに変わるんですか？\nじゃあ Performance 100 を目指したら最強のサイトになりますか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "スコアが上がること自体は良いことです。ただし、100 を追求することが常に最善とは限りません。\nたとえば Google でさえ自社サービスのスコアが 100 でないページは多くあります。\n90 以上あればユーザー体験として十分で、それ以上の微調整より、機能開発やコンテンツ充実にリソースを使う方がビジネス価値が高い場合が多いです。\n『敵は完璧主義』です、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でも、Accessibility のスコアが 62 もあって……どこが問題か分からなくて不安です。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Accessibility は具体的に教えてもらいやすいスコアです。\nレポートに「Image elements do not have alt attributes（img に alt がない）」のような指摘が出ていませんか？\nそういった問題は一つひとつが明確なので、リストを上から順に直していくと短時間でスコアが大きく改善します。\nAccessibility と SEO は 90 以上を最初の目標にしてください。こちらは Opacity より先に対応すべきです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "分かりました！ まず Accessibility と SEO を 90 以上に上げて、次に next/image などの分かりやすい改善をやっていく順番でいいですね。\nこれでボクのサイトがプロ品質の高いものになります！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "マジさん、一つ注意してください。\nLighthouse はあくまで自動チェックツールです。スコアが 100 でも、実際のユーザーにとって使いにくいサイトになることはあります。\n本物のユーザーテスト（実際に人に使ってもらう）の代替にはなりません。\nスコアは『最低基準をクリアしているか』の確認手段として使いましょう。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["スコア 90〜100（緑）", "スコア 50〜89（橙）", "スコア 0〜49（赤）"]}
          rows={[
            {
              label: "状態",
              cells: ["良好 — 現状維持", "要改善 — 優先度高い問題あり", "問題あり — 早期対応が必要"],
              highlightCol: 0,
            },
            {
              label: "ビジネス影響",
              cells: ["ユーザー体験として十分", "コンバージョン・流入に影響の可能性", "直接的な機会損失の可能性"],
              highlightCol: 0,
            },
            {
              label: "対応方針",
              cells: ["他のスコアや機能開発を優先", "Opportunities リストの上位から改善", "緊急で主な原因を特定・修正"],
              highlightCol: 0,
            },
          ]}
          note="どのカテゴリも 90 以上を目標にしつつ、ビジネスへの影響が大きいカテゴリ（通常はPerformanceとAccessibility）を優先する。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は Core Web Vitals の詳細と Lighthouse を使った改善の具体的な手順です。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Core Web Vitals と効果的な改善手順
        </h2>

        <TermNote
          terms={[
            {
              word: "LCP（Largest Contentful Paint）",
              definition:
                "ページ内で最も大きなコンテンツ要素（ヒーロー画像・大きな見出しなど）が描画されるまでの時間。2.5秒以内が目標。",
            },
            {
              word: "CLS（Cumulative Layout Shift）",
              definition:
                "ページ読み込み中に要素が予期せず動く量（レイアウトシフト）。0.1 以下が目標。画像に width/height を指定することで大幅に改善できる。",
            },
            {
              word: "FID / INP（Interaction to Next Paint）",
              definition:
                "ユーザーが操作してから画面が反応するまでの時間。FID の後継が INP（200ms 以下が目標）。",
            },
            {
              word: "TTI（Time to Interactive）",
              definition:
                "ページが完全にインタラクティブ（操作可能）になるまでの時間。JS の実行量が多いと遅くなる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="効果対コスト比が高い改善アクション — ここから着手する"
        >
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: ImageIcon,
                title: "画像の最適化",
                subtitle: "効果大・コスト低",
                description: "next/image コンポーネントを使う。WebP 変換・リサイズ・遅延読み込みが自動化される。LCP と Performance に直接影響。",
                accentColor: "lime",
              },
              {
                Icon: Clock,
                title: "不要な JS を削減",
                subtitle: "効果大・コスト中",
                description: "バンドルアナライザーで大きなライブラリを特定し、必要な機能だけインポートする。TTI・Performance に影響。",
                accentColor: "lime",
              },
              {
                Icon: CheckCircle,
                title: "alt テキストを付ける",
                subtitle: "効果中・コスト低",
                description: "全 img タグに alt 属性を追加する。Accessibility スコアが大きく改善する。装飾画像は alt='' で空にする。",
                accentColor: "lime",
              },
              {
                Icon: TrendingUp,
                title: "コントラスト比を上げる",
                subtitle: "効果中・コスト低",
                description: "文字色と背景色の明暗差（コントラスト比）を WCAG AA 基準（4.5:1 以上）に合わせる。Accessibility に影響。",
                accentColor: "lime",
              },
            ]}
          />
          <KeyPoint>
            Lighthouse は「何が問題か」を教えてくれるが、「なぜそれが問題か」は自分で理解する必要がある。
            指摘された問題をコピペで直すだけでなく、原因を理解してから対処する習慣をつけよう。
          </KeyPoint>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D"
          description="Lighthouse の正しい実行方法 — 測定条件を揃えることが重要"
        >
          <CodeBlock
            title="Lighthouse を CLI で実行する（より安定した結果）"
            language="bash"
            code={`# Chrome DevTools の Lighthouse タブより CLI の方が安定した結果が出る
npm install -g lighthouse

# ページのスコアを計測
lighthouse https://example.com --output html --output-path ./lighthouse-report.html

# モバイル向けに計測（デフォルトはモバイル）
lighthouse https://example.com --form-factor=mobile

# デスクトップ向けに計測
lighthouse https://example.com --form-factor=desktop`}
          />
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(132,204,22,0.05)", borderColor: "rgba(132,204,22,0.3)" }}
          >
            <p className="text-xs font-semibold text-lime-300 mb-2">測定精度を上げるコツ</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Chrome DevTools の Lighthouse はブラウザの拡張機能が影響することがある。
              シークレットウィンドウで実行するか、CLI を使うと安定した結果が得られます。
              また 3 回実行して平均値を見ることで、ネットワークの揺れを平滑化できます。
            </p>
          </div>
          <WarningPoint>
            Lighthouse のスコアはローカル環境（localhost）と本番環境で大きく異なることがある。
            ネットワーク速度・HTTPS・CDN の有無などが影響するため、本番 URL で測定するのが重要。
          </WarningPoint>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="Lighthouse スコアと Google 検索順位の関係">
          <p>
            Google は<strong className="text-white"> Core Web Vitals をランキング要因</strong>として使用していると公式に発表しています（2021年〜）。
            これは Performance スコア内の LCP・CLS・INP が検索順位に影響するということです。
          </p>
          <p>
            ただし「スコアが 100 だから検索1位になる」ほど単純ではありません。
            コンテンツの質・被リンク・E-E-A-T（専門性・権威性・信頼性）などの要因の方が通常は強く影響します。
            Core Web Vitals は「同程度のコンテンツ品質のサイト間での差別化要因」と理解するのが現実的です。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: AlertTriangle,
                title: "コンテンツ品質",
                subtitle: "最重要",
                description: "スコアが 100 でも内容が薄いと検索順位は上がらない。コンテンツが基本。",
                accentColor: "amber",
              },
              {
                Icon: Zap,
                title: "Core Web Vitals",
                subtitle: "補完的要因",
                description: "コンテンツ品質が同等のサイト間での差別化要因。LCP・CLS を改善する価値あり。",
                accentColor: "lime",
              },
              {
                Icon: TrendingUp,
                title: "UX への直接効果",
                subtitle: "コンバージョン改善",
                description: "ページが 1 秒速くなるとコンバージョン率が 7% 上がるという調査データがある。",
                accentColor: "lime",
              },
            ]}
          />
          <KeyPoint>
            Performance 改善は「SEO のため」だけでなく「ユーザーを待たせないため」が本質。
            遅いサイトは訪問者がすぐ離脱する。0.1 秒の改善でもコンバージョン率に影響する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/seo/wai-aria",
            title: "WAI-ARIA",
            description: "Accessibility スコアを上げる ARIA の使い方",
            icon: "Accessibility",
          },
          {
            href: "/seo/meta-ogp",
            title: "メタタグと OGP",
            description: "SEO スコアに影響するメタタグ設定",
            icon: "Tag",
          },
          {
            href: "/seo/sitemap",
            title: "サイトマップ・robots.txt",
            description: "SEO スコアに影響するクローラー設定",
            icon: "FileSearch",
          },
        ]}
      />

      <PageDrill questions={lighthouseQuestions} />
    </div>
  );
}
