import {
  RefreshCw,
  FileInput,
  Database,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Edit3,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { controlledQuestions } from "@/content/questions/form/controlled";

export const metadata = {
  title: "制御コンポーネントとは | Web開発図解",
  description:
    "ReactのonChange/valueでフォームを管理する制御コンポーネントの仕組みと、非制御コンポーネントとの違いを図解で解説。",
};

export default function ControlledPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/form" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← フォーム・バリデーションに戻る
        </Link>
      </div>

      <Hero
        category="フォーム・バリデーション"
        title="制御コンポーネントとは"
        subtitle={"ReactのStateがフォームの「唯一の情報源」になる設計パターン"}
        body={"onChange/valueのペアで入力値をStateと常に同期させる——これがReactらしいフォームの作り方。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "制御コンポーネントとは何か（onChange + value でState管理）",
          "非制御コンポーネントとの違いと使い分け",
          "Reactフォームで「値を常にStateと同期する」ことの意味",
        ]}
        prerequisites={[
          "useStateの基本（const [value, setValue] = useState('')）",
          "JSXでonChangeなどのイベントハンドラを書く方法",
          "HTMLのinput・select・textareaタグの基本",
        ]}
        outOfScope={[
          "React Hook Formによる非制御コンポーネント最適化（次のページで扱う）",
          "Zodを使ったバリデーション（別ページで扱う）",
          "フォームライブラリの高度な機能",
        ]}
      />

      <OnePageSummary
        keyMessage="制御コンポーネントとは「ReactのStateがフォーム入力の唯一の情報源」になる設計。inputのvalue属性にStateを渡し、onChangeでsetterを呼ぶことで、入力のたびに画面とStateが同期し続ける。"
        metaphorTitle="レジの在庫カウンター"
        metaphorPoints={[
          {
            label: "制御コンポーネント",
            real: "商品をスキャンするたびに在庫DBを更新する。いつでも正確な在庫数（State）が分かる",
            metaphor: "スキャン即DB更新",
          },
          {
            label: "非制御コンポーネント",
            real: "紙の集計票にメモして、締め作業のときにまとめてDBに打ち込む",
            metaphor: "締め時に集計",
          },
          {
            label: "onChange",
            real: "スキャンのたびにDBに入力する操作 = 入力イベントのたびにsetterを呼ぶ",
            metaphor: "スキャン操作",
          },
          {
            label: "value prop",
            real: "DBの現在値をレジ画面に表示する = StateをinputのvalueにそのままつなぐJSON",
            metaphor: "DB値の表示",
          },
        ]}
        definition="制御コンポーネントとは、フォームのDOMではなくReactのStateが「値の真実の場所（Single Source of Truth）」として機能するパターン。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「入力するたびに何が起きるか」の流れを確認し、制御コンポーネントがなぜ必要かを理解しましょう。
        </p>

        {/* ── 概念図A: 制御コンポーネントの循環フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="制御コンポーネントで入力したとき、Reactの内部で何が起きているか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Edit3}
              title="ユーザーが入力"
              subtitle="キーを押す"
            />
            <FlowArrow label="onChangeが発火" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="setter を呼ぶ"
              subtitle="setValue(e.target.value)"
              highlight
              accentColor="green"
            />
            <FlowArrow label="State が更新" direction="right" />
            <FlowCard
              Icon={Database}
              title="再レンダリング"
              subtitle="inputのvalueが更新"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            入力するたびにこのサイクルが回る。DOMではなくStateが「今の値」の正体。
          </p>

          {/* コード例 */}
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// 制御コンポーネントの最小実装"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { useState } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'react'"}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> NameForm</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-green-300">const</span>
              <span className="text-gray-300">{" [name, setName] = "}</span>
              <span className="text-yellow-300">useState</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">{`''`}</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="ml-4 mt-2">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" ("}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"<input"}</span>
            </p>
            <p className="ml-10">
              <span className="text-sky-300">value</span>
              <span className="text-gray-300">{"={name}"}</span>
              <span className="text-gray-500 ml-2">{"// ← Stateをvalueに"}</span>
            </p>
            <p className="ml-10">
              <span className="text-sky-300">onChange</span>
              <span className="text-gray-300">{"={e => "}</span>
              <span className="text-yellow-300">setName</span>
              <span className="text-gray-300">{"(e.target.value)"}</span>
              <span className="text-gray-300">{"}"}</span>
              <span className="text-gray-500 ml-2">{"// ← 入力をStateに反映"}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"/>"}</span>
            </p>
            <p className="ml-4"><span className="text-gray-300">);</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
          >
            <p className="text-xs font-semibold text-green-300 mb-2">valueとonChangeは常にセット</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              value だけ渡すと入力できない読み取り専用になります。onChange だけ渡すと State が変わっても表示が変わりません。この2つは常にセットで使います。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          制御コンポーネントの流れが分かりました。次に「StateではなくDOMに任せる」非制御コンポーネントと比べてみましょう。
        </p>

        {/* ── 概念図B: 制御 vs 非制御 ── */}
        <ConceptDiagram
          title="概念図B"
          description="制御コンポーネントと非制御コンポーネント — 値の管理場所が違う"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 uppercase tracking-widest mb-3 text-center">
                制御コンポーネント
              </p>
              <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>値はReact State が持つ</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>入力のたびに State 更新</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>リアルタイムバリデーションが簡単</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>条件付き送信ボタン制御が可能</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs font-mono"
                style={{ backgroundColor: "#0f1117" }}
              >
                <span className="text-green-300">value</span>
                <span className="text-gray-300">{"={name} "}</span>
                <span className="text-green-300">onChange</span>
                <span className="text-gray-300">{"={e => setName(e.target.value)}"}</span>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                非制御コンポーネント
              </p>
              <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>値はDOMが持つ（useRef）</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>送信時に ref.current.value で取得</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>入力中の再レンダリングなし（軽い）</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>ファイルアップロードは必須</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-gray-400">{"ref={inputRef}  "}</span>
                <span className="text-gray-600">{"// onChangeなし"}</span>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、フォームってただ input タグを書けばいいんじゃないですか？ Reactの State と紐付けなきゃいけない理由が正直よく分からなくて……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い疑問ですね、マジさん。スーパーのレジを思い浮かべてください。\n商品をスキャンするたびに在庫データベースに記録する店と、紙のメモに書いて締め作業でまとめてDBに入力する店、どちらが「今の在庫数」を正確に知れますか？\n制御コンポーネントは前者です。入力のたびにStateが更新されるので、常に「今の入力値」が正確に分かる。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ああ、在庫の喩えで分かった気がします！\nでも value と onChange を両方書かないといけないのが少し面倒で……。どちらか片方だけじゃダメなんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "残念ながらセットでないと機能しません。\nvalue だけ渡すと「読み取り専用」になり、キーを押しても入力できなくなります。\nonChange だけだと入力した値がStateに入りますが、valueがないのでinputが常に空を表示し続けます。\nちょうどレジの画面には残高表示、スキャンボタンには記録操作、両方なくては成り立たないのと同じです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なるほど……。\nただ、入力のたびに再レンダリングされると重くなったりしませんか？ 100文字入力したら100回レンダリング……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭い観点です。確かに制御コンポーネントは入力のたびに再レンダリングが走ります。\nただし、通常のテキスト入力ならほぼ問題になりません。\n重くなるのは、再レンダリングのたびに重い計算をしている場合です。\nもし本当にパフォーマンスが課題になったとき——たとえば数百個のフォームフィールドがある場合——は、次のページで扱う React Hook Form がその問題を解決してくれます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか？ じゃあ非制御コンポーネントはどんなときに使うんでしょう？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "大きく2つのケースです。\n1つ目は「ファイルアップロード」。ファイルはReact Stateで持てないので useRef でDOM参照するしかありません。\n2つ目は「外部ライブラリとの統合」。既存のUIコンポーネントが ref を要求する場合です。\nそれ以外の通常のフォームは、制御コンポーネントから始めて問題ありません。シンプルで分かりやすいのが最大の利点ですよ。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["制御コンポーネント", "非制御コンポーネント"]}
          rows={[
            {
              label: "値の管理場所",
              cells: ["React State", "DOM（useRef）"],
              highlightCol: 0,
            },
            {
              label: "入力ごとの更新",
              cells: ["あり（onChange）", "なし（送信時にrefで取得）"],
              highlightCol: 0,
            },
            {
              label: "リアルタイムバリデーション",
              cells: ["簡単", "難しい"],
              highlightCol: 0,
            },
            {
              label: "条件付き送信ボタン",
              cells: ["State参照で簡単", "ref.current.value を都度取得"],
              highlightCol: 0,
            },
            {
              label: "ファイルアップロード",
              cells: ["不可（Stateに入れられない）", "必須（refを使う）"],
              highlightCol: 1,
            },
          ]}
          note="通常のフォームは制御コンポーネントから始める。ファイルアップロードや大規模フォームのパフォーマンス最適化が必要なときに非制御を検討する。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はよくある誤りのパターンと実践的な実装例です。基本が身についてから読んでください。"
      />

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 制御コンポーネントの実践パターン">
          <p>
            テキスト入力・セレクトボックス・チェックボックスで書き方が少し異なります。共通点は{" "}
            <strong className="text-white">value（またはchecked）とonChangeをセット</strong>で渡すことです。
          </p>
          <CodeBlock
            title="controlled-form.tsx"
            language="tsx"
            code={`// テキスト入力
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />

// セレクトボックス
const [color, setColor] = useState('red');
<select value={color} onChange={e => setColor(e.target.value)}>
  <option value="red">赤</option>
  <option value="blue">青</option>
</select>

// チェックボックス（valueではなくcheckedを使う）
const [agreed, setAgreed] = useState(false);
<input
  type="checkbox"
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
/>`}
          />
          <KeyPoint>
            チェックボックスだけは value ではなく checked prop を使い、onChange では e.target.checked を取り出す。テキスト系とチェック系を混同すると常に true/false になるバグが起きる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 よくある誤り">
          <CorrectionCard
            misconception="value だけ渡せばフォームが制御できる"
            correction="value だけでは読み取り専用になり入力できない。onChange も必ず渡して State を更新する必要がある"
            reason="Reactはinputのvalue propを指定すると「このinputはReactが管理する」と判断し、DOMの変更を防ぐ。onChange でsetterを呼ばないとStateが変わらず、表示が固定されたままになる。"
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: AlertTriangle,
                title: "onChange で e をそのまま渡す",
                subtitle: "よくある間違い",
                description: "setName(e) と書いてしまい、Stateにイベントオブジェクト全体が入るバグ。必ず e.target.value を取り出す。",
                accentColor: "red",
              },
              {
                Icon: CheckCircle2,
                title: "e.target.value を渡す",
                subtitle: "正しい書き方",
                description: "onChange={e => setName(e.target.value)} と書くことで、入力されたテキスト文字列だけがStateに入る。",
                accentColor: "green",
              },
            ]}
          />
          <WarningPoint>
            TypeScriptを使う場合、inputのonChangeの型は React.ChangeEvent{"<"}HTMLInputElement{">"} になる。型推論が働かない場合は明示的に型注釈をつけると安全。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/form/react-hook-form",
            title: "React Hook Form",
            description: "非制御方式で再レンダリングを最小化した高パフォーマンスフォーム",
            icon: "BookOpen",
          },
          {
            href: "/form/zod",
            title: "Zodでスキーマ定義",
            description: "型安全なバリデーションルールをTypeScriptで書く",
            icon: "Shield",
          },
          {
            href: "/form/error-ux",
            title: "エラー表示UX",
            description: "フィールドごとのエラーを適切に見せる設計",
            icon: "AlertCircle",
          },
        ]}
      />

      <PageDrill questions={controlledQuestions} />
    </div>
  );
}
