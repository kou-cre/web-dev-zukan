import {
  Monitor,
  Cloud,
  Server,
  KeyRound,
  Database,
  HardDrive,
  Zap,
  Flame,
  Layers,
  Wrench,
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
import { baasQuestions } from "@/content/questions/kiso/baas";

export const metadata = {
  title: "BaaSって何？ | Web開発図解",
  description:
    "BaaS（Backend as a Service）の基本概念を図解で解説。Firebase / Supabase の違いから、サーバーとの関係まで。",
};

export default function BaasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="基礎概念"
        title="BaaSって何？"
        subtitle={
          "サーバーなしで『バックエンド済み』で始められる、インフラ全込みの台所。"
        }
        body={
          "認証・DB・ストレージ・通知まで、全部クラウドが用意してくれる。自分はコードを書くだけでよくなる。"
        }
        accentColor="blue"
      />

      <OnePageSummary
        keyMessage="BaaS（Backend as a Service）とは、認証・DB・ストレージ・通知などのバックエンド機能を、クラウド事業者がまるごと提供してくれるサービスのこと。サーバーを建てずに、フロントエンドのコードからほぼ直接バックエンド機能を呼び出せるようになる。Firebase や Supabase が代表例。"
        metaphorTitle="フルオプション付きのシェアキッチン"
        metaphorPoints={[
          {
            label: "Auth",
            real: "誰が入っていいかを判定する仕組み（Firebase Auth / Supabase Auth）",
            metaphor: "ドアの鍵と来客管理",
          },
          {
            label: "DB",
            real: "データを入れておく場所（Firestore / Supabase の PostgreSQL）",
            metaphor: "食材の冷蔵庫",
          },
          {
            label: "Storage",
            real: "画像・動画など大きなファイルを置く場所（Cloud Storage）",
            metaphor: "調理器具の棚",
          },
          {
            label: "Functions",
            real: "サーバー側で動かす処理（Cloud Functions / Edge Functions）",
            metaphor: "出前代行",
          },
        ]}
        definition="BaaSとは、サーバーを自分で建てずに、バックエンド機能を全部借りられるクラウドサービス。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="BaaSが肩代わりしてくれる範囲。自分のコードから何を経由してデータが行き来するのか。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Monitor}
              title="フロントエンド"
              subtitle="ブラウザで動くReact/Next.js"
            />
            <FlowArrow label="SDK経由" sublabel="firebase / supabase-js" direction="right" />
            <div className="flex flex-col items-center gap-1">
              <FlowCard
                Icon={Cloud}
                title="BaaS"
                subtitle="Auth / DB / Storage / Functions"
                highlight
              />
              <FlowArrow label="内部で接続" direction="down" />
              <FlowCard
                Icon={Server}
                title="物理サーバー"
                subtitle="クラウド側で動いている"
                muted
              />
            </div>
            <FlowArrow label="レスポンス" sublabel="JSON / ファイル" direction="left" />
            <FlowCard Icon={Monitor} title="ブラウザに描画" subtitle="受け取ったデータを表示" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「サーバーが消えた」のではなく、「BaaS側のサーバーを間借りしている」だけ。自分は触らないので存在を意識しないで済む。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="BaaSが内部で提供している主要機能。これらを自前で組むと、それぞれ別々の技術が必要になる。"
        >
          <div className="rounded-xl border-2 border-dashed border-blue-700/50 p-4">
            <p className="text-xs font-semibold text-blue-400 text-center mb-4 tracking-wide uppercase">
              BaaS — 内部機能
            </p>
            <StackLayer
              Icon={KeyRound}
              title="Auth（認証）"
              subtitle="メール・Google・GitHubなど10以上のログイン手段を即用意 — Firebase Auth / Supabase Auth"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={Database}
              title="Database（データベース）"
              subtitle="アプリのデータを保存・取得する — Firestore（NoSQL）/ Supabase（PostgreSQL）"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={HardDrive}
              title="Storage（ストレージ）"
              subtitle="画像・動画・PDFなどファイルを保管する — Cloud Storage / Supabase Storage"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Zap}
              title="Functions（関数）"
              subtitle="サーバー側で安全に実行したい処理 — Cloud Functions / Edge Functions"
              iconColor="text-orange-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            これらを自前で組むなら、認証はPassport.js、DBはMySQL、ストレージはS3、関数はExpressサーバー……と全部別々に建てることになる。BaaSはこれらをワンパッケージで提供する。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — 対比構造"
          description="自前バックエンド構築と BaaS で「自分が担当する範囲」を比較する。BaaSは自分の負担が劇的に小さい。"
        >
          <ContrastBar
            rows={[
              {
                Icon: Wrench,
                label: "自前バックエンド構築",
                sublabel: "（Express + MySQL + S3 + Passport.js）",
                yourPct: 90,
                cloudPct: 10,
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
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            {[
              { label: "認証実装", self: "自作 or Passport.js", baas: "SDK1行" },
              { label: "DBセットアップ", self: "MySQL構築・設定", baas: "管理画面でOK" },
              { label: "ストレージ", self: "S3契約・SDK統合", baas: "標準で同梱" },
              { label: "サーバー管理", self: "OS・監視・更新", baas: "クラウドが対応" },
              { label: "デプロイ", self: "Nginx・PM2・SSL", baas: "ホスティング込み" },
            ].map((row, i) => (
              <div
                key={i}
                className="rounded-lg border p-2.5 text-center"
                style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
              >
                <p className="text-xs font-bold text-white mb-1.5">{row.label}</p>
                <p className="text-xs text-gray-500 leading-tight mb-1">
                  自前: {row.self}
                </p>
                <p className="text-xs text-blue-300 leading-tight">
                  BaaS: {row.baas}
                </p>
              </div>
            ))}
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D"
          description="BaaSの代表格、Firebase と Supabase の特徴を並べる。どちらを選ぶかは「DBの形」と「自分のSQL経験」で決まる。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={Flame}
              title="Firebase"
              subtitle="Google製・Firestore（NoSQL）・リアルタイム同期に強い"
            />
            <FlowCard
              Icon={Layers}
              title="Supabase"
              subtitle="OSS・PostgreSQL（RDB）・SQLが使える"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-bold text-orange-300 mb-2">Firebase が向く場面</p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>・リアルタイム同期したいチャット系</li>
                <li>・SQLを書いたことがない</li>
                <li>・無料枠を最大限活かしたい</li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-bold text-emerald-300 mb-2">Supabase が向く場面</p>
              <ul className="text-xs text-gray-400 space-y-1 leading-relaxed">
                <li>・SQLが書ける・RDB設計に慣れている</li>
                <li>・将来のロックインを避けたい</li>
                <li>・テーブル間のJOINを多用したい</li>
              </ul>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["自前バックエンド", "Firebase", "Supabase"]}
          rows={[
            {
              label: "DB種類",
              cells: [
                "自由（MySQL / PostgreSQL など好きに選べる）",
                "Firestore（NoSQL・ドキュメント型）",
                "PostgreSQL（RDB・SQLが書ける）",
              ],
              highlightCol: 1,
            },
            {
              label: "認証",
              cells: [
                "自作 or Passport.js などのライブラリで実装",
                "Firebase Auth（10以上のプロバイダ標準対応）",
                "Supabase Auth（GitHub・Googleなど）",
              ],
              highlightCol: 1,
            },
            {
              label: "リアルタイム",
              cells: [
                "Socket.io 等を別途組み込みが必要",
                "onSnapshot（標準対応・強み）",
                "Realtime Subscriptions（PostgreSQLの変更を購読）",
              ],
              highlightCol: 1,
            },
            {
              label: "無料枠",
              cells: [
                "なし（サーバー代が常時かかる）",
                "Sparkプラン（個人開発には十分寛大）",
                "無料枠あり（DB容量・帯域に制限あり）",
              ],
              highlightCol: 1,
            },
            {
              label: "個人開発での選択例",
              cells: [
                "要件が複雑になったとき・チーム開発・既存システム連携",
                "リアルタイム同期が必要・SQLに慣れていない",
                "SQLに慣れている・RDB設計に慣れている",
              ],
              highlightCol: 1,
            },
          ]}
          note="SQLに慣れていない・最短で動かしたいなら Firebase から入るのが一般的。SQL経験者は Supabase に置き換えても話は通じる。重要なのは「BaaSという選択肢」を理解しておくこと。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、BaaSってよく聞く言葉なんですけど、結局なんなんですか？ なんかフワッとしていて、サーバーレスとかクラウドとかと何が違うのかボク全然区別ついてないんです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "いい質問ですよ、マジさん。BaaS は「フルオプション付きのシェアキッチン」だと思ってください。ドアの鍵（認証）も、食材の冷蔵庫（DB）も、調理器具の棚（ストレージ）も、出前代行（Functions）も、ぜんぶ最初から備え付けられている。自分はそこへ行ってコードを書くだけでよい、というサービスです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあもうサーバーって完全にいらなくなるってことですか？ これは人類の転換点かもしれません！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "落ち着いてください、マジさん。サーバーが消えたわけではありません。BaaS提供側のサーバーが、マジさんの代わりに動いているだけです。たとえるなら「自分の家を持たずに、ホテルに泊まり続けている」ようなもの。家を建てる手間はないけれど、ホテル（クラウド事業者）の建物は確かに存在しています。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なるほど……。あ、それで気になったんですけど、BaaSって Firebase と Supabase ってのがあるじゃないですか。ボクどっち選べばいいのか全然わからないんです。これ間違えたら一生取り返しがつかないんじゃ……！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "大袈裟ですよ、マジさん。最初は Firebase からで構いません。Google製で資料も多く、個人開発の最初のステップとして十分な選択肢です。SQL を書いたご経験があるなら Supabase（PostgreSQLベース）も自然な選択肢になります。ですが、今は道具を選ぶことより、選んだ道具を使いこなすことに集中するのが先です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり、BaaS を「使う」のと「依存する」のは違う、ということですね。BaaS の裏で何が動いているかを知らないままだと、いざ問題が起きたときに動けないと。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです、マジさん。BaaS の中身は、前回お話しした「HTTPサーバー＋処理ロジック＋DB接続＋外部API連携」がクラウド側で動いているだけ。構造を知っていれば、後でステージ2に進んだときに地続きで理解できます。今日のところは「BaaS＝バックエンド全部入りのシェアキッチン」、これだけ持ち帰っていただければ合格ですよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 BaaSが提供する主要機能">
          <p>
            <strong className="text-white">Auth（認証）</strong>：メール・Google・GitHub・Apple など、10以上のログイン手段を数行のコードで実装できる。自前で作ろうとすると、パスワードのハッシュ化・トークン管理・OAuth連携など、地雷が多い領域。
          </p>
          <p>
            <strong className="text-white">Database（DB）</strong>：Firebase は Firestore（NoSQL・ドキュメント型）、Supabase は PostgreSQL（RDB）。アプリのデータを保存・取得する核の部分。
          </p>
          <p>
            <strong className="text-white">Storage（ストレージ）</strong>：画像・動画・PDFなど大きなファイルを保管する場所。DBに直接入れると重くなるので、ファイルは別管理が原則。
          </p>
          <p>
            <strong className="text-white">Functions（関数）</strong>：クライアントから直接見せられない処理（決済・メール送信など）をクラウド上で動かす。Firebase は Cloud Functions、Supabase は Edge Functions。
          </p>
          <p>
            <strong className="text-white">Hosting（ホスティング）</strong>：作った Web アプリを公開する場所。Firebase Hosting は静的サイト配信に特化。Supabase 単体では提供せず、Vercel と組み合わせるのが一般的。
          </p>
        </DetailBlock>

        <DetailBlock heading="7.2 Firebase と Supabase の選び方">
          <p>
            <strong className="text-white">Firebase</strong> を選ぶ理由：Google 製で資料が圧倒的に多い。Firestore のリアルタイム同期（onSnapshot）が強力で、チャットや共同編集系と相性が良い。無料枠（Spark プラン）が個人開発には十分寛大。
          </p>
          <p>
            <strong className="text-white">Supabase</strong> を選ぶ理由：PostgreSQL ベースなので SQL が書ける。OSS（オープンソース）なのでベンダーロックインを回避しやすく、いざとなれば自分のサーバーに移せる。RDB 設計に慣れている人ほど自然に入れる。
          </p>
          <KeyPoint>
            初めて触るなら Firebase からで十分。SQL 経験者は Supabase の方がストレスが少ない。どちらも「BaaS」という同じカテゴリの中の選択なので、片方を理解すれば、もう片方の概念は8割方そのまま通用する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 BaaSの制約とトレードオフ">
          <p>
            <strong className="text-white">ベンダーロックイン</strong>：Firebase に深く依存すると、他社サービスへの移行コストが大きくなる。Firestore のクエリは Firestore 専用で、そのままでは PostgreSQL に持っていけない。
          </p>
          <p>
            <strong className="text-white">クエリ制限</strong>：Firestore は OR 検索・複数フィールドの不等号条件など、できないクエリがある。RDB なら自由に書ける SQL も、Firestore では「先にデータ構造を寄せておく」必要がある。
          </p>
          <p>
            <strong className="text-white">コスト構造</strong>：BaaS は「使った分だけ」の従量課金。アクセスが急増すると DB の読み書き回数で課金が爆発するケースもある。設計段階で「1ユーザーあたり何回読み書きするか」を意識する必要がある。
          </p>
          <KeyPoint>
            BaaSは「最短で動かす」には最適。ただし「何が苦手か」を知った上で選ぶこと。便利な分、設計上の制約を受け入れる前提で使う道具。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 BaaSの学習ロードマップ — どこから始めるか">
          <p>
            <strong className="text-white">最初のステップ</strong>：Firebase（または Supabase）+ Vercel の組み合わせから入るのが一般的。認証・DB・ストレージは BaaS で済ませ、フロントエンド（Next.js）と BaaS の組み合わせに集中する。
          </p>
          <p>
            <strong className="text-white">次のステップ</strong>：BaaS の制約にぶつかったとき、または案件で「自前で作ってほしい」と要請されたときに、Express / Hono / Next.js API Routes に踏み込む。
          </p>
          <KeyPoint>
            ゴールは「BaaS を使いこなしつつ、その裏で何が動いているか想像できる」状態。Firestore のクエリも、Supabase の Row Level Security も、概念図Bの「Auth・DB・Storage・Functions」の組み合わせがクラウド側で動いているだけ。構造を理解しておけば、自前バックエンドを学ぶときの地続き感が違う。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "BaaSの裏で動いているサーバーの正体",
            icon: "Server",
          },
          {
            href: "/kiso/database",
            title: "データベースって何？",
            description: "BaaSが提供するDBの役割と仕組み",
            icon: "Database",
          },
          {
            href: "/kiso/vercel",
            title: "Vercelって何？",
            description: "BaaSと組み合わせるホスティング先",
            icon: "Triangle",
          },
        ]}
      />

      <PageDrill questions={baasQuestions} />
    </div>
  );
}
