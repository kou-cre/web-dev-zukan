import {
  FileCode,
  Cpu,
  Network,
  MousePointerClick,
  Search,
  Pencil,
  Plus,
  Trash2,
  Hand,
  Zap,
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
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { domQuestions } from "@/content/questions/javascript/dom";

export const metadata = {
  title: "DOM操作 | Web開発図解",
  description:
    "DOMとは何か、JavaScriptからHTML要素を取得・変更・追加・削除する仕組みを図解で解説。innerHTMLのXSSリスクや仮想DOMとの関係まで。",
};

export default function DomPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="DOM操作"
        subtitle={"HTMLをJavaScriptから動かす仕組み——ページを「生きた状態」にする技術"}
        body={"ボタンを押したら文字が変わる、クリックしたら色が変わる。その正体を1枚で掴む。"}
        accentColor="lime"
      />

      <OnePageSummary
        keyMessage="DOMはブラウザがHTMLを解析して作るツリー構造のオブジェクト。JavaScriptはこのDOMを通じてHTML要素を取得・変更・追加・削除できる。ボタンを押したら文字が変わる、クリックしたら色が変わる——それがDOM操作の正体。"
        metaphorTitle="劇場の舞台と演出家"
        metaphorPoints={[
          {
            label: "HTML",
            real: "幕が開いた瞬間の舞台セット（最初の配置）",
            metaphor: "HTML",
          },
          {
            label: "DOM",
            real: "舞台の隅々まで書かれた設計図（操作可能なオブジェクト）",
            metaphor: "DOM",
          },
          {
            label: "JavaScript",
            real: "設計図を書き換えて舞台を動かす演出家",
            metaphor: "JavaScript",
          },
          {
            label: "イベントリスナー",
            real: "「役者が登場したら照明を変えて」という指示書",
            metaphor: "イベントリスナー",
          },
        ]}
        definition="DOMとはブラウザがHTMLから作るオブジェクトのツリー。JavaScriptはDOMを通じてページを動的に変更できる。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="HTMLテキストは、ブラウザの中で「DOMツリー」というオブジェクトに姿を変える。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5">
            <FlowCard
              Icon={FileCode}
              title="HTMLテキスト"
              subtitle="<html><body>...</body></html>"
            />
            <FlowArrow label="ブラウザがパース" direction="right" />
            <FlowCard
              Icon={Cpu}
              title="DOMツリー"
              subtitle="オブジェクトとして展開"
              highlight
            />
            <FlowArrow label="アクセス" sublabel="document" direction="right" />
            <FlowCard
              Icon={Zap}
              title="JavaScript"
              subtitle="取得・変更・追加・削除"
            />
          </div>

          <div
            className="rounded-xl border-2 border-dashed border-lime-700/50 p-4"
          >
            <p className="text-xs font-semibold text-lime-400 text-center mb-3 tracking-wide uppercase">
              DOM ツリー — 構造イメージ
            </p>
            <div className="font-mono text-xs text-gray-400 leading-relaxed space-y-1 pl-2">
              <p><span className="text-lime-300">document</span></p>
              <p className="pl-4">└─ <span className="text-lime-300">html</span></p>
              <p className="pl-8">├─ <span className="text-lime-300">head</span></p>
              <p className="pl-12">└─ title: 「My Page」</p>
              <p className="pl-8">└─ <span className="text-lime-300">body</span></p>
              <p className="pl-12">├─ <span className="text-lime-300">div</span> (id=&quot;app&quot;)</p>
              <p className="pl-16">└─ <span className="text-lime-300">p</span>: 「Hello」</p>
              <p className="pl-12">└─ <span className="text-lime-300">button</span>: 「Click」</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            JavaScriptは <code className="text-lime-300 px-1">document</code> を入口にして、このツリーの好きなノードに触ることができる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="DOM操作で「できること」は、大きく分けて4種類しかない。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                Icon: Search,
                label: "取得",
                color: "text-lime-400",
                items: [
                  "querySelector",
                  "getElementById",
                  "querySelectorAll",
                ],
                desc: "ツリーから要素を見つける",
              },
              {
                Icon: Pencil,
                label: "変更",
                color: "text-blue-400",
                items: ["textContent", "innerHTML", "style / classList"],
                desc: "要素の中身や見た目を書き換える",
              },
              {
                Icon: Plus,
                label: "追加",
                color: "text-amber-400",
                items: [
                  "createElement",
                  "appendChild",
                  "insertAdjacentHTML",
                ],
                desc: "新しいノードを作って差し込む",
              },
              {
                Icon: Trash2,
                label: "削除",
                color: "text-rose-400",
                items: ["removeChild", "element.remove()"],
                desc: "ノードをツリーから外す",
              },
            ].map(({ Icon, label, color, items, desc }, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <p className={`text-sm font-bold ${color}`}>{label}</p>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{desc}</p>
                <ul className="space-y-1">
                  {items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs font-mono text-gray-300 px-2 py-1 rounded"
                      style={{ backgroundColor: "#1a1d2a" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「取得」がすべての起点。まず要素を掴んでから、変更・追加・削除のどれかを行う。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C"
          description="ユーザーの操作に応じて何かを動かしたい——これを実現するのが「イベントリスナー」。"
        >
          <div className="flex flex-col items-stretch gap-0">
            <StackLayer
              Icon={MousePointerClick}
              title="① 要素に耳を付ける"
              subtitle="button.addEventListener('click', handleClick)"
              iconColor="text-lime-400"
            />
            <StackLayer
              Icon={Hand}
              title="② ユーザーが操作する"
              subtitle="ボタンをクリック・キーを押す・フォームを送信する など"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Network}
              title="③ ブラウザがイベントを通知する"
              subtitle="登録された関数（handleClick）にイベントオブジェクトを渡して呼び出す"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Zap}
              title="④ 関数がDOMを操作する"
              subtitle="textContent を書き換える・要素を追加する・色を変える など"
              iconColor="text-amber-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「いつ」動かすかを決めるのがイベントリスナー、「何を」動かすかを決めるのが関数の中身。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["querySelector", "getElementById", "querySelectorAll"]}
          rows={[
            {
              label: "引数",
              cells: [
                "CSSセレクタ（柔軟）",
                "ID名のみ",
                "CSSセレクタ（複数取得）",
              ],
              highlightCol: 0,
            },
            {
              label: "戻り値",
              cells: [
                "最初の1要素（Element / null）",
                "1要素（Element / null）",
                "NodeList（配列like）",
              ],
              highlightCol: 0,
            },
            {
              label: "速度",
              cells: ["少し遅い", "最速", "少し遅い"],
              highlightCol: 0,
            },
            {
              label: "使いやすさ",
              cells: [
                "◎ 柔軟（クラス・属性・子孫）",
                "○ シンプル",
                "◎ 複数取得に便利",
              ],
              highlightCol: 0,
            },
            {
              label: "推奨",
              cells: [
                "基本これでOK",
                "IDが確実に存在する場合",
                "複数要素の処理（forEach）",
              ],
              highlightCol: 0,
            },
          ]}
          note="速度差はミリ秒以下のレベルで、ほとんどのケースでは体感差ゼロ。「迷ったら querySelector」で進めて問題ない。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、DOMって何の略ですか？ 聞いたことはあるけど、ボク全然わからなくて……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Document Object Model の略です、マジさん。劇場で言うところの「舞台の設計図」だと思ってください。HTMLは幕が開いた瞬間の舞台セットそのもの。DOMはその舞台を演出家が後から書き換えられるよう、隅々まで詳細に書き起こした設計図です。JavaScriptは、その設計図を片手に舞台に指示を出す演出家。「あの照明を青に変えて」「ここに机を一つ追加して」と、リアルタイムに舞台を動かしていけるわけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあReactって結局DOMを操作してるんですか？ ReactはDOMを使わない別世界の話だと思っていました……！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "最終的には実DOMを操作しています。ただ、Reactは「仮想DOM（Virtual DOM）」という、メモリ上のJavaScriptオブジェクトとして持ったDOMの軽量コピーを挟みます。状態が変わると新しい仮想DOMを作り、前回との差分だけを計算して、実DOMにはその差分だけを反映する。これによって「実DOMをむやみに触らない」効率化を実現しているわけです。中で動いている本質は、`document.querySelector` や `appendChild` と地続きの話なんですよ。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ところでマスター、ボクひとつ怖いことを聞きました。`innerHTML` って危なくないんですか？ なんかXSSとかいう攻撃と関係あるって……！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭いところを突かれましたね、マジさん。ユーザーが入力した文字列をそのまま `innerHTML` に渡してしまうと、その中に `<script>` タグが混ざっていた場合、そのスクリプトがブラウザで実行されてしまうんです。これがクロスサイトスクリプティング、通称XSS。ユーザー入力を画面に出すときは `textContent` を使う、もしくは DOMPurify のようなサニタイズライブラリを必ず通す——これが鉄則です。手紙を読み上げるときに、書かれた呪文まで唱えてしまわないようにする、という心構えですね。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。つまり「DOMはブラウザの中の操作可能な設計図」で、JavaScriptはそれをいじる演出家。ReactもDOMを操作しているけど、仮想DOMという賢い仕組みで効率化している。そしてユーザー入力を表示するときは `textContent` を使うのが安全と。腑に落ちました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧なまとめですよ、マジさん。今日の話を押さえておけば、Reactを学んだときに「ああ、結局これはDOM操作の抽象化なんだな」とすんなり繋がります。生のDOM操作を一度自分の手でやってみてからReactに進むと、Reactのありがたみが10倍違って見えますよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 DOMツリーの構造（ノード・要素・テキスト）">
          <p>
            DOMはツリー（木構造）。最上位に{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              document
            </code>{" "}
            があり、その下に html、body、各要素……と入れ子になっている。ツリーを構成する一つひとつを「ノード（Node）」と呼ぶ。
          </p>
          <p>
            ノードには種類がある：要素ノード（Element）、テキストノード（Text）、コメントノード（Comment）など。普段触るのはほぼ要素ノード。
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono ml-1"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              children
            </code>
            は要素ノードだけ、
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono ml-1"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              childNodes
            </code>
            はテキストノードまで含むので、用途で使い分ける。
          </p>
          <KeyPoint>
            「ノード」が広い概念、「要素」がその中の主役。配列like（NodeList / HTMLCollection）として返ってくることが多いので、forEach や Array.from に慣れておくと操作が楽になる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 イベントバブリングとキャプチャ">
          <p>
            ボタンをクリックすると、そのクリックイベントは「ボタン → 親div → body → html → document」と外側へ伝播していく。これを{" "}
            <strong className="text-white">バブリング</strong>と呼ぶ（泡が水面に上がっていくイメージ）。逆に外から内へ降りてくる経路は{" "}
            <strong className="text-white">キャプチャ</strong>と呼ぶ。
          </p>
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              addEventListener(type, fn, &#123; capture: true &#125;)
            </code>{" "}
            と書くとキャプチャフェーズで拾える。デフォルトはバブリング。
          </p>
          <KeyPoint>
            「リストの全ての項目にクリックを付けたい」とき、各項目に個別にリスナーを付けるのではなく、親に1つだけ付けて event.target で判別する手法を「イベント委譲（Event Delegation）」と呼ぶ。バブリングを利用した代表的なテクニック。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 innerHTMLのXSSリスクとtextContentの使い分け">
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              innerHTML
            </code>{" "}
            は受け取った文字列をHTMLとして解釈する。便利だが、ユーザー入力をそのまま渡すと{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              &lt;script&gt;
            </code>{" "}
            タグやイベントハンドラ属性が混ざった瞬間に攻撃が成立する。これがXSS（Cross-Site Scripting）。
          </p>
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              textContent
            </code>{" "}
            は文字列を「ただの文字」として扱うのでスクリプトは絶対に実行されない。「とにかく文字を表示したいだけ」のケースは textContent を使うのが鉄則。HTMLとして埋め込みたい場合は{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              DOMPurify
            </code>
            のようなサニタイザを通す。
          </p>
          <WarningPoint>
            ユーザー入力（フォーム・URLパラメータ・他人が書いたコメントなど）を innerHTML に直接渡すのは絶対に避ける。Reactは標準で textContent 相当のエスケープを行うが、`dangerouslySetInnerHTML` を使った瞬間に同じリスクが発生する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 Reactとの関係（仮想DOMという抽象化）">
          <p>
            Reactは生のDOM操作を毎回手で書かせない代わりに、「状態が変わったらUIがどう変わるか」を関数として書かせる。中身では仮想DOMという軽量なJSオブジェクトを使って、前回のUIと今回のUIを比較し、差分だけを実DOMに反映する。
          </p>
          <p>
            このページで学んだ querySelector / addEventListener / textContent といった概念は、Reactを使ってもなくならない。Reactは{" "}
            <strong className="text-white">DOM操作を抽象化したラッパー</strong>であって、DOMそのものを置き換える別世界ではない。
          </p>
          <KeyPoint>
            生のDOM操作を一度自分の手で書いてみると、Reactの「状態だけ書けばUIが付いてくる」というありがたさが何倍にも実感できる。ここを飛ばさないことが、後で詰まらないコツ。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "var / let / const の違いとブロックスコープ",
            icon: "Code2",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "ブラウザからサーバーにデータを取りに行く",
            icon: "Cloud",
          },
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "Promise・async / await・イベントループ",
            icon: "Rocket",
          },
        ]}
      />

      <PageDrill questions={domQuestions} />
    </div>
  );
}
