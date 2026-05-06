import Link from "next/link";
import {
  KeyRound,
  Mail,
  Globe,
  ShieldCheck,
  User,
  LogIn,
  RefreshCw,
  Lock,
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
import { Timeline } from "@/components/Timeline";
import { authQuestions } from "@/content/questions/firebase/auth";

export const metadata = {
  title: "Firebase Authって何？ | Web開発図解",
  description:
    "Firebase Authenticationを図解で解説。メール/パスワード認証・Googleログイン・onAuthStateChangedの仕組みをプログラミング初心者向けに1ページで理解する。",
};

export default function FirebaseAuthPage() {
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
        title="Firebase Authって何？"
        subtitle="サインアップ・ログイン・ログアウトをサーバーなしで実現できる認証サービス"
        body="パスワード管理の危険さと、Firebase Authがなぜ安全なのかをここで整理する。"
        accentColor="amber"
      />

      <Prerequisites
        learn={[
          "認証（Authentication）とは何か",
          "Firebase Authが提供するログイン方式（メール・Google）",
          "ログイン状態を監視する onAuthStateChanged の仕組み",
        ]}
        prerequisites={[
          { text: "BaaS（Backend as a Service）の概念", href: "/kiso/baas" },
          "JavaScriptの非同期処理（async/await）の基本",
          { text: "Firestoreの基本（セキュリティルールを理解するために）", href: "/firebase/firestore" },
        ]}
        outOfScope={[
          "電話番号認証・匿名認証などの認証方法",
          "カスタムトークン認証（独自バックエンドとの連携）",
          "Firebase Admin SDKを使ったサーバーサイド認証",
          "多要素認証（MFA）の設定",
        ]}
      />

      <OnePageSummary
        keyMessage="Firebase Authは、Googleが提供する認証サービス。メール/パスワードやGoogleアカウントでのログインを数行のコードで実現でき、パスワードのハッシュ化・セッション管理・不正アクセス対策をすべてGoogleに任せられる。"
        metaphorTitle="マンションのオートロック"
        metaphorPoints={[
          {
            label: "認証（Auth）",
            real: "「あなたは誰ですか？」という身元確認。鍵を持っているか、顔認証が通るかを確認する",
            metaphor: "オートロックの鍵穴",
          },
          {
            label: "uid",
            real: "認証が通ったユーザーに発行される固有ID。アプリ全体でそのユーザーを識別するための番号",
            metaphor: "部屋番号",
          },
          {
            label: "onAuthStateChanged",
            real: "ドアが開いた・閉まったを自動で検知するセンサー。ログイン・ログアウトのたびに通知が来る",
            metaphor: "ドア開閉センサー",
          },
          {
            label: "Googleログイン（Provider）",
            real: "「Googleの鍵でも入れますよ」という別の認証経路。自前でパスワードを管理しなくてよい",
            metaphor: "合鍵サービス",
          },
        ]}
        definition="Firebase Authとは、Googleが提供する認証サービス。メール/パスワード・Googleアカウントなど複数の方式でログインを実現し、セキュリティ上の複雑な処理を代わりに担ってくれるBaaS。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「認証とは何か」を確認し、次にFirebase Authがどんなログイン方式を提供しているかを見てから、ログイン状態の監視の仕組みを確認します。
        </p>

        {/* ── 概念図A: 認証の仕組み（鍵と鍵穴の比喩） ── */}
        <ConceptDiagram
          title="概念図A"
          description="認証とは何か — 鍵と鍵穴の比喩でイメージする"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* ユーザー側 */}
            <div
              className="rounded-xl border p-4 text-center w-full sm:w-44"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <User className="w-7 h-7 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-bold text-white">ユーザー</p>
              <p className="text-xs text-gray-500 mt-1">メールとパスワードを入力</p>
              <div
                className="rounded mt-2 px-2 py-1.5 flex items-center justify-center gap-1.5"
                style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}
              >
                <KeyRound className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                <span className="text-xs font-mono" style={{ color: "#fcd34d" }}>鍵を差し込む</span>
              </div>
            </div>

            <FlowArrow label="認証リクエスト" direction="right" />

            {/* Firebase Auth */}
            <div
              className="rounded-xl border-2 p-4 text-center w-full sm:w-44"
              style={{
                backgroundColor: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.5)",
              }}
            >
              <ShieldCheck className="w-7 h-7 mx-auto mb-2" style={{ color: "#fbbf24" }} />
              <p className="text-xs font-bold text-white">Firebase Auth</p>
              <p className="text-xs text-gray-400 mt-1">身元を確認する</p>
              <div
                className="rounded mt-2 px-2 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
              >
                鍵穴と照合
              </div>
            </div>

            <FlowArrow label="uid を発行" direction="right" />

            {/* アプリ */}
            <div
              className="rounded-xl border p-4 text-center w-full sm:w-44"
              style={{
                backgroundColor: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.25)",
              }}
            >
              <LogIn className="w-7 h-7 mx-auto mb-2" style={{ color: "#fbbf24" }} />
              <p className="text-xs font-bold text-white">アプリ</p>
              <p className="text-xs text-gray-400 mt-1">ログイン状態になる</p>
              <div
                className="rounded mt-2 px-2 py-1.5 font-mono text-[11px]"
                style={{ backgroundColor: "#0f1117", color: "#fcd34d" }}
              >
                uid: {'"abc123"'}
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-1">認証と認可の違い</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div
                className="rounded-lg p-3 border"
                style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(245,158,11,0.3)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#fbbf24" }}>認証（Authentication）</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  あなたは誰ですか？ という身元確認。Firebase Authが担う。
                </p>
              </div>
              <div
                className="rounded-lg p-3 border"
                style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(16,185,129,0.3)" }}
              >
                <p className="text-xs font-bold text-emerald-400 mb-1">認可（Authorization）</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  何にアクセスできますか？ という権限確認。Firestoreのセキュリティルールが担う。
                </p>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          認証の概念が分かりました。次はFirebase Authがどんなログイン方式（Provider）を提供しているかを確認します。
        </p>

        {/* ── 概念図B: ログイン方式（Provider） ── */}
        <ConceptDiagram
          title="概念図B"
          description="ログイン方式（Provider）— 複数の鍵口に対応している"
        >
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Mail,
                title: "メール/パスワード",
                subtitle: "最もシンプルな認証",
                description:
                  "メールアドレスとパスワードで登録・ログインする。パスワードはFirebase側がハッシュ化して保管するため、開発者がパスワードの実体を見ることはない。",
                accentColor: "amber",
              },
              {
                Icon: Globe,
                title: "Googleログイン",
                subtitle: "ソーシャルログイン",
                description:
                  "Googleアカウントでログインするボタンを1回押すだけでログインが完了する。パスワードをユーザー自身が管理しなくてよいため、利便性とセキュリティが両立する。",
                accentColor: "amber",
              },
            ]}
          />
          <div
            className="rounded-lg border p-3 mt-1"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs text-gray-500 leading-relaxed">
              他にもGitHub・Twitter・Facebookなどのソーシャルログインや電話番号認証が使えます。
              このページではメール/パスワードとGoogleログインの2つに絞って解説します。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          ログイン方式が分かりました。次はアプリが「今ログインしているかどうか」をどうやって知るかを確認します。
        </p>

        {/* ── 概念図C: onAuthStateChanged ── */}
        <ConceptDiagram
          title="概念図C"
          description="onAuthStateChanged — ログイン状態をリアルタイムで監視する"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div
              className="rounded-xl border p-4 text-center w-full sm:w-40"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <User className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-bold text-white">ユーザー</p>
              <p className="text-xs text-gray-500 mt-1">ログイン / ログアウト</p>
            </div>

            <FlowArrow label="状態が変化" direction="right" />

            <div
              className="rounded-xl border-2 p-4 text-center w-full sm:w-40"
              style={{
                backgroundColor: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.5)",
              }}
            >
              <RefreshCw className="w-6 h-6 mx-auto mb-2" style={{ color: "#fbbf24" }} />
              <p className="text-xs font-bold text-white">Firebase Auth</p>
              <p className="text-xs text-gray-400 mt-1">状態変化を検知</p>
            </div>

            <FlowArrow label="自動でコールバック" direction="right" />

            <div
              className="rounded-xl border p-4 text-center w-full sm:w-40"
              style={{
                backgroundColor: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.25)",
              }}
            >
              <Lock className="w-6 h-6 mx-auto mb-2" style={{ color: "#fbbf24" }} />
              <p className="text-xs font-bold text-white">アプリ</p>
              <div className="mt-2 space-y-1">
                <div
                  className="rounded px-2 py-1 text-[11px] font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#fcd34d" }}
                >
                  user → 表示切替
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">コールバックに渡される値</p>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-lg p-3 border"
                style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(245,158,11,0.3)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#fbbf24" }}>ログイン中</p>
                <p className="text-xs font-mono text-gray-300">user.uid, user.email など</p>
                <p className="text-xs text-gray-500 mt-1">userオブジェクトが届く</p>
              </div>
              <div
                className="rounded-lg p-3 border"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-bold text-gray-400 mb-1">未ログイン</p>
                <p className="text-xs font-mono text-gray-500">null</p>
                <p className="text-xs text-gray-500 mt-1">nullが届く</p>
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
            emotion: "question",
            text: "マスター、Firebase Authって何がそんなに便利なんですか？\nボク、メールとパスワードを保存するだけなら自分でデータベースに入れればいいのでは、と思っていて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その発想は危険です、マジさん。\nパスワードを自前でデータベースに保存するなら、まずハッシュ化とソルト付与が必要です。\n次にパスワードリセットメールの仕組み、ログインの失敗回数制限、セッションの失効管理……\nセキュリティ専門家でも実装を間違える領域です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "マジ！？ そんなに大変なんですか！\nボク、データベースに password: 123456 みたいに入れるだけかと思っていました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それをやると、万一データベースが漏洩した瞬間に全ユーザーのパスワードが丸見えになります。\nFirebase Authを使えば、パスワードの実体を開発者が一切見ることなく、\nGoogleが何百億のアカウントを守る技術で管理してくれます。\n鍵の管理を錠前師に任せるようなものです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "thinking",
            text: "なるほど……でもボク、気になることがあって。\nonAuthStateChangedって、毎秒サーバーに問い合わせているんですか？\nそれだとすごく重そうで。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "それも定期確認（ポーリング）とは全く別の仕組みです。\nFirebase Authは認証状態をブラウザ内のローカルストレージに保持しています。\nページを開いた瞬間・ログイン成功時・ログアウト時にだけコールバックが呼ばれる。\n常に通信しているわけではないので、負荷は心配無用です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ボク、やっと分かった気がします！\n認証（Auth）は身元を確認するだけで、\n何にアクセスできるかはFirestoreのセキュリティルールが別で決める、という役割分担ですね？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "完璧な整理です、マジさん。\n認証と認可を混同するのはよくある誤解で、\nFirebase Authだけ設定してセキュリティルールを書かないと、\nログインしていても他人のデータが読み書きし放題になります。\n両方セットで設計することが、安全なアプリの大前提です。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["自前認証（手作り）", "Firebase Auth"]}
          rows={[
            {
              label: "実装コスト",
              cells: [
                "ハッシュ化・ソルト・セッション管理など多数の実装が必要",
                "数行のSDKコードで完結",
              ],
              highlightCol: 1,
            },
            {
              label: "パスワード管理",
              cells: [
                "自前でDBに保存。漏洩リスクを自社が全て負う",
                "Googleが管理。開発者はパスワードの実体を見ない",
              ],
              highlightCol: 1,
            },
            {
              label: "セキュリティ品質",
              cells: [
                "実装者の知識に依存。専門家でも間違えやすい",
                "Googleの本番実績あるインフラ。常に最新の対策",
              ],
              highlightCol: 1,
            },
            {
              label: "ソーシャルログイン",
              cells: [
                "各プロバイダのOAuth2実装が個別に必要",
                "コンソールでONにするだけで即時対応",
              ],
              highlightCol: 1,
            },
            {
              label: "維持管理コスト",
              cells: [
                "脆弱性対応・依存ライブラリ更新を自社で継続",
                "Firebaseが自動でアップデート・対応",
              ],
              highlightCol: 1,
            },
          ]}
          note="自前認証は「コントロールを完全に持ちたい大規模サービス」向け。個人開発・スタートアップ段階ではFirebase Authを使う方がセキュリティリスクを確実に下げられる。"
        />
      </section>

      {/* ── SectionDivider ──────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は実際にコードを書くときに必要な知識です。概念を掴んでから戻ってきましょう。"
      />

      {/* ── 応用編 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 実装パターンと認証フロー
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Firebase Authを実際のコードで使うための3つのパターンを確認します。初期設定・メール認証・Googleログインの順に見ていきましょう。
        </p>

        <TermNote
          terms={[
            {
              word: "uid",
              definition:
                "ユーザー固有ID（User ID）。Firebase Authがログインを確認した際に発行する識別子。同一ユーザーは常に同じuidを持ち、Firestoreのドキュメントパスに使うのが定番パターン。",
            },
            {
              word: "onAuthStateChanged",
              definition:
                "ログイン状態が変化するたびに自動でコールバックを呼ぶFirebase Authの購読関数。ログイン中はuserオブジェクト、未ログイン時はnullが渡される。ReactのuseEffect内でサブスクライブするのが定番。",
            },
            {
              word: "Provider",
              definition:
                "認証方式のこと。GoogleAuthProvider・GithubAuthProviderなどがある。Providerを作成してsignInWithPopupに渡すことでソーシャルログインを実装できる。",
            },
            {
              word: "ID Token",
              definition:
                "ログイン済みユーザーに発行される一時的なトークン。バックエンドAPIへのリクエストにAttachすることで、サーバー側でもユーザーの認証状態を検証できる。有効期限は約1時間。",
            },
            {
              word: "signInWithPopup",
              definition:
                "ポップアップウィンドウを開いてソーシャルログインを行う関数。Googleログインの標準的な実装方法。モバイルではsignInWithRedirectを使うことが多い。",
            },
          ]}
        />

        {/* ── 概念図D: 認証フロー全体 ── */}
        <ConceptDiagram
          title="概念図D"
          description="認証フロー全体 — ブラウザからFirestore利用までの流れ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={User}
              title="ブラウザ"
              subtitle="ユーザーがログイン操作"
              accentColor="amber"
            />
            <FlowArrow label="認証情報を送信" direction="right" />
            <FlowCard
              Icon={ShieldCheck}
              title="Firebase Auth"
              subtitle="身元を確認・uid発行"
              highlight
              accentColor="amber"
            />
            <FlowArrow label="uidを返す" direction="right" />
            <FlowCard
              Icon={Lock}
              title="Firestore"
              subtitle="ルールがuidを確認してアクセス許可"
              accentColor="amber"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">
              FirestoreのセキュリティルールでAuthのuidを使う
            </p>
            <div
              className="rounded-lg px-3 py-2.5 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#0d1117" }}
            >
              <span className="text-gray-400">match /users/</span>
              <span className="text-amber-300">{"{"}</span>
              <span className="text-white">userId</span>
              <span className="text-amber-300">{"}"}</span>
              <span className="text-gray-400"> {"{"}</span>
              <br />
              <span className="text-gray-400 ml-4">allow write: if </span>
              <span className="text-amber-300">request.auth.uid</span>
              <span className="text-gray-400"> == </span>
              <span className="text-white">userId</span>
              <span className="text-gray-400">;</span>
              <br />
              <span className="text-gray-400">{"}"}</span>
              <span className="text-gray-500"> {"// 自分のデータだけ書き換えられる"}</span>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. メール/パスワード認証の実装パターン">
          <p>
            Firebase SDKを初期化したあと、
            <strong className="text-white"> createUserWithEmailAndPassword </strong>
            でアカウントを作成し、
            <strong className="text-white"> signInWithEmailAndPassword </strong>
            でログインする。どちらも非同期関数（Promiseを返す）。
          </p>
          <CodeBlock
            title="auth-email.ts"
            language="typescript"
            code={`import { auth } from "./firebase"; // Firebase Auth インスタンス
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// ── アカウント作成 ──
async function signUp(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log("登録完了:", user.uid); // → "abc123..."
}

// ── ログイン ──
async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log("ログイン成功:", user.email);
}

// ── ログアウト ──
async function logout() {
  await signOut(auth);
  console.log("ログアウト完了");
}`}
          />
          <KeyPoint>
            パスワードの実体はコードのどこにも保存しない。Firebase SDKが内部で安全に処理する。開発者が扱うのは「ユーザーが入力した文字列」をそのままSDKに渡すだけ。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. Googleログインの実装">
          <p>
            <strong className="text-white"> GoogleAuthProvider </strong>
            を作成して
            <strong className="text-white"> signInWithPopup </strong>
            に渡すだけで実装できる。Googleのポップアップが開き、ユーザーがアカウントを選ぶと自動的にログイン状態になる。
          </p>
          <CodeBlock
            title="auth-google.ts"
            language="typescript"
            code={`import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// ── Googleログイン ──
async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  console.log("Googleログイン成功:", user.displayName);
  console.log("uid:", user.uid);
  // → uid をFirestoreの users コレクションに保存するのが定番
}

// ── ログアウト（メール認証と同じ）──
async function logout() {
  await signOut(auth);
}`}
          />
          <KeyPoint>
            Googleログインのuidはメール認証のuidと同じ形式で発行される。どちらの方式でもFirestoreのセキュリティルールは同一のコードで機能する。Provider（認証方式）を意識せずにユーザーを統一的に扱える点がFirebase Authの強み。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. ログイン状態の購読（onAuthStateChanged）">
          <p>
            アプリを開いたとき・ページをリロードしたときに「ログイン済みかどうか」を確認するには
            <strong className="text-white"> onAuthStateChanged </strong>
            を使う。ReactのuseEffect内でサブスクライブし、クリーンアップで解除する。
          </p>
          <Timeline
            items={[
              {
                year: "1. 未ログイン",
                label: "アプリを初めて開く",
                description:
                  "onAuthStateChangedのコールバックにnullが渡される。ログイン画面を表示するなど未認証時のUIを出す。",
                accentColor: "gray",
              },
              {
                year: "2. ログイン中",
                label: "ログインボタンを押す",
                description:
                  "Firebase Authが認証を確認し、onAuthStateChangedのコールバックにuserオブジェクトが渡される。ホーム画面などを表示する。",
                accentColor: "amber",
              },
              {
                year: "3. リロード後",
                label: "ページを再読み込みする",
                description:
                  "Firebase Authはローカルストレージにセッションをキャッシュするためリロード後も自動でログイン状態が復元される。onAuthStateChangedが再度userオブジェクトを返す。",
                accentColor: "amber",
              },
              {
                year: "4. ログアウト",
                label: "ログアウトボタンを押す",
                description:
                  "signOut()を呼ぶとonAuthStateChangedのコールバックにnullが渡される。ログイン画面に戻る処理を書く。",
                accentColor: "gray",
              },
            ]}
          />
          <CodeBlock
            title="use-auth.ts（Reactカスタムフック）"
            language="typescript"
            code={`import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // サブスクライブ開始
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);   // ログイン中: User / 未ログイン: null
      setLoading(false);      // 初回確認が完了したらロード終了
    });

    // クリーンアップ: コンポーネントが消えたら購読解除
    return () => unsubscribe();
  }, []);

  return { user, loading };
}

// 使い方
// const { user, loading } = useAuth();
// if (loading) return <p>確認中...</p>;
// if (!user) return <LoginPage />;
// return <HomePage user={user} />;`}
          />
          <CorrectionCard
            misconception="認証（Firebase Auth）を設定すれば、Firestoreのセキュリティルールは不要になる"
            correction="Firebase Authは身元確認だけを行う。何にアクセスできるかはFirestoreのセキュリティルールで別途設定する必要がある。"
            reason="ログイン済みのユーザーでも、セキュリティルールがなければ他人のデータを読み書きできてしまう。Auth（認証）とFirestoreのルール（認可）は役割が異なる別の層。両方の設定が本番リリースの必須条件。"
          />
        </DetailBlock>
      </DetailSection>

      {/* ── 誤解訂正カード（スタンドアロン） ──────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CORRECTION
        </h2>
        <CorrectionCard
          misconception="認証＝セキュリティルールの代わりになる"
          correction="認証は「あなたは誰か」を確認するだけ。Firestoreのルールなしでは、ログイン済みユーザーが他人のデータを自由に読み書きできてしまう。"
          reason="Firebase Authが発行するuidを使ってFirestoreのセキュリティルールに「request.auth.uid == userId」のような所有者チェックを書くことで初めて、他人のデータへの不正アクセスを防ぐことができる。AuthとFirestoreルールはセットで設計するのが原則。"
        />
      </section>

      <RelatedLinks
        items={[
          {
            href: "/firebase/firestore",
            title: "Firestoreって何？",
            description: "認証後のデータ保存先。セキュリティルールとAuthの連携を理解する",
            icon: "Database",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "Firebase全体の位置付けをおさらいする",
            icon: "Server",
          },
          {
            href: "/kiso/database",
            title: "データベースって何？",
            description: "ユーザーデータを保存するDBの基本概念",
            icon: "HardDrive",
          },
        ]}
      />

      <PageDrill questions={authQuestions} />
    </div>
  );
}
