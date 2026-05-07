import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCode,
  Type,
  Hash,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
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
import { zodQuestions } from "@/content/questions/form/zod";

export const metadata = {
  title: "Zodでスキーマ定義 | Web開発図解",
  description:
    "TypeScriptで型安全なバリデーションルールを書くZodの基本。z.string().min()などのAPIと、React Hook Formとの統合を図解で解説。",
};

export default function ZodPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/form" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← フォーム・バリデーションに戻る
        </Link>
      </div>

      <Hero
        category="フォーム・バリデーション"
        title="Zodでスキーマ定義"
        subtitle={"TypeScriptの型とバリデーションルールを同時に書けるスキーマライブラリ"}
        body={"z.string().min().email() のように「どんな値がOKか」を宣言的に定義し、型推論とバリデーションを一括管理する。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Zodがバリデーションルールと型を同時に定義できる仕組み",
          "z.string()・z.number()・z.object() などの基本API",
          "z.infer<typeof schema> で型を自動生成する方法",
        ]}
        prerequisites={[
          "TypeScriptの基本型（string・number・boolean）を知っている",
          "interfaceまたはtypeでオブジェクト型を定義した経験がある",
          "React Hook FormのuseFormを知っていると理解が深まる",
        ]}
        outOfScope={[
          "ZodとReact Hook FormのresolveryによるDX最適化の詳細（応用編で扱う）",
          "カスタムバリデーション（z.refineの高度な使い方）",
          "Zodのtransformとpreprocessによるデータ変換",
        ]}
      />

      <OnePageSummary
        keyMessage="Zodはバリデーションルールを書くだけで、TypeScriptの型も自動で生成されるスキーマライブラリ。z.infer<typeof schema> で型を取り出せるため、型とバリデーションの二重管理が不要になる。"
        metaphorTitle="金型と品質検査の一体型機械"
        metaphorPoints={[
          {
            label: "スキーマ",
            real: "製品の設計図兼品質基準。どんな形・寸法の製品がOKかを1枚の図で定義",
            metaphor: "設計図兼品質基準",
          },
          {
            label: "z.string().min(8)",
            real: "「8文字以上の文字列」という仕様。設計図に「長さは8mm以上」と書いたのと同じ",
            metaphor: "長さ基準付き仕様",
          },
          {
            label: "z.infer",
            real: "設計図から自動で部品一覧を生成する機械。型を手書きしなくていい",
            metaphor: "部品一覧の自動生成",
          },
          {
            label: "safeParse",
            real: "製品を品質検査機に通す。OKなら合格データを、NGならエラー理由を返す",
            metaphor: "品質検査機",
          },
        ]}
        definition="Zodはバリデーションルールとして書いたスキーマからTypeScript型を自動生成するランタイムバリデーションライブラリ。型の二重管理を排除する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずZodの基本的なAPIを確認し、従来の「interfaceを書いてバリデーションも別途書く」二重管理がどう解消されるかを見ていきましょう。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "スキーマ",
              definition: "「どんな値が有効か」を定義した設計書。Zodではz.object({...})などで作成する。",
            },
            {
              word: "z.infer",
              definition: "Zodスキーマから TypeScript の型を自動生成するユーティリティ。type FormData = z.infer<typeof schema> のように使う。",
            },
            {
              word: "parse / safeParse",
              definition: "実際の値をスキーマで検証するメソッド。parseはエラー時に例外を投げ、safeParseはエラーをオブジェクトとして返す（throwしない）。",
            },
            {
              word: "チェーン",
              definition: "z.string().min(8).email() のようにメソッドを連続して繋げる書き方。各メソッドが条件を追加する。",
            },
          ]}
        />

        {/* ── 概念図A: Zodスキーマの構造 ── */}
        <ConceptDiagram
          title="概念図A"
          description="Zodスキーマは「バリデーションルール」と「TypeScript型」を同時に定義する"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border-2 border-dashed border-green-700/40 p-4"
            >
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-3">
                Zodスキーマの1枚から2つを生成する
              </p>
              <StackLayer
                Icon={FileCode}
                title="Zodスキーマ（z.object({...})）"
                subtitle="バリデーションルールの設計書。何がOKな値かを宣言的に定義する"
                iconColor="text-green-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 ml-4">
                <div
                  className="rounded-lg border p-3"
                  style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <p className="text-xs font-semibold text-green-300">バリデーション</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    schema.safeParse(data) でデータを検証。ルール違反があればエラーメッセージを返す
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3"
                  style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4 text-green-400" />
                    <p className="text-xs font-semibold text-green-300">TypeScript型</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    z.infer{"<"}typeof schema{">"} でTypeScriptの型を自動生成。interface を別に書く必要なし
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* コード例: 型の二重管理 → Zodで解消 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Zod なし（二重管理）
              </p>
              <div className="font-mono text-xs leading-relaxed text-gray-400 space-y-1">
                <p><span className="text-gray-600">{"// 1. TypeScript型を書く"}</span></p>
                <p><span className="text-blue-300">interface</span><span className="text-yellow-300"> FormData</span><span className="text-gray-300">{" {"}</span></p>
                <p className="ml-4"><span className="text-gray-300">email: </span><span className="text-blue-300">string</span><span className="text-gray-300">;</span></p>
                <p><span className="text-gray-300">{"}"}</span></p>
                <p className="mt-2"><span className="text-gray-600">{"// 2. バリデーションも別途書く"}</span></p>
                <p><span className="text-blue-300">if</span><span className="text-gray-300">{" (!email.includes('@')) {"}</span></p>
                <p className="ml-4"><span className="text-red-400">{"// エラー処理..."}</span></p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 uppercase tracking-wide mb-3">
                Zod あり（一元管理）
              </p>
              <div className="font-mono text-xs leading-relaxed space-y-1">
                <p><span className="text-gray-600">{"// スキーマ1つで両方カバー"}</span></p>
                <p><span className="text-blue-300">const</span><span className="text-gray-300"> schema = z.</span><span className="text-yellow-300">object</span><span className="text-gray-300">{"({"}</span></p>
                <p className="ml-4"><span className="text-gray-300">email: z.</span><span className="text-yellow-300">string</span><span className="text-gray-300">().</span><span className="text-green-300">email</span><span className="text-gray-300">(),</span></p>
                <p><span className="text-gray-300">{"});"}</span></p>
                <p className="mt-2"><span className="text-gray-600">{"// 型も自動生成"}</span></p>
                <p><span className="text-blue-300">type</span><span className="text-yellow-300"> FormData</span><span className="text-gray-300"> = z.</span><span className="text-green-300">infer</span><span className="text-gray-300">{"<typeof schema>;"}</span></p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            スキーマを書くだけで型とバリデーションが揃う——これがZodの核心。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          スキーマの全体像が分かりました。次によく使うAPIのチェーンパターンを確認しましょう。
        </p>

        {/* ── 概念図B: よく使うAPIチェーン ── */}
        <ConceptDiagram
          title="概念図B"
          description="z.string()・z.number()・z.object() の主なメソッドチェーン一覧"
        >
          <div className="space-y-3">
            {/* string */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-green-400" />
                <p className="text-sm font-semibold text-green-300">z.string()</p>
                <span className="text-xs text-gray-500 ml-auto">文字列型</span>
              </div>
              <div className="font-mono text-xs space-y-1.5 text-gray-400">
                <p><span className="text-yellow-300">.min</span><span className="text-gray-300">(1, </span><span className="text-green-300">{"'必須です'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 最低1文字"}</span></p>
                <p><span className="text-yellow-300">.max</span><span className="text-gray-300">(100, </span><span className="text-green-300">{"'100文字以内'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 最大100文字"}</span></p>
                <p><span className="text-yellow-300">.email</span><span className="text-gray-300">(</span><span className="text-green-300">{"'有効なメールアドレス'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// メール形式"}</span></p>
                <p><span className="text-yellow-300">.url</span><span className="text-gray-300">(</span><span className="text-green-300">{"'有効なURL'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// URL形式"}</span></p>
                <p><span className="text-yellow-300">.regex</span><span className="text-gray-300">(/^[0-9]{4}$/, </span><span className="text-green-300">{"'4桁の数字'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 正規表現"}</span></p>
              </div>
            </div>

            {/* number */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-blue-300">z.number()</p>
                <span className="text-xs text-gray-500 ml-auto">数値型</span>
              </div>
              <div className="font-mono text-xs space-y-1.5 text-gray-400">
                <p><span className="text-yellow-300">.min</span><span className="text-gray-300">(0, </span><span className="text-green-300">{"'0以上'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 最小値"}</span></p>
                <p><span className="text-yellow-300">.max</span><span className="text-gray-300">(120, </span><span className="text-green-300">{"'120以下'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 最大値"}</span></p>
                <p><span className="text-yellow-300">.int</span><span className="text-gray-300">(</span><span className="text-green-300">{"'整数のみ'"}</span><span className="text-gray-300">)</span><span className="text-gray-600 ml-2">{"// 整数のみ許可"}</span></p>
                <p><span className="text-yellow-300">.positive</span><span className="text-gray-300">()</span><span className="text-gray-600 ml-2">{"// 正の数のみ"}</span></p>
              </div>
            </div>

            {/* object */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-green-400" />
                <p className="text-sm font-semibold text-green-300">z.object({"{}"})</p>
                <span className="text-xs text-gray-500 ml-auto">オブジェクト型（よく使う）</span>
              </div>
              <div className="font-mono text-xs leading-relaxed text-gray-300 space-y-1">
                <p><span className="text-blue-300">const</span><span className="text-gray-300"> loginSchema = z.</span><span className="text-yellow-300">object</span><span className="text-gray-300">{"({"}</span></p>
                <p className="ml-4"><span className="text-gray-300">email: z.</span><span className="text-yellow-300">string</span><span className="text-gray-300">().</span><span className="text-green-300">email</span><span className="text-gray-300">(),</span></p>
                <p className="ml-4"><span className="text-gray-300">password: z.</span><span className="text-yellow-300">string</span><span className="text-gray-300">().</span><span className="text-green-300">min</span><span className="text-gray-300">(8),</span></p>
                <p className="ml-4"><span className="text-gray-300">age: z.</span><span className="text-yellow-300">number</span><span className="text-gray-300">().</span><span className="text-green-300">min</span><span className="text-gray-300">(18).</span><span className="text-green-300">optional</span><span className="text-gray-300">(),</span></p>
                <p><span className="text-gray-300">{"});"}</span></p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            .optional() を末尾に付けると「なくてもいい」フィールドになる。.nullable() は null 許可。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、TypeScriptって型を書くだけで安全になるんじゃないですか？ Zodをわざわざ使う理由がまだよく分からなくて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い疑問ですよ、マジさん。TypeScriptの型はあくまで「コンパイル時のチェック」です。\n製品工場で例えると、設計図の審査は通った、という話。\nでも実際に工場に届いた部品が設計通りかどうかは、ランタイム（実行時）に確認が必要です。\nZodはその「実行時の品質検査機」の役割を担います。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ああ、型は設計図の話で、Zodは実際の品質チェックなんですね！\nじゃあ z.infer って何をしているんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "Zodのスキーマは「型の情報」も持っています。\nz.infer<typeof schema> はスキーマからTypeScriptの型を自動的に取り出すユーティリティです。\n従来はinterfaceを書いてバリデーション関数も別途書く、という二重管理が必要でした。\nZodなら一枚のスキーマを書くだけで両方が揃います。設計図から自動で部品リストを生成する機械、のような感覚です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ふむふむ……。じゃあ z.string().min(8).email() みたいにチェーンを繋げますよね。\nこれって順番に意味があるんですか？ email() を先に書くべきとか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "基本的にチェーンの順序はバリデーション結果に影響しません。\nただし、エラーメッセージは最初に失敗した条件のものが出ます。\n慣習として min() などの長さチェックを先に書き、email() など形式チェックを後に書くことが多いです。\n「8文字以上のメールアドレス」という意味なので、z.string().min(8).email() という書き順が読みやすいです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ じゃあ safeParse と parse ってどちらを使えばいいんでしょう？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "フォームのバリデーションには safeParse が推奨です。\nparse はバリデーション失敗時に例外（throw）を投げるので、try/catchが必要になります。\nsafeParse は { success: true, data: ... } か { success: false, error: ... } という形で結果を返すので、if文で分岐するだけで扱えます。\nReact Hook FormにZodを統合する場合はzodResolverが内部でsafeParseを使うので、どちらを選ぶか意識しなくて済みますよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "……なんか、Zodがあると型を2回書かなくていいの、すごく助かりますね。\nボク今まで interface と if文バリデーションを両方書いてたので、ちょっとじーんとしました。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["従来の方法", "Zodを使う方法"]}
          rows={[
            {
              label: "型定義",
              cells: ["interfaceを手で書く", "z.infer<typeof schema>で自動生成"],
              highlightCol: 1,
            },
            {
              label: "バリデーション実装",
              cells: ["if文で手動チェック", "schema.safeParse()に任せる"],
              highlightCol: 1,
            },
            {
              label: "型とバリデーションの同期",
              cells: ["手動で揃える（ズレのリスク）", "スキーマ1つで保証される"],
              highlightCol: 1,
            },
            {
              label: "エラーメッセージ",
              cells: ["自前で文字列管理", "スキーマに文字列を渡すだけ"],
              highlightCol: 1,
            },
            {
              label: "学習コスト",
              cells: ["なし", "APIを覚える必要がある"],
              highlightCol: 0,
            },
          ]}
          note="プロジェクトが大きくなるほどZodの恩恵が大きくなる。小規模な一画面フォームは手動バリデーションでも十分なケースもある。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はz.refine・discriminatedUnion・superRefineなど、より複雑なスキーマの書き方です。"
      />

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 React Hook FormとZodを統合する">
          <p>
            @hookform/resolvers パッケージの zodResolver を使うと、useForm の resolver オプションにスキーマを渡すだけで統合できます。
          </p>
          <CodeBlock
            title="zod-with-rhf.tsx"
            language="tsx"
            code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. スキーマ定義
const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, '8文字以上で入力してください'),
});

// 2. 型を自動生成
type FormData = z.infer<typeof schema>;

// 3. resolverに渡すだけ
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
    </form>
  );
}`}
          />
          <KeyPoint>
            zodResolver を使うと register のオプションでバリデーションを書く必要がなくなる。スキーマが唯一の情報源になり、型・バリデーション・エラーメッセージを一元管理できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 カスタムバリデーション（z.refine）">
          <p>
            パスワード確認フィールドの一致チェックなど、複数フィールドをまたいだバリデーションには{" "}
            <strong className="text-white">z.refine()</strong> を使います。
          </p>
          <CodeBlock
            title="zod-refine.ts"
            language="typescript"
            code={`const signupSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'], // どのフィールドにエラーを表示するか
  });`}
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle2,
                title: "z.refine() を使う場面",
                subtitle: "フィールド間の関係チェック",
                description: "パスワード確認の一致・開始日と終了日の前後関係・メールアドレスとその確認フィールドの一致など。",
                accentColor: "green",
              },
              {
                Icon: AlertTriangle,
                title: "z.refine() の注意点",
                subtitle: "パスはエラーの置き場所",
                description: "pathにエラーを紐付けるフィールド名を指定しないと、エラーがrootに置かれてfields.confirmPasswordで取得できなくなる。",
                accentColor: "amber",
              },
            ]}
          />
          <WarningPoint>
            z.refine はスキーマチェーンの後に呼ぶことでオブジェクト全体にアクセスできる。単一フィールドのチェックは通常のメソッドチェーンで書く方が分かりやすい。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/form/react-hook-form",
            title: "React Hook Form",
            description: "zodResolverと組み合わせるベースとなるフォームライブラリ",
            icon: "BookOpen",
          },
          {
            href: "/form/error-ux",
            title: "エラー表示UX",
            description: "Zodのエラーメッセージをアクセシブルに表示する設計",
            icon: "AlertCircle",
          },
          {
            href: "/form/server-validation",
            title: "サーバーサイドバリデーション",
            description: "Zodスキーマをサーバー側でも再利用してセキュリティを高める",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={zodQuestions} />
    </div>
  );
}
