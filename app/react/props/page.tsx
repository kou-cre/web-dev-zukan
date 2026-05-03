import {
  ArrowRight,
  Code2,
  FileCode,
  FileType,
  Layers,
  Package,
  ShieldCheck,
  Workflow,
} from "lucide-react";

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
import { propsQuestions } from "@/content/questions/react/props";

export const metadata = {
  title: "Props | Web開発図解",
  description: "ReactのPropsを図解で解説。親から子へのデータの流れ・型定義・children・Props drillingまで。",
};

export default function PropsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="Props"
        subtitle={"親から子へデータを渡す仕組み——コンポーネント間の「情報の流れ」"}
        accentColor="sky"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Propsとは何か（コンポーネントへの「引数」という考え方）",
          "親から子へデータを渡す方法",
          "Propsが変わると再レンダリングされる理由",
        ]}
        prerequisites={[
          "コンポーネントとJSXを知っている（/react/components を読んだ）",
          "JavaScriptの関数の引数を知っている（function f(x) {} の x の部分）",
        ]}
        outOfScope={[
          "Props drilling問題とContextAPIによる解決（応用編で扱う）",
          "TypeScriptの型定義の書き方（任意。応用編で扱う）",
          "Render Propsパターン（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="PropsはReactコンポーネントへの「引数」。親コンポーネントから子コンポーネントへデータを渡す手段。子はPropsを受け取るだけで、変更できない（読み取り専用）。このルールがReactの「一方向データフロー」を保証する。"
        metaphorTitle="注文票（オーダーシート）"
        metaphorPoints={[
          { label: "親コンポーネント", real: "ホール（お客様から注文を受け付ける側）", metaphor: "親コンポーネント" },
          { label: "Props", real: "注文票（何が必要かを書いてキッチンへ渡す）", metaphor: "Props" },
          { label: "子コンポーネント", real: "キッチン（注文票の通りに料理を作る）", metaphor: "子コンポーネント" },
          { label: "読み取り専用", real: "キッチンが勝手に注文内容を書き換えてはいけない", metaphor: "読み取り専用" },
        ]}
        definition="PropsはReactコンポーネントへの引数。親から子へ一方向に渡され、子は変更できない読み取り専用のデータ。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          Propsは「関数の引数と同じ」という発想で理解しましょう。まず流れを図で見て、それからコード例で確認します。
        </p>

        {/* TermNote: 基礎図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "Props（プロップス）",
              definition: "Properties（プロパティ）の略。親コンポーネントから子コンポーネントへ渡す引数のようなもの。",
            },
            {
              word: "親コンポーネント",
              definition: "別のコンポーネントを中に含んでいる側。Propsを渡す側でもある。",
            },
            {
              word: "子コンポーネント",
              definition: "親コンポーネントの中に含まれている側。Propsを受け取る側。",
            },
            {
              word: "コンポーネントツリー",
              definition: "コンポーネントが入れ子になった木のような構造全体のこと。Propsはこのツリーを上から下へ流れる。",
            },
            {
              word: "デフォルト値",
              definition: "Propsが渡されなかった場合に代わりに使う値。関数の引数のデフォルト値と同じ考え方。",
            },
          ]}
        />

        {/* 図A: Propsの流れ */}
        <ConceptDiagram
          title="概念図A — Propsの流れ"
          description="Propsは親コンポーネントから子コンポーネントへ、常に一方向に流れる。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Package}
              title="親コンポーネント"
              subtitle="データを持っている側"
            />
            <FlowArrow
              label="Props を渡す"
              sublabel='name="マジ" age={20}'
              direction="right"
            />
            <FlowCard
              Icon={Code2}
              title="子コンポーネント"
              subtitle="受け取って表示するだけ"
              highlight
              accentColor="sky"
            />
            <FlowArrow label="表示に使う" direction="right" />
            <FlowCard
              Icon={ArrowRight}
              title="画面に描画"
              subtitle="マジ（20歳）"
              muted
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// 親コンポーネント（渡す側）"}</p>
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Parent</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <"}</span>
              <span className="text-yellow-300">Child</span>
              <span className="text-sky-300"> name</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-300">{'"マジ"'}</span>
              <span className="text-sky-300"> age</span>
              <span className="text-gray-300">={"{20}"}</span>
              <span className="text-gray-300">{" />"}</span>
              <span className="text-gray-600 ml-2">{"// Propsを渡す"}</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <p className="mt-3 text-gray-500">{"// 子コンポーネント（受け取る側）"}</p>
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Child</span>
              <span className="text-gray-300">{"({ name, age }) {"}</span>
              <span className="text-gray-600 ml-2">{"// 引数で受け取る"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <p>"}</span>
              <span className="text-sky-300">{"{"}</span>
              <span className="text-white">name</span>
              <span className="text-sky-300">{"}"}</span>
              <span className="text-gray-300">{"（"}</span>
              <span className="text-sky-300">{"{"}</span>
              <span className="text-white">age</span>
              <span className="text-sky-300">{"}"}</span>
              <span className="text-gray-300">{"歳）</p>"}</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            データは必ず親 → 子の方向にしか流れない。子から親へPropsを書き換えることはできない。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          Propsの流れが分かりました。次は「省略してもいいProps（オプション）」と「デフォルト値」の設定方法を見ていきます。
        </p>

        {/* 図B: 必須・オプション・デフォルト値 */}
        <ConceptDiagram
          title="概念図B — 必須・オプション・デフォルト値"
          description="Propsには必須とオプションがある。オプションにはデフォルト値を設定できる。"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={ShieldCheck}
              title="必須Props"
              subtitle="渡し忘れると画面が崩れたりエラーになる。title: string のように定義する。"
              iconColor="text-red-400"
            />
            <StackLayer
              Icon={Layers}
              title="オプションProps"
              subtitle="渡さなくても動く。subtitle?: string のように ? をつけて省略可能にする。"
              iconColor="text-yellow-400"
            />
            <StackLayer
              Icon={Workflow}
              title="デフォルト値（= で指定）"
              subtitle="function Card({ count = 0 }) のように引数のデフォルト値と同じ書き方で初期値を設定する。"
              iconColor="text-sky-400"
              showArrow={false}
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// デフォルト値の使い方"}</p>
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Button</span>
              <span className="text-gray-300">{"({ label, color = "}</span>
              <span className="text-green-300">{"'blue'"}</span>
              <span className="text-gray-300">{" }) {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <button>"}</span>
              <span className="text-sky-300">{"{"}</span>
              <span className="text-white">label</span>
              <span className="text-sky-300">{"}"}</span>
              <span className="text-gray-300">{"</button>"}</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <p className="mt-2">
              <span className="text-gray-500">{"// colorを渡さなければ 'blue' が使われる"}</span>
            </p>
            <p>
              <span className="text-green-300">{"<Button label="}</span>
              <span className="text-yellow-300">{'"送信"'}</span>
              <span className="text-green-300">{" />"}</span>
              <span className="text-gray-500 ml-2">{"// color は 'blue' になる"}</span>
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            デフォルト値があれば「渡されなかった場合」の挙動を安全にコントロールできる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — ComparisonTableより前） ── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、PropsってHTMLのattributeみたいなものですか？ <input type=\"text\"> の type みたいな感じで。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い着眼点ですよ、マジさん。確かに見た目は似ていますが、HTMLのattributeは文字列しか渡せません。Propsは関数・オブジェクト・真偽値・配列、何でも渡せます。郵便ポスト（HTMLのattribute）と宅急便（Props）の違いのようなものです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\n子コンポーネントがPropsを変更できないって……ボク、それ制限じゃないですか！？自由に書き換えられた方が便利そうなのに。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "むしろ逆なんですよ、マジさん。「書き換え禁止」というルールがあるから、データがどこで変わったか追いやすくなります。キッチンが勝手に注文内容を変えたら、どんな料理が来るか分からなくなりますよね。変更は必ず親で行う、これがReactの安全装置です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、Propsで関数も渡せると聞いて混乱しています……なんでわざわざ関数を渡すんですか？データだけ渡せばよくないですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "これはコールバックという概念です。子が「何かが起きた」と親に知らせるための手段。宅急便で荷物を渡すとき「受け取ったら連絡してください」という連絡先（関数）も一緒に渡すイメージです。ボタンのクリックを親に伝えるときなどに活躍しますよ。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど。Propsで関数を渡すことで、子コンポーネントが親に「こうなりましたよ」と伝えられるんですね。やっと繋がってきました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧な理解です、マジさん。まとめると：データは親 → 子の方向にPropsで流れる。子から親への「報告」は関数Props（コールバック）を通じて行う。この一方向の流れを守ることで、「どこで何が変わったか」が追いやすいコードになるんです。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Props", "State"]}
          rows={[
            {
              label: "データの所有者",
              cells: ["親コンポーネント", "そのコンポーネント自身"],
              highlightCol: 0,
            },
            {
              label: "変更できる人",
              cells: ["親のみ変更可", "setStateで自分が変更"],
            },
            {
              label: "変更するとどうなる",
              cells: ["子が再レンダー", "自分と子が再レンダー"],
            },
            {
              label: "用途",
              cells: ["設定・表示データの受け渡し", "インタラクティブな値の管理"],
            },
          ]}
          note="PropsとStateは対になる概念。Propsは外から与えられる設定で、Stateはコンポーネント自身が管理する記憶。両者を混同しないことがReact設計の第一歩。State は次のページで詳しく解説します。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はTypeScriptの型定義とProps drillingについての内容です。まずPropsの基本を掴んでから読むと理解しやすくなります。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — TypeScript型定義とProps drilling
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          TypeScriptを使うとPropsに型をつけられます。渡し忘れや型の間違いをコードを書いている時点で発見できるのが大きな利点です。
        </p>

        {/* TermNote: 応用図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "型（TypeScript）",
              definition: "「この変数には文字列しか入れられない」「この引数は数値です」のように、値の種類を事前に宣言する仕組み。",
            },
            {
              word: "interface",
              definition: "TypeScriptでオブジェクトの形（どんなプロパティを持つか）を定義する構文。Propsの型定義によく使う。",
            },
            {
              word: "Props drilling",
              definition: "深い階層のコンポーネントへデータを届けるために、途中の全コンポーネントにPropsを経由させること。コードが複雑になりやすい。",
            },
            {
              word: "typeエイリアス",
              definition: "type という語で型に名前をつける書き方。interface と似ているが、A | B のような『AかBどちらか』を表す型はtypeで定義する。",
            },
            {
              word: "Union型",
              definition: "'primary' | 'secondary' のように『どちらか』を表す型。複数の選択肢を型として指定できる。",
            },
          ]}
        />

        {/* 図C: TypeScriptでのProps型定義 */}
        <ConceptDiagram
          title="概念図C — TypeScriptでのProps型定義"
          description="TypeScriptでPropsに型をつけると、渡し忘れや誤った型の値をコード時点で検出できる。"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={FileType}
              title="interface で型を定義する"
              subtitle="interface CardProps { name: string; age: number; onClick?: () => void }"
              iconColor="text-sky-400"
            />
            <StackLayer
              Icon={FileCode}
              title="コンポーネント関数の引数として受け取る"
              subtitle="function Card({ name, age, onClick }: CardProps) { ... }"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Code2}
              title="JSXの中で使う"
              subtitle="return <div>{name}（{age}歳）</div>"
              iconColor="text-emerald-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            interfaceの定義が「注文票のフォーマット」。型に合わない値を渡すとエラーになる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          TypeScriptの型定義でPropsが安全になりました。最後は「Propsが深い階層を通るとどう困るか」というProps drillingの話をします。
        </p>

        {/* 図D: TypeScript型定義詳細 */}
        <ConceptDiagram
          title="概念図D：TypeScriptでのProps型定義とデフォルト値の設定"
          description="typeエイリアスで全Propsを一覧化し、オプションにはデフォルト値を分割代入で設定する。TypeScriptは型不一致をコンパイル時に検出する。"
          accentColor="sky"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={FileType}
              title="型エイリアスで全Propsを定義"
              subtitle="type ButtonProps = { label: string; variant?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg'; onClick?: () => void; disabled?: boolean; }"
              iconColor="text-sky-400"
            />
            <StackLayer
              Icon={Code2}
              title="分割代入でデフォルト値を設定"
              subtitle="function Button({ label, variant = 'primary', size = 'md', disabled = false }: ButtonProps)"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={ShieldCheck}
              title="TypeScriptのコンパイル時エラー検出"
              subtitle="必須のlabelを渡し忘れ → エラー。variant に 'large' を渡す → エラー。型が守られた状態のみ動く。"
              iconColor="text-red-400"
              showArrow={false}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: "#0f1117", border: "1px solid #2d3048" }}>
              <p className="text-sky-400 font-semibold mb-1">必須 Props（?なし）</p>
              <p className="text-gray-300">label: string</p>
              <p className="text-gray-500 mt-1">渡し忘れると即エラー</p>
            </div>
            <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: "#0f1117", border: "1px solid #2d3048" }}>
              <p className="text-yellow-400 font-semibold mb-1">オプション Props（?あり）</p>
              <p className="text-gray-300">variant?: {'\'primary\' | \'secondary\''}</p>
              <p className="text-gray-500 mt-1">省略するとデフォルト値が使われる</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            typeとinterfaceどちらでも定義できるが、Union型を使う場合はtypeが必須。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 Propsの書き方パターン">
          <p>
            <strong className="text-white">文字列</strong>：<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>name="マジ"</code>
            のように属性値として直接書ける。
          </p>
          <p>
            <strong className="text-white">数値・真偽値・オブジェクト・配列</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>age={"{20}"}</code>
            のように波括弧で包む。
          </p>
          <p>
            <strong className="text-white">関数</strong>：<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>onClick={"{handleClick}"}</code>
            のように渡す。親のハンドラ関数を子のボタンに繋ぐ典型パターン。
          </p>
          <p>
            <strong className="text-white">children</strong>：<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"<Card>内容</Card>"}</code>
            とタグで囲むと自動的に<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>children</code>として渡される。
          </p>
          <KeyPoint>真偽値のPropsは値がtrueのとき、属性名だけで渡せる。<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"<Button disabled />"}</code>は<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"<Button disabled={true} />"}</code>と同義。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 Props drilling問題">
          <p>
            深い階層のコンポーネントにデータを届けるとき、途中の親・子コンポーネントすべてにPropsを経由させる必要が出る。
            これをProps drillingと呼ぶ。
          </p>
          <p>
            例えば<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>App → Page → Section → Card → Text</code>
            という階層でTextにだけ必要なデータが、Page・Section・Cardすべてを経由しなければならない状態。
          </p>
          <WarningPoint>
            Props drillingが深くなると「このPropsどこから来たのか」が追いにくくなり、変更コストが大きくなる。3階層以上になったらContextの導入を検討する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 children Propsの特殊性">
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>children</code>
            はReactが予約している特殊なProp名。コンポーネントのタグで囲んだ要素がそのまま渡される。
          </p>
          <p>
            型定義は<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>children: React.ReactNode</code>
            とする。テキスト・JSX要素・コンポーネントすべてを受け取れる。
          </p>
          <KeyPoint>レイアウトコンポーネント（Card・Modal・Layoutなど）はchildrenを使うことで「中身は使う側が自由に決める」という柔軟な設計になる。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 TypeScriptとPropsの相性">
          <p>
            <strong className="text-white">interface vs type</strong>：Propsの型定義には通常
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>interface</code>
            を使う。拡張（extends）が直感的に書けるため。
            Union型が必要な場面では
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>type</code>
            を使う。
          </p>
          <p>
            <strong className="text-white">オプショナルProps</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>subtitle?: string</code>
            と書けば渡さなくても動く。値は<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>string | undefined</code>になる。
          </p>
          <p>
            <strong className="text-white">デフォルト値</strong>：関数引数の分割代入で設定する。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"function Card({ count = 0 }: Props)"}</code>
            とすることでcountが渡されなければ0が使われる。
          </p>
          <KeyPoint>TypeScriptとPropsの組み合わせはReact開発の最大の安全網。型定義が正確であれば、コンポーネントを跨いだインターフェースのミスをすべてエディタが検出してくれる。</KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/components",
            title: "コンポーネントの基本",
            description: "コンポーネント設計の出発点。Propsを学ぶ前の土台",
            icon: "Code2",
          },
          {
            href: "/react/state",
            title: "State",
            description: "Propsと対になる概念。コンポーネント自身の状態管理",
            icon: "Server",
          },
          {
            href: "/react/state",
            title: "State",
            description: "Props drillingの先にあるグローバルな状態管理への入口",
            icon: "Rocket",
          },
        ]}
      />

      <PageDrill questions={propsQuestions} />
    </div>
  );
}
