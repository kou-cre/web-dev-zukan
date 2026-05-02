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

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 図A: Propsの流れ */}
        <ConceptDiagram
          title="概念図A"
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
          <p className="text-xs text-gray-600 text-center mt-4">
            データは必ず親 → 子の方向にしか流れない。子から親へPropsを書き換えることはできない。
          </p>
        </ConceptDiagram>

        {/* 図B: TypeScriptでのProps型定義 */}
        <ConceptDiagram
          title="概念図B"
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

        {/* 図C: デフォルトProps */}
        <ConceptDiagram
          title="概念図C"
          description="Propsには必須とオプションがある。オプションにはデフォルト値を設定できる。"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={ShieldCheck}
              title="必須Props（?なし）"
              subtitle="渡し忘れるとTypeScriptエラー。title: string のように定義する。"
              iconColor="text-red-400"
            />
            <StackLayer
              Icon={Layers}
              title="オプションProps（?あり）"
              subtitle="渡さなくても動く。subtitle?: string のように?をつける。"
              iconColor="text-yellow-400"
            />
            <StackLayer
              Icon={Workflow}
              title="デフォルト値（= で指定）"
              subtitle="function Card({ count = 0 }: Props) のように引数の分割代入で初期値を設定する。"
              iconColor="text-sky-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            デフォルト値があれば「渡されなかった場合」の挙動を安全にコントロールできる。
          </p>
        </ConceptDiagram>

        {/* 図D: Props型定義とデフォルト値 */}
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

        {/* 図E: スプレッドPropsのパターン */}
        <ConceptDiagram
          title="概念図E：スプレッドPropsのパターンと注意点"
          description="スプレッド構文でオブジェクトのすべてのプロパティをPropsとして一括展開できる。便利な反面、不要なpropsがDOMに渡るリスクがある。"
          accentColor="sky"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={Package}
              title="スプレッドで一括展開"
              subtitle="const inputProps = { type: 'email', placeholder: 'メールを入力', required: true }  →  <Input {...inputProps} />"
              iconColor="text-sky-400"
            />
            <StackLayer
              Icon={Layers}
              title="HOCパターン：内側のコンポーネントへ転送"
              subtitle="function Wrapper(props) { return <InnerComponent {...props} /> }  — propsをそのまま内部に委譲する高階コンポーネント"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={ShieldCheck}
              title="危険：不要なpropsがDOMに渡るケース"
              subtitle="<div specialProp={...} /> → console warning: unknown prop on DOM element. ブラウザが認識しない属性は渡さない。"
              iconColor="text-red-400"
            />
            <StackLayer
              Icon={Workflow}
              title="安全なrestプロパティパターン"
              subtitle="const { specialProp, ...rest } = props;  →  <div {...rest} />  — 専用propsを抜き取ってからDOMへ展開"
              iconColor="text-emerald-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            スプレッドPropsは便利だが「何を渡しているか」が見えにくくなる。restパターンで明示的に制御する。
          </p>
        </ConceptDiagram>

        {/* 図F: children propの構造 */}
        <ConceptDiagram
          title="概念図F：children propの仕組みとパターン"
          description="childrenはコンポーネントタグで囲んだ内容が自動的に渡される特殊なProp。テキスト・JSX要素・関数など多様な値を受け取れる。"
          accentColor="sky"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={FileCode}
              title="childrenの基本：タグで囲んだものが渡される"
              subtitle="<Card>ここがchildren</Card>  →  function Card({ children }: { children: React.ReactNode })"
              iconColor="text-sky-400"
            />
            <StackLayer
              Icon={Layers}
              title="childrenに渡せる型（React.ReactNode）"
              subtitle="テキスト / JSX要素 / コンポーネント / 配列 / フラグメント / null — すべてReactNodeで受け取れる"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Package}
              title="Compound Componentパターン"
              subtitle="<Card><Card.Header /><Card.Body /><Card.Footer /></Card>  — 関連コンポーネントをネームスペースでグループ化"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={ArrowRight}
              title="Render Propsパターン"
              subtitle="<DataFetcher render={(data) => <Table data={data} />} />  — renderという名のPropに関数を渡してレンダリングを委譲"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={Workflow}
              title="Children as Functionパターン"
              subtitle="<Toggle>{(isOn) => <Button>{isOn ? 'ON' : 'OFF'}</Button>}</Toggle>  — childrenそのものを関数にする高度な手法"
              iconColor="text-rose-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            レイアウト系コンポーネント（Modal・Card・Layoutなど）はchildrenを使うと「中身は使う側が決める」柔軟な設計になる。
          </p>
        </ConceptDiagram>
      </section>

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
          note="PropsとStateは対になる概念。Propsは外から与えられる設定で、Stateはコンポーネント自身が管理する記憶。両者を混同しないことがReact設計の第一歩。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、PropsってHTMLのattributeみたいなものですか？<input type=\"text\"> の type みたいな感じで。",
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
            text: "TypeScriptでinterfaceを書いてPropsに型をつけると、渡し忘れたときエディタが教えてくれるんですね！ボク、これは便利すぎます。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それがTypeScript+Reactの一番の恩恵ですよ、マジさん。「必須Propsを渡し忘れた」「存在しないPropを指定した」をコードを書いている時点で発見できます。本番でのバグが劇的に減ります。型定義はコストではなく保険だと思ってください。",
          },
        ]}
      />

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
            href: "/react/context",
            title: "Context",
            description: "Props drillingの解決策。グローバルなデータ共有",
            icon: "Rocket",
          },
        ]}
      />

      <PageDrill questions={propsQuestions} />
    </div>
  );
}
