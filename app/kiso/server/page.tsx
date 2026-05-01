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
              <FlowCard Icon={Server} title="サーバー" subtitle="何を返すか決める頭脳" highlight />
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
              label: "このプロジェクト",
              cells: [
                "ステージ2（後回し）",
                "ステージ1〜2（Vercel採用なので自然と触ることになる）",
                "ステージ1のメイン土台（ここから始める）",
              ],
              highlightCol: 2,
            },
          ]}
          note="このプロジェクトでは BaaS（Firebase / Supabase）でステージ1を進める方針。自前サーバーはあとから知っても困らないものとして、ステージ2に置いている。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ぶっちゃけ言うと、僕いまだに「サーバー」が何なのかピンときてないんですよね……。なんか黒い箱のイメージしかなくて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "わかる、その正直さは大事だ。一言でいうとね、サーバーとは「ホテルの24時間フロント係」だよ。お客さんが来たら「お部屋の鍵ください」って言われて、奥から鍵を持ってきて渡す。あれをコンピューター上でやってるだけなんだ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "え、じゃあ僕のMacBookもサーバーになれます？ 寝てる間に誰かにアクセスされたりする？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "理論上はなれる。実際 `npm run dev` って打った瞬間、君のMacは自分専用ホテルとしてフロント係を始めている。ただし玄関の鍵（ファイアウォール）は閉まってるから、外の人は入れない。世のサーバーは「玄関を開けて、24時間電気をつけたまま、世界中からの来客を受け入れている」だけの違いなんだよ。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なるほど……。でもそれだったら、最近よく聞く「BaaS」っていうのを使えば、もうサーバーのこと勉強しなくてよくないですか？ Firebase使ってればいいじゃんって。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭い。実際、君のステージ1ではそれで十分だ。BaaSはフロント係付きの居抜き物件みたいなもので、開業初日から営業できる。ただ、君がいずれクライアントに「うちの社内システムを作ってほしい」と言われた時、相手の事情で自前のサーバーが必要になることがある。その日まで完全に避け続けるんじゃなく、今は触らない、でも構造は知っている状態にしておけばいい。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "あー、知らないと選べない、ってことですね。BaaSを選んで使っているのと、それしか知らないから使っているのじゃ全然違うと。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そういうこと。サーバーの正体を知っていれば、BaaSの裏で何が起きているかも想像できる。料理人が市場を知っているのと同じだ。今日のところは「サーバー＝24時間営業のフロント係」、これだけ持って帰ってくれれば十分合格だよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 サーバーの語源">
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>server</code>{" "}
            は英語の{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>serve</code>（給仕する・奉仕する）から来ている。
            レストランで料理を運ぶ人を server と呼ぶのと同じ語感。コンピューター用語としても本質は同じで、「依頼を受けて何かを差し出す側の存在」を指す。
          </p>
          <p>
            反対側、依頼する側は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>client</code>（顧客）。
            「クライアント・サーバー型」という言葉は、要するに「お客さんと給仕係の関係」と読み替えてOK。
          </p>
        </DetailBlock>

        <DetailBlock heading="6.2 物理サーバーと仮想サーバー">
          <p>
            <strong className="text-white">物理サーバー</strong>：実在する鉄の箱。データセンターのラックマウント型コンピューター。電源・冷却・回線まで自分で面倒を見る必要がある。
          </p>
          <p>
            <strong className="text-white">仮想サーバー（VM）</strong>：1台の物理サーバーをソフトウェア的に分割し、複数台のサーバーに見せかけたもの。AWS EC2 やさくらのVPSはこの方式。借りる側からすれば「1台のサーバーを借りた」感覚で扱える。
          </p>
          <KeyPoint>個人開発者が「サーバーを借りる」と言うとき、それはほぼ仮想サーバーかクラウドのこと。物理サーバーを物理で買う場面はかなり少ない。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 「クラウド」は誰かのサーバー">
          <p>
            「クラウド（Cloud）」という言葉は曖昧で、雲のようにフワッとどこかにある印象を持たれがち。実態は「他人が建てたデータセンターの中の物理サーバー（または仮想サーバー）を、ネット経由で借りているだけ」。
          </p>
          <KeyPoint>There is no cloud — it&apos;s just someone else&apos;s computer. Vercel も Firebase も Supabase も、最終的には誰かのデータセンターの物理サーバー上で動いている。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 フロントエンドとバックエンドの分業">
          <p>
            <strong className="text-white">フロントエンド</strong>：ブラウザの中で動く側。HTML・CSS・JavaScript・React など。ユーザーの目に直接触れる。
          </p>
          <p>
            <strong className="text-white">バックエンド</strong>：サーバーの中で動く側。API・DB操作・認証・課金・メール送信など。ユーザーには見えないが、データの安全と整合性を守る。
          </p>
          <p>このページでいう「サーバー」は、ほぼバックエンドの実行場所のこと。フロントエンドの世界しか知らなかった人は、ここで初めて「裏側」を意識する。</p>
        </DetailBlock>

        <DetailBlock heading="6.5 このプロジェクトで自前サーバーをどう扱うか">
          <p>
            <strong className="text-white">ステージ1</strong>：BaaS（Firebase または Supabase）+ Vercel で進める。自前サーバーの構築は学ばない。
          </p>
          <p>
            <strong className="text-white">ステージ2</strong>：必要が出てきた段階で、Express / Hono / Next.js API Routes / コンテナ・VPS のいずれかに踏み込む。
          </p>
          <KeyPoint>重要なのは「BaaSの裏で何が起きているか」を想像できるレベルにしておくこと。Firestoreのクエリも、SupabaseのRow Level Securityも、概念図Bで描いた「HTTPサーバー＋処理ロジック＋DB接続」の組み合わせがクラウド側で動いているだけだと理解しておけば、後でステージ2に進んだ時の地続き感が違う。</KeyPoint>
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
            description: "このプロジェクトでデプロイ先に選ぶ理由",
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
