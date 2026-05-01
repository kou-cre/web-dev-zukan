import {
  Package,
  Lock,
  KeyRound,
  Building2,
  DoorOpen,
  Layers,
  Boxes,
  ArrowUpFromLine,
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
import { variablesQuestions } from "@/content/questions/javascript/variables";

export const metadata = {
  title: "変数とスコープ | Web開発図解",
  description:
    "JavaScriptの変数（var / let / const）とスコープを図解で解説。ホイスティング・TDZ・ブロックスコープまで一気に整理する。",
};

export default function VariablesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="変数とスコープ"
        subtitle={"データを入れる「箱」の種類と、その箱が使える「範囲」の話"}
        body={"var / let / const の違いと、スコープの仕組みを1ページで掴む。"}
        accentColor="yellow"
      />

      <OnePageSummary
        keyMessage="JavaScriptには変数を宣言する3つの方法がある。var は古く問題が多い。let は値を変えられる箱、const は一度決めたら変えられない箱。そして「スコープ」は箱が有効な範囲を決めるルール。"
        metaphorTitle="ロッカールームの3種類の棚"
        metaphorPoints={[
          {
            label: "var",
            real: "var は廊下に置いた荷物。どこからでも見えてしまい、誰かに勝手に触られる危険がある",
            metaphor: "廊下の置き荷物",
          },
          {
            label: "let",
            real: "let は個人ロッカー。その部屋（ブロック）の中でだけ使えて、外には漏れない",
            metaphor: "個人ロッカー",
          },
          {
            label: "const",
            real: "const は鍵のかかったロッカー。中身を入れ替えることはできない",
            metaphor: "鍵付きロッカー",
          },
          {
            label: "スコープ",
            real: "スコープは「そのロッカーが使えるフロア」。関数スコープ・ブロックスコープという階層がある",
            metaphor: "ロッカーが使えるフロア",
          },
        ]}
        definition="変数とはデータを格納する名前付きの箱。スコープとはその箱にアクセスできる範囲のルール。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="var / let / const は、それぞれどんな性格の「箱」なのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-red-400" />
                <p className="text-sm font-bold text-white">var</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  非推奨
                </span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>再宣言：<span className="text-red-300">可</span>（事故の元）</li>
                <li>再代入：<span className="text-red-300">可</span></li>
                <li>スコープ：<span className="text-red-300">関数</span></li>
                <li>ホイスト：<span className="text-red-300">undefined</span></li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                古い書き方。レガシーコードを読む以外で新規に書く理由はない。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <KeyRound className="w-5 h-5 text-blue-400" />
                <p className="text-sm font-bold text-white">let</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  値が変わるとき
                </span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>再宣言：<span className="text-blue-300">不可</span></li>
                <li>再代入：<span className="text-blue-300">可</span></li>
                <li>スコープ：<span className="text-blue-300">ブロック</span></li>
                <li>ホイスト：<span className="text-blue-300">TDZ</span></li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                カウンターやフラグのように値を更新する箱に使う。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(234,179,8,0.06)",
                borderColor: "rgba(234,179,8,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-yellow-400" />
                <p className="text-sm font-bold text-white">const</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                  基本これ
                </span>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>再宣言：<span className="text-yellow-300">不可</span></li>
                <li>再代入：<span className="text-yellow-300">不可</span></li>
                <li>スコープ：<span className="text-yellow-300">ブロック</span></li>
                <li>ホイスト：<span className="text-yellow-300">TDZ</span></li>
              </ul>
              <p className="text-xs text-gray-400 mt-3 leading-tight">
                第一選択。値を変える必要が出たら let に書き換える。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「const から書き始め、必要になったら let に直す」が現代のJS流儀。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="スコープは「箱が見える範囲」。外側からは中が見えず、中からは外が見える。"
        >
          <div
            className="rounded-xl border-2 border-dashed border-yellow-700/50 p-4"
          >
            <p className="text-xs font-semibold text-yellow-500 text-center mb-4 tracking-wide uppercase">
              Scope — 入れ子構造
            </p>
            <StackLayer
              Icon={Building2}
              title="グローバルスコープ（最外）"
              subtitle="どこからでも見える。汚染されると全体に影響するので使い所は最小限に"
              iconColor="text-gray-400"
            />
            <StackLayer
              Icon={DoorOpen}
              title="関数スコープ（その中）"
              subtitle="function() { ... } の中だけで有効。var はここまでが見える範囲"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Boxes}
              title="ブロックスコープ（さらに中）"
              subtitle="{ } で囲んだ範囲だけ。if / for / while の中。let / const はここで閉じ込められる"
              iconColor="text-yellow-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            内側からは外が見える（参照できる）。外側からは内側が見えない（隠蔽される）。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C"
          description="「ホイスティング」とは何か？ コードが動く前に、JSエンジンが何をしているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Layers}
              title="コード実行前"
              subtitle="あなたが書いたコード"
            />
            <FlowArrow label="解析" sublabel="parse" direction="right" />
            <FlowCard
              Icon={ArrowUpFromLine}
              title="宣言を巻き上げ"
              subtitle="先頭に集める"
              highlight
            />
            <FlowArrow label="実行開始" direction="right" />
            <div className="flex flex-col gap-2">
              <div
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-red-300 font-semibold">var</span>
                <span className="text-gray-500"> → </span>
                <span className="text-gray-300">undefined</span>
              </div>
              <div
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300 font-semibold">let / const</span>
                <span className="text-gray-500"> → </span>
                <span className="text-gray-300">TDZ（触るとError）</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「巻き上げられる」点はどれも同じ。違うのは「巻き上げ後に触ったときの挙動」。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["var", "let", "const"]}
          rows={[
            {
              label: "スコープ",
              cells: ["関数スコープ", "ブロックスコープ", "ブロックスコープ"],
              highlightCol: 2,
            },
            {
              label: "再宣言",
              cells: ["可", "不可（エラー）", "不可（エラー）"],
              highlightCol: 2,
            },
            {
              label: "再代入",
              cells: ["可", "可", "不可（エラー）"],
              highlightCol: 2,
            },
            {
              label: "ホイスティング",
              cells: ["undefined になる", "TDZエラー", "TDZエラー"],
              highlightCol: 2,
            },
            {
              label: "推奨度",
              cells: ["使わない", "値が変わるときだけ", "基本これを使う"],
              highlightCol: 2,
            },
          ]}
          note="基本は const。値を更新する必要が出てきた箱だけ let。var は新規コードでは書かない、が現代のJSの共通認識。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ボク前から思っていたんですけど、`var` と `let` と `const` って、全部「変数」なのに、なぜ3種類もあるんでしょうか……？ ボクから見ると、ぜんぶ同じ箱に見えてしまって。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良いご質問ですね、マジさん。これはロッカールームに3種類の棚があると思ってください。`var` は廊下にポンと置いた荷物、`let` は個人ロッカー、`const` は鍵のかかったロッカーです。歴史的には `var` しかなかった時代があり、廊下に荷物を置きすぎて誰の物か分からなくなった反省から、`let` と `const` が後から追加されたんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nちょっと待ってくださいマスター！ `const` って「変数なのに変えられない」んですよね？ それはもう変数じゃなくて『定数』ってやつなのでは……！？ 変数を名乗っておきながら変えられないなんて、世紀の大裏切りでは！？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "落ち着いてください、マジさん。半分正解で、半分は誤解です。`const` が固定しているのは「箱の置き場所」であって、「箱の中身」ではないのです。たとえば `const user = { name: 'マジ' }` と書いた場合、user という変数に別のオブジェクトを再代入することはできません。しかし user.name を 'マスター' に書き換えるのは自由にできます。封筒の宛先は変えられないが、封筒の中身は入れ替えられる、というイメージですね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あ、あぁ……なんとか分かった気がします。じゃあ次に「スコープ」っていうやつなんですけど……ボクここがどうしても腑に落ちなくて。なぜ外から中が見えないんですか？ 透明にしておいてくれた方が便利なのでは……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それも素晴らしい疑問です。会社のフロア構造を想像してみてください。マジさんが3階の経営フロアにいるとして、1階の受付の資料は取りに行けますよね。でも、1階の警備員が3階の社長室に勝手に入ってきたら困りませんか？ スコープも同じで、内側から外を見るのは安全だが、外から内に踏み込まれると秩序が崩れる。だからJavaScriptは「外から中は見えない」ようにできているんです。これがあるおかげで、関数の中で使う一時的な変数が、外の世界を汚さずに済むんですよ。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。「外から中が見えない」のは不便なのではなくて、「中で使った道具が外を汚さない」ための仕組みだったんですね。`var` は廊下に放置だから事故が起きる、`let` と `const` はちゃんと部屋の中に閉じ込められる。やっと繋がってきました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "見事にまとめていただきました、マジさん。最後に実践ルールをひとつ。「迷ったらまず `const` で書き、後から値を変える必要が出てきたら `let` に直す」。これだけ守れば、変数まわりで足を取られることはまずありません。`var` のことはレガシーコードを読むときの予備知識として頭の片隅に置いておけば十分ですよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 ホイスティングと TDZ（一時的デッドゾーン）">
          <p>
            JavaScriptは実行前にコード全体をざっと見て、「あ、ここで変数 x が宣言されているな」と把握する。これを{" "}
            <strong className="text-white">ホイスティング（巻き上げ）</strong>という。宣言だけがコードの先頭に「巻き上げられる」イメージ。
          </p>
          <p>
            ただし var と let / const では巻き上げ後の振る舞いが違う。var は巻き上げと同時に{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>undefined</code>{" "}
            で初期化されるので、宣言より前に参照しても値（undefined）が返る。これは便利に見えて、実際は「初期化忘れに気づきにくい」というバグの温床になる。
          </p>
          <p>
            一方 let / const は巻き上げられるものの、宣言の行に達するまでは{" "}
            <strong className="text-yellow-300">TDZ（Temporal Dead Zone）</strong>と呼ばれる「触れない期間」に入る。この間に参照しようとすると{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fca5a5" }}>ReferenceError</code>{" "}
            になる。つまり「準備ができていないものを使おうとした」ことが、その場で明確にエラーとして分かる。
          </p>
          <KeyPoint>
            「let / const は巻き上げられない」という説明をたまに見るが、正確には誤り。「巻き上げはされるが、宣言の行までは触ったらエラー」が正しい挙動。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 クロージャとスコープ">
          <p>
            JavaScriptには{" "}
            <strong className="text-white">クロージャ</strong>という仕組みがある。これは「内側の関数が、外側の関数で宣言された変数を覚えていて、後から呼び出されても参照できる」という性質のこと。
          </p>
          <p>
            内側から外側のスコープが見えるという「スコープのルール」がそのまま使われている。たとえば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>function makeCounter()</code>{" "}
            の中で{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>let count = 0</code>{" "}
            を宣言し、その内側で{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>count++</code>{" "}
            するアロー関数を返すと、外側に出た後も count を覚え続ける。これが状態を持つ関数の正体で、Reactの useState の中でも似た仕組みが動いている。
          </p>
          <KeyPoint>
            クロージャは「スコープのネスト構造」を理解していれば自然に納得できる。逆に言えば、スコープを曖昧にしたままクロージャを学ぼうとすると必ず詰まる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 const とオブジェクト・配列">
          <p>
            const は「変数の参照」を固定するだけで、参照先のオブジェクトや配列の{" "}
            <strong className="text-white">中身までは固定しない</strong>。
          </p>
          <p>
            つまり{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>const arr = [1, 2, 3]</code>{" "}
            に対して{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr.push(4)</code>{" "}
            や{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr[0] = 99</code>{" "}
            は普通に通る。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr = [9]</code>{" "}
            のように別の配列を再代入することだけが禁止される。
          </p>
          <WarningPoint>
            「const にしておけば中身も安全」と思い込むと、配列やオブジェクトを別の場所から書き換えられて気づかないバグを生む。中身まで固定したいときは Object.freeze を使うか、書き換えない設計にする。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 実践的な変数宣言のルール">
          <p>
            <strong className="text-white">原則：const ファースト</strong>。すべての変数宣言は const から始める。
          </p>
          <p>
            <strong className="text-white">例外：let に変える</strong>のは、ループのカウンタ・フラグ・段階的に組み立てる値など、明らかに値を更新する箱だけ。
          </p>
          <p>
            <strong className="text-white">禁止：var は新規コードに書かない</strong>。読むときに出てきたら「古いコードだな」とだけ思えばOK。
          </p>
          <KeyPoint>
            「const から書き始めて、再代入したくなったら let に書き換える」だけで、変数まわりの事故の8割は防げる。手で守るルールというより、エディタが教えてくれるルール（const に再代入しようとするとTypeScriptがエラーを出す）として運用する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "Promise / async・await の世界",
            icon: "Code2",
          },
          {
            href: "/javascript/modules",
            title: "ESモジュール",
            description: "import / export でファイルを跨ぐ",
            icon: "Rocket",
          },
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "JSが動く「もう一方の世界」を知る",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={variablesQuestions} />
    </div>
  );
}
