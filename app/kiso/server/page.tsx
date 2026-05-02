import {
  Monitor,
  Server,
  Database,
  Globe,
  Cpu,
  Plug,
  Send,
  HardDrive,
  Layers,
  Cloud,
  Users,
  KeyRound,
  ArrowRight,
  RefreshCw,
  FileText,
  Wifi,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
  ContrastBar,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { serverQuestions } from "@/content/questions/kiso/server";

export const metadata = {
  title: "サーバーって何？ | Web開発図解",
  description: "サーバーの基本概念を図解で解説。リクエスト・レスポンスの仕組み、BaaSとの関係まで。",
};

export default function ServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="基礎概念"
        title="サーバーって何？"
        subtitle={"ブラウザの向こう側で、ずっと待っててくれる『返事係』の話。"}
        body={"自前で建てる前に、まず『そもそも何者なのか』を1枚で掴む。"}
        accentColor="emerald"
      />

      <OnePageSummary
        keyMessage="サーバーとは「リクエストを受けたら何かを返してくれる、ずっと起きているコンピューター」のこと。Webサイトが動くのは、地球のどこかで誰かのサーバーが24時間あなたのブラウザの呼びかけに応答してくれているから。"
        metaphorTitle="24時間営業のホテルのフロント係"
        metaphorPoints={[
          { label: "リクエスト", real: "お客さん（ブラウザ）が「301号室の鍵をください」と言う", metaphor: "リクエスト" },
          { label: "レスポンス", real: "フロント係（サーバー）が奥の棚（DB）から鍵を取ってきて渡す", metaphor: "レスポンス" },
          { label: "常時稼働", real: "フロント係は寝ない・休まない・誰でも同じように対応する", metaphor: "常時稼働" },
          { label: "API・ポート", real: "電話・メール・対面など複数の窓口がある", metaphor: "API・ポート" },
        ]}
        definition="サーバーとは、リクエストを受け取って、レスポンスを返すことを仕事にしている、常時稼働のコンピューター。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="ブラウザに表示されている画面は、どこから来たのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard Icon={Monitor} title="ブラウザ（あなた）" subtitle="URLを入力してEnterを押す" />
            <FlowArrow label="リクエスト" sublabel="GET /about" direction="right" />
            <div className="flex flex-col items-center gap-1">
              <FlowCard Icon={Server} title="サーバー" subtitle="何を返すか決める頭脳" highlight accentColor="emerald" />
              <FlowArrow label="SQLクエリ" direction="down" />
              <FlowCard Icon={Database} title="データベース" subtitle="保存データの置き場" muted />
            </div>
            <FlowArrow label="レスポンス" sublabel="HTML・JSON・画像" direction="left" />
            <FlowCard Icon={Monitor} title="ブラウザに表示" subtitle="受け取ったデータを描画" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            ブラウザが先に動く（リクエスト）→ サーバーが後から返す（レスポンス）。この順番は変わらない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="「サーバー」と一括りにしているが、中で何が動いているのか？"
        >
          <div className="rounded-xl border-2 border-dashed border-emerald-700/50 p-4">
            <p className="text-xs font-semibold text-emerald-500 text-center mb-4 tracking-wide uppercase">
              Server — 内部構造
            </p>
            <StackLayer
              Icon={Globe}
              title="HTTPサーバー（受付）"
              subtitle="リクエストを受け付ける窓口 — Nginx / Express / Next.js など"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Cpu}
              title="処理ロジック（頭脳）"
              subtitle="リクエストに応じて何をするか決める — 認証チェック・データ取得など"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Plug}
              title="DB接続層（配管）"
              subtitle="DBとやり取りする配管 — Prisma / Supabaseクライアント / Firebase Admin など"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={Send}
              title="外部API連携（出張係）"
              subtitle="他社サービスを呼びに行く — Stripe（決済）/ SendGrid（メール）など"
              iconColor="text-orange-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            BaaSはこれらの層を全部クラウド側に用意してくれている。自分で組む必要がない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — 対比構造"
          description="「サーバー管理の担当範囲」を比較する。あなたが担当する割合が少ないほど、コードだけに集中できる。"
        >
          <ContrastBar
            rows={[
              {
                Icon: HardDrive,
                label: "物理サーバー",
                sublabel: "（VPS / 自前ラック）",
                yourPct: 90,
                cloudPct: 10,
              },
              {
                Icon: Layers,
                label: "仮想サーバー",
                sublabel: "（AWS EC2 / さくらVPS）",
                yourPct: 65,
                cloudPct: 35,
              },
              {
                Icon: Cloud,
                label: "BaaS",
                sublabel: "（Firebase / Supabase）",
                yourPct: 15,
                cloudPct: 85,
                highlight: true,
              },
            ]}
          />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { Icon: HardDrive, label: "物理サーバー", desc: "電源・冷却・OS・ミドルウェアまで全部自分" },
              { Icon: Layers, label: "仮想サーバー", desc: "物理はお任せ。OSより上は自分" },
              { Icon: Cloud, label: "BaaS", desc: "コード・設定だけ自分。インフラは全部お任せ", highlight: true },
            ].map(({ Icon, label, desc, highlight }, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${highlight ? "border-emerald-500/40 bg-emerald-500/5" : ""}`}
                style={!highlight ? { borderColor: "#2d3048" } : {}}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1.5 ${highlight ? "text-emerald-400" : "text-gray-400"}`} />
                <p className={`text-xs font-bold mb-1 ${highlight ? "text-emerald-300" : "text-white"}`}>{label}</p>
                <p className="text-xs text-gray-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </ConceptDiagram>

        {/* 概念図D: HTTP詳細フロー */}
        <ConceptDiagram title="概念図D：HTTPリクエスト〜レスポンスの詳細フロー" accentColor="emerald">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            ブラウザにURLを入力してからページが表示されるまで、裏側では以下のステップが順番に実行されています。
            各ステップを理解することで「なぜページ表示に時間がかかるのか」が見えてきます。
          </p>
          <div className="flex flex-col gap-2">
            {[
              { Icon: Monitor, label: "① ブラウザ", desc: "URLを入力 / リンクをクリック → HTTPリクエストを生成", color: "text-emerald-400" },
              { Icon: Globe, label: "② DNS解決", desc: "ドメイン名（example.com）→ IPアドレス（93.184.216.34）に変換", color: "text-sky-400" },
              { Icon: Wifi, label: "③ TCP接続", desc: "クライアント↔サーバー間で3-wayハンドシェイク（SYN→SYN-ACK→ACK）", color: "text-blue-400" },
              { Icon: Send, label: "④ HTTPリクエスト送信", desc: "GET /page HTTP/1.1 + ヘッダー（Host・Cookie・Accept など）", color: "text-purple-400" },
              { Icon: Cpu, label: "⑤ サーバー処理", desc: "リクエストを解析 → DB照会・ロジック実行 → レスポンス生成", color: "text-orange-400" },
              { Icon: FileText, label: "⑥ HTTPレスポンス送信", desc: "ステータスコード（200 OK等）+ ヘッダー + ボディ（HTML/JSON）", color: "text-yellow-400" },
              { Icon: Monitor, label: "⑦ ブラウザが描画", desc: "HTML解析 → DOM構築 → CSS適用 → JavaScriptで動的処理", color: "text-emerald-400" },
            ].map(({ Icon, label, desc, color }, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: "#2d3048", background: "#1a1d2a" }}>
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{label}</p>
                    <p className="text-xs text-gray-400 leading-snug">{desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
            <p className="text-xs text-emerald-300 font-semibold mb-1">ステータスコードの意味</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <span><span className="text-green-400 font-bold">2xx</span> 成功（200 OK, 201 Created）</span>
              <span><span className="text-yellow-400 font-bold">3xx</span> リダイレクト（301, 302）</span>
              <span><span className="text-orange-400 font-bold">4xx</span> クライアントエラー（404, 403）</span>
              <span><span className="text-red-400 font-bold">5xx</span> サーバーエラー（500, 503）</span>
            </div>
          </div>
        </ConceptDiagram>

        {/* 概念図E: ステートレスとセッション管理 */}
        <ConceptDiagram title="概念図E：ステートレスの本質とセッション管理の仕組み" accentColor="emerald">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            HTTPは「ステートレス」プロトコルです。サーバーはリクエストごとに「誰からの通信か」を覚えていません。
            ではなぜログイン状態が維持できるのか？ Cookie とセッションIDが解決します。
          </p>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
              <p className="text-sm font-bold text-red-300 mb-2">ステートレスの問題点</p>
              <div className="flex flex-col gap-2">
                {[
                  { step: "1回目", msg: "ログインしました（ID: user123）", color: "text-blue-400" },
                  { step: "2回目", msg: "別のページへ移動", color: "text-gray-400" },
                  { step: "サーバー", msg: "え、あなた誰ですか？（記憶なし）", color: "text-red-400" },
                ].map(({ step, msg, color }) => (
                  <div key={step} className="flex gap-2 text-xs">
                    <span className="text-gray-500 w-16 shrink-0">{step}:</span>
                    <span className={color}>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <p className="text-sm font-bold text-emerald-300 mb-2">Cookie＋セッションIDによる解決策</p>
              <div className="flex flex-col gap-2">
                {[
                  { step: "ログイン時", msg: "サーバーがセッションID発行 → Cookie に保存", color: "text-emerald-400" },
                  { step: "次回リクエスト", msg: "ブラウザが自動でCookieを送信（セッションIDを添付）", color: "text-sky-400" },
                  { step: "サーバー", msg: "セッションIDでユーザーを識別 → ログイン状態を維持", color: "text-emerald-400" },
                ].map(({ step, msg, color }) => (
                  <div key={step} className="flex gap-2 text-xs">
                    <span className="text-gray-500 w-24 shrink-0">{step}:</span>
                    <span className={color}>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: KeyRound, label: "セッションID", desc: "ランダムな文字列。本人確認の「チケット」", accent: "emerald" },
              { Icon: Database, label: "セッションDB", desc: "サーバー側でID→ユーザー情報のマッピングを保存", accent: "blue" },
              { Icon: RefreshCw, label: "有効期限", desc: "一定時間で無効化。セキュリティ確保のため必須", accent: "orange" },
            ].map(({ Icon, label, desc, accent }) => (
              <div key={label} className={`rounded-lg border border-${accent}-500/30 bg-${accent}-500/5 p-3 text-center`}>
                <Icon className={`w-5 h-5 mx-auto mb-1.5 text-${accent}-400`} />
                <p className={`text-xs font-bold text-${accent}-300 mb-1`}>{label}</p>
                <p className="text-xs text-gray-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </ConceptDiagram>

        {/* 概念図F: SSRの流れ */}
        <ConceptDiagram title="概念図F：SSR（サーバーサイドレンダリング）の流れ" accentColor="emerald">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            SSRでは「HTMLの生成」をサーバー側で行います。ブラウザは完成品のHTMLを受け取るため、
            初期表示が速くSEOにも有利です。通常のSPA（CSR）と比べながら理解しましょう。
          </p>
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">CSR（通常のSPA）の流れ</p>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  { label: "ブラウザ", sub: "リクエスト送信" },
                  { label: "サーバー", sub: "空のHTMLを返す" },
                  { label: "JS取得", sub: "bundle.jsをDL" },
                  { label: "JS実行", sub: "DOMを生成" },
                  { label: "表示完了", sub: "ここで初めて見える" },
                ].map(({ label, sub }, i, arr) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="rounded border border-gray-600 bg-gray-800 px-2 py-1 text-center">
                      <p className="text-xs font-bold text-gray-300">{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-2">SSR（Next.js等）の流れ</p>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  { label: "ブラウザ", sub: "リクエスト送信", highlight: false },
                  { label: "サーバー", sub: "DB取得+HTML生成", highlight: true },
                  { label: "完成HTML", sub: "コンテンツ込みで返す", highlight: true },
                  { label: "即表示", sub: "JSなしでも見える", highlight: false },
                  { label: "Hydration", sub: "JSで動的処理追加", highlight: false },
                ].map(({ label, sub, highlight }, i, arr) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`rounded border px-2 py-1 text-center ${highlight ? "border-emerald-500/40 bg-emerald-500/10" : "border-gray-600 bg-gray-800"}`}>
                      <p className={`text-xs font-bold ${highlight ? "text-emerald-300" : "text-gray-300"}`}>{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "初期表示速度", csr: "遅い（JS実行待ち）", ssr: "速い（HTML即返却）", winner: "ssr" },
              { label: "SEO", csr: "不利（空HTML）", ssr: "有利（コンテンツ入り）", winner: "ssr" },
              { label: "サーバー負荷", csr: "低い（静的配信）", ssr: "高い（毎回生成）", winner: "csr" },
            ].map(({ label, csr, ssr, winner }) => (
              <div key={label} className="rounded-lg border p-2" style={{ borderColor: "#2d3048" }}>
                <p className="text-xs font-bold text-white mb-1 text-center">{label}</p>
                <p className={`text-xs mb-0.5 ${winner === "csr" ? "text-emerald-400 font-semibold" : "text-gray-500"}`}>CSR: {csr}</p>
                <p className={`text-xs ${winner === "ssr" ? "text-emerald-400 font-semibold" : "text-gray-500"}`}>SSR: {ssr}</p>
              </div>
            ))}
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "自前サーバー（VPS / EC2）",
            "サーバーレス（Vercel Functions）",
            "BaaS（Firebase / Supabase）",
          ]}
          rows={[
            {
              label: "管理者",
              cells: [
                "自分（OS・ミドルウェア・セキュリティ全部）",
                "クラウド事業者（コードだけ自分）",
                "クラウド事業者（DB・認証・ストレージ込みで設定だけ）",
              ],
              highlightCol: 2,
            },
            {
              label: "コスト構造",
              cells: [
                "起動している間ずっと固定費",
                "リクエスト数×実行時間（呼ばれない時はゼロ円）",
                "無料枠＋使用量課金（DB読み書き・帯域など）",
              ],
              highlightCol: 2,
            },
            {
              label: "学習コスト",
              cells: [
                "高い（Linux・SSH・Nginx・セキュリティ・監視）",
                "中（関数として書く感覚は必要）",
                "低い（フロントから直接叩ける感覚）",
              ],
              highlightCol: 2,
            },
            {
              label: "代表例",
              cells: [
                "AWS EC2、さくらのVPS、ConoHa",
                "Vercel Functions、AWS Lambda、Cloudflare Workers",
                "Firebase、Supabase、AppWrite",
              ],
              highlightCol: 2,
            },
            {
              label: "個人開発での典型的な使い方",
              cells: [
                "複雑なビジネスロジックが必要になったとき",
                "フロントエンドと組み合わせて構成するとき",
                "学習コストを最小にして最短で動かしたいとき",
              ],
              highlightCol: 2,
            },
          ]}
          note="個人開発の初期段階では BaaS（Firebase / Supabase）から入るのが一般的。自前サーバーの知識は後から身につけても間に合うため、まずはBaaSで全体の流れを掴む方が効率が良い。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ボク実を言うと、いまだに「サーバー」が何なのかピンときていないんですよ……。なんか黒くて無骨な箱のイメージしかなくて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "正直に言えるのは素晴らしいことですよ、マジさん。一言で言うなら、サーバーとは「ホテルの24時間フロント係」です。お客様が来て「301号室の鍵をください」とおっしゃったら、奥の棚から鍵を持ってきてお渡しする。それをコンピューター上でやっているだけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあボクのMacBookもサーバーになれるってことですか？ 寝ている間に世界中から誰かにアクセスされてしまうんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "理論上はなれます。実際、`npm run dev` と打った瞬間、マジさんのMacは自分専用の小さなホテルとしてフロント係を始めています。ただし玄関の鍵（ファイアウォール）が閉まっているので、外のお客様は入れません。世のサーバーは「その玄関を開けて、24時間電気をつけたまま、世界中からの来客を受け入れている」というだけの違いです。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なるほど……。でもそれなら、最近よく聞く「BaaS」というものを使えば、もうサーバーのことは一切勉強しなくていいんじゃないですか？ Firebaseさえ使っていれば、ボクはもう無敵なのでは！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭いご指摘です。フロントエンド学習の初期段階では、それで十分です。BaaSはフロント係付きの居抜き物件のようなもので、開業初日から営業できます。ただ、いずれクライアントから「社内システムを作ってほしい」とご依頼を受けた時、先方の事情で自前のサーバーが必要になるケースがあります。完全に避け続けるのではなく、「今は使わないが、構造は理解している」という状態を目指していただくのが理想です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり、知らないと選べない、ということですね。BaaSを選んで使っているのと、それしか知らないから使っているのでは、天地の差があると。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです。サーバーの正体を知っていれば、BaaSの裏で何が起きているかも想像できるようになります。料理人が市場を知っているのと同じです。今日のところは「サーバー＝24時間営業のフロント係」、これだけ持ち帰っていただければ合格ですよ、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 サーバーの語源">
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>server</code>{" "}
            は英語の{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>serve</code>（給仕する・奉仕する）から来ている。
            コンピューター用語としても本質は同じで、「依頼を受けて何かを差し出す側の存在」を指す。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: Server,
              title: "server（サーバー）",
              subtitle: "serve = 給仕する・奉仕する",
              description: "依頼を受けて何かを差し出す側。レストランで料理を運ぶ「給仕係」と同じ語源。",
              accentColor: "emerald",
            },
            {
              Icon: Users,
              title: "client（クライアント）",
              subtitle: "client = 顧客・依頼人",
              description: "サービスを受ける・依頼する側。ブラウザはサーバーに「お願いする存在」。",
              accentColor: "blue",
            },
          ]} />
        </DetailBlock>

        <DetailBlock heading="6.2 物理サーバーと仮想サーバー">
          <UseCaseGrid cols={2} items={[
            {
              Icon: HardDrive,
              title: "物理サーバー",
              subtitle: "実在する鉄の箱",
              description: "データセンターのラックマウント型コンピューター。電源・冷却・回線まで自分で面倒を見る必要がある。",
              accentColor: "orange",
            },
            {
              Icon: Layers,
              title: "仮想サーバー（VM）",
              subtitle: "ソフトウェアで分割した区画",
              description: "1台の物理サーバーを分割し複数台に見せかけたもの。AWS EC2・さくらVPSはこの方式。",
              accentColor: "violet",
            },
          ]} />
          <CorrectionCard
            misconception="VPSを借りた = 専用のコンピューターが1台まるごと自分のもの"
            correction="実際は1台の物理マシンをソフトウェアで分割した区画のひとつを使っている"
            reason="個人開発者が「サーバーを借りる」と言うとき、それはほぼ仮想サーバーかクラウドのこと。物理サーバーを物理で買う場面はかなり少ない。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 「クラウド」は誰かのサーバー">
          <KeyPoint>
            「クラウド」の実態は他人のデータセンターのサーバーをネット経由で借りているだけ。VercelもFirebaseもSupabaseも最終的には誰かのラックに刺さった物理サーバーが動いている。"There is no cloud — it's just someone else's computer."
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 フロントエンドとバックエンドの分業">
          <UseCaseGrid cols={2} items={[
            {
              Icon: Monitor,
              title: "フロントエンド",
              subtitle: "ブラウザの中で動く",
              description: "HTML・CSS・JavaScript・React。ユーザーの目に直接触れる表示層。",
              accentColor: "sky",
            },
            {
              Icon: Server,
              title: "バックエンド（サーバー）",
              subtitle: "サーバーの中で動く",
              description: "API・DB操作・認証・課金・メール送信。ユーザーには見えないが、データの安全と整合性を守る。",
              accentColor: "emerald",
            },
          ]} />
          <p>このページでいう「サーバー」は、ほぼバックエンドの実行場所のこと。フロントエンドの世界しか知らなかった人は、ここで初めて「裏側」を意識する。</p>
        </DetailBlock>

        <DetailBlock heading="6.5 自前サーバーをいつ学ぶか">
          <Timeline items={[
            {
              year: "Stage 1",
              label: "BaaS で始める",
              description: "Firebase / Supabase + Vercel の組み合わせ。自前サーバー不要。フロントから直接DBを叩く感覚で開発できる。",
              accentColor: "emerald",
            },
            {
              year: "Stage 2",
              label: "BaaSの壁にぶつかる",
              description: "複雑なビジネスロジック・定期実行・サードパーティ連携など、BaaSだけでは対応しにくい要件が出てくる。",
              accentColor: "amber",
            },
            {
              year: "Stage 3",
              label: "自前サーバーへ踏み込む",
              description: "Express / Hono / Next.js API Routes / コンテナ・VPS へ。概念図Bで描いた「HTTPサーバー＋処理ロジック＋DB接続」の構造が地続きで活きる。",
              accentColor: "violet",
            },
          ]} />
          <KeyPoint>重要なのは「BaaSの裏で何が起きているか」を想像できるレベルにしておくこと。そのイメージがあれば、自前サーバーを学ぶときの地続き感がまったく違う。</KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "サーバーを建てずに済ませる選択肢の正体",
            icon: "Cloud",
          },
          {
            href: "/kiso/vercel",
            title: "Vercelって何？",
            description: "Next.jsアプリのデプロイ先として広く使われるサービス",
            icon: "Triangle",
          },
          {
            href: "/kiso/database",
            title: "データベースって何？",
            description: "サーバーの相棒となるデータの置き場",
            icon: "Database",
          },
        ]}
      />

      <PageDrill questions={serverQuestions} />
    </div>
  );
}
