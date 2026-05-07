import {
  FileJson,
  Package,
  Wrench,
  Play,
  Tag,
  Lock,
  AlertTriangle,
  ChevronRight,
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
import { CorrectionCard } from "@/components/CorrectionCard";
import { packageJsonQuestions } from "@/content/questions/env/package-json";

export const metadata = {
  title: "package.json の読み方 | Web開発図解",
  description:
    "dependencies・devDependencies・scripts・バージョン記号（^~）の読み方を図解で解説。初めて見るプロジェクトでも迷わなくなる。",
};

export default function PackageJsonPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/env" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 開発環境セットアップに戻る
        </Link>
      </div>

      <Hero
        category="開発環境セットアップ"
        title="package.json の読み方"
        subtitle={"プロジェクトの設計書——依存関係とスクリプトの仕組みを読み解く"}
        body={"dependencies・devDependencies・scripts・バージョン番号を一気に理解する。"}
        accentColor="slate"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "package.json = プロジェクトの設計書兼材料リスト",
          "dependencies と devDependencies の違い",
          "scripts でコマンドに別名をつける仕組み",
          "^ や ~ などのバージョン記号の読み方",
        ]}
        prerequisites={[
          { text: "npmとNode.jsの基本（/env/nodejsを先に読む）", href: "/env/nodejs" },
          "JSONとはキーと値のペアでデータを表す形式",
          "npm install というコマンドを使ったことがある",
        ]}
        outOfScope={[
          "peerDependencies（プラグインの依存関係の宣言）",
          "resolutions（依存関係の強制バージョン指定）",
          "npm scripts の高度な活用（&&・;・前後処理）",
        ]}
      />

      <OnePageSummary
        keyMessage="package.jsonはプロジェクトの設計書。どんなパッケージを使っているか・どんなコマンドが使えるか・プロジェクト名やバージョンが全部書かれている。これを読めれば、初めて触るプロジェクトでも『何ができるか』をすぐ把握できる。"
        metaphorTitle="建物の仕様書と材料発注書"
        metaphorPoints={[
          {
            label: "name / version",
            real: "このプロジェクトの名前と完成度を表すラベル",
            metaphor: "建物の名前と完成度",
          },
          {
            label: "dependencies",
            real: "本番環境でも必要なパッケージ一覧（react・next など）",
            metaphor: "本番で必要な建材リスト",
          },
          {
            label: "devDependencies",
            real: "開発中だけ使うパッケージ一覧（eslint・typescript など）",
            metaphor: "工事中だけ使う足場リスト",
          },
          {
            label: "scripts",
            real: "よく使うコマンドに短い別名をつけた一覧",
            metaphor: "作業手順の短縮ボタン",
          },
        ]}
        definition="package.jsonはNode.jsプロジェクトの設定ファイル。パッケージの依存関係・実行スクリプト・プロジェクトメタデータを定義する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「package.jsonの全体構造」を確認してから、scriptsとバージョン記号を順番に理解します。
        </p>

        {/* ── 概念図A: package.jsonの全体構造 ── */}
        <ConceptDiagram
          title="概念図A"
          description="package.json の主要フィールド——5つの区画に分けて理解する"
        >
          <div
            className="rounded-xl border-2 border-dashed border-slate-700/50 p-4"
          >
            <p className="text-xs font-semibold text-slate-500 text-center mb-4 tracking-wide uppercase">
              package.json の構造
            </p>
            <StackLayer
              Icon={Tag}
              title="name / version"
              subtitle="プロジェクト名とバージョン番号。公開するパッケージなら必須、個人開発なら任意"
              iconColor="text-gray-400"
            />
            <StackLayer
              Icon={Package}
              title="dependencies"
              subtitle="本番でも使うパッケージ一覧。react・next・firebase など"
              iconColor="text-slate-300"
            />
            <StackLayer
              Icon={Wrench}
              title="devDependencies"
              subtitle="開発・ビルド時だけ使うパッケージ。typescript・eslint など"
              iconColor="text-slate-400"
            />
            <StackLayer
              Icon={Play}
              title="scripts"
              subtitle="コマンドの短縮定義。npm run dev で scripts.dev に書いたコマンドが実行される"
              iconColor="text-slate-300"
              showArrow={false}
            />
          </div>

          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// 典型的な package.json の例"}</p>
            <p className="text-gray-300">{"{"}</p>
            <p className="ml-4">
              <span className="text-sky-300">{'"name"'}</span>
              <span className="text-gray-400">{": "}</span>
              <span className="text-green-300">{'"my-next-app"'}</span>
              <span className="text-gray-400">{","}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">{'"version"'}</span>
              <span className="text-gray-400">{": "}</span>
              <span className="text-green-300">{'"0.1.0"'}</span>
              <span className="text-gray-400">{","}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">{'"scripts"'}</span>
              <span className="text-gray-400">{": {"}</span>
            </p>
            <p className="ml-8">
              <span className="text-sky-300">{'"dev"'}</span>
              <span className="text-gray-400">{": "}</span>
              <span className="text-green-300">{'"next dev"'}</span>
            </p>
            <p className="ml-4 text-gray-400">{"},"}</p>
            <p className="ml-4">
              <span className="text-sky-300">{'"dependencies"'}</span>
              <span className="text-gray-400">{": {"}</span>
            </p>
            <p className="ml-8">
              <span className="text-sky-300">{'"react"'}</span>
              <span className="text-gray-400">{": "}</span>
              <span className="text-green-300">{'"^19.0.0"'}</span>
            </p>
            <p className="ml-4 text-gray-400">{"},"}</p>
            <p className="ml-4">
              <span className="text-sky-300">{'"devDependencies"'}</span>
              <span className="text-gray-400">{": {"}</span>
            </p>
            <p className="ml-8">
              <span className="text-sky-300">{'"typescript"'}</span>
              <span className="text-gray-400">{": "}</span>
              <span className="text-green-300">{'"^5.0.0"'}</span>
            </p>
            <p className="ml-4 text-gray-400">{"}"}</p>
            <p className="text-gray-300">{"}"}</p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          全体構造が分かりました。次は「scriptsがどう動くか」を確認します。
        </p>

        {/* ── 概念図B: scriptsの仕組み ── */}
        <ConceptDiagram
          title="概念図B"
          description="npm run コマンドは scripts に書いた定義を実行するショートカット"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Play}
              title="npm run dev"
              subtitle="ターミナルで入力"
            />
            <FlowArrow label="参照" direction="right" />
            <FlowCard
              Icon={FileJson}
              title="scripts.dev を確認"
              subtitle="package.json を読む"
              highlight
              accentColor="slate"
            />
            <FlowArrow label="実行" direction="right" />
            <FlowCard
              Icon={ChevronRight}
              title="next dev"
              subtitle="書いてあるコマンドが走る"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">よく使う scripts の例</p>
            <div className="font-mono text-xs space-y-1 leading-relaxed text-gray-400">
              <div className="flex gap-4">
                <span className="text-slate-300 w-28 flex-shrink-0">npm run dev</span>
                <span>→ 開発サーバー起動（next dev）</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-300 w-28 flex-shrink-0">npm run build</span>
                <span>→ 本番ビルド（next build）</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-300 w-28 flex-shrink-0">npm run lint</span>
                <span>→ ESLintでコードチェック</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            長いコマンドに短い別名をつける仕組み。npm run の後に scripts のキー名を書くだけ。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、package.jsonって初めて見たとき怖くて……\nなんかごちゃごちゃしていて何が何だか分からないんです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "建物の仕様書だと思ってください、マジさん。\n名前・使う材料・作業手順が全部書いてある一枚の書類です。\n慣れると一目で『このプロジェクトは何ができるか』が分かります。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、scriptsって何ですか？\nnpm run dev って毎回打ってるけど、それがここで定義されてるんですか！？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。scriptsのdevという欄にnext devと書いてあるから、npm run devでそれが実行される。\n長いコマンドに短い別名をつける仕組みです。\nたとえば npm run lint と打つだけで、長いESLintコマンドが全部走ります。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ自分でscriptsに何か書き足せるんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "はい、自由に追加できます。ただしdependenciesとdevDependenciesの違いも覚えてほしくて……少し複雑な話になります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "どちらに入れるか間違えたら、どうなるんでしょう……\nボク、よく間違えそうで怖いです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "間違えてもアプリが壊れることはありません。ただし本番のファイルサイズが無駄に大きくなる可能性があります、マジさん。\n判断基準は『リリース後のWebアプリが動くために必要か？』です。\nreactやfirebaseはYES→dependencies、eslintやtypescriptはNO→devDependencies。\nこれだけ覚えておけば十分ですよ。",
          },
        ]}
      />

      {/* ── 比較表 ────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON — dependencies vs devDependencies
        </h2>
        <ComparisonTable
          headers={["dependencies", "devDependencies"]}
          rows={[
            {
              label: "使うタイミング",
              cells: ["本番環境でも必要", "開発・ビルド時だけ"],
              highlightCol: -1,
            },
            {
              label: "代表的なパッケージ",
              cells: ["react, next, firebase, lucide-react", "typescript, eslint, prettier, @types/*"],
              highlightCol: -1,
            },
            {
              label: "追加コマンド",
              cells: ["npm install <名前>", "npm install --save-dev <名前>"],
              highlightCol: -1,
            },
            {
              label: "本番ビルドに含まれるか",
              cells: ["含まれる", "通常は含まれない"],
              highlightCol: -1,
            },
          ]}
          note="判断基準：『リリース後のアプリが動くために必要か？』YES → dependencies、NO → devDependencies"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はバージョン記号（^~）の詳細・package-lock.jsonの役割など、より深い内容です。"
      />

      {/* ── 応用編 ── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — バージョン番号の読み方
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          パッケージのバージョン番号には 1.2.3 のような3桁の数字とアップデートの許容範囲を表す記号があります。
        </p>

        <TermNote
          terms={[
            {
              word: "semver",
              definition:
                "Semantic Versioning（セマンティックバージョニング）の略。1.2.3 の3桁でメジャー.マイナー.パッチの変更規模を表す。",
            },
            {
              word: "^ （キャレット）",
              definition:
                "マイナーバージョンとパッチのアップデートを許容する記号。^1.2.3 は 1.x.x の最新を使う（メジャーは変えない）。",
            },
            {
              word: "~ （チルダ）",
              definition:
                "パッチバージョンのみのアップデートを許容する記号。~1.2.3 は 1.2.x の最新を使う（マイナーは変えない）。",
            },
            {
              word: "package-lock.json",
              definition:
                "実際にインストールされたパッケージの正確なバージョンを記録したファイル。チームで同じ環境を再現するために必ずGitで管理する。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="バージョン番号の3桁はそれぞれ変更の大きさを表す"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div
              className="rounded-xl border p-4 text-center"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-2xl font-bold text-red-300 font-mono mb-2">1</p>
              <p className="text-xs font-semibold text-gray-300">メジャー</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">後方互換性がない大きな変更。バージョンが上がると動かなくなるコードが出るかもしれない</p>
            </div>
            <div
              className="rounded-xl border p-4 text-center"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-2xl font-bold text-yellow-300 font-mono mb-2">2</p>
              <p className="text-xs font-semibold text-gray-300">マイナー</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">後方互換性を保ちながら機能追加。基本的に安全にアップデートできる</p>
            </div>
            <div
              className="rounded-xl border p-4 text-center"
              style={{
                backgroundColor: "rgba(100,116,139,0.06)",
                borderColor: "rgba(100,116,139,0.35)",
              }}
            >
              <p className="text-2xl font-bold text-slate-300 font-mono mb-2">3</p>
              <p className="text-xs font-semibold text-slate-300">パッチ</p>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">バグ修正のみ。機能の追加や変更はなく、安全にアップデートできる</p>
            </div>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">記号による許容範囲の違い</p>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-300 w-24 flex-shrink-0">^1.2.3</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-300">1.x.x の最新（メジャーは固定、マイナーとパッチはOK）</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-300 w-24 flex-shrink-0">~1.2.3</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-300">1.2.x の最新（メジャーとマイナーは固定、パッチのみOK）</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-300 w-24 flex-shrink-0">1.2.3</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-300">完全に固定（このバージョンのみ）</span>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 scriptsの書き方と使い方">
          <p>
            scriptsは任意のコマンドに短い別名をつける仕組みです。
            npm start・npm test は特別なエイリアスで npm run なしでも実行できます。
          </p>
          <p className="text-xs text-gray-500 mb-2">
            ※ 以下の <span className="font-mono text-gray-400">{"// コメント"}</span> は説明用です。実際の package.json にコメントは書けません（JSONの仕様でエラーになります）。
          </p>
          <CodeBlock
            title="package.json — scripts の例"
            language="json"
            code={`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",

    // ↓ 複数コマンドを順番に実行（&&でつなぐ）
    "check": "npm run lint && npm run type-check"
  }
}`}
          />
          <KeyPoint>
            npm start と npm test は特別で、npm run start / npm run test のように run を省略して呼べる。それ以外のカスタムスクリプトは必ず npm run を先に付ける。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 package-lock.json の役割">
          <p>
            package.json に書いた {"^1.2.3"} は「1.x.x の最新を使う」という意味なので、
            インストールするタイミングによって取得されるバージョンが変わる可能性があります。
          </p>
          <p>
            package-lock.json はそのときにインストールした正確なバージョンを記録するファイルです。
            これがあることで、チーム全員が同じバージョンのパッケージを使えます。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: FileJson,
              title: "package.json",
              subtitle: "許容範囲の指定",
              description: "「このバージョン以上なら使う」という範囲を指定する。^や~で柔軟性を持たせる。",
              accentColor: "slate",
            },
            {
              Icon: Lock,
              title: "package-lock.json",
              subtitle: "実際のバージョン記録",
              description: "「このとき実際に入れたのはこのバージョン」という正確な記録。再現性の担保。",
              accentColor: "slate",
            },
          ]} />
          <WarningPoint>
            package-lock.json はGitで必ず管理する。.gitignoreに追加してしまうと、チームメンバーが異なるバージョンのパッケージを使う可能性があり、「私の環境では動く」問題が発生する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 よくある誤解">
          <CorrectionCard
            misconception="package-lock.json は自動生成されるので、Git管理しなくていい"
            correction="package-lock.jsonはGitで必ず管理する。これがないと npm install のたびに違うバージョンが入る可能性がある"
            reason="package.jsonの ^ や ~ は許容範囲を示すだけで、固定のバージョンを保証しない。package-lock.jsonがあることで、npm ci（CIで使う厳格なインストールコマンド）も使えるようになる。"
          />
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/env/nodejs",
            title: "Node.js と npm",
            description: "package.jsonを読む前提となるnpmの基礎",
            icon: "Server",
          },
          {
            href: "/env/terminal",
            title: "ターミナル基本コマンド",
            description: "npm run を実行するターミナルの使い方",
            icon: "Terminal",
          },
          {
            href: "/env/vscode",
            title: "VSCode と拡張機能",
            description: "package.jsonで管理するESLint・Prettierの設定",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={packageJsonQuestions} />
    </div>
  );
}
