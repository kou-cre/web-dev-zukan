import {
  GitBranch,
  Layers,
  Zap,
  Shield,
  List,
  ToggleLeft,
  Hash,
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
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { usereducerQuestions } from "@/content/questions/state/usereducer";

export const metadata = {
  title: "useState と useReducer | Web開発図解",
  description:
    "useStateとuseReducerの使い分けを図解で解説。シンプルな状態にはuseState、複雑なロジックにはuseReducerを使う判断基準を習得する。",
};

export default function UseReducerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/state" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 状態管理に戻る
        </Link>
      </div>

      <Hero
        category="状態管理"
        title="useState と useReducer"
        subtitle={"単純な箱には useState、複雑な更新ロジックには useReducer"}
        body={"2つのHookの使い分けを掴めば、複雑なフォームやマルチステップ画面がすっきり書ける。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "useState と useReducer の役割の違い",
          "useReducer の基本的な書き方（dispatch / action / reducer）",
          "どちらを使うべきか判断する基準",
        ]}
        prerequisites={[
          "useState の基本（const [value, setValue] = useState(初期値) の形）",
          "配列の switch 文を見たことがある（case ごとに処理を分岐）",
          "関数が値を return で返すことを知っている",
        ]}
        outOfScope={[
          "Redux の詳細な使い方（このページでは扱わない）",
          "Context と useReducer の組み合わせ（Context API ページで扱う）",
          "Immer などのイミュータブル更新補助ライブラリ",
        ]}
      />

      <OnePageSummary
        keyMessage="useState はシンプルな単一の値を管理するのに最適。useReducer は複数の状態が連動して変化するロジックを整理するのに向いている。dispatch でアクションを送り、reducer 関数で新しい状態を計算する設計にすることで、複雑な更新ロジックを1か所にまとめられる。"
        metaphorTitle="電気のスイッチと配電盤の違い"
        metaphorPoints={[
          {
            label: "useState",
            real: "1つのスイッチ（on/off）。シンプルな操作を直接行う。カウンタ・フラグなど独立した値に最適。",
            metaphor: "電気のスイッチ",
          },
          {
            label: "useReducer",
            real: "配電盤。「ブレーカーA を切る」「全回路を一斉にオン」などの複合的な操作を一元管理する。複数の状態が連動する処理に最適。",
            metaphor: "配電盤",
          },
          {
            label: "dispatch",
            real: "「この操作をしてください」という命令書（アクション）を配電盤に送る行為。",
            metaphor: "操作命令を送る",
          },
          {
            label: "reducer",
            real: "命令書を受け取り、現在の状態と組み合わせて次の状態を決める係。",
            metaphor: "配電盤の制御ロジック",
          },
        ]}
        definition="useReducerはdispatch→reducer→新しいstateの流れで複雑な状態更新を整理するHook。useStateで書くと setter が散らばる場面で力を発揮する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず useReducer の動きの流れを掴み、次に useState との比較でどちらを選ぶか判断します。
        </p>

        {/* ── 概念図A: useReducer の流れ ── */}
        <ConceptDiagram
          title="概念図A"
          description="useReducer は dispatch → reducer → 新しい state の3ステップで動く"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Zap}
              title="ユーザー操作"
              subtitle="ボタンクリック等"
              accentColor="teal"
            />
            <FlowArrow label="dispatch(action)" direction="right" />
            <FlowCard
              Icon={GitBranch}
              title="reducer 関数"
              subtitle="(state, action) => newState"
              highlight
              accentColor="teal"
            />
            <FlowArrow label="新しい state を返す" direction="right" />
            <FlowCard
              Icon={Layers}
              title="State 更新"
              subtitle="再レンダリング"
              accentColor="teal"
            />
          </div>

          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// useReducer の基本パターン"}</p>
            <p>
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" reducer = (state, action) => {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">switch</span>
              <span className="text-gray-300">{" (action.type) {"}</span>
            </p>
            <p className="ml-8">
              <span className="text-blue-300">case</span>
              <span className="text-green-300">{" 'INCREMENT'"}</span>
              <span className="text-gray-300">:</span>
            </p>
            <p className="ml-10">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" { ...state, count: state.count + 1 };"}</span>
            </p>
            <p className="ml-8">
              <span className="text-blue-300">case</span>
              <span className="text-green-300">{" 'RESET'"}</span>
              <span className="text-gray-300">:</span>
            </p>
            <p className="ml-10">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" { ...state, count: 0 };"}</span>
            </p>
            <p className="ml-8">
              <span className="text-blue-300">default</span>
              <span className="text-gray-300">:</span>
            </p>
            <p className="ml-10">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300"> state;</span>
            </p>
            <p className="ml-4">
              <span className="text-gray-300">{"}"}</span>
            </p>
            <p>
              <span className="text-gray-300">{"}"}</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" [state, dispatch] = "}</span>
              <span className="text-yellow-300">useReducer</span>
              <span className="text-gray-300">(reducer, {"{"} count: 0 {"}"});</span>
            </p>
            <p className="mt-1 text-gray-500">{"// 使う側: dispatch({ type: 'INCREMENT' })"}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            reducer は「現在の state と action を受け取り、次の state を返す純粋関数」。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          useReducer の動きが分かりました。次は「useState と useReducer をどちらにすべきか」を判断する基準を見ていきます。
        </p>

        {/* ── 概念図B: 使い分け判断 ── */}
        <ConceptDiagram
          title="概念図B"
          description="useState か useReducer か——4つの判断ポイント"
        >
          <div className="space-y-3">
            {[
              {
                question: "状態が独立したシンプルな値（数値・文字列・真偽値）か？",
                yes: "useState",
                no: "useReducer を検討",
                yesColor: "#2dd4bf",
                noColor: "#fbbf24",
              },
              {
                question: "次の state が前の state に依存するか？",
                yes: "useReducer（または prev => 関数形式）",
                no: "どちらでも可",
                yesColor: "#fbbf24",
                noColor: "#94a3b8",
              },
              {
                question: "複数の state が同時に連動して変化するか？",
                yes: "useReducer（1つの action で複数を更新）",
                no: "useState 複数で対応",
                yesColor: "#fbbf24",
                noColor: "#94a3b8",
              },
              {
                question: "更新ロジックを単体テストしたいか？",
                yes: "useReducer（reducer は純粋関数 = テスト容易）",
                no: "どちらでも可",
                yesColor: "#fbbf24",
                noColor: "#94a3b8",
              },
            ].map(({ question, yes, no, yesColor, noColor }, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-semibold text-gray-300 mb-3">{question}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div
                    className="flex-1 rounded-lg px-3 py-2 text-xs"
                    style={{ backgroundColor: `${yesColor}15`, border: `1px solid ${yesColor}40` }}
                  >
                    <span className="text-gray-500">YES → </span>
                    <span style={{ color: yesColor }} className="font-semibold">{yes}</span>
                  </div>
                  <div
                    className="flex-1 rounded-lg px-3 py-2 text-xs"
                    style={{ backgroundColor: `${noColor}10`, border: `1px solid ${noColor}30` }}
                  >
                    <span className="text-gray-500">NO → </span>
                    <span style={{ color: noColor }}>{no}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "useReducerってuseStateの上位版みたいな感じですか？ 全部useReducerにしたほうがいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "スイッチと配電盤で考えてみましょう、マジさん。\n部屋の電気を一つ切るだけなら、壁のスイッチで十分ですよね。わざわざ配電盤を開ける必要はない。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "確かに……でも配電盤ならビル全体のブレーカーを一括管理できる。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。useState はシンプルな値を直接操作するスイッチ。useReducer は複数の回路が連動するときの配電盤。\n例えばフォームに「名前・メール・住所・バリデーション状態」があって、送信ボタンを押したら全部リセットしたい——これはuseStateが4つ散らばるより、useReducerで1つのRESETアクションで処理するほうがすっきりします。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあ「複数のstate」が出てきたらuseReducerにすればいい？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "少し丁寧に言うと、複数のstateが「独立している」なら useState 複数で全然OK。問題なのは「連動して同時に変化する」場合です。\n例えばゲームのスコア・レベル・ライフが全部同時に変わる、みたいなパターンですね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "うーん、でも判断が難しくないですか……。どのタイミングで移行すればいいか、ボク、悩みそうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "迷ったらuseStateから始めてください、マジさん。複雑になってきたな、setterが散らばってきたな、と感じた時点でuseReducerへの移行を考える。それで十分です。\n最初から全部useReducerにする必要は全くありません。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["useState", "useReducer"]}
          rows={[
            {
              label: "書き方のシンプルさ",
              cells: ["シンプル（setter を直接呼ぶ）", "やや複雑（dispatch + reducer）"],
              highlightCol: 0,
            },
            {
              label: "向いている状態の複雑さ",
              cells: ["独立したシンプルな値", "複数の状態が連動する複雑なロジック"],
              highlightCol: 1,
            },
            {
              label: "更新ロジックの場所",
              cells: ["呼び出し側に分散する", "reducer に一元化"],
              highlightCol: 1,
            },
            {
              label: "テストしやすさ",
              cells: ["コンポーネントと一体", "reducer は純粋関数 = 単体テスト可"],
              highlightCol: 1,
            },
            {
              label: "典型例",
              cells: ["カウンタ・フォームの1項目", "フォーム全体・ゲーム状態・マルチステップ"],
              highlightCol: 1,
            },
          ]}
          note="まず useState で書いて、複雑になってきたと感じたら useReducer を検討する。どちらを選んでも最終的な結果（Reactが再レンダリングする）は同じ。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は useReducer の実際のコード例と、よくある誤解の解説です。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 実践的な useReducer のパターン
        </h2>

        <TermNote
          terms={[
            {
              word: "action",
              definition: "「どんな操作をしたか」を表すオブジェクト。{ type: 'INCREMENT' } のように type プロパティを持つのが慣習。payload で追加データを渡せる。",
            },
            {
              word: "dispatch",
              definition: "アクションを reducer に送る関数。useReducer が返す2番目の値。dispatch({ type: 'RESET' }) のように呼び出す。",
            },
            {
              word: "純粋関数",
              definition: "同じ引数なら必ず同じ結果を返し、外部の状態を変更しない関数。reducer は純粋関数でなければならない。",
            },
            {
              word: "payload",
              definition: "アクションに添付する追加データ。{ type: 'SET_NAME', payload: '山田太郎' } のように使う。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用図A"
          description="フォームの複数フィールドを useReducer で管理する実例"
        >
          <CodeBlock
            title="form-reducer.tsx"
            language="typescript"
            code={`type FormState = {
  name: string;
  email: string;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'RESET' };

const initialState: FormState = {
  name: '',
  email: '',
  isSubmitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'RESET':
      return initialState; // ← 1つのアクションで全フィールドをリセット
    default:
      return state;
  }
}

// コンポーネント内での使い方
const [state, dispatch] = useReducer(formReducer, initialState);

// フィールド変更
dispatch({ type: 'SET_FIELD', field: 'name', value: '山田' });

// 送信
dispatch({ type: 'SUBMIT_START' });

// リセット（useState なら setName('')・setEmail('')・setIsSubmitting(false) の3行が必要）
dispatch({ type: 'RESET' });`}
          />
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(20,184,166,0.05)", borderColor: "rgba(20,184,166,0.3)" }}
          >
            <p className="text-xs font-semibold text-teal-300 mb-2">この設計の利点</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              RESET アクションひとつで全フィールドが確実に初期値に戻る。
              useState を3つ使っていたら3行の setter 呼び出しが必要で、うっかり1つ忘れるバグが起きやすい。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="useReducer の3要素を覚える">
          <p>
            useReducer を使うときに必要な3つの要素と、それぞれの役割をしっかり頭に入れておこう。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: GitBranch,
                title: "reducer",
                subtitle: "状態計算の本体",
                description: "(state, action) => newState の純粋関数。ここに全ての更新ロジックが集まる。",
                accentColor: "teal",
              },
              {
                Icon: Zap,
                title: "dispatch",
                subtitle: "操作命令を送る",
                description: "dispatch({ type: 'ACTION' }) と呼ぶと reducer に action が届く。",
                accentColor: "teal",
              },
              {
                Icon: Layers,
                title: "action",
                subtitle: "操作の種類と追加データ",
                description: "type 必須・payload 任意。type で分岐して状態を計算する。",
                accentColor: "teal",
              },
            ]}
          />
          <KeyPoint>
            reducer は必ず「純粋関数」にする。同じ state と action を渡せば必ず同じ結果が返ること、外部の値を変更しないことが条件。これがテスト可能で予測しやすい設計の鍵。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="useState から useReducer に移行するタイミング">
          <p>
            以下のサインが出始めたら useReducer への移行を検討するとよい。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: List,
                title: "setter が3つ以上同時に呼ばれる",
                subtitle: "移行を検討するサイン",
                description: "1つの操作でsetA・setB・setC を全部呼ぶコードが多い場合、RESET アクション1つで統一できる。",
                accentColor: "amber",
              },
              {
                Icon: Shield,
                title: "更新ロジックをテストしたい",
                subtitle: "移行を検討するサイン",
                description: "reducer は純粋関数なのでコンポーネントをマウントせずに単体テストできる。ロジックが複雑なら早期に移行する価値がある。",
                accentColor: "amber",
              },
              {
                Icon: Hash,
                title: "次の state が前の state に複雑に依存する",
                subtitle: "移行を検討するサイン",
                description: "状態Aの値によって状態Bの更新ロジックが変わる場合。reducer で一か所に書くと見通しがよくなる。",
                accentColor: "amber",
              },
              {
                Icon: ToggleLeft,
                title: "状態の種類が増えて管理が大変",
                subtitle: "移行を検討するサイン",
                description: "フォームに新しいフィールドを追加するたびに useState を追加している場合、reducer の switch 文に case を1つ追加するだけにできる。",
                accentColor: "amber",
              },
            ]}
          />
          <CorrectionCard
            misconception="useReducer は useStateより上位のHookだから、複雑なアプリでは全て useReducer に統一すべき"
            correction="シンプルな値には useState、複雑なロジックには useReducer を使う。目的に応じて使い分けるのが正しいアプローチ"
            reason="シンプルなカウンタに useReducer を使うと reducer・action type・dispatch の定義が増えてかえって冗長になる。ツールは目的に合ったものを選ぶ。"
          />
          <WarningPoint>
            reducer の中で API コール・console.log など「副作用」を起こしてはいけない。reducer は純粋関数であることが必須ルール。副作用は useEffect や イベントハンドラ内で行う。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/state/context",
            title: "Context API",
            description: "useReducer と Context を組み合わせてグローバル管理",
            icon: "Share2",
          },
          {
            href: "/state/client-vs-server",
            title: "クライアント状態とサーバー状態",
            description: "useReducer はクライアント状態の管理に使う",
            icon: "SplitSquareHorizontal",
          },
          {
            href: "/state/zustand",
            title: "Zustand",
            description: "シンプルな外部グローバル状態管理との比較",
            icon: "Package",
          },
        ]}
      />

      <PageDrill questions={usereducerQuestions} />
    </div>
  );
}
