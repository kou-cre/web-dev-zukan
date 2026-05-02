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
  Lock,
  DollarSign,
  AlertTriangle,
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
                accentColor="blue"
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

        <ConceptDiagram
          title="概念図E：Firebase認証の詳細フロー"
          description="ユーザーがログインしてからAPIアクセスが許可されるまでの一連の流れ。JWTトークンがどう発行・使用・検証されるかを追う。"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <FlowCard
                Icon={KeyRound}
                title="ユーザー入力"
                subtitle="メール/パスワード入力"
              />
              <FlowArrow label="SDK呼び出し" direction="right" />
              <FlowCard
                Icon={Cloud}
                title="Firebase Auth SDK"
                subtitle="クライアント側ライブラリ"
                highlight
                accentColor="blue"
              />
              <FlowArrow label="送信" direction="right" />
              <FlowCard
                Icon={Server}
                title="Firebase Authサーバー"
                subtitle="Googleのクラウドで検証"
              />
            </div>
            <div className="flex justify-center">
              <FlowArrow label="JWTトークン発行" direction="down" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <FlowCard
                Icon={HardDrive}
                title="クライアントに保存"
                subtitle="localStorageまたはメモリ"
              />
              <FlowArrow label="リクエスト時に添付" direction="right" />
              <FlowCard
                Icon={Database}
                title="Firestore / Functions"
                subtitle="トークンを自動検証"
                highlight
                accentColor="blue"
              />
              <FlowArrow label="検証OK" direction="right" />
              <FlowCard
                Icon={Zap}
                title="アクセス許可"
                subtitle="データ取得・書き込みが可能に"
              />
            </div>
          </div>
          <div
            className="mt-4 rounded-lg border p-3"
            style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
          >
            <p className="text-xs font-bold text-blue-300 mb-1">onAuthStateChanged — オブザーバーパターン</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              {`Firebase Auth はログイン状態の変化を監視する onAuthStateChanged() を提供する。ページ再読み込み後も自動的にセッションを復元し、ログアウト時には即座に UI を更新できる。「状態を毎回チェックする」のではなく「変化があったら通知される」設計。`}
            </p>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図F：Firestoreのドキュメント/コレクション構造"
          description="Firestoreのデータはコレクション → ドキュメント → フィールドの階層で管理される。SQLのテーブル構造との対比で理解する。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border-2 border-dashed border-blue-700/50 p-4"
            >
              <p className="text-xs font-semibold text-blue-400 text-center mb-3 tracking-wide uppercase">
                Firestore（NoSQL）
              </p>
              <StackLayer
                Icon={Database}
                title="Collection: users"
                subtitle="ドキュメントをまとめる入れ物"
                iconColor="text-blue-400"
              />
              <StackLayer
                Icon={HardDrive}
                title="Document: userId"
                subtitle="1ユーザー分のデータのまとまり"
                iconColor="text-sky-400"
              />
              <StackLayer
                Icon={Layers}
                title="Fields: name / email / createdAt"
                subtitle="キーと値のペア。型は自由"
                iconColor="text-cyan-400"
              />
              <StackLayer
                Icon={Database}
                title="SubCollection: posts"
                subtitle="ドキュメントの中にさらにコレクション"
                iconColor="text-blue-400"
              />
              <StackLayer
                Icon={HardDrive}
                title="Document: postId"
                subtitle="1投稿分のフィールドを持つ"
                iconColor="text-sky-400"
                showArrow={false}
              />
            </div>
            <div
              className="rounded-xl border-2 border-dashed border-gray-600/50 p-4"
            >
              <p className="text-xs font-semibold text-gray-400 text-center mb-3 tracking-wide uppercase">
                SQL（RDB）との対応
              </p>
              <div className="space-y-2">
                {[
                  { firestore: "Collection", sql: "Table（テーブル）" },
                  { firestore: "Document", sql: "Row（行・レコード）" },
                  { firestore: "Field", sql: "Column（列）" },
                  { firestore: "SubCollection", sql: "関連テーブル（JOIN）" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                    style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
                  >
                    <span className="text-xs text-blue-300 font-medium">{row.firestore}</span>
                    <span className="text-xs text-gray-500">→</span>
                    <span className="text-xs text-gray-400">{row.sql}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                NoSQLはスキーマレス（型・構造が自由）。柔軟な反面、設計をさぼると後で読み取りが困難になる。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図G：BaaSを使うと何が不要になるか"
          description="フルスタック自前構築と比較して、BaaSが肩代わりしてくれる作業を可視化する。担当範囲の差が圧倒的。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border-2 border-dashed border-gray-600/50 p-4"
            >
              <p className="text-xs font-semibold text-gray-400 text-center mb-3 tracking-wide uppercase">
                フルスタック自前構築
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "サーバー構築", muted: false },
                  { label: "OS管理・セキュリティパッチ", muted: false },
                  { label: "DBセットアップ・チューニング", muted: false },
                  { label: "認証実装（ハッシュ化・OAuth）", muted: false },
                  { label: "SSL証明書の設定・更新", muted: false },
                  { label: "スケーリング設定・負荷対応", muted: false },
                  { label: "バックアップ設定・障害対応", muted: false },
                  { label: "フロントエンド実装", muted: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${item.muted ? "opacity-40" : ""}`}
                    style={{
                      borderColor: item.muted ? "#2d3048" : "#ef444440",
                      backgroundColor: item.muted ? "#0f1117" : "#ef44440d",
                    }}
                  >
                    <Wrench size={12} className={item.muted ? "text-gray-600" : "text-red-400"} />
                    <span className={`text-xs ${item.muted ? "text-gray-600" : "text-red-300"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">自分が担当: 8項目</p>
            </div>
            <div
              className="rounded-xl border-2 border-dashed border-blue-700/50 p-4"
            >
              <p className="text-xs font-semibold text-blue-400 text-center mb-3 tracking-wide uppercase">
                BaaS（Firebase / Supabase）
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "サーバー構築", baas: true },
                  { label: "OS管理・セキュリティパッチ", baas: true },
                  { label: "DBセットアップ・チューニング", baas: true },
                  { label: "認証実装（ハッシュ化・OAuth）", baas: true },
                  { label: "SSL証明書の設定・更新", baas: true },
                  { label: "スケーリング設定・負荷対応", baas: true },
                  { label: "バックアップ設定・障害対応", baas: true },
                  { label: "フロントエンド実装", baas: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                    style={{
                      borderColor: item.baas ? "#2d3048" : "#3b82f640",
                      backgroundColor: item.baas ? "#0f1117" : "#3b82f60d",
                    }}
                  >
                    <Cloud size={12} className={item.baas ? "text-gray-600" : "text-blue-400"} />
                    <span className={`text-xs ${item.baas ? "text-gray-600 line-through" : "text-blue-300 font-medium"}`}>
                      {item.label}
                    </span>
                    {item.baas && (
                      <span className="ml-auto text-xs text-gray-600">BaaSが対応</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-400 text-center mt-3">自分が担当: 1項目のみ</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            BaaSを使うと「インフラ7項目」がまるごと不要になる。残るのはフロントエンドだけ。
          </p>
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
          <UseCaseGrid cols={2} items={[
            {
              Icon: KeyRound,
              title: "Auth（認証）",
              subtitle: "Firebase Auth / Supabase Auth",
              description: "メール・Google・GitHub・Apple など10以上のログイン手段を数行で実装。パスワードのハッシュ化・トークン管理・OAuth連携を全部肩代わりしてくれる。",
              accentColor: "amber",
            },
            {
              Icon: Database,
              title: "Database（DB）",
              subtitle: "Firestore（NoSQL）/ PostgreSQL（RDB）",
              description: "アプリのデータを保存・取得する核の部分。Firebase は Firestore（ドキュメント型）、Supabase は PostgreSQL（SQL対応）。",
              accentColor: "emerald",
            },
            {
              Icon: HardDrive,
              title: "Storage（ストレージ）",
              subtitle: "Cloud Storage / Supabase Storage",
              description: "画像・動画・PDFなど大きなファイルを保管する場所。DB に直接入れると重くなるため、ファイルは別管理が原則。",
              accentColor: "violet",
            },
            {
              Icon: Zap,
              title: "Functions（関数）",
              subtitle: "Cloud Functions / Edge Functions",
              description: "クライアントから直接見せられない処理（決済・メール送信など）をクラウド上で動かす。秘密鍵もここで守る。",
              accentColor: "orange",
            },
            {
              Icon: Cloud,
              title: "Hosting（ホスティング）",
              subtitle: "Firebase Hosting / Vercel と組み合わせ",
              description: "作った Web アプリを公開する場所。Firebase Hosting は静的サイト配信に特化。Supabase 単体では提供せず Vercel と組み合わせるのが一般的。",
              accentColor: "blue",
            },
          ]} />
        </DetailBlock>

        <DetailBlock heading="7.2 Firebase と Supabase の選び方">
          <UseCaseGrid cols={2} items={[
            {
              Icon: Flame,
              title: "Firebase を選ぶ理由",
              subtitle: "Google製・Firestore（NoSQL）",
              description: "資料が圧倒的に多い。Firestore のリアルタイム同期（onSnapshot）が強力でチャット・共同編集と相性抜群。無料枠（Spark プラン）が個人開発には十分寛大。SQL を書いたことがない人に最適。",
              accentColor: "orange",
            },
            {
              Icon: Layers,
              title: "Supabase を選ぶ理由",
              subtitle: "OSS・PostgreSQL（RDB）",
              description: "PostgreSQL ベースなので SQL が書ける。OSS なのでベンダーロックインを回避しやすく、いざとなれば自分のサーバーに移せる。RDB 設計に慣れている人ほど自然に入れる。",
              accentColor: "emerald",
            },
          ]} />
          <CorrectionCard
            misconception="Firebase か Supabase か、最初の選択を間違えると取り返しがつかない"
            correction="どちらも「BaaS」という同じカテゴリの中の選択。片方を理解すれば概念は8割方そのまま通用する"
            reason="Auth・DB・Storage・Functions の構造はどちらも共通。最初は Firebase から入って、必要になったタイミングで Supabase に乗り換える人も多い。道具を選ぶことより、選んだ道具を使いこなすことが先。"
          />
          <KeyPoint>
            初めて触るなら Firebase からで十分。SQL 経験者は Supabase の方がストレスが少ない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 BaaSの制約とトレードオフ">
          <UseCaseGrid cols={3} items={[
            {
              Icon: Lock,
              title: "ベンダーロックイン",
              description: "Firebase に深く依存すると移行コストが大きくなる。Firestore のクエリは Firestore 専用で、そのままでは PostgreSQL に持っていけない。",
              accentColor: "red",
            },
            {
              Icon: AlertTriangle,
              title: "クエリ制限",
              description: "Firestore は OR 検索・複数フィールドの不等号条件など、できないクエリがある。RDB なら自由な SQL も、Firestore では「先にデータ構造を寄せる」必要がある。",
              accentColor: "amber",
            },
            {
              Icon: DollarSign,
              title: "コスト構造",
              description: "BaaS は「使った分だけ」の従量課金。アクセスが急増すると DB の読み書き回数で課金が爆発するケースもある。設計段階からアクセスパターンを意識する必要がある。",
              accentColor: "orange",
            },
          ]} />
          <KeyPoint>
            BaaSはインフラ管理を代行してくれるが、データ設計・クエリ設計・コスト管理は自分の責任。特にFirestoreは「読み取りパターンを先に想定したデータ設計」が必要で、後から構造を変えると全データ移行が必要になることがある。
          </KeyPoint>
          <KeyPoint>
            BaaSは「最短で動かす」には最適。ただし「何が苦手か」を知った上で選ぶこと。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 BaaSの学習ロードマップ — どこから始めるか">
          <Timeline items={[
            {
              year: "Stage 1",
              label: "BaaS で始める",
              description: "Firebase（または Supabase）+ Vercel の組み合わせから入る。認証・DB・ストレージは BaaS で済ませ、フロントエンド（Next.js）と BaaS の組み合わせに集中する。",
              accentColor: "emerald",
            },
            {
              year: "Stage 2",
              label: "BaaSの裏を理解する",
              description: "BaaS の中身は「HTTPサーバー＋処理ロジック＋DB接続＋外部API連携」がクラウド側で動いているだけ。概念図Bの構造を意識しながら、何が裏でどう動いているかを想像できるようにする。",
              accentColor: "blue",
            },
            {
              year: "Stage 3",
              label: "BaaSの壁にぶつかる",
              description: "複雑なビジネスロジック・定期実行・Firestore のクエリ制限・コスト爆発など、BaaS だけでは対応しにくい要件が出てくる。この壁がサーバーサイドを学ぶ動機になる。",
              accentColor: "amber",
            },
            {
              year: "Stage 4",
              label: "自前バックエンドへ踏み込む",
              description: "Express / Hono / Next.js API Routes へ。案件で「自前で作ってほしい」と要請されたタイミングでも自然に入れる。BaaS の構造を知っていれば地続きで理解できる。",
              accentColor: "violet",
            },
          ]} />
          <KeyPoint>
            ゴールは「BaaS を使いこなしつつ、その裏で何が動いているか想像できる」状態。構造を理解しておけば、自前バックエンドを学ぶときの地続き感がまったく違う。
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
