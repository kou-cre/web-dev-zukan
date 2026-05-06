import Link from "next/link";
import {
  ShieldCheck,
  ShieldOff,
  Globe,
  Lock,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Filter,
  FileKey,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { securityRulesQuestions } from "@/content/questions/firebase/security-rules";

export const metadata = {
  title: "セキュリティルールって何？ | Web開発図解",
  description:
    "Firebaseセキュリティルールを図解で解説。なぜ必要か・3つの基本パターン・Auth連携まで初心者向けに1ページで理解する。",
};

export default function SecurityRulesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/firebase"
        className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block"
      >
        ← Firebase に戻る
      </Link>

      <Hero
        category="Firebase"
        title="セキュリティルールって何？"
        subtitle="サーバーなしでDBを直接公開するからこそ必要な、Firestore側の門番"
        body="クライアントからの全リクエストをFirestore側でチェックするルールの仕組みを理解する。"
        accentColor="rose"
      />

      <Prerequisites
        learn={[
          "セキュリティルールがなぜ必要なのか",
          "3つの基本パターン（全公開・認証済み・オーナーのみ）",
          "ルールがFirestore側で評価される理由",
        ]}
        prerequisites={[
          { text: "Firestoreとは何か", href: "/firebase/firestore" },
          { text: "BaaS（サーバーなしでDBに直接アクセスする仕組み）", href: "/kiso/baas" },
          "Firebase Authでのログインの概念（あると理解しやすい）",
        ]}
        outOfScope={[
          "get()・exists()を使った他コレクション参照",
          "カスタムクレームを使ったロールベース制御",
          "セキュリティルールのユニットテスト（firebase emulators）",
          "Firestoreルールシミュレーターの使い方",
        ]}
      />

      <OnePageSummary
        keyMessage="Firebaseセキュリティルールとは、Firestoreへのアクセスを制御する「ガードマン」。サーバーを書かずにDBに直接アクセスできるBaaSだからこそ、クライアントから届く全リクエストをFirestore側で審査する仕組みが必要になる。"
        metaphorTitle="クラブのガードマン"
        metaphorPoints={[
          {
            label: "クライアント",
            real: "FirestoreにデータのGET/POST/DELETEを送るアプリ（ブラウザやスマホ）",
            metaphor: "入場希望のお客",
          },
          {
            label: "セキュリティルール",
            real: "Firestoreが全リクエストを受け取る前に実行するアクセス制御の判定式",
            metaphor: "ガードマン（名簿チェック）",
          },
          {
            label: "request.auth",
            real: "リクエストに付いているFirebase Authのログイン情報。ログイン済みかどうかの証明書",
            metaphor: "会員証",
          },
          {
            label: "許可 / 拒否",
            real: "ルールの条件を満たせばデータが返る。満たさなければ Permission denied エラーが返る",
            metaphor: "入場OK / 入場禁止",
          },
        ]}
        definition="Firebaseセキュリティルールとは、Firestoreへのアクセスを制御するルール定義。Firestore側で評価されるためクライアントのコード変更では突破できない、唯一の信頼できる防壁。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「なぜセキュリティルールが必要なのか」を理解してから、ルールの評価フローを順番に確認しましょう。
        </p>

        {/* ── 概念図A: なぜ必要か ── */}
        <ConceptDiagram
          title="概念図A"
          description="なぜセキュリティルールが必要か — BaaSはDBに直接アクセスできる"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ルールなし */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(239,68,68,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldOff className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                  ルールなし
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>誰でも全データを読み書きできる</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>他ユーザーのデータも取得・上書き可能</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>URLを知っていれば誰でもアクセスできる</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 font-mono text-xs text-red-300"
                style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                allow read, write: if true;
              </div>
            </div>

            {/* ルールあり */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(244,63,94,0.05)", borderColor: "rgba(244,63,94,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                  ルールあり
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>ログイン済みユーザーだけが読める</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>自分のデータだけ書き換えられる</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>不正なリクエストは即拒否される</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 font-mono text-xs text-rose-300"
                style={{ backgroundColor: "rgba(244,63,94,0.08)" }}
              >
                allow write: if request.auth.uid == userId;
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-sm text-gray-300 leading-relaxed">
              通常のWebアプリはサーバー（APIルート）が間に入り、サーバー側でアクセス制御を行います。
              FirebaseのようなBaaSはサーバーなしでDBに直接アクセスできる分、
              Firestore側のセキュリティルールがサーバーの役割を代替します。
            </p>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          セキュリティルールが必要な理由が分かりました。次は、リクエストが届いてからルールが評価されるまでの流れを確認しましょう。
        </p>

        {/* ── 概念図B: ルールの評価フロー ── */}
        <ConceptDiagram
          title="概念図B"
          description="ルールの評価フロー — クライアントのリクエストがどこでチェックされるか"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Globe}
              title="クライアント"
              subtitle="アプリからリクエスト送信"
              accentColor="rose"
            />
            <FlowArrow label="リクエスト到着" direction="right" />
            <FlowCard
              Icon={Filter}
              title="Firestoreゲート"
              subtitle="セキュリティルールを評価"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="条件分岐" direction="right" />
            <div className="flex flex-col gap-2">
              <div
                className="rounded-xl border px-4 py-2 text-center"
                style={{ backgroundColor: "rgba(244,63,94,0.08)", borderColor: "rgba(244,63,94,0.3)" }}
              >
                <CheckCircle2 className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-white">許可</p>
                <p className="text-xs text-gray-400 mt-0.5">データを返す</p>
              </div>
              <div
                className="rounded-xl border px-4 py-2 text-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <XCircle className="w-4 h-4 text-red-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-white">拒否</p>
                <p className="text-xs text-gray-400 mt-0.5">Permission denied</p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">ポイント：ルールはFirestore側で動く</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              ルールの評価はGoogleのサーバー上で行われます。クライアント（ブラウザ）のJavaScriptをどれだけ書き換えても、
              ルールそのものを変更することはできません。
              これが{'"'}クライアント側のコードでアクセス制限すれば十分{'"'}という考えが間違いである理由です。
            </p>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          評価フローが分かりました。次は実際にどんなパターンのルールを書くのかを3つ確認しましょう。
        </p>

        {/* ── 概念図C: 3つの基本パターン ── */}
        <ConceptDiagram
          title="概念図C"
          description="3つの基本パターン — 用途に応じてルールを選ぶ"
        >
          <div className="space-y-3">
            {/* パターン1 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "rgba(239,68,68,0.5)" }}
                >
                  1
                </div>
                <Globe className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-white">全公開</p>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171" }}
                >
                  開発中のみ
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                条件なしで全員を許可。動作確認のための一時的な設定で、本番では使用禁止。
              </p>
              <div
                className="rounded-lg px-3 py-2 font-mono text-xs text-red-300"
                style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                allow read, write: if true;
              </div>
            </div>

            {/* パターン2 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(244,63,94,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "rgba(244,63,94,0.4)" }}
                >
                  2
                </div>
                <Lock className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-white">ログイン必須</p>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(244,63,94,0.15)", color: "#fda4af" }}
                >
                  最低限の保護
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                Firebase Authでログイン済みのユーザーだけを許可。未ログインのアクセスを遮断する。
              </p>
              <div
                className="rounded-lg px-3 py-2 font-mono text-xs text-rose-300"
                style={{ backgroundColor: "rgba(244,63,94,0.08)" }}
              >
                allow read, write: if request.auth != null;
              </div>
            </div>

            {/* パターン3 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(244,63,94,0.04)", borderColor: "rgba(244,63,94,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "rgba(244,63,94,0.6)" }}
                >
                  3
                </div>
                <UserCheck className="w-4 h-4 text-rose-300 flex-shrink-0" />
                <p className="text-sm font-semibold text-white">自分のデータだけ</p>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(244,63,94,0.2)", color: "#fda4af" }}
                >
                  本番推奨
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                ドキュメントのパスIDとログインユーザーのIDを照合。自分のドキュメントだけ変更できる。
              </p>
              <div
                className="rounded-lg px-3 py-2 font-mono text-xs text-rose-300"
                style={{ backgroundColor: "rgba(244,63,94,0.08)" }}
              >
                allow write: if request.auth.uid == userId;
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、クライアント側のコードで\n「ログイン済みじゃないならFirestoreにアクセスしない」\nって書けばよくないですか？\nわざわざセキュリティルールを書かなくていいのでは。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い視点ですね、マジさん。でも考えてみてください。\nブラウザで動くJavaScriptのコードは、開発者ツールで誰でも読めます。\nコードをどれだけ書き換えても、Firestoreのエンドポイントに\n直接リクエストを送ればクライアントの制限は無意味です。\nセキュリティはサーバー側、つまりFirestore側で行う必要があります。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "マジ？\nじゃあクライアント側のチェックはまったく意味がないんですか？\nボク、フロント側でも条件を書いていたんですが……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "意味がないわけではありません。クライアント側のチェックは\n「UXのための制御」として有効です。\nたとえばログイン前にボタンを非表示にするのはUXの改善です。\nただし、それはセキュリティではありません。\n本当のアクセス制御はサーバー側でしか実現できない。\n両方やる、というのが正解です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "ルールを書かないとどうなるんですか？\nFirestoreはデフォルトでどんな設定になっているんでしょう？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "新しいプロジェクトのデフォルトは「全公開」か「全拒否」の\nどちらかに設定されています、マジさん。\n全公開の場合、URLを知っている人なら誰でも全データを\n読み書きできる状態です。\n最初にルールを設定することを習慣にしてください。",
          },
          {
            speaker: "maji",
            emotion: "thinking",
            text: "request.auth.uid == userId ってよく出てきますよね。\nこれ、どこから来る値なんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "request.auth はFirebase Authのログイン情報を持つオブジェクトです。\nFirebase Authでログインすると認証トークンが発行され、\nFirestoreへのリクエストに自動で付与されます。\nその中のuid（ユーザーID）と、パスの{userId}を照合するのが\nオーナーチェックの基本パターンです。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["セキュリティルールなし", "セキュリティルールあり"]}
          rows={[
            {
              label: "アクセス制御",
              cells: ["誰でも全データを読み書き可能", "ログイン状態・所有者を条件にアクセスを制御"],
              highlightCol: 1,
            },
            {
              label: "リスク",
              cells: ["全ユーザーのデータが漏洩・改ざんされる可能性", "条件を満たさないリクエストは自動的に拒否される"],
              highlightCol: 1,
            },
            {
              label: "クライアント側の制限",
              cells: ["唯一の防壁（簡単に迂回される）", "UX補助として並用するが、セキュリティはルール側が担う"],
              highlightCol: 1,
            },
            {
              label: "実装場所",
              cells: ["JavaScriptコード内（ブラウザで実行）", "Firestoreコンソールまたは.rulesファイル（サーバー側で評価）"],
              highlightCol: 1,
            },
            {
              label: "APIルートの必要性",
              cells: ["不要（ただし全公開状態）", "不要（セキュリティルールがサーバーの役割を担う）"],
              highlightCol: 1,
            },
          ]}
          note="BaaSの強みはサーバーなしでDBに直接アクセスできること。その代わりFirestore側のセキュリティルールがサーバーの役割を担う。"
        />
      </section>

      {/* ── SectionDivider ──────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は実際にルールを書くときの構文・パターン集・よくある落とし穴です。基本3パターンを理解してから戻ってきましょう。"
      />

      {/* ── 応用編 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ルール構文とパターン集
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          実際にルールを書くときに必要な用語とよく使うパターンを整理します。
        </p>

        <TermNote
          terms={[
            {
              word: "match",
              definition:
                "ルールを適用するドキュメントのパスを指定するキーワード。`match /users/{userId}` のように書く。`{userId}` は任意のIDにマッチするワイルドカード。",
            },
            {
              word: "allow",
              definition:
                "どの操作（read / write / create / update / delete）を許可するかを指定するキーワード。`allow read, write: if 条件` のように書く。",
            },
            {
              word: "request.auth",
              definition:
                "リクエストに付いているFirebase Authのログイン情報。`request.auth.uid` で現在ログイン中のユーザーIDを取得できる。未ログインのときは null。",
            },
            {
              word: "resource.data",
              definition:
                "Firestoreに既に存在するドキュメントのフィールドにアクセスするオブジェクト。例えば `resource.data.authorId` で既存ドキュメントの authorId フィールドを参照できる。",
            },
            {
              word: "get()",
              definition:
                "ルール内で別のドキュメントのデータを取得する関数。`get(/databases/$(database)/documents/users/$(request.auth.uid))` のように使う。複雑な権限チェックに使う。",
            },
          ]}
        />

        {/* ── DetailSection ──────────────────────────────────── */}
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="1. ルールの基本構文">
          <p>
            セキュリティルールは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb7185" }}>firestore.rules</code>
            ファイルに書く。構造は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb7185" }}>rules_version</code>
            の宣言から始まり、
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb7185" }}>match</code>
            でパスを指定し、
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb7185" }}>allow</code>
            で操作と条件を定義する。
          </p>
          <CodeBlock
            title="firestore.rules"
            language="javascript"
            code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // match: ルールを適用するパスを指定
    // {userId} はワイルドカード（任意のIDにマッチ）
    match /users/{userId} {

      // allow <操作>: if <条件>
      // read = get + list の両方を許可
      allow read: if request.auth != null;

      // write = create + update + delete の全てを許可
      // request.auth.uid == userId で自分のドキュメントだけ許可
      allow write: if request.auth.uid == userId;
    }

    // ネストしたパス（サブコレクション）も match できる
    match /posts/{postId} {
      allow read: if true; // 誰でも読める（公開コンテンツ）
      allow create: if request.auth != null; // 書き込みはログイン必須
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}`}
          />
          <KeyPoint>
            `rules_version = {'"'}2{'"'}` は必須。バージョン2ではワイルドカードの挙動が改善されており、現在の標準。省略するとバージョン1になり意図しない動作になることがある。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. よく使うパターン集">
          <p>
            実際のアプリで繰り返し使われるルールパターンを確認する。
            シチュエーションに応じて組み合わせて使う。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Globe,
                title: "全公開",
                subtitle: "if true",
                description:
                  "全員が読み書き可能。開発中の動作確認専用で本番では絶対に残さない。",
                accentColor: "red",
              },
              {
                Icon: Lock,
                title: "認証済みのみ",
                subtitle: "request.auth != null",
                description:
                  "Firebase Authでログイン済みのユーザーだけを許可。最低限の保護として常に設定する。",
                accentColor: "rose",
              },
              {
                Icon: UserCheck,
                title: "オーナーのみ",
                subtitle: "request.auth.uid == userId",
                description:
                  "パスのIDとログインユーザーのIDを照合。自分のデータだけ変更できる本番推奨パターン。",
                accentColor: "emerald",
              },
              {
                Icon: ShieldCheck,
                title: "フィールド検証",
                subtitle: "request.resource.data",
                description:
                  "書き込みデータの内容をルール内でバリデーションする。不正なフィールドを拒否できる。",
                accentColor: "sky",
              },
              {
                Icon: FileKey,
                title: "既存データ参照",
                subtitle: "resource.data",
                description:
                  "Firestoreに既に存在するドキュメントのフィールドを参照して条件に使う。",
                accentColor: "violet",
              },
              {
                Icon: ArrowRight,
                title: "他コレクション参照",
                subtitle: "get() 関数",
                description:
                  "別コレクションのデータを読んで条件に使う。ロールチェックなど複雑な制御に使う。",
                accentColor: "amber",
              },
            ]}
          />
          <KeyPoint>
            ルールは「デフォルト拒否」で設計する。明示的に許可した操作だけが通る。書き忘れると Permission denied になるので、動かないときはルールを疑う習慣をつける。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. Auth連携パターン">
          <p>
            Firebase Authとセキュリティルールを連携させることで、
            サーバーコードなしで強固なアクセス制御が実現できる。
            実際のアプリでよく使われるパターンを確認する。
          </p>
          <CodeBlock
            title="auth-patterns.rules"
            language="javascript"
            code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── パターン A: ログインユーザーだけが読み書きできる ──
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }

    // ── パターン B: 自分のドキュメントだけ変更できる ──
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // ── パターン C: 投稿者だけが削除・編集できる ──
    // resource.data = Firestore に既にあるドキュメントのデータ
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }

    // ── パターン D: 書き込みデータのバリデーション ──
    // request.resource.data = 書き込もうとしているデータ
    match /profiles/{userId} {
      allow write: if request.auth.uid == userId
        && request.resource.data.name is string
        && request.resource.data.name.size() <= 50;
    }
  }
}`}
          />
          <CorrectionCard
            misconception="クライアント側のコードでアクセス制限すれば、セキュリティルールは不要"
            correction="クライアントのコードはブラウザで誰でも読め、簡単に迂回できる。セキュリティルールはFirestore側（サーバー）で動くため、クライアントのコード変更では突破できない。"
            reason="開発者ツールを開けばJavaScriptの中身は丸見えになる。また、curlやPostmanからFirestoreのエンドポイントに直接リクエストを送ることもできる。セキュリティの原則は「クライアントを信頼しない」こと。フロント側のチェックはUXのための補助に留め、本当の制御はセキュリティルールで行う。"
          />
        </DetailBlock>
      </DetailSection>

      {/* ── WarningPoint ────────────────────────────────────── */}
      <div className="mb-10">
        <div
          className="rounded-xl border p-4 flex items-start gap-3"
          style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}
        >
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-300 mb-1">
              開発中の `if true` を本番に残さない
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              開発中は動作確認のために{" "}
              <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#f87171" }}>
                allow read, write: if true;
              </code>{" "}
              を使うことがある。これは本番デプロイ前に必ず削除・変更すること。
              Firestoreコンソールの{'"'}ルール{'"'}タブで確認・更新できる。
              このルールのままデプロイすると全ユーザーのデータが誰でも読み書きできる状態になる。
            </p>
          </div>
        </div>
      </div>

      <RelatedLinks
        items={[
          {
            href: "/firebase/firestore",
            title: "Firestoreって何？",
            description: "セキュリティルールの制御対象であるDBの基礎を確認する",
            icon: "Database",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "サーバーなしでDBに直接アクセスできる仕組みの全体像",
            icon: "Server",
          },
          {
            href: "/firebase/auth",
            title: "Firebase Auth（準備中）",
            description: "request.auth の元となるユーザー認証を理解する",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={securityRulesQuestions} />
    </div>
  );
}
