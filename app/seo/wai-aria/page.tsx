import Link from "next/link";
import {
  Accessibility,
  Headphones,
  MousePointerClick,
  Keyboard,
  Tag,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
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
import { waiAriaQuestions } from "@/content/questions/seo/wai-aria";

export const metadata = {
  title: "WAI-ARIA | Web開発図解",
  description:
    "WAI-ARIA の role・aria-label・aria-describedby を図解で解説。スクリーンリーダー対応とキーボード操作のアクセシビリティ基本まで。",
};

export default function WaiAriaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/seo" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← SEO・アクセシビリティ に戻る
        </Link>
      </div>

      <Hero
        category="SEO・アクセシビリティ"
        title="WAI-ARIA"
        subtitle={"見えないユーザーにも「何があるか」を伝える — アクセシビリティの設計原則"}
        body={"role・aria-label・aria-describedby でスクリーンリーダーに意味を伝え、キーボード操作にも対応する。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "WAI-ARIA が必要な理由（セマンティック HTML だけでは足りない場面）",
          "role・aria-label・aria-describedby の基本的な使い方",
          "キーボード操作のアクセシビリティ基本ルール（tabindex・フォーカス管理）",
        ]}
        prerequisites={[
          "HTML のセマンティックタグ（button・input・nav・main など）を知っている",
          "スクリーンリーダーが音声でページを読み上げるツールだと知っている",
          "CSS の display: none がスクリーンリーダーにも見えなくなることを知っている",
        ]}
        outOfScope={[
          "aria-live（動的コンテンツの変化を通知する属性）",
          "aria-expanded / aria-controls（折りたたみ UI の状態管理）",
          "フォーカストラップの実装（モーダルダイアログなど）",
        ]}
      />

      <OnePageSummary
        keyMessage="WAI-ARIA（Web Accessibility Initiative - Accessible Rich Internet Applications）は、スクリーンリーダーなどの支援技術に『このUI要素は何の役割を持つか』を伝えるための属性セット。セマンティック HTML だけでは意味が伝えられない場合に ARIA 属性を補完として使う。"
        metaphorTitle="美術館の「音声ガイド」システム"
        metaphorPoints={[
          {
            label: "スクリーンリーダー",
            real: "画面を見えないユーザーがページを音声で理解するためのソフトウェア。見た目ではなくHTML構造と ARIA 属性を読む",
            metaphor: "美術館の音声ガイドを聞いて展示を理解する鑑賞者",
          },
          {
            label: "role 属性",
            real: "この要素が『何であるか』を音声ガイドに伝える。divでボタンを作った場合などに role='button' で意味を補う",
            metaphor: "展示物の説明プレートの「種類」",
          },
          {
            label: "aria-label",
            real: "テキストがない要素（アイコンボタンなど）に名前を付ける。閉じるボタンに aria-label='閉じる' と書く",
            metaphor: "絵だけの展示物に音声ガイドが付ける解説",
          },
          {
            label: "セマンティック HTML を優先",
            real: "button タグを使えば role='button' は不要。divで代用するときだけ ARIA が必要になる",
            metaphor: "自明な展示物に余計な説明は不要",
          },
        ]}
        definition="WAI-ARIA とは HTML に意味を付加するための属性セット。スクリーンリーダーなどの支援技術が役割・状態・プロパティを正しく読み取れるようにする。セマンティック HTML を補完するものであり、代替ではない。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「スクリーンリーダーがどうやってページを読むか」を確認してから、各 ARIA 属性の使い方を見ていきます。
        </p>

        {/* ── 概念図A: スクリーンリーダーの読み取り ── */}
        <ConceptDiagram
          title="概念図A"
          description="スクリーンリーダーは何を読んでいるか？ 見た目ではなく構造と属性を読む"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 見た目 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-gray-400" />
                <p className="text-sm font-bold text-white">晴眼者が見るもの</p>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(132,204,22,0.15)", border: "1px solid rgba(132,204,22,0.4)" }}
                  >
                    <Accessibility className="w-4 h-4 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">ユーザープロフィール</p>
                    <p className="text-xs text-gray-400">マジくん / 開発者</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                見た目から「プロフィールセクション」と理解できる
              </p>
            </div>

            {/* スクリーンリーダー */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(132,204,22,0.06)",
                borderColor: "rgba(132,204,22,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Headphones className="w-5 h-5 text-lime-400" />
                <p className="text-sm font-bold text-white">スクリーンリーダーが読むもの</p>
              </div>
              <div
                className="rounded-lg border p-3 font-mono text-xs leading-loose space-y-1"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-lime-400">{"<section"}</span>
                  <span className="text-blue-300"> aria-label</span>
                  <span className="text-gray-400">{"="}</span>
                  <span className="text-green-300">{'"ユーザープロフィール"'}</span>
                  <span className="text-lime-400">{">"}</span>
                </p>
                <p className="ml-2">
                  <span className="text-lime-400">{"<img"}</span>
                  <span className="text-blue-300"> alt</span>
                  <span className="text-gray-400">{"="}</span>
                  <span className="text-green-300">{'"マジくんのアバター"'}</span>
                  <span className="text-lime-400">{" />"}</span>
                </p>
                <p className="ml-2">
                  <span className="text-lime-400">{"<p>"}</span>
                  <span className="text-gray-300">マジくん / 開発者</span>
                  <span className="text-lime-400">{"</p>"}</span>
                </p>
                <p><span className="text-lime-400">{"</section>"}</span></p>
              </div>
              <p className="text-xs text-lime-400 mt-3 leading-relaxed">
                aria-label と alt テキストで「ユーザープロフィール - マジくんのアバター - マジくん / 開発者」と読み上げる
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          スクリーンリーダーの読み取り方が分かりました。次は「いつどの ARIA 属性を使うか」を見ていきます。
        </p>

        {/* ── 概念図B: よく使う ARIA 属性 ── */}
        <ConceptDiagram
          title="概念図B"
          description="よく使う ARIA 属性 — いつ何を使うか"
        >
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Tag,
                title: "aria-label",
                subtitle: "要素に名前を付ける",
                description: "テキストのないアイコンボタンなどに使う。aria-label='メニューを閉じる' と書くと読み上げられる。",
                accentColor: "lime",
              },
              {
                Icon: Tag,
                title: "aria-describedby",
                subtitle: "補足説明を関連付ける",
                description: "input フィールドにエラーメッセージを関連付けるときに使う。aria-describedby='error-msg-id' のように ID で参照する。",
                accentColor: "lime",
              },
              {
                Icon: Accessibility,
                title: "role",
                subtitle: "要素の役割を伝える",
                description: "div や span で UI を作ったとき意味を補う。role='button' / role='dialog' / role='navigation' など。",
                accentColor: "amber",
              },
              {
                Icon: EyeOff,
                title: "aria-hidden",
                subtitle: "スクリーンリーダーから隠す",
                description: "装飾的なアイコンなど読み上げ不要な要素に使う。aria-hidden='true' で支援技術から完全に隠せる。",
                accentColor: "amber",
              },
            ]}
          />

          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"<!-- アイコンボタンの例 -->"}</p>
            <p className="text-gray-500">{"<!-- BAD: アイコンだけで意味が伝わらない -->"}</p>
            <p>
              <span className="text-lime-400">{"<button>"}</span>
              <span className="text-gray-400">{"<svg>...</svg>"}</span>
              <span className="text-lime-400">{"</button>"}</span>
            </p>
            <p className="mt-2 text-gray-500">{"<!-- GOOD: aria-label でスクリーンリーダーに伝える -->"}</p>
            <p>
              <span className="text-lime-400">{"<button"}</span>
              <span className="text-blue-300"> aria-label</span>
              <span className="text-gray-400">{"="}</span>
              <span className="text-green-300">{'"メニューを閉じる"'}</span>
              <span className="text-lime-400">{">"}</span>
            </p>
            <p className="ml-2">
              <span className="text-lime-400">{"<svg"}</span>
              <span className="text-blue-300"> aria-hidden</span>
              <span className="text-gray-400">{"="}</span>
              <span className="text-green-300">{'"true"'}</span>
              <span className="text-lime-400">{">"}</span>
              <span className="text-gray-400">...</span>
              <span className="text-lime-400">{"</svg>"}</span>
            </p>
            <p><span className="text-lime-400">{"</button>"}</span></p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、アクセシビリティって大事なのは分かるんですが……ボク、スクリーンリーダーを使うユーザーがどのくらいいるか実感が湧かなくて。\nそんなに重要なんでしょうか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "日本では全人口の約 5〜6% が何らかの視覚障害を持っていると言われています。\nたとえると、街中を歩いて 20 人すれ違ったら 1 人は該当する可能性があります。\nさらに一時的に使えない状況を考えると、眩しい日差しで画面が見えない、片手がふさがっている、などもアクセシビリティの恩恵を受ける状況ですよ。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、そんなにいるんですか。それは確かに無視できませんね。\nでも ARIA って難しそうで、何から始めればいいのか分からなくて……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "最初のルールはシンプルです、マジさん。『セマンティック HTML を正しく使う』それだけで大半は解決します。\nたとえばナビゲーションを div の集まりで作らず nav タグを使う。ボタンを div onclick で作らず button タグを使う。\nこれだけでスクリーンリーダーは「ここはナビゲーション」「これはボタン」と自動で理解できます。\nARIA が必要になるのは、どうしても div や span でカスタム UI を作らざるを得ない場面だけです。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "でも、デザインの都合で button タグを使えなくて、div に onClick を付けることってよくありますよね？\nそういうときはどうすればいいんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "その場合は3点セットで対応します、マジさん。\n1つ目は role='button' で役割を伝える。\n2つ目は tabindex='0' でキーボードでフォーカスできるようにする。\n3つ目は onKeyDown でEnterキーとSpaceキーを処理する。\nスクリーンリーダーはマウスを使わないため、キーボードで操作できることがアクセシビリティの核心です。\n外見は div でも、支援技術にはボタンとして振る舞えるようにするのが目標です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "3点セット……結構手間ですね。毎回これをやるのは大変そうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "だからこそ、最初から button タグを使う方がずっと楽なんです、マジさん。\n3点セットは『どうしても div で作らなければならない』という例外の話です。\n現代の CSS は非常に柔軟なので、button タグのスタイルを自由に変えられます。\n『ボタンらしいデザインは div でないと作れない』というのは誤解です。button タグに CSS を当ててください。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "分かりました！ まず button / input / nav などセマンティックタグを使い切る。\nどうしても div で作るときだけ role と tabindex と onKeyDown の3点セットを付ける。\nアイコンボタンには aria-label を付けてスクリーンリーダーに名前を伝える。これでいいですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "完璧にまとめていただきました、マジさん。最後にもう一つ覚えておいてください。\n装飾的な画像やアイコン SVG は aria-hidden='true' を付けて、スクリーンリーダーから隠しましょう。\n意味のない要素まで読み上げると、かえってユーザーが混乱します。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["セマンティック HTML", "ARIA 属性"]}
          rows={[
            {
              label: "使う場面",
              cells: ["可能な限り常に使う（第一選択）", "セマンティック HTML だけでは不十分な場合に補完"],
              highlightCol: 0,
            },
            {
              label: "例",
              cells: ["<button> / <nav> / <input> / <h1>〜<h6>", "role='button' / aria-label / aria-describedby"],
              highlightCol: 0,
            },
            {
              label: "スクリーンリーダーの反応",
              cells: ["自動で役割を認識", "ARIA 属性を読んで補完情報を得る"],
              highlightCol: 0,
            },
            {
              label: "メンテナンスコスト",
              cells: ["低い（タグが意味を持つ）", "高い（状態を手動で管理する必要あり）"],
              highlightCol: 0,
            },
          ]}
          note="ARIAは『最後の手段』。まずセマンティックHTMLを使い切るのが大原則（No ARIA is better than Bad ARIA）。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はキーボード操作の詳細とフォームのアクセシビリティです。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — キーボード操作とフォームのアクセシビリティ
        </h2>

        <TermNote
          terms={[
            {
              word: "tabindex",
              definition:
                "Tab キーでフォーカスできるかどうかを制御する属性。tabindex='0' で自然な順番でフォーカス可能にする。tabindex='-1' はプログラムからフォーカスを当てる（Tabキーでは到達しない）。",
            },
            {
              word: "aria-required",
              definition:
                "フォームフィールドが必須かどうかをスクリーンリーダーに伝える。aria-required='true' で「必須フィールド」と読み上げられる。",
            },
            {
              word: "aria-invalid",
              definition:
                "フォームフィールドが無効（バリデーション失敗）かどうかを伝える。aria-invalid='true' で「無効な入力」と読み上げられる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="フォームのアクセシビリティ — label と aria-describedby でエラーを伝える"
        >
          <CodeBlock
            title="アクセシブルなフォームの実装例"
            language="html"
            code={`<!-- BAD: label がない、エラーが関連付けられていない -->
<div>
  <input type="email" placeholder="メールアドレス" />
  <p style="color:red">正しいメールアドレスを入力してください</p>
</div>

<!-- GOOD: label で入力フィールドに名前をつけ、
          aria-describedby でエラーを関連付ける -->
<div>
  <label for="email">
    メールアドレス
    <span aria-hidden="true">*</span>
    <span class="sr-only">（必須）</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" role="alert">
    正しいメールアドレスを入力してください
  </p>
</div>`}
          />
          <KeyPoint>
            for と id を使って label と input を関連付けることが最重要。
            これがあるとスクリーンリーダーが input にフォーカスしたとき「メールアドレス（必須）」と読み上げる。
          </KeyPoint>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle,
                title: "label を必ず付ける",
                subtitle: "すべての input / select / textarea",
                description: "placeholder はラベルの代わりにならない。入力開始後に消えて、何のフィールドか分からなくなる。",
                accentColor: "lime",
              },
              {
                Icon: AlertTriangle,
                title: "color のみに頼らない",
                subtitle: "エラー表示の原則",
                description: "赤文字だけでエラーを示すのは色覚異常のユーザーに伝わらない。アイコン+テキストで補足する。",
                accentColor: "amber",
              },
            ]}
          />
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="キーボード操作だけで動くか確認する方法">
          <p>
            アクセシビリティの最も簡単なテスト方法は、<strong className="text-white">マウスを使わずに Tab キーだけでページを操作する</strong>ことです。
          </p>
          <p>
            Tab キーで全ての操作可能な要素（リンク・ボタン・フォームフィールド）にフォーカスが当たり、
            Enter または Space で操作できれば合格です。フォーカスが見えないほど薄い場合や、
            ポップアップを閉じるボタンにフォーカスが届かない場合は問題があります。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Keyboard,
                title: "Tab で全要素に到達できる",
                subtitle: "フォーカス順序の確認",
                description: "Tab を押すたびにフォーカスが自然な読み順（左上→右下）で移動することを確認する。",
                accentColor: "lime",
              },
              {
                Icon: MousePointerClick,
                title: "フォーカスリングが見える",
                subtitle: "視覚的なフォーカス表示",
                description: "outline: none; で全削除するのは NG。デザインに合わせた outline を別途スタイリングする。",
                accentColor: "lime",
              },
            ]}
          />
          <WarningPoint>
            outline: none や outline: 0 をグローバルに設定することは、キーボードユーザーにとって「今どこにいるか」が分からなくなる深刻な問題。
            フォーカスリングは削除せず、デザインに合わせたスタイルを適用すること。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/seo/lighthouse",
            title: "Lighthouse スコア",
            description: "アクセシビリティスコアを数値で確認する",
            icon: "Gauge",
          },
          {
            href: "/html-css/semantic",
            title: "セマンティックHTML",
            description: "意味を持つタグの正しい使い方",
            icon: "Code2",
          },
          {
            href: "/seo/meta-ogp",
            title: "メタタグと OGP",
            description: "alt タグや title タグとの関連",
            icon: "Tag",
          },
        ]}
      />

      <PageDrill questions={waiAriaQuestions} />
    </div>
  );
}
