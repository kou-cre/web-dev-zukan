import {
  RefreshCw,
  Clock,
  Wifi,
  Radio,
  AlertCircle,
  CheckCircle,
  Layers,
  Activity,
  Trash2,
  Play,
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
import { useeffectQuestions } from "@/content/questions/react/useeffect";

export const metadata = {
  title: "useEffect | Web開発図解",
  description: "useEffectの依存配列・クリーンアップ・無限ループ回避まで図解で解説。Reactの副作用管理を完全理解。",
};

export default function UseEffectPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="useEffect"
        subtitle={"レンダリングの「外側」で起きる処理を制御する——副作用の管理"}
        accentColor="cyan"
      />

      <OnePageSummary
        keyMessage="useEffectはReactのレンダリングサイクルの「外側」で副作用を実行するHook。データ取得・タイマー設定・DOMの直接操作・イベントリスナーの登録など、「レンダリングには直接関係ないが必要な処理」をまとめる場所。依存配列で「いつ実行するか」を制御する。"
        metaphorTitle="監視カメラの自動記録"
        metaphorPoints={[
          { label: "コンポーネント本体", real: "店舗の営業（メインの仕事）", metaphor: "コンポーネント本体" },
          { label: "useEffect", real: "監視カメラ（営業とは別に自動で動く）", metaphor: "useEffect" },
          { label: "依存配列", real: "「誰かが入店したときだけ記録する」トリガー設定", metaphor: "依存配列" },
          { label: "クリーンアップ", real: "閉店後に録画を停止する", metaphor: "クリーンアップ" },
        ]}
        definition="useEffectはコンポーネントの外側（DOM操作・通信・タイマー）で動く処理を登録するHook。依存配列で実行タイミングを制御する。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 図A: useEffectの実行タイミング */}
        <ConceptDiagram
          title="概念図A"
          description="useEffectはいつ動くのか？レンダリングとの順番関係を掴む。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Layers}
              title="コンポーネント"
              subtitle="レンダリング完了"
              accentColor="cyan"
              highlight
            />
            <FlowArrow label="完了後に" direction="right" />
            <FlowCard
              Icon={Play}
              title="useEffect実行"
              subtitle="副作用が走る"
            />
            <FlowArrow label="値が変わる" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="useEffect再実行"
              subtitle="依存配列の値が変化"
            />
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <FlowArrow label="アンマウント時" direction="down" />
            <FlowCard
              Icon={Trash2}
              title="クリーンアップ実行"
              subtitle="return ()=&gt;{} の中身が走る"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            useEffectは必ずレンダリングの後に実行される。描画を邪魔しないのが設計上のポイント。
          </p>
        </ConceptDiagram>

        {/* 図B: 依存配列の3パターン */}
        <ConceptDiagram
          title="概念図B"
          description="依存配列の書き方3パターン。「いつ実行するか」はここで決まる。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "依存配列なし",
                code: "useEffect(() => { ... })",
                timing: "毎回レンダリング後",
                note: "意図的に使う場面は少ない",
                warn: true,
              },
              {
                label: "[] 空の配列",
                code: "useEffect(() => { ... }, [])",
                timing: "マウント時の1回のみ",
                note: "データ初回取得など",
                warn: false,
              },
              {
                label: "[count, id] 指定",
                code: "useEffect(() => { ... }, [count, id])",
                timing: "指定値が変わったときだけ",
                note: "IDが変わったら再取得など",
                warn: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 flex flex-col gap-2 ${item.warn ? "border-amber-500/40 bg-amber-500/5" : ""}`}
                style={!item.warn ? { backgroundColor: "#0f1117", borderColor: "#2d3048" } : {}}
              >
                <p className={`text-xs font-bold ${item.warn ? "text-amber-300" : "text-white"}`}>
                  {item.label}
                </p>
                <code
                  className="text-xs px-2 py-1 rounded font-mono leading-tight block"
                  style={{ backgroundColor: "#1a1d2a", color: "#67e8f9" }}
                >
                  {item.code}
                </code>
                <p className="text-xs text-cyan-300 font-semibold">{item.timing}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.note}</p>
                {item.warn && (
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>無限ループの危険あり</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ConceptDiagram>

        {/* 図C: クリーンアップの役割 */}
        <ConceptDiagram
          title="概念図C"
          description="クリーンアップが必要な理由——登録したものは自分で解除する。"
        >
          <div className="rounded-xl border-2 border-dashed border-cyan-700/50 p-4">
            <p className="text-xs font-semibold text-cyan-500 text-center mb-4 tracking-wide uppercase">
              useEffect — 登録 &amp; クリーンアップのセット
            </p>
            <StackLayer
              Icon={Radio}
              title="イベントリスナーを登録"
              subtitle="window.addEventListener('resize', handler) — スクロール・リサイズ検知など"
              iconColor="text-cyan-400"
            />
            <StackLayer
              Icon={Clock}
              title="タイマーを設定"
              subtitle="setInterval / setTimeout — 定期実行・遅延処理"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Wifi}
              title="サブスクリプションを開始"
              subtitle="WebSocket / Firestore onSnapshot — リアルタイム通信"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Trash2}
              title="クリーンアップで解除（return）"
              subtitle="removeEventListener / clearInterval / unsubscribe — アンマウント時に必ず止める"
              iconColor="text-red-400"
              showArrow={false}
            />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-300 leading-snug">
              クリーンアップを書かないと、コンポーネントが消えた後もリスナーやタイマーが裏で動き続けてメモリリークになる。
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-4 py-3">
            <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <p className="text-xs text-cyan-300 leading-snug">
              <code className="px-1 rounded font-mono" style={{ backgroundColor: "#0f1117" }}>return () =&gt; {"{"} removeEventListener(...) {"}"}</code> を書くだけでOK。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["依存配列なし", "[] （空）", "[value]（指定）"]}
          rows={[
            {
              label: "実行タイミング",
              cells: [
                "毎レンダリング後",
                "マウント時1回だけ",
                "valueが変わるたびに",
              ],
              highlightCol: 1,
            },
            {
              label: "よくある用途",
              cells: [
                "デバッグログ",
                "APIデータ取得",
                "IDが変わったら再取得",
              ],
              highlightCol: 1,
            },
            {
              label: "注意点",
              cells: [
                "無限ループの危険",
                "State更新は慎重に",
                "依存配列の漏れに注意",
              ],
              highlightCol: 1,
            },
          ]}
          note="「空の配列」が最も安全で使用頻度も高い。依存配列なしは意図的なケース以外では原則使わない。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "useEffectって、どこで使うものなんですか？ ボク、コンポーネントの中でfetchしちゃダメなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "レストランで例えましょう。コンポーネント本体はホールの接客、つまり「画面を組み立てる」仕事です。通信やタイマーは厨房の裏作業。接客中に急にサーバーにアクセスし始めたら混乱しますよね。useEffectはその「裏作業専用のエリア」なんです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\n依存配列って何ですか？空のやつと値が入ったやつの違いが……ボク全然分かりません。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "空の配列は「一度だけ」、値が入っていれば「その値が変わるたびに」実行します。監視カメラの設定みたいなもの。「常時録画」か「人が入ったときだけ」か「特定のエリアに入ったときだけ」を選ぶようなものです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、依存配列に書くべき値を書き忘れたり、書きすぎたりしてしまいそうです……どうやって判断するんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ESLintの`react-hooks/exhaustive-deps`というルールを使うと、書き忘れを自動で教えてくれます。手動で管理しなくていい。ツールに守ってもらうのが現代のベストプラクティスですよ、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "クリーンアップ関数って何ですか？`return () => {}` って書くやつのことですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです。useEffect内で登録したイベントリスナーやタイマーは、コンポーネントが消えても自動的には止まりません。クリーンアップ関数でそれを止める処理を書く。閉店後に監視カメラを停止するようなものです。これを忘れるとメモリリークという「見えないゴミ」が積もっていきます、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 useEffectの基本構文">
          <p>
            useEffectは第1引数に<strong className="text-white">副作用関数</strong>、第2引数に<strong className="text-white">依存配列</strong>を受け取る。
          </p>
          <div
            className="rounded-lg p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", color: "#94a3b8" }}
          >
            <span style={{ color: "#67e8f9" }}>useEffect</span>
            {"(() => {"}
            <br />
            {"  "}
            <span style={{ color: "#94a3b8" }}>{"// 副作用の処理"}</span>
            <br />
            {"  "}
            <span style={{ color: "#67e8f9" }}>fetchData</span>
            {"();"}
            <br />
            <br />
            {"  "}
            <span style={{ color: "#f59e0b" }}>return</span>
            {" () => {"}
            <br />
            {"    "}
            <span style={{ color: "#94a3b8" }}>{"// クリーンアップ処理"}</span>
            <br />
            {"  };"}
            <br />
            {"}, ["}
            <span style={{ color: "#a78bfa" }}>依存する値</span>
            {"]);"}
          </div>
          <KeyPoint>
            副作用関数の戻り値として返す関数がクリーンアップ関数。コンポーネントのアンマウント時、または次のEffectが実行される直前に呼ばれる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 よくある使用例">
          <p>
            <strong className="text-white">データ取得</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>useEffect</code> 内で
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>fetch</code> や
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>axios</code> を呼ぶ。
            依存配列に
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>[]</code>
            を渡してマウント時1回だけ取得するのが基本パターン。
          </p>
          <p>
            <strong className="text-white">タイマー</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>setInterval</code> でポーリング処理を実装するとき、クリーンアップで
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>clearInterval</code>
            を呼ぶことを忘れずに。
          </p>
          <p>
            <strong className="text-white">eventListener の登録</strong>：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>window.addEventListener</code>
            を使う場合、クリーンアップで
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>removeEventListener</code>
            を呼ぶ。同じ関数参照が必要なので、ハンドラを変数に切り出しておく。
          </p>
          <p>
            <strong className="text-white">外部ライブラリの初期化</strong>：
            地図ライブラリや可視化ライブラリなど、DOMが存在した後に初期化が必要なものは
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#67e8f9" }}>useEffect</code>
            の中で初期化する。
          </p>
        </DetailBlock>

        <DetailBlock heading="7.3 無限ループの原因と回避">
          <p>
            useEffect内でStateを更新すると再レンダリングが発生し、依存配列の指定が誤っていると再びEffectが実行される。
            このループが無限に続くのが「無限ループ」問題。
          </p>
          <WarningPoint>
            <code className="text-xs px-1 rounded font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#fca5a5" }}>useEffect(() =&gt; {"{ setData(fetch()); }"} )</code> のように依存配列を書かないと、setDataが再レンダリングを起こし→Effectが走り→また再レンダリング……と無限ループになる。
          </WarningPoint>
          <KeyPoint>
            fetchしてStateを更新する場合は必ず依存配列を指定する。IDや条件が変わったときだけ再取得したいなら
            <code className="text-xs px-1 rounded font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#fde68a" }}>[id]</code> のように書く。初回だけなら
            <code className="text-xs px-1 rounded font-mono" style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#fde68a" }}>[]</code> を渡す。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 useEffect vs useLayoutEffect">
          <p>
            <strong className="text-white">useEffect</strong>：ブラウザが画面を<strong className="text-white">ペイントした後</strong>に非同期で実行される。ほとんどの副作用はこちらでよい。
          </p>
          <p>
            <strong className="text-white">useLayoutEffect</strong>：DOMが更新されたが<strong className="text-white">ペイント前</strong>に同期的に実行される。要素のサイズ測定や位置計算など、ペイント前にDOMを読み取る必要があるときだけ使う。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <p className="text-xs font-bold text-cyan-300">useEffect（通常）</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1 leading-snug">
                <li>- ペイント後に非同期実行</li>
                <li>- 通信・タイマー・イベントリスナー</li>
                <li>- 画面のちらつきなし</li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-violet-400" />
                <p className="text-xs font-bold text-violet-300">useLayoutEffect（特殊）</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1 leading-snug">
                <li>- ペイント前に同期実行</li>
                <li>- DOM測定・位置計算</li>
                <li>- 過剰に使うとパフォーマンス低下</li>
              </ul>
            </div>
          </div>
          <KeyPoint>
            useLayoutEffectはサーバーサイドレンダリング（Next.jsのSSR）では動作しない。SSR環境で使うと警告が出る。DOM測定が本当に必要なとき以外はuseEffectを使う。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/state",
            title: "State",
            description: "Stateの変化をuseEffectで監視する",
            icon: "ToggleLeft",
          },
          {
            href: "/react/hooks",
            title: "Hooks",
            description: "useEffect以外のHooksを知る",
            icon: "Zap",
          },
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "useEffect内での非同期処理",
            icon: "Clock",
          },
        ]}
      />

      <PageDrill questions={useeffectQuestions} />
    </div>
  );
}
