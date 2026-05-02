import {
  Box,
  Layers,
  Code2,
  Monitor,
  Puzzle,
  GitBranch,
  FunctionSquare,
  ArrowRight,
  Home,
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
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { componentQuestions } from "@/content/questions/react/components";

export const metadata = {
  title: "コンポーネント | Web開発図解",
  description: "ReactのコンポーネントとJSXを図解で解説。関数コンポーネント・ツリー構造・再利用の考え方をわかりやすく。",
};

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="コンポーネント"
        subtitle="UIを「部品」として組み立てる考え方——Reactの設計思想の核心"
        accentColor="blue"
      />

      <OnePageSummary
        keyMessage="Reactのコンポーネントとは「画面の一部を担当する独立した部品」のこと。HTMLとJavaScriptを組み合わせたJSXで書かれ、関数として定義する。コンポーネントを組み合わせてUIを構築するのがReactの基本的な考え方。"
        metaphorTitle="家の設計図と実際の家"
        metaphorPoints={[
          { label: "コンポーネント", real: "一度書けば何度でも使い回せる設計図", metaphor: "コンポーネント" },
          { label: "JSX", real: "設計図を書くための記法（間取り図の書き方）", metaphor: "JSX" },
          { label: "レンダリング", real: "設計図をもとに実際の部屋を作ること", metaphor: "レンダリング" },
          { label: "ツリー構造", real: "部屋が廊下でつながって「家」になる入れ子の構造", metaphor: "ツリー構造" },
        ]}
        definition="コンポーネントとはUIの独立した部品。JSXで見た目を定義し、関数として作る。Reactはこの部品を組み合わせて画面を作る。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A — コンポーネントの構造"
          description="JSXを書いてからブラウザに表示されるまでの流れ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Code2}
              title="JSX return"
              subtitle="コンポーネント関数が返す構造"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="Reactが解析" direction="right" />
            <FlowCard
              Icon={Layers}
              title="Virtual DOM"
              subtitle="Reactが管理する軽量コピー"
            />
            <FlowArrow label="差分だけ反映" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="Real DOM反映"
              subtitle="ブラウザに実際に描画される"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            Reactは直接DOMを書き換えず、Virtual DOMで差分を計算してから最小限の変更だけを反映する。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B — ツリー構造"
          description="コンポーネントは入れ子で組み合わさり「木構造」を形成する"
        >
          <div className="rounded-xl border-2 border-dashed border-blue-700/50 p-4">
            <p className="text-xs font-semibold text-blue-500 text-center mb-4 tracking-wide uppercase">
              Component Tree — 親から子への一方向データフロー
            </p>
            <StackLayer
              Icon={Home}
              title="App（最上位）"
              subtitle="アプリケーション全体を包む最も外側のコンポーネント"
              iconColor="text-blue-400"
            />
            <div className="flex gap-2 mx-4">
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Header（中間）"
                  subtitle="ナビゲーションを担当する"
                  iconColor="text-violet-400"
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Main（中間）"
                  subtitle="メインコンテンツを担当"
                  iconColor="text-violet-400"
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Footer（中間）"
                  subtitle="フッター情報を担当"
                  iconColor="text-violet-400"
                  showArrow={false}
                />
              </div>
            </div>
            <div className="flex gap-2 mx-8 mt-2">
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="Button"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="Card"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="NavItem"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            データは必ず親から子への一方向に流れる。子から親へ直接変更することはできない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — 関数コンポーネントの解剖"
          description="1つの関数コンポーネントの中で何が起きているのか"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={ArrowRight}
              title="Props受け取り"
              subtitle="親から渡されたデータを引数で受け取る"
            />
            <FlowArrow label="" direction="right" />
            <FlowCard
              Icon={FunctionSquare}
              title="ロジック実行"
              subtitle="計算・条件分岐・Hooks呼び出しなど"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="" direction="right" />
            <FlowCard
              Icon={Code2}
              title="JSX return"
              subtitle="画面に表示する構造を返す"
            />
            <FlowArrow label="描画" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="画面に表示"
              subtitle="Reactが実際のDOMに反映"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            関数コンポーネントは「Propsを受け取り、JSXを返す純粋な関数」として設計するのが理想。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D：コンポーネントの再利用パターン"
          description="1つのコンポーネントを柔軟に使い回す仕組み"
          accentColor="blue"
        >
          {/* Propsで柔軟に変化するButtonの例 */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
              Props で柔軟に変化する Button コンポーネント
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { variant: "primary", size: "md", label: "送信" },
                { variant: "danger", size: "sm", label: "削除" },
                { variant: "outline", size: "lg", label: "キャンセル" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-center"
                >
                  <p className="text-xs font-mono text-blue-300">
                    {"<Button"}
                  </p>
                  <p className="text-xs font-mono text-gray-400 ml-2">
                    variant={JSON.stringify(item.variant)}
                  </p>
                  <p className="text-xs font-mono text-gray-400 ml-2">
                    size={JSON.stringify(item.size)}
                  </p>
                  <p className="text-xs font-mono text-blue-300">
                    {"  />"} <span className="text-gray-500">→</span>{" "}
                    <span className="text-white">{item.label}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              1つのButtonコンポーネントが全ページで統一UIを提供
            </p>
          </div>

          {/* コンポジションパターン */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
              コンポジション — 小さな部品を組み合わせる
            </p>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
              <p className="text-xs font-mono text-gray-300 text-center mb-1">
                Card = CardHeader + CardBody + CardFooter
              </p>
              <div className="flex flex-col gap-1">
                <div className="rounded border border-blue-400/40 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300 font-mono text-center">
                  CardHeader（タイトル・アイコン）
                </div>
                <div className="rounded border border-gray-600 bg-gray-800/50 px-3 py-1.5 text-xs text-gray-300 font-mono text-center">
                  CardBody（メインコンテンツ）
                </div>
                <div className="rounded border border-gray-700 bg-gray-800/30 px-3 py-1.5 text-xs text-gray-400 font-mono text-center">
                  CardFooter（アクション・補足）
                </div>
              </div>
            </div>
          </div>

          {/* Container vs Presentational */}
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
              Container vs Presentational の分離
            </p>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                <p className="text-xs font-semibold text-violet-300 mb-1">Container（賢い）</p>
                <p className="text-xs text-gray-400">データ取得・状態管理・ロジックを担当。見た目は持たない。</p>
              </div>
              <div className="flex-1 rounded-lg border border-blue-500/30 bg-blue-500/10 p-2">
                <p className="text-xs font-semibold text-blue-300 mb-1">Presentational（表示専用）</p>
                <p className="text-xs text-gray-400">Propsを受け取り表示するだけ。ロジックを持たない。</p>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図E：Reactコンポーネントのレンダリングサイクル"
          description="マウントから更新、アンマウントまでの完全な流れ"
          accentColor="blue"
        >
          {/* 3フェーズ */}
          <div className="flex flex-col gap-3 mb-5">
            {/* 初回マウント */}
            <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                1. 初回マウント
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">関数実行</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">JSX</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">Virtual DOM</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">Real DOM</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect（mount）</span>
              </div>
            </div>

            {/* 更新 */}
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-3">
              <p className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wide">
                2. 更新（State / Props 変化）
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">State変化</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">再レンダリング</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">新Virtual DOM</span>
                <FlowArrow label="diff比較" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">差分のみDOM更新</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect（update）</span>
              </div>
            </div>

            {/* アンマウント */}
            <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-3">
              <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">
                3. アンマウント
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-red-500/20 px-2 py-0.5 text-red-300 font-mono">コンポーネント削除</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect cleanup実行</span>
              </div>
            </div>
          </div>

          {/* 再レンダリングの原因 + React.memo */}
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-gray-700 bg-gray-800/40 p-2">
              <p className="text-xs font-semibold text-gray-300 mb-1">再レンダリングの原因</p>
              <ul className="text-xs text-gray-400 space-y-0.5 list-disc list-inside">
                <li>state 変化</li>
                <li>props 変化</li>
                <li>親コンポーネントの再レンダリング</li>
                <li>context 変化</li>
              </ul>
            </div>
            <div className="flex-1 rounded-lg border border-blue-500/30 bg-blue-500/10 p-2">
              <p className="text-xs font-semibold text-blue-300 mb-1">React.memo() で最適化</p>
              <p className="text-xs text-gray-400">
                propsが変わっていなければ再レンダリングをスキップ。不要な再描画を防ぐ。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図F：クラスコンポーネントと関数コンポーネントの比較"
          description="書き方・ライフサイクル・現在の推奨を並べて確認する"
          accentColor="blue"
        >
          {/* コード比較 */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* クラスコンポーネント */}
            <div className="flex-1 rounded-xl border border-gray-600 bg-gray-800/50 p-3">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                クラスコンポーネント（レガシー）
              </p>
              <pre className="text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
{`class MyComp
  extends React.Component {
  state = {};
  componentDidMount() {
    // 初回マウント時の処理
  }
  render() {
    return <div />;
  }
}`}
              </pre>
            </div>

            {/* 関数コンポーネント */}
            <div className="flex-1 rounded-xl border border-blue-500/40 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                関数コンポーネント（現在の主流）
              </p>
              <pre className="text-xs text-blue-200 font-mono leading-relaxed whitespace-pre-wrap">
{`function MyComp({ props }) {
  const [state, setState]
    = useState();
  useEffect(() => {
    // 副作用の処理
    return () => { /* cleanup */ };
  }, []);
  return <div />;
}`}
              </pre>
            </div>
          </div>

          {/* ライフサイクル対応表 */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
              ライフサイクルの対応関係
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-700 bg-gray-800 px-2 py-1.5 text-left text-gray-400 font-semibold">クラス</th>
                    <th className="border border-gray-700 bg-gray-800 px-2 py-1.5 text-left text-gray-400 font-semibold">矢印</th>
                    <th className="border border-blue-500/30 bg-blue-500/10 px-2 py-1.5 text-left text-blue-300 font-semibold">関数（Hooks）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentDidMount</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect(fn, [])</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentDidUpdate</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect(fn, [dep])</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentWillUnmount</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect cleanup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            関数コンポーネントが現在のReactの主流。クラスはレガシー — 新規コードはすべて関数で書く。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "クラスコンポーネント",
            "関数コンポーネント",
          ]}
          rows={[
            {
              label: "書き方",
              cells: [
                "class MyComp extends React.Component",
                "function MyComp() { return ... }",
              ],
              highlightCol: 1,
            },
            {
              label: "状態管理",
              cells: [
                "this.state / this.setState",
                "useState Hook",
              ],
              highlightCol: 1,
            },
            {
              label: "ライフサイクル",
              cells: [
                "componentDidMount など",
                "useEffect Hook",
              ],
              highlightCol: 1,
            },
            {
              label: "現在の推奨",
              cells: [
                "レガシー・非推奨",
                "現在の標準",
              ],
              highlightCol: 1,
            },
          ]}
          note="React 16.8（2019年）でHooksが導入されて以来、関数コンポーネントが標準になった。新規コードはすべて関数コンポーネントで書く。既存のクラスコンポーネントは動作するが、新規作成は避ける。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、「コンポーネント」って何ですか？ HTMLとどう違うんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "LINEのトーク画面を想像してみてください。あの吹き出しが一つひとつコンポーネントです、マジさん。自分の吹き出しと相手の吹き出し、形は違いますが、同じ「吹き出しコンポーネント」を使い回しているだけ。HTMLだと毎回同じ構造を手で書き直しますが、コンポーネントは一度定義すれば何度でも呼び出せます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "JSXって何ですか？ HTMLに見えるけどHTMLじゃないの？ マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "JSXはJavaScriptの中にHTMLのような記法で書ける構文です。料理レシピに「絵で書ける欄」が追加されたようなイメージ。見た目はHTMLそっくりですが、最終的にはJavaScriptに変換されます。だから`class`ではなく`className`を使うなど、細かい違いがあります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "コンポーネントを「組み合わせる」って、どういうことですか？ ボクには積み木みたいなイメージしかなくて。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "積み木で大正解ですよ、マジさん。大きな積み木（App）の中に中くらいの積み木（Header）があって、さらにその中に小さな積み木（Button）が入っている。この入れ子構造でどんな複雑なUIも作れます。家で言えば、壁・床・屋根という部品が組み合わさって「家」になるのと同じです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "「部品として切り出す」ことで同じコードを何度も書かずに済むし、どこを直せばいいかも分かりやすくなる、ということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧な整理です。「再利用性」と「責務の分離」がコンポーネント設計の2大利点です。一つのコンポーネントに詰め込みすぎず、適切な粒度に分けるセンスがReactエンジニアの腕の見せ所ですよ、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 JSXのルール">
          <p>
            JSXには守るべきルールが4つある。まず、<strong className="text-white">1つのルート要素</strong>に包む必要がある。複数要素を返す場合は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;&gt;&lt;/&gt;</code>{" "}
            （Fragment）で包む。
          </p>
          <p>
            次に、CSSクラスは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>className</code>{" "}
            を使う（<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>class</code>{" "}
            はJavaScriptの予約語のため）。
          </p>
          <p>
            また、JavaScript式を埋め込むときは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"{}"}</code>{" "}
            で囲む。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<p>{count}</p>"}</code>{" "}
            のように書くと変数の値が表示される。
          </p>
          <p>
            最後に、子要素を持たないタグは自己クローズタグにする。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;img /&gt;</code>{" "}
            や{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;br /&gt;</code>{" "}
            のように末尾に{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>/</code>{" "}
            が必要。
          </p>
          <KeyPoint>
            JSXはHTMLではなくJavaScriptの構文拡張。最終的にReactの{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>createElement</code>{" "}
            呼び出しに変換される。見た目はHTMLでも、裏ではJavaScriptが動いている。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 コンポーネントの粒度">
          <p>
            「1コンポーネント1責務」が設計の基本原則。ButtonはButtonの見た目と動作だけを担当し、リストの取得やページ遷移のロジックは持たない。
          </p>
          <p>
            <strong className="text-white">分割のサイン</strong>：同じJSXを2か所以上に書いた時・1つのコンポーネントが100行を超えた時・「このコンポーネントは何をするもの？」と問われて一言で答えられない時。
          </p>
          <KeyPoint>
            分割しすぎも問題。3行のコンポーネントを100個作るより、20行のコンポーネントを5個作る方が読みやすい場合がある。「適切な粒度」に正解はなく、チームやプロジェクトの文脈で判断する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 再利用とカスタマイズ">
          <p>
            コンポーネントに変化をつけるにはPropsを使う。同じButtonコンポーネントでも、色・テキスト・サイズをPropsで渡すことで複数パターンに対応できる。
          </p>
          <p>
            例えば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<Button color=\"blue\" label=\"送信\" />"}</code>{" "}
            と{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<Button color=\"red\" label=\"削除\" />"}</code>{" "}
            は同じコンポーネントを使いながら見た目が変わる。Propsの詳細は次のページで解説する。
          </p>
        </DetailBlock>

        <DetailBlock heading="7.4 Virtual DOMとは">
          <p>
            ReactはブラウザのReal DOMを直接書き換えない。その代わり、Reactが内部で管理する<strong className="text-white">Virtual DOM</strong>（仮想DOM）という軽量なコピーを持っている。
          </p>
          <p>
            状態が変化するとReactはまずVirtual DOMを更新し、変更前と変更後のVirtual DOMを比較（diffing）する。そこで差分だけを特定し、最小限の変更をReal DOMに反映する。
          </p>
          <KeyPoint>
            毎回ページ全体を描き直すのではなく「変わった部分だけ」を更新するのがVirtual DOMの利点。これによってReactは複雑なUIでも効率よく画面を更新できる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/props",
            title: "Props: コンポーネントにデータを渡す",
            description: "親から子への値の渡し方と型の考え方",
            icon: "ArrowRight",
          },
          {
            href: "/react/state",
            title: "State: コンポーネントが持つ変わる値",
            description: "useStateで動的なUIを作る",
            icon: "GitBranch",
          },
          {
            href: "/javascript/dom",
            title: "DOMとの違いを理解する",
            description: "ブラウザが持つ本物のDOMとReactの関係",
            icon: "Monitor",
          },
        ]}
      />

      <PageDrill questions={componentQuestions} />
    </div>
  );
}
