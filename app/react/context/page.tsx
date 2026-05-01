import {
  Bell,
  Globe,
  Radio,
  Share2,
  User,
  Layers,
  ArrowDown,
  Blocks,
  Paintbrush,
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
import { contextQuestions } from "@/content/questions/react/context";

export const metadata = {
  title: "Context と useContext | Web開発図解",
  description: "ReactのContextとuseContextを図解で解説。Props drillingの解決策・createContext・Provider・useContextの3ステップまで。",
};

export default function ContextPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="Context と useContext"
        subtitle={"Propsを使わずに値をツリー全体で共有する——グローバル状態の仕組み"}
        accentColor="rose"
      />

      <OnePageSummary
        keyMessage="ContextはReactのコンポーネントツリー全体に値を「流す」仕組み。Props drillingの解決策。createContext でチャンネルを作り、Provider で値を提供し、useContext で受け取る、という3ステップで使う。テーマ・ログインユーザー情報・言語設定など、「どこからでもアクセスしたい値」に最適。"
        metaphorTitle="会社の全館放送システム"
        metaphorPoints={[
          { label: "Props", real: "上司から部下へ口頭で伝える（階層を通じて伝える）", metaphor: "Props" },
          { label: "Context", real: "全館放送（Providerが放送局、どの部屋でも聞こえる）", metaphor: "Context" },
          { label: "createContext", real: "放送チャンネルを作る", metaphor: "createContext" },
          { label: "Provider", real: "放送局を稼働させる", metaphor: "Provider" },
          { label: "useContext", real: "部屋のスピーカーで受信する", metaphor: "useContext" },
        ]}
        definition="ContextはReactのコンポーネントツリーで値を全体共有する仕組み。Props drillingを避け、テーマ・ユーザー情報などグローバルな値を扱うときに使う。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 図A: Props drilling vs Context */}
        <ConceptDiagram
          title="概念図A"
          description="Props drillingとContextの違い。左は全階層を経由する非効率なデータ受け渡し、右はProviderが全体を包んで直接届ける構造。"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* 左: Props drilling */}
            <div>
              <p className="text-xs font-semibold text-gray-500 text-center mb-3 tracking-wide uppercase">
                Props drilling
              </p>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-bold text-white">App</p>
                  <p className="text-xs text-gray-500">user を持つ</p>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-gray-600" />
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full border-orange-500/30"
                  style={{ backgroundColor: "#0f1117" }}
                >
                  <p className="text-xs font-bold text-orange-300">Layout</p>
                  <p className="text-xs text-gray-500">使わないのに経由</p>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-gray-600" />
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full border-orange-500/30"
                  style={{ backgroundColor: "#0f1117" }}
                >
                  <p className="text-xs font-bold text-orange-300">Page</p>
                  <p className="text-xs text-gray-500">使わないのに経由</p>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-gray-600" />
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full border-orange-500/30"
                  style={{ backgroundColor: "#0f1117" }}
                >
                  <p className="text-xs font-bold text-orange-300">Section</p>
                  <p className="text-xs text-gray-500">使わないのに経由</p>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-gray-600" />
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full border-rose-500/40 bg-rose-500/5"
                >
                  <p className="text-xs font-bold text-rose-300">Button</p>
                  <p className="text-xs text-gray-500">ようやく使える</p>
                </div>
              </div>
            </div>

            {/* 右: Context */}
            <div>
              <p className="text-xs font-semibold text-rose-400 text-center mb-3 tracking-wide uppercase">
                Context
              </p>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-lg border px-3 py-2 text-center w-full border-rose-500/40 bg-rose-500/5"
                >
                  <p className="text-xs font-bold text-rose-300">Provider</p>
                  <p className="text-xs text-gray-500">user を提供</p>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="w-px h-3" style={{ backgroundColor: "#4b5563" }} />
                  <div
                    className="rounded-lg border px-3 py-2 text-center w-full"
                    style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-bold text-white">Layout</p>
                    <p className="text-xs text-gray-500">経由しない</p>
                  </div>
                  <div className="w-px h-3" style={{ backgroundColor: "#4b5563" }} />
                  <div
                    className="rounded-lg border px-3 py-2 text-center w-full"
                    style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-bold text-white">Page</p>
                    <p className="text-xs text-gray-500">経由しない</p>
                  </div>
                  <div className="w-px h-3" style={{ backgroundColor: "#4b5563" }} />
                  <div
                    className="rounded-lg border px-3 py-2 text-center w-full"
                    style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-bold text-white">Section</p>
                    <p className="text-xs text-gray-500">経由しない</p>
                  </div>
                  <div className="w-px h-3" style={{ backgroundColor: "#4b5563" }} />
                  <div
                    className="rounded-lg border px-3 py-2 text-center w-full border-rose-500/40 bg-rose-500/5"
                  >
                    <p className="text-xs font-bold text-rose-300">Button</p>
                    <p className="text-xs text-gray-500">直接受け取る</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            Contextを使うと中間コンポーネントはデータを意識しなくてよくなる。
          </p>
        </ConceptDiagram>

        {/* 図B: Contextの3ステップ */}
        <ConceptDiagram
          title="概念図B"
          description="Contextを使うには3つのステップを踏む。createContext → Provider → useContext の順。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Radio}
              title="createContext"
              subtitle="チャンネル（型）を定義する"
            />
            <FlowArrow label="チャンネル完成" direction="right" />
            <FlowCard
              Icon={Layers}
              title="Provider"
              subtitle="value で値を流す"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="ツリーに流れる" direction="right" />
            <FlowCard
              Icon={Share2}
              title="useContext"
              subtitle="どこからでも受け取る"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            Providerで包んだ範囲の中であれば、何階層下のコンポーネントでも useContext で値を受け取れる。
          </p>
        </ConceptDiagram>

        {/* 図C: 典型的な使用例 */}
        <ConceptDiagram
          title="概念図C"
          description="Contextが向いている典型的なデータの種類。更新頻度が低く、アプリ全体で共有する値。"
        >
          <StackLayer
            Icon={Paintbrush}
            title="テーマ（ダーク/ライト切替）"
            subtitle="サイト全体のデザインモードを切り替える。変更は設定操作時のみ。"
            iconColor="text-rose-400"
          />
          <StackLayer
            Icon={User}
            title="認証情報（ログインユーザー）"
            subtitle="ログイン・ログアウト時だけ変わる。ヘッダー・プロフィール画面など複数の場所で参照する。"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Globe}
            title="言語設定（i18n）"
            subtitle="表示言語の切替。変更は設定変更時のみ。アプリ全体の文言に影響する。"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={Bell}
            title="Toast通知"
            subtitle="どのコンポーネントからでもトースト通知を発火させたい場合。"
            iconColor="text-amber-400"
            showArrow={false}
          />
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Props", "Context", "外部State管理（Zustand等）"]}
          rows={[
            {
              label: "用途",
              cells: [
                "親子間のデータ渡し",
                "ツリー全体での共有",
                "アプリ全体の複雑な状態",
              ],
              highlightCol: 1,
            },
            {
              label: "更新の通知",
              cells: [
                "Propsが変わると子が再レンダー",
                "値が変わると使用コンポーネント全体が再レンダー",
                "サブスクライブした部分だけ再レンダー",
              ],
              highlightCol: 1,
            },
            {
              label: "学習コスト",
              cells: [
                "低",
                "中",
                "高（ライブラリ学習が必要）",
              ],
              highlightCol: 1,
            },
            {
              label: "おすすめ場面",
              cells: [
                "シンプルな親子関係",
                "テーマ・認証情報",
                "大規模アプリのState管理",
              ],
              highlightCol: 1,
            },
          ]}
          note="まずPropsで解決を試みて、Props drillingが3階層を超えたらContextを検討する。更新頻度が高くなってきたらZustandなどを検討するという段階的なアプローチがベストプラクティス。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "Props drillingって何ですか？ボク、「drilling」って穴あけのことでしたよね……コンポーネントに穴をあけるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "比喩としてはいい線ですよ、マジさん。上の階から下の階へ「Propsをドリルで穴あけしながら通す」状態です。3階建ての建物で、3階の情報を地下1階に届けるためにわざわざ1階・2階を経由させる非効率さのことです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nContextを使えばどの階からでも直接受け取れる、ということですか！？ボク、これは革命すぎます！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "ほぼ正解です。正確には「Providerで包んだ範囲の中であれば、どのコンポーネントでも受け取れる」です。全館放送が届くエリアを設定するイメージですね。Providerの外にいるコンポーネントには届きません、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク……Contextを使うと全部再レンダリングされてしまうと聞いたのですが、それって遅くなりませんか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭い懸念です。Contextの値が変わると、useContextを使っているコンポーネント全体が再レンダリングされます。だから「更新頻度の高い値」にContextを使うと、大量の再レンダリングが起きてパフォーマンスに影響します。テーマや認証情報のような「あまり変わらない値」に使うのがベストプラクティスですよ、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。じゃあ「よく変わるけどグローバルに共有したい値」はどうするんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その場合はZustandやReduxといった外部のState管理ライブラリが選択肢になります。ただし、Next.jsやReactを始めたばかりなら、まずはContextとuseStateの組み合わせで十分です。複雑さを持ち込む前に、シンプルな手段で解決できないか考える習慣が大切ですよ、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 Contextの実装パターン">
          <p>
            <strong className="text-white">Step 1: createContextでチャンネルを作る</strong><br />
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>const ThemeContext = createContext&lt;string&gt;("light")</code>
            {" "}のように型とデフォルト値を指定する。
          </p>
          <p>
            <strong className="text-white">Step 2: Providerで値を提供する</strong><br />
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"<ThemeContext.Provider value={theme}>"}</code>
            {" "}でコンポーネントツリーを包む。valueに渡した値が配下全体に届く。
          </p>
          <p>
            <strong className="text-white">Step 3: useContextで受け取る</strong><br />
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>const theme = useContext(ThemeContext)</code>
            {" "}で現在のtheme値を取得できる。Propsを一切経由しない。
          </p>
          <KeyPoint>
            useContextとuseStateを組み合わせると「Providerで状態を管理して、配下全体で読み書きできるグローバル状態」を実現できる。小〜中規模アプリではこのパターンで十分なことが多い。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 Contextのデフォルト値">
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>createContext(defaultValue)</code>
            {" "}に渡す初期値は、Providerが存在しない場合に使われるフォールバック。
          </p>
          <p>
            通常はProviderで常に値を提供するため、デフォルト値が実際に使われるケースは少ない。主に単体テストや型補完の目的で設定することが多い。
          </p>
          <WarningPoint>
            デフォルト値に<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>null</code>や<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>undefined</code>を設定すると、Provider外でuseContextを呼んだときに実行時エラーになりやすい。型定義でnullを許容するか、カスタムHooksでガードするのが安全。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 Context分割のベストプラクティス">
          <p>
            1つのContextに複数の値を詰め込むと、どれか1つが変わっただけで無関係なコンポーネントまで再レンダリングされる。
          </p>
          <p>
            <strong className="text-white">推奨</strong>：テーマ用Context・認証用Context・通知用Contextのように関心事で分割する。
          </p>
          <p>
            <strong className="text-white">アンチパターン</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"{ theme, user, notifications, language }"}</code>
            {" "}をすべて1つのContextに押し込む設計。notificationsが1秒ごとに変わるとthemeを使っているコンポーネントまで再レンダリングされる。
          </p>
          <KeyPoint>
            Contextを使うカスタムHooks（例: <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useTheme()</code>）を作ると、使う側はContextの存在を意識しなくてよくなる。実装を隠蔽しやすく、後でZustandに移行する際にもカスタムHooksのインターフェースを変えるだけで済む。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 useContextとパフォーマンス">
          <p>
            Contextの値変更による不要な再レンダリングを減らす手段が2つある。
          </p>
          <p>
            <strong className="text-white">React.memo</strong>：コンポーネントをメモ化して、PropsもContextも変わっていなければ再レンダリングをスキップする。
          </p>
          <p>
            <strong className="text-white">useMemo</strong>：Contextのvalue propに渡すオブジェクトを
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useMemo</code>
            {" "}でメモ化する。毎レンダーで新しいオブジェクト参照が作られ、無駄な再レンダリングが走る問題を防ぐ。
          </p>
          <KeyPoint>
            パフォーマンス最適化は「計測してから」が原則。最初からメモ化を全部に適用するのではなく、開発者ツールのProfilerで実際のボトルネックを確認してから対処する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/props",
            title: "Props",
            description: "ContextはProps drillingの解決策。まずPropsから理解する",
            icon: "Share2",
          },
          {
            href: "/react/state",
            title: "State",
            description: "Context x State でグローバル状態管理を実現する",
            icon: "Blocks",
          },
          {
            href: "/react/hooks",
            title: "Hooks",
            description: "useContextはカスタムHooksで隠蔽するのが定石",
            icon: "Layers",
          },
        ]}
      />

      <PageDrill questions={contextQuestions} />
    </div>
  );
}
