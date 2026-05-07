import {
  Zap,
  RefreshCw,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Send,
  Layers,
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { reactHookFormQuestions } from "@/content/questions/form/react-hook-form";

export const metadata = {
  title: "React Hook Form | Web開発図解",
  description:
    "非制御コンポーネントで高パフォーマンスなフォームを作るReact Hook Formの基本。useFormのregister・handleSubmit・formStateを図解で解説。",
};

export default function ReactHookFormPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/form" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← フォーム・バリデーションに戻る
        </Link>
      </div>

      <Hero
        category="フォーム・バリデーション"
        title="React Hook Form"
        subtitle={"「必要なときだけStateを触る」設計で再レンダリングを最小化するフォームライブラリ"}
        body={"useFormのregister・handleSubmit・formStateを組み合わせて、パフォーマンスとDXを両立する。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "React Hook Formが再レンダリングを減らす仕組み",
          "useFormの基本API（register・handleSubmit・formState）",
          "制御コンポーネントとのパフォーマンス差の理由",
        ]}
        prerequisites={[
          "制御コンポーネント（onChange/value）の仕組みを知っている",
          "useRefの基本（DOMへの参照）",
          "フォームのsubmitイベントの仕組み",
        ]}
        outOfScope={[
          "Zodとの統合によるスキーマバリデーション（次のページで扱う）",
          "Controllerコンポーネント（外部UIライブラリとの統合）",
          "watchとgetValuesの違い（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="React Hook Formは「必要なときだけStateを触る」設計で再レンダリングを最小化するフォームライブラリ。registerでinputを登録し、送信時にhandleSubmitがDOM上の値をまとめて収集する。途中の入力はDOMに任せるから軽い。"
        metaphorTitle="集荷便の配達システム"
        metaphorPoints={[
          {
            label: "制御コンポーネント",
            real: "荷物が届くたびに倉庫台帳に記入する。常に最新だが作業が多い",
            metaphor: "随時記録方式",
          },
          {
            label: "React Hook Form",
            real: "集荷のとき一気に全荷物リストを受け取る。途中は現場に任せる",
            metaphor: "集荷時一括回収",
          },
          {
            label: "register",
            real: "「この荷物はうちが担当します」と登録する票 = inputにname/ref/onBlurを自動設定",
            metaphor: "担当登録票",
          },
          {
            label: "handleSubmit",
            real: "集荷ドライバーが全荷物を受け取る窓口 = 送信時に値を収集してコールバックに渡す",
            metaphor: "集荷ドライバー",
          },
        ]}
        definition="React Hook FormはDOMを値の保存場所として非制御コンポーネントを採用し、送信まで不要な再レンダリングを起こさない高パフォーマンスフォームライブラリ。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずReact Hook Formの基本フローを確認し、どこで再レンダリングを省いているかを見ていきましょう。
        </p>

        {/* TermNote: 基礎図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "useForm",
              definition: "React Hook Formのメインフック。register・handleSubmit・formStateなどのAPIを返す。フォームの初期設定（defaultValues・バリデーションモードなど）もここで渡す。",
            },
            {
              word: "register",
              definition: "inputに渡す関数。呼ぶとそのinputをフォームに登録し、name属性・ref・onChangeイベントなどを自動でセットしてくれる。",
            },
            {
              word: "handleSubmit",
              definition: "フォーム送信を制御する関数。バリデーションを実行し、通過したらコールバックにデータを渡す。e.preventDefault()も自動でやってくれる。",
            },
            {
              word: "formState",
              definition: "フォームの状態情報を持つオブジェクト。errors（バリデーションエラー）・isSubmitting（送信中かどうか）・isDirty（値が変更されたか）などのフラグが入っている。",
            },
          ]}
        />

        {/* ── 概念図A: React Hook Form の基本フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="React Hook Formで入力から送信まで、内部で何が起きているか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={BookOpen}
              title="useForm()"
              subtitle="フォーム初期化"
            />
            <FlowArrow label="register() でinput登録" direction="right" />
            <FlowCard
              Icon={Layers}
              title="DOMが値を保持"
              subtitle="入力中は再レンダリングなし"
              highlight
              accentColor="green"
            />
            <FlowArrow label="送信ボタンClick" direction="right" />
            <FlowCard
              Icon={Send}
              title="handleSubmit"
              subtitle="DOM上の値を収集"
            />
            <FlowArrow label="バリデーション通過後" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="コールバック実行"
              subtitle="dataオブジェクトで受け取り"
            />
          </div>

          {/* コード例 */}
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// React Hook Form の最小実装"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { useForm } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'react-hook-form'"}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> LoginForm</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-green-300">const</span>
              <span className="text-gray-300">{" { register, handleSubmit, formState: { errors } } = "}</span>
              <span className="text-yellow-300">useForm</span>
              <span className="text-gray-300">();</span>
            </p>
            <p className="ml-4 mt-2">
              <span className="text-green-300">const</span>
              <span className="text-gray-300">{" onSubmit = (data) => console."}</span>
              <span className="text-yellow-300">log</span>
              <span className="text-gray-300">(data);</span>
            </p>
            <p className="ml-4 mt-2">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" ("}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"<form"}</span>
              <span className="text-sky-300">{" onSubmit"}</span>
              <span className="text-gray-300">{"={"}</span>
              <span className="text-yellow-300">handleSubmit</span>
              <span className="text-gray-300">(onSubmit){"}"}</span>
              <span className="text-green-300">{">"}</span>
            </p>
            <p className="ml-10">
              <span className="text-green-300">{"<input"}</span>
              <span className="text-gray-300">{" {..."}</span>
              <span className="text-yellow-300">register</span>
              <span className="text-gray-300">{"('email', { required: '必須です' })"}</span>
              <span className="text-gray-300">{"} "}</span>
              <span className="text-green-300">{"/>"}</span>
            </p>
            <p className="ml-10">
              <span className="text-gray-500">{"// errors.email?.message でエラーを表示"}</span>
            </p>
            <p className="ml-10">
              <span className="text-green-300">{"<button"}</span>
              <span className="text-sky-300">{" type"}</span>
              <span className="text-gray-300">{"='submit'"}</span>
              <span className="text-green-300">{">"}</span>
              <span className="text-gray-300">送信</span>
              <span className="text-green-300">{"</button>"}</span>
            </p>
            <p className="ml-8"><span className="text-green-300">{"</form>"}</span></p>
            <p className="ml-4"><span className="text-gray-300">);</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            register() をスプレッドで渡すだけでinputの登録が完了する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          基本フローが分かりました。次に「なぜ制御コンポーネントより速いのか」を再レンダリング回数で比べてみましょう。
        </p>

        {/* ── 概念図B: 再レンダリング比較 ── */}
        <ConceptDiagram
          title="概念図B"
          description="10文字入力したとき、再レンダリングは何回起きるか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                制御コンポーネント
              </p>
              <div className="flex items-center justify-center my-4">
                <span className="text-5xl font-bold text-red-400">10</span>
                <span className="text-gray-500 ml-2 text-sm">回</span>
              </div>
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                入力のたびにonChangeが発火してStateが更新されるため、10文字 = 10回のレンダリング
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 uppercase tracking-widest mb-3 text-center">
                React Hook Form
              </p>
              <div className="flex items-center justify-center my-4">
                <span className="text-5xl font-bold text-green-400">0</span>
                <span className="text-gray-500 ml-2 text-sm">〜1回</span>
              </div>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                入力中はDOMが値を保持。Stateは触らないため再レンダリングなし。送信時とエラー表示時のみ更新
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
          >
            <p className="text-xs font-semibold text-green-300 mb-2">パフォーマンス改善が効く場面</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              通常のログインフォーム（2〜3フィールド）では体感差はほぼありません。検索フォームや動的に追加されるフィールドが多い場合、または低スペックデバイスをターゲットにする場合に効果が大きくなります。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、制御コンポーネントが分かったんですが、React Hook Form って何が違うんでしょう？ 別のライブラリを覚えるほどの価値はあるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "制御コンポーネントは入力するたびに再レンダリングが走ります。\n10文字入力すれば10回、メールアドレスなら20回以上レンダリングが走ることになる。\nReact Hook Formは途中の入力をDOMに任せて、送信のときだけStateを触ります。\n配達員が荷物を一個ずつ台帳に記録するか、集荷のときにまとめてリストを受け取るか、の違いです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "10文字で10回！？ ボク、ずっとそれが走ってたんですか……。\nでも、入力中にStateを触らないとバリデーション結果をリアルタイムで表示できなくなりませんか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "良い点に気づきましたね。\nReact Hook Formには「いつバリデーションを走らせるか」を制御するモード（mode）があります。\nonBlur（フィールドを離れたとき）、onChange（入力のたびに）、onSubmit（送信時のみ）を選べます。\nデフォルトはonSubmitなので送信時だけ。必要なときにonBlurモードにすれば、フィールドを離れた瞬間にエラーを表示できます。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！ つまり制御コンポーネントは全部 React Hook Form に置き換えるべきですね！ ボク今日から全フォームを移行します！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "マジさん、少し待ってください。\nシンプルなフォームなら制御コンポーネントで十分です。\nReact Hook Formが本領を発揮するのは、フィールドが多い・動的に増減する・バリデーションが複雑、といった場合です。\nまず制御コンポーネントで作り、パフォーマンスが問題になったら移行するのが現実的な判断です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "……また大袈裟な結論を出してしまいました。\nでも register をスプレッドで渡すだけでinputを登録できるのは、確かに便利だと思います。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです。{...register('email')} と書くだけで name・ref・onChange・onBlur が自動でセットされます。\nあとは formState.errors.email?.message でエラーメッセージを表示するだけ。\nZodと組み合わせると型安全なバリデーションまでできます。それは次のページで詳しく扱いますよ。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["制御コンポーネント", "React Hook Form"]}
          rows={[
            {
              label: "値の管理場所",
              cells: ["React State", "DOM（ref）"],
              highlightCol: 1,
            },
            {
              label: "入力ごとの再レンダリング",
              cells: ["あり（onChange）", "なし（原則）"],
              highlightCol: 1,
            },
            {
              label: "バリデーション設定",
              cells: ["自前で実装", "registerのオプションまたはZod resolver"],
              highlightCol: 1,
            },
            {
              label: "エラー表示",
              cells: ["自分でState管理", "formState.errors から取得"],
              highlightCol: 1,
            },
            {
              label: "学習コスト",
              cells: ["低い", "やや高い（APIを覚える）"],
              highlightCol: 0,
            },
          ]}
          note="シンプルなフォームは制御コンポーネントで十分。フィールドが多い・バリデーションが複雑・パフォーマンスが重要な場合にReact Hook Formを採用する。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はwatchでリアルタイム値を取得する方法と、Zodと組み合わせる方法の概要です。"
      />

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 useFormの主要API">
          <p>
            useFormが返すオブジェクトの中で特によく使うAPIを整理します。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: BookOpen,
                title: "register(name, options)",
                subtitle: "inputの登録",
                description: "inputにスプレッドして使う。optionsにrequired・minLength・patternなどのバリデーションルールを渡せる。",
                accentColor: "green",
              },
              {
                Icon: Send,
                title: "handleSubmit(onValid, onInvalid)",
                subtitle: "送信ハンドラ",
                description: "フォームのonSubmitに渡す。バリデーション通過時にonValidが、失敗時にonInvalidが呼ばれる。",
                accentColor: "green",
              },
              {
                Icon: AlertTriangle,
                title: "formState.errors",
                subtitle: "エラー情報",
                description: "フィールド名をキーにエラー情報が入るオブジェクト。errors.email?.messageでエラーメッセージを取得できる。",
                accentColor: "amber",
              },
              {
                Icon: Zap,
                title: "watch(name)",
                subtitle: "リアルタイム値取得",
                description: "指定フィールドの値をリアルタイムで購読する。パスワード確認フィールドの照合などに使う。ただし再レンダリングが増える点に注意。",
                accentColor: "blue",
              },
            ]}
          />
          <KeyPoint>
            register のスプレッドパターン（{"{"}...register('name'){"}"}）はref・name・onChange・onBlurを一括設定する。type="email" などの属性は別途渡す必要がある点に注意。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 Zodとの統合（概要）">
          <p>
            React Hook Formは{" "}
            <strong className="text-white">zodResolver</strong>を経由してZodスキーマをバリデーションに使えます。
            register のオプションに個別にルールを書くより、スキーマで一元管理できます。
          </p>
          <CodeBlock
            title="rhf-with-zod.tsx"
            language="tsx"
            code={`import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, '8文字以上で入力してください'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // ...
}`}
          />
          <p className="text-sm text-gray-400 leading-relaxed">
            Zodスキーマについては次のページで詳しく説明します。
          </p>
          <WarningPoint>
            zodResolver を使うには @hookform/resolvers パッケージを別途インストールする必要がある（npm install @hookform/resolvers zod）。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/form/controlled",
            title: "制御コンポーネントとは",
            description: "React Hook Formが解決する問題の根本を理解する",
            icon: "FileInput",
          },
          {
            href: "/form/zod",
            title: "Zodでスキーマ定義",
            description: "React Hook FormとZodを組み合わせた型安全バリデーション",
            icon: "Shield",
          },
          {
            href: "/form/error-ux",
            title: "エラー表示UX",
            description: "formState.errorsを使ったアクセシブルなエラー設計",
            icon: "AlertCircle",
          },
        ]}
      />

      <PageDrill questions={reactHookFormQuestions} />
    </div>
  );
}
