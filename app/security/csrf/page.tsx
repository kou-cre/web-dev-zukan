import Link from "next/link";
import {
  FileWarning,
  ShieldCheck,
  AlertTriangle,
  CheckCheck,
  Globe,
  Server,
  KeyRound,
  Lock,
  Cookie,
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { csrfQuestions } from "@/content/questions/security/csrf";

export const metadata = {
  title: "CSRF | Web開発図解",
  description:
    "CSRFの仕組み・CSRFトークンによる対策・SameSite Cookieの設定を図解で解説。フォームを悪用した攻撃を防ぐ方法を学ぶ。",
};

export default function CsrfPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/security" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← セキュリティ基礎に戻る
        </Link>
      </div>

      <Hero
        category="セキュリティ基礎"
        title="CSRF"
        subtitle={"フォームを悪用した攻撃の仕組みとトークン対策・SameSite Cookie"}
        body={"CSRFはログイン状態を悪用する攻撃。SameSite CookieとCSRFトークンで防げる。仕組みを理解しよう。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "CSRF（クロスサイトリクエストフォージェリ）の攻撃の仕組み",
          "CSRFトークンによる対策の考え方",
          "SameSite Cookie属性でCSRFを防ぐ方法",
        ]}
        prerequisites={[
          "Cookieとは何か（ブラウザに保存されるデータ）を知っている",
          "ログイン状態がCookieやセッションで管理されることを知っている",
          "フォームのPOSTリクエストの基本を知っている",
        ]}
        outOfScope={[
          "Next.jsのServer Actionの詳細なCSRF対策実装",
          "SPA（シングルページアプリ）特有のCSRF対策設計",
          "Double Submit Cookieパターンの詳細",
        ]}
      />

      <OnePageSummary
        keyMessage="CSRFとは、ユーザーがログイン中の別のサイトから、そのユーザーになりすましてリクエストを送る攻撃。対策は2つ：①CSRFトークン（予測不能な値をフォームに埋め込む）②SameSite Cookie（別サイトからのリクエスト時にCookieを送らない）。"
        metaphorTitle="偽のお知らせメールで代わりに契約書にサインさせる"
        metaphorPoints={[
          {
            label: "CSRFの本質",
            real: "銀行にログイン中の状態で、攻撃者のサイトを開く。攻撃者のサイトのフォームが自動送信されると、銀行には『あなたが送ったリクエスト』として届く",
            metaphor: "本物の印鑑を持ったまま偽の書類にサインさせられる",
          },
          {
            label: "CSRFトークン",
            real: "フォームを生成するときにランダムなワンタイムパスワードを埋め込む。攻撃者はこの値を事前に知ることができないので偽のフォームが作れない",
            metaphor: "書類ごとにランダムな封印シールを貼る。破れていたら無効",
          },
          {
            label: "SameSite Cookie",
            real: "Cookieに『このサイト以外からのリクエストでは送らない』という設定をする。別サイトからリクエストが来てもCookieが届かないのでなりすましが失敗する",
            metaphor: "本人以外が持ち出せない印鑑",
          },
        ]}
        definition="CSRFはCross-Site Request Forgeryの略。ログイン中ユーザーのCookieを悪用して、別のサイトから不正なリクエストを送る攻撃。サーバー側の検証が不十分なときに成立する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずCSRFがどうやって成立するかを図で理解してから、2つの対策を確認しましょう。
          「仕組みを知れば対策が当たり前に見える」ようになります。
        </p>

        {/* ── 概念図A: CSRFの仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="CSRFが成立する流れ：ユーザーのログイン状態を利用した攻撃"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Step 1 */}
              <div
                className="rounded-lg border p-3 flex items-start gap-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span
                  className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
                >
                  1
                </span>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">ユーザーが銀行サイトにログイン</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    ブラウザに銀行サイトのセッションCookieが保存される。
                    以降、銀行へのリクエストにはこのCookieが自動付与される。
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div
                className="rounded-lg border p-3 flex items-start gap-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span
                  className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
                >
                  2
                </span>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">同じブラウザで攻撃者のサイトを開く</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    攻撃者のサイトには「自動送信される偽フォーム」が仕掛けられている。
                    例：action=&quot;https://bank.com/transfer&quot; のフォームが自動で送信される。
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div
                className="rounded-lg border p-3 flex items-start gap-3"
                style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
              >
                <span
                  className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(239,68,68,0.2)", color: "#f87171" }}
                >
                  3
                </span>
                <div>
                  <p className="text-sm font-semibold text-red-300 mb-1">銀行サーバーは本物のリクエストとして処理</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Cookieは自動でブラウザが送るため、銀行サーバーから見ると「ログイン済みユーザーからのリクエスト」に見える。
                    本人確認できず、振込が実行されてしまう。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          CSRFの仕組みが分かりました。次は2つの主要な対策を図で確認します。
        </p>

        {/* ── 概念図B: 対策1 CSRFトークン ── */}
        <ConceptDiagram
          title="概念図B"
          description="対策1：CSRFトークン——フォームに予測不能な値を埋め込む"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Server}
              title="サーバーがフォーム生成"
              subtitle="ランダムなCSRFトークンを埋め込む"
            />
            <FlowArrow label="フォームにトークン入り" direction="right" />
            <FlowCard
              Icon={Globe}
              title="ユーザーが送信"
              subtitle="トークンが一緒に送られる"
              highlight
              accentColor="amber"
            />
            <FlowArrow label="トークンを検証" direction="right" />
            <FlowCard
              Icon={CheckCheck}
              title="サーバーが検証"
              subtitle="一致 → 処理 / 不一致 → 拒否"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">なぜ攻撃者が偽れないのか</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              CSRFトークンはフォームを表示するたびにサーバーがランダムに生成します。
              攻撃者は事前にこの値を知ることができないため、正しいトークンを含む偽フォームを作れません。
              同一オリジンポリシーにより、攻撃者のサイトからはターゲットサイトのHTML（トークンの値）を読めないからです。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          CSRFトークンの次は、より現代的で実装が簡単な対策「SameSite Cookie」を見ていきます。
        </p>

        {/* ── 概念図C: 対策2 SameSite Cookie ── */}
        <ConceptDiagram
          title="概念図C"
          description="対策2：SameSite Cookie——別サイトからのリクエストではCookieを送らない"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cookie className="w-4 h-4 text-gray-400" />
                <p className="text-xs font-bold text-gray-400">SameSite=None</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                別サイトからのリクエストにもCookieを送る（従来の動作）。CSRF攻撃が成立しやすい。
              </p>
              <p className="text-xs text-red-400 mt-2">非推奨</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cookie className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-400">SameSite=Lax</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                通常のナビゲーション（リンクをクリック）のみCookieを送る。フォームPOSTには送らない。
              </p>
              <p className="text-xs text-blue-400 mt-2">モダンブラウザのデフォルト</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-bold text-amber-400">SameSite=Strict</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                別サイトから来た場合は一切Cookieを送らない。最も安全だが外部リンクからのログイン状態が引き継がれない。
              </p>
              <p className="text-xs text-amber-400 mt-2">最も強い保護</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            モダンブラウザはデフォルトで Lax になっており、多くのCSRFはこれだけで防げる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、CSRFって名前がCORSと似ていて混乱します。\nこの2つって何が違うんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い質問です、マジさん。名前は似ていますが全く別の概念です。\nCORS（コルス）はブラウザが『別サイトへのリクエストをブロックする』仕組み。\nCSRF（シーサーフ）は攻撃者が『あなたのログイン状態を悪用して、別サイトに勝手にリクエストを送らせる』攻撃です。\nCORSはブラウザが守る仕組み。CSRFはそのCORSの盲点を突く攻撃、と覚えると整理しやすいです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ CORSがあってもCSRF攻撃は成立するんですか？\nCORSで守られていると思っていたのに……。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "そこが重要なポイントです。\nCORSは『JavaScriptによるクロスオリジンのリクエスト』を制限します。\nしかしフォームのsubmit（HTMLフォームの送信）は、CORSの制限を受けません。\nブラウザは古くからフォームの送信を別サイトへ向けることを許可してきたからです。\nだからCSRFはフォームを悪用します。CORSはJSからのfetchを守るが、フォームのPOSTは守れない。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "じゃあフォームを使うアプリは全部危ないんですか？\nボクのアプリにもフォームがあって……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "落ち着いてください、マジさん。\nモダンブラウザはデフォルトで SameSite=Lax という設定になっています。\nこれは『別サイトからPOSTフォームを送ってきた場合、Cookieを一緒に送らない』という設定です。\nCookieがなければサーバーはログインユーザーとして認識できないので、攻撃が失敗します。\n特に新しいブラウザを使う一般ユーザーは、多くの場合すでにデフォルトで守られています。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、じゃあ何もしなくていいんですか？",
          },
          {
            speaker: "master",
            emotion: "serious",
            text: "マジさん、そこは慎重に考えてください。\n『デフォルトで守られている場合も多い』と『何もしなくていい』は違います。\nSameSite=Laxはサブドメインからのリクエストには効かない場合があります。\nまたCookieの設定を明示していないと、古いブラウザや環境で意図しない動作をする可能性がある。\n大事なフォーム（決済・メール変更・パスワード変更）には、CSRFトークンを明示的に実装するのが安全なエンジニアリングです。",
          },
          {
            speaker: "maji",
            emotion: "confident",
            text: "なるほど！\nCSRFはCORSと別物。フォームのPOSTを悪用する攻撃。\n対策は①SameSite Cookieの設定（Lax or Strict）と②CSRFトークン。\n大事なフォームには両方やるのが安全、ということですね！\nCORSと混同しないように、名前と内容をセットで覚えます。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["CSRF", "CORS"]}
          rows={[
            {
              label: "種類",
              cells: ["攻撃手法", "ブラウザのセキュリティ機能"],
              highlightCol: 1,
            },
            {
              label: "対象",
              cells: ["ログイン中ユーザーのCookieを悪用", "JavaScriptによる別オリジンへのfetch"],
              highlightCol: 1,
            },
            {
              label: "フォームPOSTへの影響",
              cells: ["成立しやすい（CSRFの主な手段）", "CORSは制限しない"],
              highlightCol: 1,
            },
            {
              label: "主な対策",
              cells: ["CSRFトークン・SameSite Cookie", "サーバーでAccess-Control-Allow-Originを設定"],
              highlightCol: 1,
            },
          ]}
          note="CSRFとCORSは名前が似ているが全くの別物。CSRFは攻撃の名前・CORSはブラウザの保護機能の名前。セットで理解すると混同が防げる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はNext.js Server ActionのCSRF対策・Cookieの設定方法など実装に必要な詳細です。"
      />

      {/* ── 応用編 ─────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Next.jsにおけるCSRF対策
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Next.js 14以降のApp RouterではServer Actionが登場しました。
          Server ActionはNext.jsが自動的にCSRF対策を行いますが、Route Handlerを使う場合は自分で実装が必要です。
        </p>

        <TermNote
          terms={[
            {
              word: "Server Action",
              definition:
                "Next.js App RouterのServer Actionは、組み込みのCSRF保護があります。Server Actionを使うとNext.jsがオリジン検証を自動で行います。",
            },
            {
              word: "Route Handler",
              definition:
                "app/api/xxx/route.ts のAPI。こちらはCSRF保護が自動では行われないため、必要に応じて自分でOriginヘッダーの検証やCSRFトークンを実装する。",
            },
            {
              word: "HttpOnly Cookie",
              definition:
                "JavaScriptからアクセスできないCookie。XSSでCookieを盗まれるリスクを減らせる。SameSiteとセットで設定するのがベストプラクティス。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図D"
          description="Cookieのセキュリティ属性のベストプラクティス"
        >
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              安全なCookieの設定例
            </p>
            <div
              className="rounded border p-3 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-gray-500">{"// Set-Cookie レスポンスヘッダー"}</p>
              <p>
                <span className="text-amber-300">Set-Cookie:</span>
                <span className="text-green-300"> sessionId=abc123;</span>
              </p>
              <p className="ml-16">
                <span className="text-blue-300">HttpOnly;</span>
                <span className="text-gray-500 ml-2">← JSから読めない（XSS対策）</span>
              </p>
              <p className="ml-16">
                <span className="text-blue-300">Secure;</span>
                <span className="text-gray-500 ml-2">← HTTPS通信でのみ送る</span>
              </p>
              <p className="ml-16">
                <span className="text-blue-300">SameSite=Lax;</span>
                <span className="text-gray-500 ml-2">← 別サイトのPOSTでは送らない（CSRF対策）</span>
              </p>
              <p className="ml-16">
                <span className="text-blue-300">Path=/</span>
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. Next.js App Routerでの安全なCookie設定">
          <p>
            Next.jsのRoute HandlerからCookieをセットする場合、
            セキュリティ属性を正しく設定することで CSRF・XSS リスクを大幅に下げられます。
          </p>
          <CodeBlock
            title="app/api/login/route.ts"
            language="typescript"
            code={`import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // ... 認証処理 ...

  const response = NextResponse.json({ success: true });

  response.cookies.set("sessionId", sessionToken, {
    httpOnly: true,      // JSから読めない（XSS対策）
    secure: true,        // HTTPS通信のみ（本番環境）
    sameSite: "lax",     // 別サイトPOSTではCookieを送らない（CSRF対策）
    maxAge: 60 * 60 * 24, // 24時間
    path: "/",
  });

  return response;
}`}
          />
          <KeyPoint>
            Next.jsのServer Actionは、内部でオリジン（Origin/Referer）の検証を行い、クロスオリジンのリクエストを自動的に拒否します。新しくAPI設計するならRoute HandlerよりServer Actionを選ぶと、CSRF対策のコードを自分で書く必要がなくなります。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. CSRFとXSSの関係">
          <CorrectionCard
            misconception="HttpOnly Cookieを使えばCSRFも防げる"
            correction="HttpOnly CookieはXSSでCookieを盗まれることを防ぐが、CSRFは防げない"
            reason="CSRFはブラウザが自動でCookieを送る性質を悪用する。HttpOnlyはJSからCookieを読めなくするだけで、ブラウザの自動送信には影響しない。CSRFにはSameSiteまたはCSRFトークンが必要。"
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Lock,
                title: "HttpOnly Cookie",
                subtitle: "XSSから守る",
                description: "JavaScriptからCookieを読めなくする。XSSでCookieを盗む攻撃を防ぐ。CSRFには効果なし。",
                accentColor: "amber",
              },
              {
                Icon: ShieldCheck,
                title: "SameSite Cookie",
                subtitle: "CSRFから守る",
                description: "別サイトからのリクエスト時にCookieを送らない設定。CSRFの主要な対策。XSS対策ではない。",
                accentColor: "amber",
              },
            ]}
          />
          <WarningPoint>
            XSS脆弱性があるとCSRFトークンが盗まれてCSRF対策が無効になることがある。XSS対策とCSRF対策は両方必要。Reactを正しく使えばXSSはほぼ防げるため、まずXSSを理解してからCSRFに取り組む順序がよい。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/security/cors",
            title: "CORS",
            description: "名前が似ているが別物。比較して理解しておこう",
            icon: "Globe2",
          },
          {
            href: "/security/xss",
            title: "XSS",
            description: "CSRFとセットで理解したいクロスサイト攻撃",
            icon: "Bug",
          },
          {
            href: "/security",
            title: "セキュリティ基礎 ハブ",
            description: "環境変数・APIキー漏洩など関連トピック一覧",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={csrfQuestions} />
    </div>
  );
}
