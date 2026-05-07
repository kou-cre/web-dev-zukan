import {
  MonitorDot,
  Code2,
  Network,
  HardDrive,
  MousePointerClick,
  AlertTriangle,
  Terminal,
  Globe,
  Layers,
  Eye,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
import { devtoolsQuestions } from "@/content/questions/debug/devtools";

export const metadata = {
  title: "DevTools 基本 | Web開発図解",
  description:
    "ブラウザのデベロッパーツール（DevTools）の4大タブの役割を図解で解説。Elements・Console・Network・Applicationタブの使い分けを習得する。",
};

export default function DevtoolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/debug" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← デバッグ・エラー対処に戻る
        </Link>
      </div>

      <Hero
        category="デバッグ・エラー対処"
        title="DevTools 基本"
        subtitle={"ブラウザに内蔵された「診断室」——4つのタブの役割と使い分け"}
        body={"Elements・Console・Network・Applicationタブが何を見るためのものかを1ページで掴む。"}
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "DevToolsを開く3つの方法",
          "Elements・Console・Network・Applicationタブの役割",
          "エラーの種類でタブを選ぶ判断基準",
        ]}
        prerequisites={[
          "ブラウザでWebページを見たことがある",
          "JavaScriptの console.log() を知っている",
          "HTMLタグの基本（div・p・a など）を知っている",
        ]}
        outOfScope={[
          "Sourcesタブのブレークポイント（次のページ「ブレークポイント」で扱う）",
          "Performanceタブによる計測",
          "Lighthouseでのスコア測定（SEO・アクセシビリティページで扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="DevToolsはブラウザに組み込まれた開発者向け診断室。F12（またはCmd+Option+I）で開き、Elementsで見た目、ConsoleでJS、Networkで通信、ApplicationでストレージをX線のように透視できる。"
        metaphorTitle="車のコックピット計器盤"
        metaphorPoints={[
          {
            label: "DevTools 全体",
            real: "走行中の車のコックピット。速度・温度・燃料を走りながらリアルタイムで確認できる",
            metaphor: "コックピット",
          },
          {
            label: "Elements",
            real: "外装と内装の状態をX線で透視。HTMLとCSSをリアルタイムで確認・仮編集できる",
            metaphor: "X線検査",
          },
          {
            label: "Console",
            real: "エンジンの警告灯。JSエラーやconsole.logの出力が全て表示される",
            metaphor: "警告灯",
          },
          {
            label: "Network",
            real: "宅配便の追跡。APIやファイルの送受信を全て記録・確認できる",
            metaphor: "追跡システム",
          },
        ]}
        definition="DevToolsとはブラウザに内蔵された開発者向けのデバッグ・検査ツール。コードを書き替えずに「今Webページで何が起きているか」をリアルタイムで確認できる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずDevToolsを開く方法と、4つのタブが「何を見るためのもの」かを把握しましょう。
        </p>

        {/* ── 概念図A: DevToolsを開く3つの方法 ── */}
        <ConceptDiagram
          title="概念図A"
          description="DevToolsを開く方法は3つある。どれを使っても同じ画面が開く。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Terminal}
              title="F12 / Cmd+Option+I"
              subtitle="最速キーボードショートカット"
              highlight
              accentColor="red"
            />
            <FlowArrow label="または" direction="right" />
            <FlowCard
              Icon={MousePointerClick}
              title="右クリック → 検証"
              subtitle="特定の要素を調べたいとき"
            />
            <FlowArrow label="または" direction="right" />
            <FlowCard
              Icon={Globe}
              title="ブラウザメニュー"
              subtitle="その他のツール → デベロッパーツール"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Chromeの場合。Safariは「開発メニュー」を事前に有効化が必要。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          DevToolsを開いたら、上部のタブ一覧が見えます。次は4つの主要タブが「何を見るか」を整理しましょう。
        </p>

        {/* ── 概念図B: 4タブの役割マップ ── */}
        <ConceptDiagram
          title="概念図B"
          description="4つの主要タブはそれぞれ「見える世界」が違う。トラブルの種類で使い分ける。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Elements */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-red-400" />
                <p className="text-sm font-bold text-white">Elements</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                HTMLの構造とCSSスタイルを確認・仮編集する。
              </p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>▸ 要素のHTMLを右クリック→検証で確認</li>
                <li>▸ CSSをリアルタイム変更してレイアウトを試す</li>
                <li>▸ ページをリロードすると変更は消える（仮編集）</li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-1.5 text-xs"
                style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                <span className="text-red-300">使うとき:</span>
                <span className="text-gray-400 ml-1">見た目がおかしい / レイアウトが崩れている</span>
              </div>
            </div>

            {/* Console */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-gray-300" />
                <p className="text-sm font-bold text-white">Console</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                JSのエラー・console.logの出力・コードの即時実行。
              </p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>▸ 赤いエラーメッセージが表示される</li>
                <li>▸ console.log()の出力を確認する</li>
                <li>▸ ここでJSを直接入力して即時実行できる</li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-1.5 text-xs"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-gray-300">使うとき:</span>
                <span className="text-gray-400 ml-1">エラーが出た / JSが動いていない</span>
              </div>
            </div>

            {/* Network */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-5 h-5 text-gray-300" />
                <p className="text-sm font-bold text-white">Network</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                fetch・XHR・画像など全通信のリクエスト/レスポンス確認。
              </p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>▸ ステータスコード（200・404・500など）を確認</li>
                <li>▸ APIが返したJSONの中身を見る</li>
                <li>▸ 通信にかかった時間を確認する</li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-1.5 text-xs"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-gray-300">使うとき:</span>
                <span className="text-gray-400 ml-1">データが来ない / APIエラー / 画像が出ない</span>
              </div>
            </div>

            {/* Application */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <HardDrive className="w-5 h-5 text-gray-300" />
                <p className="text-sm font-bold text-white">Application</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                localStorage・Cookie・IndexedDB・Service Workerの確認。
              </p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>▸ localStorageに保存されたデータを見る・削除する</li>
                <li>▸ Cookieの中身と有効期限を確認する</li>
                <li>▸ Service Workerのキャッシュを管理する</li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-1.5 text-xs"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-gray-300">使うとき:</span>
                <span className="text-gray-400 ml-1">ログアウトできない / データが消えた・残っている</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            まず迷ったらConsoleを開くのが正解。通信系はNetwork、ストレージ系はApplicationへ。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "DevToolsって名前は聞くんですけど、実際どんなときに使うんですか？\nボク、エラーが出てもよく分からなくてそのままにしてしまっていて……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "病院の検査機器を想像してください、マジさん。\nX線・MRI・血液検査、それぞれ確認できる部位が違いますよね。\nDevToolsも同じで、4つのタブが『見える化』できる種類が違うんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え！ タブが全部同じ画面だと思っていました……。それぞれ専門の役割があるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "はい。Elementsタブはページの見た目（HTML・CSS）、ConsoleはJavaScriptの動き、NetworkはAPIやファイルの通信、Applicationはブラウザへのデータのしまわれかたをそれぞれ専門に見ます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "じゃあエラーが出たときは、まずどのタブを見ればいいんですか……？\n全部確認するのは大変で……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "そこは流れで判断します。\n赤い文字が出ていたらConsole。画像やデザインがおかしいならElements。\nAPIからデータが来ていないならNetwork。認証が切れたりデータが消えたならApplicationです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ そんな簡単に分けられるんですね！\nボクずっと全部Consoleだけ見てました……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Consoleはいちばん入口として使いやすいです、マジさん。\nでも通信のトラブルはNetworkを見ないと分かりません。\n慣れてきたら、エラーの『種類』でタブを選べるようになりますよ。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Elements", "Console", "Network", "Application"]}
          rows={[
            {
              label: "主な用途",
              cells: ["HTML/CSSの確認・仮編集", "JSエラー・console.logの出力", "HTTP通信の記録・確認", "ブラウザストレージ管理"],
              highlightCol: 1,
            },
            {
              label: "見られるもの",
              cells: ["DOMツリー・適用中CSS", "エラー文・変数の値", "リクエスト/レスポンス・ステータスコード", "localStorage・Cookie・IndexedDB"],
              highlightCol: 1,
            },
            {
              label: "使うべき状況",
              cells: ["見た目がおかしい", "JSが動かない・赤いエラー", "データが来ない・API通信を確認", "ログイン状態・保存データの問題"],
              highlightCol: 1,
            },
          ]}
          note="まずConsoleを開く習慣をつけて、そこにエラーが出ていなければNetworkへ——という流れが実践的な使い方。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はSourcesタブやPerformanceタブなど、より深い使い方の紹介です。まず4大タブを使いこなしてから読んでください。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Sourcesタブとその他のタブ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          4大タブの次に知っておくと便利なタブを紹介します。特にSourcesタブはコードのデバッグに非常に強力です。
        </p>

        <TermNote
          terms={[
            {
              word: "DOM",
              definition:
                "Document Object Model。ブラウザがHTMLを読み込んだ後に作るツリー構造のデータ。Elementsタブで可視化されているのがDOMです。",
            },
            {
              word: "Cookie",
              definition:
                "サーバーとやり取りされる小さなデータ。認証情報・セッションIDなどに使われる。Applicationタブで確認・削除できます。",
            },
            {
              word: "localStorage",
              definition:
                "ブラウザにデータを保存する仕組み。サーバーには送られず、ブラウザを閉じても残る。Applicationタブで確認・削除できます。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用概念図"
          description="4大タブの外にも便利なタブがある。用途に応じて使い分ける。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-white">Sources</p>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                ソースコードを直接確認し、ブレークポイントでデバッグする。次のページで詳しく扱います。
              </p>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-white">Performance</p>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                ページの描画時間・JS実行時間を計測して、パフォーマンスのボトルネックを見つける。
              </p>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-white">Lighthouse</p>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                パフォーマンス・アクセシビリティ・SEOを0〜100点でスコアリングし、改善点を提案する。
              </p>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MonitorDot className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-white">Responsive Mode</p>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                画面サイズを変えてスマホ・タブレット表示をシミュレートする。DevTools上部のアイコンから切り替える。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ───────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="まずConsoleを開くべき場面">
          <p>
            DevToolsの入門として、最初に意識するのはConsoleタブです。
            ページが動かない・エラーが出ているときは、ConsoleにJSエラーが赤文字で表示されているかを確認することが第一歩になります。
          </p>
          <p>
            また、自分のコードに console.log() を仕込んで変数の値を確認する用途でも使います。
            コード内に書いた console.log(user) の出力は、Consoleタブで見ます。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: AlertTriangle,
                title: "エラー確認",
                subtitle: "赤いエラーが出ている",
                description: "ConsoleのErrorフィルターを選ぶと、エラーだけを絞り込める。エラーをクリックするとソースコードの該当行に飛べる。",
                accentColor: "red",
              },
              {
                Icon: Terminal,
                title: "console.log確認",
                subtitle: "変数の値を出力して確認",
                description: "console.log(変数名) の出力がここに表示される。undefined が出ていたら、その変数がまだデータを持っていないことが分かる。",
                accentColor: "red",
              },
            ]}
          />
          <KeyPoint>
            Consoleタブには、ページ上のすべてのJSエラーが流れてくる。開発中は常にConsoleを開いておく習慣をつけると、エラーを見落とさずに済む。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="Elementsでスタイルを仮編集する">
          <p>
            Elementsタブでは、画面を見ながらCSSを一時的に編集できます。
            右側の「Styles」パネルでクラスの数値を変更すると、ページにリアルタイムで反映されます。
          </p>
          <p>
            ただしこの変更はページをリロードすると消えます。CSSファイルを直接編集しているわけではないためです。
            あくまで「仮試し」として使い、良い値が見つかったらコードに反映させましょう。
          </p>
          <CodeBlock
            title="Elementsタブでよく使う操作"
            language="bash"
            code={`# 要素を選択する3つの方法
1. 左上のカーソルアイコン → ページ上の要素をクリック
2. ページ上で右クリック → 「検証」を選ぶ
3. ElementsパネルのHTMLツリーを手動でたどる

# Stylesパネルでの編集
- プロパティの数値をクリックして直接変更
- 上矢印・下矢印で数値を1ずつ増減（Shift+矢印で10ずつ）
- チェックボックスでプロパティをON/OFFできる`}
          />
          <WarningPoint>
            Elementsで行った変更は、ページをリロードすると全て消える。良いスタイルを見つけたら、必ず実際のCSSファイルに反映させること。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/debug/error-messages",
            title: "エラーメッセージの読み方",
            description: "Consoleに出る赤いエラーを読み解く技術",
            icon: "FileWarning",
          },
          {
            href: "/debug/network-tab",
            title: "Networkタブ活用",
            description: "fetch通信のリクエスト/レスポンスを目で見る",
            icon: "Network",
          },
          {
            href: "/debug/breakpoints",
            title: "ブレークポイント",
            description: "Sourcesタブでコードを止めてデバッグする",
            icon: "PauseCircle",
          },
        ]}
      />

      <PageDrill questions={devtoolsQuestions} />
    </div>
  );
}
