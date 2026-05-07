import {
  Server,
  Package,
  Download,
  FolderOpen,
  Terminal,
  Globe,
  Ban,
  CheckCheck,
  Play,
  Cpu,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { nodejsQuestions } from "@/content/questions/env/nodejs";

export const metadata = {
  title: "Node.js と npm | Web開発図解",
  description:
    "Node.jsがブラウザ外でJavaScriptを動かす仕組みと、npmによるパッケージ管理の基礎を図解で解説。",
};

export default function NodejsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/env" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 開発環境セットアップに戻る
        </Link>
      </div>

      <Hero
        category="開発環境セットアップ"
        title="Node.js と npm"
        subtitle={"ブラウザの外でJavaScriptを動かす環境と、部品を管理する仕組み"}
        body={"Node.jsで『なぜターミナルでJSが動くのか』を理解し、npmで世界中のコードを1行で取り寄せる。"}
        accentColor="slate"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Node.js = ブラウザ外でJavaScriptを動かせる実行環境",
          "npm = パッケージ（部品）をインストール・管理するツール",
          "npm install / npm run でプロジェクトを動かす基本操作",
        ]}
        prerequisites={[
          "JavaScriptとはプログラミング言語のひとつ",
          "ブラウザとはChromeやSafariなどのこと",
          "ターミナル（コマンドライン）を開いたことがある",
        ]}
        outOfScope={[
          "Node.jsのバージョン管理（nvm / volta）",
          "yarn / pnpm などの代替パッケージマネージャー",
          "npm auditによるセキュリティ脆弱性チェック",
        ]}
      />

      <OnePageSummary
        keyMessage="JavaScriptはもともとブラウザの中だけで動く言語だった。Node.jsはその『ブラウザ』を取り外して、PCのターミナル上でJSを動かせるようにした実行環境。npmはNode.jsのための部品の宅配便——世界中の開発者が作ったコードを一行コマンドで取り寄せられる。"
        metaphorTitle="工場の機械と材料の宅配業者"
        metaphorPoints={[
          {
            label: "Node.js",
            real: "ブラウザという建物がなくても、PCのどこでもJSを動かせる実行エンジン",
            metaphor: "どこでも建てられる工場機械",
          },
          {
            label: "npm",
            real: "必要な材料（パッケージ）を1行コマンドで届けてくれる宅配業者",
            metaphor: "部品の宅配業者",
          },
          {
            label: "package.json",
            real: "どの材料を何個使うかが書かれたレシピ兼発注書",
            metaphor: "レシピと材料リスト",
          },
          {
            label: "node_modules",
            real: "届いた材料が実際に置かれる倉庫フォルダ",
            metaphor: "材料の置き場",
          },
        ]}
        definition="Node.jsはJavaScriptをサーバーやターミナルで動かすための実行環境。npmはJavaScript用のパッケージマネージャーで、ライブラリのインストール・更新・管理を担当する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「JSはブラウザの中だけで動く」という思い込みを解除してから、npmの仕組みを順番に確認しましょう。
        </p>

        {/* ── 概念図A: ブラウザJS vs Node.js ── */}
        <ConceptDiagram
          title="概念図A"
          description="JavaScriptはブラウザの外でも動く——Node.jsが登場する前と後"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 text-center">
                Node.js 以前
              </p>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="rounded-lg border px-4 py-3 text-center w-full"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <Globe className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-blue-300">ブラウザ</p>
                  <p className="text-xs text-gray-500 mt-1">JSが動く唯一の場所</p>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  ブラウザ以外ではJSを動かせなかった
                </p>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(100,116,139,0.06)",
                borderColor: "rgba(100,116,139,0.4)",
              }}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 text-center">
                Node.js 以降
              </p>
              <div className="flex flex-col gap-2">
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <Globe className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ブラウザ（従来通り）</p>
                </div>
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{
                    backgroundColor: "rgba(100,116,139,0.1)",
                    borderColor: "rgba(100,116,139,0.4)",
                  }}
                >
                  <Terminal className="w-4 h-4 text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-300 font-semibold">ターミナル（新しく使える）</p>
                </div>
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <Server className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">サーバー（新しく使える）</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(100,116,139,0.06)", borderColor: "rgba(100,116,139,0.3)" }}
          >
            <p className="text-xs font-semibold text-slate-300 mb-2">Node.jsが可能にしたこと</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Node.jsのおかげで、JSはブラウザのフロントエンドだけでなく、ファイルの読み書き・サーバーの起動・
              ビルドツールの実行など「PCで動くプログラム」として幅広く使えるようになりました。
              Next.jsの開発サーバー（npm run dev）も、内部でNode.jsが動いています。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          Node.jsがJSを実行できることは分かりました。次は「npm でパッケージを取り寄せる」仕組みを見ていきます。
        </p>

        {/* ── 概念図B: npm install の流れ ── */}
        <ConceptDiagram
          title="概念図B"
          description="npm install で何が起きるか？ 3ステップで確認する"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Package}
              title="package.json を確認"
              subtitle="dependencies に書かれたパッケージ一覧"
            />
            <FlowArrow label="npm install" direction="right" />
            <FlowCard
              Icon={Download}
              title="npmjs.comから取得"
              subtitle="世界中の部品置き場（npm Registry）からダウンロード"
              highlight
              accentColor="slate"
            />
            <FlowArrow label="展開" direction="right" />
            <FlowCard
              Icon={FolderOpen}
              title="node_modules に保存"
              subtitle="プロジェクト内のフォルダに格納"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">コード例で確認</p>
            <div className="font-mono text-xs space-y-2 leading-relaxed text-gray-300">
              <p>
                <span className="text-gray-500">{"# package.jsonに書いてあるものを全部インストール"}</span>
              </p>
              <p className="text-slate-300">npm install</p>
              <p className="mt-2">
                <span className="text-gray-500">{"# 特定のパッケージを新たに追加"}</span>
              </p>
              <p className="text-slate-300">npm install react</p>
              <p className="mt-2">
                <span className="text-gray-500">{"# 開発時だけ使うパッケージを追加（devDependencies）"}</span>
              </p>
              <p className="text-slate-300">npm install --save-dev typescript</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            package.json に書いてある = 注文書。node_modules = 届いた材料の置き場。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、Node.jsってよく聞くんですけど、Reactとは違うものですか？\nブラウザで動くものがもう一個あるってことですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い疑問ですね、マジさん。工場の機械を想像してください。\nJavaScriptはもともと「ブラウザという建物の中」でしか動けなかった言語です。\nNode.jsはその建物の制約を取り外して、PCのどこでも動けるようにした『実行エンジン』です。\nReactはNode.js上で動くライブラリ、という関係です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、じゃあJavaScriptはブラウザの外でも動くんですか！？\nてっきりブラウザのためだけの言語だと……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。そしてnpmという宅配業者がセットになっています。\n世界中の開発者が作ったコードの『部品』を、1行のコマンドで取り寄せられる仕組みです。\nたとえばReactも、npm install react という1行で手に入ります。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nnpm install ってやると、コードが自動で届くんですか！？\nボクずっと手でファイルをコピーするものだと思っていました……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "届いたコードはnode_modulesというフォルダに入ります。\nここが少し重要で……このフォルダはGitHubには上げません。\nサイズが巨大になることと、package.jsonさえあれば誰でも再現できるからです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "node_modulesをGitHubに上げてはいけないんですか？\nボク、うっかり上げてしまいそうです……どうすればいいんでしょう。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: ".gitignoreというファイルにnode_modulesと書くだけでOKです、マジさん。\nそしてpackage.jsonさえGitHubにあれば、誰でも npm install 一発で同じ環境を再現できます。\n材料リスト（package.json）だけ共有すれば、材料そのもの（node_modules）は各自で取り寄せられる——それがnpmの本当の価値です。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["ブラウザJS", "Node.js"]}
          rows={[
            {
              label: "実行場所",
              cells: ["ブラウザの中", "PC・サーバー・ターミナル"],
              highlightCol: 1,
            },
            {
              label: "主な用途",
              cells: ["HTMLを操作・ユーザー操作に反応", "ファイル読み書き・サーバー・ビルドツール"],
              highlightCol: 1,
            },
            {
              label: "実行方法",
              cells: ["script タグで読み込む", "ターミナルで node コマンドを実行"],
              highlightCol: 1,
            },
            {
              label: "パッケージ管理",
              cells: ["CDNリンクで読み込む（古い方法）", "npm install で取得"],
              highlightCol: 1,
            },
          ]}
          note="Node.jsはブラウザJSと同じ言語文法を使うが、実行できる場所・できることが大きく異なる。Next.jsはNode.js上で動くフレームワーク。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はnode_modulesの詳細・依存関係のバージョン管理・npmコマンドの詳細など、より深い内容です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — パッケージの依存関係
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          パッケージには「本番に必要なもの」と「開発中だけ必要なもの」の2種類があります。
          package.json の dependencies と devDependencies の違いを確認しましょう。
        </p>

        <TermNote
          terms={[
            {
              word: "node_modules",
              definition:
                "npm install でインストールされたパッケージが実際に入るフォルダ。サイズが大きくGit管理しない（.gitignoreに追加する）。",
            },
            {
              word: "dependencies",
              definition:
                "本番環境でも必要なパッケージ。react・next など、リリース後のアプリが動くために欠かせないもの。",
            },
            {
              word: "devDependencies",
              definition:
                "開発中だけ必要なパッケージ。eslint・typescript・vite など、開発ツールやビルドツールが該当する。",
            },
            {
              word: "package-lock.json",
              definition:
                "「このバージョンで動いた」という正確な記録ファイル。チームで同じ環境を再現するために必ずGitで管理する。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="dependencies と devDependencies の違い — どちらに入れるかを判断する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-300 mb-3 text-center">dependencies</p>
              <p className="text-xs text-gray-500 mb-3">本番環境でも使うもの</p>
              <div className="space-y-1.5 font-mono text-xs text-gray-400">
                <p><span className="text-slate-300">react</span>、<span className="text-slate-300">react-dom</span></p>
                <p><span className="text-slate-300">next</span></p>
                <p><span className="text-slate-300">firebase</span></p>
                <p><span className="text-slate-300">lucide-react</span></p>
              </div>
              <p className="text-xs text-gray-600 mt-3">npm install で追加</p>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(100,116,139,0.06)",
                borderColor: "rgba(100,116,139,0.35)",
              }}
            >
              <p className="text-xs font-semibold text-slate-300 mb-3 text-center">devDependencies</p>
              <p className="text-xs text-gray-400 mb-3">開発・ビルド時だけ使うもの</p>
              <div className="space-y-1.5 font-mono text-xs text-slate-400">
                <p><span className="text-slate-300">typescript</span></p>
                <p><span className="text-slate-300">eslint</span></p>
                <p><span className="text-slate-300">@types/react</span></p>
                <p><span className="text-slate-300">tailwindcss</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-3">npm install --save-dev で追加</p>
            </div>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ backgroundColor: "rgba(100,116,139,0.05)", borderColor: "rgba(100,116,139,0.25)" }}
          >
            <p className="text-xs font-semibold text-slate-300 mb-2">判断の基準</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              「リリースした後のWebアプリが動くために必要か？」で判断します。
              Reactやデータベースのクライアントは本番でも必要なので dependencies。
              ESLintやTypeScriptのコンパイラは開発中しか使わないので devDependencies。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 npmの基本コマンド3選">
          <p>
            開発でよく使う npm コマンドは3つに絞られます。これだけ覚えれば日常の操作は困りません。
          </p>
          <UseCaseGrid cols={3} items={[
            {
              Icon: Download,
              title: "npm install",
              subtitle: "パッケージを取得",
              description: "package.json の dependencies を全部インストール。クローン直後に必ず実行する。",
              accentColor: "slate",
            },
            {
              Icon: Play,
              title: "npm run dev",
              subtitle: "開発サーバー起動",
              description: "package.json の scripts.dev に書いたコマンドを実行。Next.jsなら開発サーバーが立ち上がる。",
              accentColor: "slate",
            },
            {
              Icon: Cpu,
              title: "npm run build",
              subtitle: "本番用ビルド",
              description: "デプロイ用に最適化されたファイルを生成する。Vercelへのデプロイ前に自動で実行される。",
              accentColor: "slate",
            },
          ]} />
          <KeyPoint>
            新しいプロジェクトをGitHubからクローンしたら、まず npm install を実行するのが鉄則。node_modules はGit管理されていないので、クローン直後は空になっている。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 node_modules と .gitignore">
          <p>
            npm install で取得したパッケージは node_modules フォルダに格納されます。
            このフォルダは数百MBになることもあり、GitHubにアップロードすると非常に重くなります。
          </p>
          <p>
            package.json さえあれば誰でも同じ環境を npm install で再現できるため、
            node_modules 自体は共有する必要がありません。
          </p>
          <CodeBlock
            title=".gitignore"
            language="bash"
            code={`# node_modules は Git 管理しない
node_modules/

# ビルド成果物も除外
.next/
out/

# 環境変数ファイル（絶対に上げない）
.env
.env.local`}
          />
          <WarningPoint>
            .env ファイルには APIキーや秘密情報が入るため、絶対に Git に追加しない。プロジェクト開始時に必ず .gitignore に含めておくこと。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 Node.jsのバージョン確認">
          <p>
            開発環境が正しく整っているか確認するには、バージョン番号を表示するコマンドを使います。
          </p>
          <CodeBlock
            title="ターミナル"
            language="bash"
            code={`# Node.jsのバージョンを確認
node -v
# → v22.1.0 のように表示される

# npmのバージョンを確認
npm -v
# → 10.7.0 のように表示される

# プロジェクトの依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev`}
          />
          <KeyPoint>
            node -v で何も表示されない（command not found）場合は Node.js がインストールされていない。Node.js の公式サイト（nodejs.org）から LTS 版をインストールする。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/env/terminal",
            title: "ターミナル基本コマンド",
            description: "npm を使うために必要なターミナル操作を確認",
            icon: "Terminal",
          },
          {
            href: "/env/package-json",
            title: "package.json の読み方",
            description: "dependencies・scripts・バージョン記号を詳しく",
            icon: "FileJson",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "Node.jsで動かすJSの基礎に戻る",
            icon: "Braces",
          },
        ]}
      />

      <PageDrill questions={nodejsQuestions} />
    </div>
  );
}
