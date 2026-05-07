import {
  Server,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Lock,
  Database,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { serverValidationQuestions } from "@/content/questions/form/server-validation";

export const metadata = {
  title: "サーバーサイドバリデーション | Web開発図解",
  description:
    "クライアントバリデーションだけでは不十分な理由と、Next.js Server Actionsでのサーバーサイドバリデーションの実装を図解で解説。",
};

export default function ServerValidationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/form" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← フォーム・バリデーションに戻る
        </Link>
      </div>

      <Hero
        category="フォーム・バリデーション"
        title="サーバーサイドバリデーション"
        subtitle={"クライアント検証は「快適さ」のため、サーバー検証は「セキュリティ」のため"}
        body={"JavaScriptを無効化すればクライアントバリデーションは突破される。Next.js Server Actionsで必ずサーバー側でも検証する。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "クライアントバリデーションだけでは不十分な理由（セキュリティ上の限界）",
          "Next.js Server Actionsでサーバーサイドバリデーションを実装する方法",
          "Zodスキーマをクライアント・サーバーで共有する設計パターン",
        ]}
        prerequisites={[
          "クライアントバリデーション（React Hook Form・Zod）を知っている",
          "Next.jsのServer Actionsの基本（use server ディレクティブ）",
          "HTTPリクエストが改ざん可能であることの概念",
        ]}
        outOfScope={[
          "CSRF対策の詳細実装（セキュリティカテゴリで扱う）",
          "レートリミット（APIを叩きすぎ防止）の実装",
          "データベースのトランザクションとバリデーションの組み合わせ",
        ]}
      />

      <OnePageSummary
        keyMessage="クライアントバリデーションはUXを良くするためにあるが、JavaScriptを無効化したりHTTPリクエストを直接送れば簡単に突破される。データの安全を保証するのは常にサーバーサイドバリデーション。両方を実装するのが正しい設計。"
        metaphorTitle="空港のセキュリティチェック"
        metaphorPoints={[
          {
            label: "クライアントバリデーション",
            real: "搭乗口でパスポートを出させる。スムーズな誘導のための仕組み",
            metaphor: "搭乗口の確認",
          },
          {
            label: "サーバーサイドバリデーション",
            real: "出国審査でパスポートを機械で照合する。これが本当のセキュリティ",
            metaphor: "出国審査の機械照合",
          },
          {
            label: "JavaScriptを無効化",
            real: "搭乗口を素通りして直接飛行機に乗ろうとする",
            metaphor: "搭乗口のすり抜け",
          },
          {
            label: "サーバー側のZod検証",
            real: "出国審査での機械照合は騙せない。これが最後の防衛線",
            metaphor: "機械照合は騙せない",
          },
        ]}
        definition="サーバーサイドバリデーションとは、クライアントから送られてきたデータをサーバー上で再検証すること。クライアントを信頼せず、必ずサーバー側で確認する原則。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「クライアントバリデーションがなぜ突破されるか」を確認し、サーバーバリデーションが必要な理由を理解しましょう。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "Server Actions",
              definition: "Next.js 13以降の機能。「use server」ディレクティブを付けた関数をサーバー上で実行できる。フォームのactionに渡したりボタンのonClickから呼んだりできる。",
            },
            {
              word: "クライアントを信頼しない原則",
              definition: "「Never trust the client」というセキュリティの基本原則。ブラウザから送られてくるデータはすべて改ざんされた可能性があると考えてサーバー側で必ず検証する。",
            },
            {
              word: "useFormState",
              definition: "Server Actionsの返り値を受け取るためのReact Hook（Next.js App Router）。Server Actionが返したエラーをクライアント側で表示するために使う。",
            },
          ]}
        />

        {/* ── 概念図A: クライアントバリデーション突破の仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="クライアントバリデーションをどのように突破できるか？"
        >
          <div
            className="rounded-xl border-2 border-dashed border-red-700/40 p-4"
          >
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-3">
              クライアントバリデーションを突破する方法
            </p>
            <div className="space-y-3">
              <StackLayer
                Icon={ShieldAlert}
                title="方法1: JavaScriptを無効化"
                subtitle="ブラウザの設定でJavaScriptを切る。Reactのバリデーションは動かなくなりフォームが素通りになる"
                iconColor="text-red-400"
              />
              <StackLayer
                Icon={AlertTriangle}
                title="方法2: DevToolsで直接DOM操作"
                subtitle="ブラウザの開発者ツールでinputのvalue属性を書き換えてから送信する"
                iconColor="text-amber-400"
              />
              <StackLayer
                Icon={Server}
                title="方法3: curlやPostmanで直接リクエスト"
                subtitle="ブラウザを使わずHTTPリクエストを直接サーバーに送る。フォームのUIをまったく経由しない"
                iconColor="text-orange-400"
                showArrow={false}
              />
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <p className="text-xs font-semibold text-red-300 mb-2">これが意味すること</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              クライアントバリデーションは「ブラウザが正直に動いている前提」でしか機能しません。悪意あるユーザーや自動化ツールにとって、ブラウザ上のバリデーションは存在しないも同然です。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          クライアントバリデーションが突破できることが分かりました。次にクライアントとサーバーの両方で検証する正しいアーキテクチャを見ていきます。
        </p>

        {/* ── 概念図B: 正しい検証レイヤー構造 ── */}
        <ConceptDiagram
          title="概念図B"
          description="クライアントとサーバーの両方で検証する正しいアーキテクチャ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Layers}
              title="フォーム入力"
              subtitle="ユーザーが入力"
            />
            <FlowArrow label="送信ボタン" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="クライアントバリデーション"
              subtitle="React Hook Form + Zod"
              highlight
              accentColor="green"
            />
            <FlowArrow label="問題なければ送信" direction="right" />
            <FlowCard
              Icon={Server}
              title="Server Action"
              subtitle="サーバー上で実行"
            />
            <FlowArrow label="再度バリデーション" direction="right" />
            <FlowCard
              Icon={Database}
              title="DBに保存"
              subtitle="安全なデータのみ"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 mb-2">クライアントバリデーションの役割</p>
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>送信前にエラーを表示してUXを向上</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>無駄なサーバーリクエストを減らす</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>即時フィードバックで入力をサポート</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 mb-2">サーバーバリデーションの役割</p>
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>データの安全保証（最後の防衛線）</span>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>ビジネスルールの検証（例：メール重複）</span>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>DB制約違反の事前チェック</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            クライアントとサーバーは同じZodスキーマを共有できる——コードの重複なしに両方で検証できる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、React Hook FormとZodでバリデーションをバッチリ書いたんですけど、これでもう完璧ですよね？ なぜサーバー側でも検証しないといけないんでしょう？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "空港のセキュリティを思い浮かべてください、マジさん。\n搭乗口でパスポートを出させるのはクライアントバリデーション。\nでも本当のセキュリティは出国審査で機械がパスポートを照合すること。\n搭乗口を素通りして出国審査に直接行けば搭乗口の確認は無意味です。\nHTTPリクエストを直接送れば、ブラウザのバリデーションを完全にスキップできます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え！ curlコマンドで直接リクエスト送ればいいということですか！？\nじゃあクライアントのバリデーションって意味がないんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "意味はあります。UXを良くするためにあります。\n入力ミスをすぐに知らせてくれるのはユーザー体験として重要です。\nただしセキュリティの観点では、クライアントバリデーションは「信頼できない」んです。\n正直なユーザーには素晴らしい体験を提供し、悪意あるリクエストはサーバーで弾く——この両立が必要です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でもサーバーでバリデーションを書くと、クライアントと同じコードを2回書くことになりませんか？ DRYの原則に反しませんか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "鋭い観点です。ここでZodが活きます。\nZodのスキーマファイルをクライアントとServer Actionの両方からimportして使えるんです。\n同じスキーマを共有するので、「2回書く」問題は起きません。\nスキーマを変えたら自動的に両方に反映される、というのがZodとServer Actionsの組み合わせの一番の強みです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ スキーマを共有するんですね！\nServer Actionsでエラーが起きたとき、クライアント側のフォームにそのエラーを表示するにはどうするんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Server Actionからエラーオブジェクトをreturnしてもらい、useFormStateフックで受け取るパターンが一般的です。\nまたはServer Actionが投げたエラーをtry/catchで受けてStateに入れる方法もあります。\n大事なのは「サーバーエラーもフォームのエラーと同じように表示する」こと。\n「メールアドレスは既に使われています」というような、サーバーでしか分からないエラーはクライアントバリデーションでは出せない典型例です。",
          },
          {
            speaker: "maji",
            emotion: "confident",
            text: "なるほど！ つまりクライアントもサーバーも同じZodスキーマで守る、2重の防衛線ということですね！ ボク今後は必ずサーバーバリデーションも書きます！",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["クライアントバリデーション", "サーバーサイドバリデーション"]}
          rows={[
            {
              label: "主な目的",
              cells: ["UXの向上（即時フィードバック）", "セキュリティ（最後の防衛線）"],
              highlightCol: 1,
            },
            {
              label: "突破できるか",
              cells: ["できる（JS無効・curl等）", "できない（サーバー側で必ず実行）"],
              highlightCol: 1,
            },
            {
              label: "実行タイミング",
              cells: ["送信前（ブラウザ上）", "データ到達後（サーバー上）"],
              highlightCol: 1,
            },
            {
              label: "ビジネスルール検証",
              cells: ["困難（DBにアクセスできない）", "可能（メール重複チェックなど）"],
              highlightCol: 1,
            },
            {
              label: "エラー表示速度",
              cells: ["即時（ネットワーク不要）", "往復時間が必要"],
              highlightCol: 0,
            },
          ]}
          note="両方必須。クライアントで「快適さ」を、サーバーで「安全」を担保する。どちらかだけでは不完全。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はNext.js Server Actionsでの具体的な実装パターンです。"
      />

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 Server ActionsでのZodバリデーション">
          <p>
            Next.jsのServer Actionsを使うと、サーバー側のバリデーションをフォームのアクションに直接接続できます。
            同じZodスキーマをimportして使うのがポイントです。
          </p>
          <CodeBlock
            title="actions/signup.ts"
            language="typescript"
            code={`'use server';

import { z } from 'zod';

// クライアントと同じスキーマをimport（またはここに定義して両方でimport）
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signupAction(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // サーバー側でバリデーション
  const result = signupSchema.safeParse(rawData);

  if (!result.success) {
    // エラーをクライアントに返す
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // バリデーション通過後にDBに保存
  // await db.user.create({ data: result.data });

  return { success: true };
}`}
          />
          <KeyPoint>
            Server Actionsでは FormData でデータが来るため formData.get() で取り出してからsafeParseに渡す。result.error.flatten().fieldErrors でフィールド別のエラーを取得できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 サーバーエラーをフォームに表示する">
          <p>
            Server Actionがエラーオブジェクトをreturnしたとき、クライアント側のフォームにそのエラーを表示するパターンです。
          </p>
          <CodeBlock
            title="signup-form.tsx"
            language="tsx"
            code={`'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupAction } from './actions/signup';

export function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await signupAction(new FormData(/* ... */));
    if (!result.success) {
      // サーバーから返ってきたエラーをStateに入れる
      setServerError('このメールアドレスは既に使用されています');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* クライアントエラー */}
      {errors.email && <p role="alert">{errors.email.message}</p>}
      {/* サーバーエラー */}
      {serverError && <p role="alert">{serverError}</p>}
      <input {...register('email')} />
      <button type="submit">登録</button>
    </form>
  );
}`}
          />
          <CorrectionCard
            misconception="クライアントバリデーションが通れば、サーバーには正しいデータが来る"
            correction="クライアントバリデーションはユーザー体験のための仕組みであり、セキュリティ保証にはならない。サーバーに届くデータは常に疑って再検証する"
            reason="HTTPリクエストはブラウザを経由しなくても送れる。curlやBurp Suiteなどのツールを使えばフォームのUIを一切使わずデータを送れる。「信頼できるのはサーバーで確認した後のデータだけ」という原則をセキュリティの基本とする。"
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle2,
                title: "クライアントでしか分からないこと",
                subtitle: "UX起点のバリデーション",
                description: "必須チェック・長さ・メール形式・パスワード強度インジケーターなど。サーバーに送る前の基本的な形式チェック。",
                accentColor: "green",
              },
              {
                Icon: Database,
                title: "サーバーでしか分からないこと",
                subtitle: "ビジネスルールのバリデーション",
                description: "メールアドレスの重複・クーポンコードの有効性・在庫数・ユーザーの権限など。DBに問い合わせないと分からない検証はサーバーのみで実施。",
                accentColor: "blue",
              },
            ]}
          />
          <WarningPoint>
            Server Actionsを使わずAPI Routesを使う場合も原則は同じ。リクエストボディをそのままDBに入れず、必ずサーバー側でスキーマ検証してから処理する。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/form/zod",
            title: "Zodでスキーマ定義",
            description: "クライアントとサーバーで共有するZodスキーマの書き方",
            icon: "Shield",
          },
          {
            href: "/form/react-hook-form",
            title: "React Hook Form",
            description: "クライアントバリデーションの土台となるフォームライブラリ",
            icon: "BookOpen",
          },
          {
            href: "/form/error-ux",
            title: "エラー表示UX",
            description: "サーバーエラーをフォームに適切に表示する設計",
            icon: "AlertCircle",
          },
        ]}
      />

      <PageDrill questions={serverValidationQuestions} />
    </div>
  );
}
