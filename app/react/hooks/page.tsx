import {
  Package,
  Wrench,
  RefreshCw,
  HardDrive,
  Timer,
  Maximize2,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Layers,
  Repeat,
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
import { hooksQuestions } from "@/content/questions/react/hooks";

export const metadata = {
  title: "カスタムHooks | Web開発図解",
  description: "カスタムHooksの基本概念を図解で解説。useXxx命名規則・useFetchの実装パターン・Hooksのルールまで。",
};

export default function HooksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="カスタムHooks"
        subtitle={"ロジックを再利用可能な関数に切り出す技術——「use始まり」の秘密"}
        accentColor="emerald"
      />

      <OnePageSummary
        keyMessage="カスタムHooksとは、useStateやuseEffectを組み合わせたロジックを「useXxx」という関数に切り出す技術。コンポーネントから複雑なロジックを分離し、複数のコンポーネントで再利用できるようにする。Reactが提供する組み込みHooksを活用した「ユーザー定義Hook」。"
        metaphorTitle="専用の道具箱を作る"
        metaphorPoints={[
          {
            label: "組み込みHooks",
            real: "useState / useEffect などの基本工具（ハンマーやドライバー）",
            metaphor: "組み込みHooks",
          },
          {
            label: "カスタムHooks",
            real: "配管工事セットのような専用まとめ道具箱",
            metaphor: "カスタムHooks",
          },
          {
            label: "use始まり",
            real: "道具箱に貼る「Hooks専用」のラベル",
            metaphor: "use始まり",
          },
          {
            label: "再利用",
            real: "別の工事現場でも同じ道具箱をそのまま使える",
            metaphor: "再利用",
          },
        ]}
        definition="カスタムHooksとはReactのHooksを組み合わせたロジックをuse始まりの関数に切り出す仕組み。コードの再利用と関心の分離を実現する。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 図A: カスタムHooks化の流れ */}
        <ConceptDiagram
          title="概念図A"
          description="コンポーネント内の複雑なロジックを、カスタムHooksとして切り出す流れ。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Layers}
              title="コンポーネント内"
              subtitle="useState + useEffectが混在して肥大化している"
            />
            <FlowArrow label="切り出す" direction="right" />
            <FlowCard
              Icon={Package}
              title="useXxx() 関数"
              subtitle="ロジックをuse始まりの関数にまとめる"
              highlight
            />
            <FlowArrow label="呼び出す" direction="right" />
            <FlowCard
              Icon={Repeat}
              title="複数コンポーネント"
              subtitle="importして1行で使い回せる"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            切り出した後、コンポーネントはUIの描画だけに集中できる。ロジックはHooksが担う。
          </p>
        </ConceptDiagram>

        {/* 図B: よくあるカスタムHooksのパターン */}
        <ConceptDiagram
          title="概念図B"
          description="よく作られるカスタムHooksの代表パターン。"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                Icon: RefreshCw,
                name: "useFetch",
                desc: "データ取得ロジック（loading / error / data）をまとめる",
                color: "text-emerald-400",
              },
              {
                Icon: HardDrive,
                name: "useLocalStorage",
                desc: "ローカルストレージへの読み書きをカプセル化する",
                color: "text-blue-400",
              },
              {
                Icon: Timer,
                name: "useDebounce",
                desc: "入力値の変化を一定時間遅らせて処理する",
                color: "text-violet-400",
              },
              {
                Icon: Maximize2,
                name: "useWindowSize",
                desc: "ウィンドウサイズの変化をリアルタイムで監視する",
                color: "text-amber-400",
              },
            ].map(({ Icon, name, desc, color }, i) => (
              <div
                key={i}
                className="rounded-lg border px-4 py-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                  <code
                    className="text-xs font-mono font-bold"
                    style={{ color: "#34d399" }}
                  >
                    {name}
                  </code>
                </div>
                <p className="text-xs text-gray-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            すべて「useXxx」という命名で、内部にuseState・useEffectなどの組み込みHooksを持つ。
          </p>
        </ConceptDiagram>

        {/* 図C: Hooksのルール */}
        <ConceptDiagram
          title="概念図C — Hooksの呼び出しルール"
          description="Reactが定めるHooksの2つのルール。カスタムHooksを使う場合も同じルールが適用される。"
        >
          <div className="rounded-xl border-2 border-dashed border-emerald-700/50 p-4">
            <p className="text-xs font-semibold text-emerald-500 text-center mb-4 tracking-wide uppercase">
              Rules of Hooks
            </p>
            <StackLayer
              Icon={CheckCircle}
              title="ルール1: トップレベルでのみ呼ぶ"
              subtitle="if文・for文・ネストした関数の中でHooksを呼んではいけない。常に同じ順序で呼ばれることが必要。"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={CheckCircle}
              title="ルール2: ReactコンポーネントかカスタムHooks内でのみ呼ぶ"
              subtitle="通常のJavaScript関数の中でHooksを呼ぶことはできない。use始まりの関数にすることで許可される。"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={AlertTriangle}
              title="違反するとどうなるか"
              subtitle="レンダリングをまたいでHooksの呼び出し順序がズレ、状態が正しいHookに紐付かなくなる。Reactの内部管理が破綻する。"
              iconColor="text-red-400"
              showArrow={false}
            />
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <Wrench className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              eslint-plugin-react-hooks を導入すると、これらのルール違反をコーディング中に自動で検知してくれる。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "コンポーネントにロジックを直書き",
            "カスタムHooksに切り出す",
          ]}
          rows={[
            {
              label: "コードの長さ",
              cells: [
                "コンポーネントが肥大化する",
                "コンポーネントがスッキリする",
              ],
              highlightCol: 1,
            },
            {
              label: "再利用性",
              cells: [
                "同じロジックをコピペしがち",
                "importするだけで使い回せる",
              ],
              highlightCol: 1,
            },
            {
              label: "テストのしやすさ",
              cells: [
                "UIと混在してテストしにくい",
                "Hooksだけ単独テストできる",
              ],
              highlightCol: 1,
            },
            {
              label: "関心の分離",
              cells: [
                "UIロジックとビジネスロジックが混在",
                "UIはコンポーネント・ロジックはHooks",
              ],
              highlightCol: 1,
            },
          ]}
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "カスタムHooksって、普通の関数と何が違うんですか？ ボク、useから始めなくていい気がするんですが……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "命名規則には意味があるんです、マジさん。useから始まる関数はReactが「Hookのルールを適用すべき関数」として認識します。普通の関数の中でuseState等を呼ぶとエラーになりますが、use始まりにすることで「この中にHooksがある」とReactとESLintが分かってくれる。ラベルの貼り方が違うだけで、中身は全く同じ関数ですよ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあuseEffectの中にuseStateを入れることもできるんですか！？ ボク、そんな自由があるとは……！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "それは逆ですね、マジさん。Hooksはifやforやネストされたコールバックの中では呼べません。でも「カスタムHooksの中で別のHooksを呼ぶ」のは全く問題ない。useFetchの中でuseStateとuseEffectを両方使う、というのが典型的なパターンです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、複数ページで「APIからデータを取ってくる処理」を書いていて、毎回同じようなuseState+useEffectを書いています……それがカスタムHooksにすべき状況ですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "まさにそれが最もカスタムHooksが活きる場面です。loading・error・dataの3つのStateと、useEffectでのfetch処理を useFetch(url) としてまとめれば、使う側は1行で済む。「同じロジックを2か所以上書いた瞬間がカスタムHooks化のサイン」と覚えておいてください、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！コンポーネントがUIだけに集中できて、ロジックはHooksに任せる、という分業制ですね。ボク、すごくスッキリしました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。テストの観点でも、UIロジックを分離したHooksは単体テストが書きやすくなります。「見た目」と「動き」を分けることで、どちらも変更しやすくなる——これがReactにおける設計の醍醐味ですよ、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 カスタムHooksの基本パターン — useFetch">
          <p>
            最も典型的なカスタムHooksの例が <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useFetch</code>。
            コンポーネントの中で毎回書いていたデータ取得ロジックをまとめると次のような形になる。
          </p>
          <div
            className="rounded-lg border p-4 mt-2"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-mono text-gray-400 leading-relaxed whitespace-pre-wrap">{`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}`}</p>
          </div>
          <p className="mt-2">
            呼び出し側は <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>const {"{ data, loading, error }"} = useFetch(url)</code> の1行で済む。
            useState / useEffectを毎回書く必要がなくなる。
          </p>
          <KeyPoint>戻り値をオブジェクト形式にするのは、呼び出し側が必要なものだけ取り出せるようにするため。配列でも動くが、名前付きで返した方が可読性が高い。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 Hooksの2つのルール">
          <p>
            <strong className="text-white">ルール1: トップレベルでのみ呼ぶ</strong><br />
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>if</code> 文・
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>for</code> 文・ネストされたコールバック関数の中でHooksを呼ぶのは禁止。
            Reactは「毎回のレンダリングで何番目に何のHookが呼ばれたか」という順序で状態を管理しているため、順序が変わるとどの状態がどのHookに対応するか分からなくなる。
          </p>
          <p>
            <strong className="text-white">ルール2: ReactコンポーネントかカスタムHooks内でのみ呼ぶ</strong><br />
            通常のJavaScript関数の中でuseStateを呼んでも機能しない。
            use始まりの命名をすることで「この関数はHooksのルール下にある」とReactが認識し、内部でのHooks呼び出しが許可される。
          </p>
          <WarningPoint>
            ルール違反はコンパイルエラーにはならず実行時にバグとして現れることが多い。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#ef4444" }}>eslint-plugin-react-hooks</code> を必ず導入して静的解析で防ぐこと。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 引数と戻り値の設計">
          <p>
            カスタムHooksは関数なので、引数を受け取り、値を返すことができる。
          </p>
          <p>
            <strong className="text-white">引数の設計</strong>: URLや設定値など、外から変えたい値を引数にする。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useFetch(url)</code> のように。
          </p>
          <p>
            <strong className="text-white">戻り値の設計</strong>: 呼び出し側が使う値と関数をまとめてオブジェクトで返す。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"return { data, loading, error }"}</code> のように。
            配列で返す場合（<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useState</code> スタイル）は変数名を自由につけやすい利点があるが、
            項目が多いときはオブジェクトの方が分かりやすい。
          </p>
          <KeyPoint>
            カスタムHooksは「状態と、それを操作する関数」のセットを返すのが典型的な設計。
            useLocalStorageなら <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"[value, setValue]"}</code> のようにuseStateと同じ形にすると馴染みやすい。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 カスタムHooksの命名慣習">
          <p>
            命名は「use + 役割」の形にするのが慣習。機能を読んだだけで用途が分かるようにする。
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { name: "useWindowSize", role: "ウィンドウサイズの監視" },
              { name: "useLocalStorage", role: "ローカルストレージ操作" },
              { name: "useDebounce", role: "入力値の遅延処理" },
              { name: "useAuth", role: "認証状態の管理" },
              { name: "useForm", role: "フォームの入力管理" },
              { name: "usePrevious", role: "前回の値の保持" },
            ].map(({ name, role }, i) => (
              <div
                key={i}
                className="rounded-lg border px-3 py-2"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <code className="text-xs font-mono" style={{ color: "#34d399" }}>{name}</code>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-300">
            プロジェクトが大きくなると、共通のカスタムHooksを <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>hooks/</code> ディレクトリにまとめて管理するのが一般的なパターン。
          </p>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/state",
            title: "useState",
            description: "useStateはカスタムHooksを構成する主要な材料",
            icon: "Code2",
          },
          {
            href: "/react/useeffect",
            title: "useEffect",
            description: "useEffectはカスタムHooksの中で副作用を担う",
            icon: "Server",
          },
          {
            href: "/react/context",
            title: "Context",
            description: "useContextもカスタムHooksに隠蔽するのが定石",
            icon: "Database",
          },
        ]}
      />

      <PageDrill questions={hooksQuestions} />
    </div>
  );
}
