import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  MessageSquare,
  Clock,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
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
import { errorUxQuestions } from "@/content/questions/form/error-ux";

export const metadata = {
  title: "エラー表示UX | Web開発図解",
  description:
    "フォームのエラーを正しく・分かりやすく表示するUX設計。タイミング・位置・アクセシビリティ（aria-describedby・role=alert）を図解で解説。",
};

export default function ErrorUxPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/form" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← フォーム・バリデーションに戻る
        </Link>
      </div>

      <Hero
        category="フォーム・バリデーション"
        title="エラー表示UX"
        subtitle={"エラーを「正しく・分かりやすく・アクセシブルに」表示する設計"}
        body={"エラーはいつ・どこで・どのように表示するかで、フォームの離脱率が大きく変わる。スクリーンリーダー対応まで含めた設計を学ぶ。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "エラーを表示するタイミングの設計（onBlur・onChange・onSubmit）",
          "フィールドごとのエラー位置と視覚的な表現のベストプラクティス",
          "aria-describedby・role=alert によるアクセシブルなエラー実装",
        ]}
        prerequisites={[
          "React Hook FormのformState.errorsを知っている",
          "HTMLのaria属性の概念（aria-label・aria-describedbyなど）",
          "CSSでボーダー色や背景色を変える方法",
        ]}
        outOfScope={[
          "React Hook FormのControllerコンポーネント詳細",
          "i18n（国際化）対応のエラーメッセージ管理",
          "エンドツーエンドテストでのフォーム検証",
        ]}
      />

      <OnePageSummary
        keyMessage="フォームのエラーUXで最も重要なのは「タイミング・位置・読み上げ」の3点。早すぎるエラーは邪魔で、遅すぎると迷わせる。エラーはフィールドの直下に置き、スクリーンリーダーが読み上げられるように実装する。"
        metaphorTitle="工場の品質チェックのタイミング"
        metaphorPoints={[
          {
            label: "onSubmit（送信時）",
            real: "完成品を一気に検査する。途中で止めないが、最後に全部やり直しになるリスクがある",
            metaphor: "完成後一括検査",
          },
          {
            label: "onBlur（フォーカスを外れたとき）",
            real: "工程ごとに検査する。次の工程に進む前に欠陥を発見できる",
            metaphor: "工程間検査",
          },
          {
            label: "onChange（入力のたびに）",
            real: "リアルタイム検査。パスワード強度などに有効だが、タイピング中のエラー表示は邪魔になる",
            metaphor: "リアルタイム検査",
          },
          {
            label: "aria-describedby",
            real: "点字ラベルで工程説明を付ける。目が見えない作業員も手順を把握できる",
            metaphor: "点字の工程説明",
          },
        ]}
        definition="エラー表示UXとは、フォームのバリデーション失敗をユーザーに適切なタイミングと方法で伝え、次の正しいアクションへ誘導する設計。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「エラーをいつ表示するか」のタイミング設計から確認し、次に「どのように表示するか」のUI設計を見ていきましょう。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "aria-describedby",
              definition: "input要素と説明テキスト（エラーメッセージ）を紐付けるHTML属性。スクリーンリーダーがinputにフォーカスしたとき、紐付けられたエラーメッセージも自動で読み上げる。",
            },
            {
              word: "role=\"alert\"",
              definition: "要素がアラートであることをブラウザに伝えるARIA属性。スクリーンリーダーは role=alert が付いた要素にテキストが追加されると即座に読み上げる。",
            },
            {
              word: "onBlur",
              definition: "フォームフィールドからフォーカスが外れたときに発火するイベント。「フィールドを離れたとき」にバリデーションを実行するモード。",
            },
            {
              word: "フォームの離脱率",
              definition: "フォームに訪れたユーザーが途中でやめて去ってしまう割合。エラーUXが悪いと離脱率が上がる。",
            },
          ]}
        />

        {/* ── 概念図A: エラー表示タイミングの比較 ── */}
        <ConceptDiagram
          title="概念図A"
          description="エラーをいつ表示するか — タイミングによってUXが大きく変わる"
        >
          <div className="space-y-3">
            {/* onSubmit */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-gray-300">送信時（onSubmit）</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(75,85,99,0.3)", color: "#9ca3af" }}>
                  最もシンプル
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed ml-7">
                送信ボタンを押したときだけバリデーション実行。シンプルだが、入力をすべて終えてから「最初のフィールドが間違ってた」と言われる体験になる。短いフォームなら許容できる。
              </p>
            </div>

            {/* onBlur */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-4 h-4 text-green-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-300">フォーカス離脱時（onBlur）</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                  推奨
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed ml-7">
                フィールドから離れた瞬間にバリデーション実行。入力中には邪魔せず、次のフィールドに移る前にエラーを通知できる。React Hook Formのmode: {"'onBlur'"} で設定。
              </p>
            </div>

            {/* onChange */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <EyeOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-amber-300">入力のたびに（onChange）</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#fbbf24" }}>
                  限定的に使う
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed ml-7">
                タイピング中にリアルタイムでバリデーション。パスワード強度インジケーターなど「ポジティブなフィードバック」には有効。ただし入力途中にエラーを出すのは邪魔になるので注意。
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
          >
            <p className="text-xs font-semibold text-green-300 mb-2">React Hook Formでのモード設定</p>
            <div className="font-mono text-xs text-gray-300 leading-relaxed">
              <p><span className="text-green-300">const</span><span className="text-gray-300">{" { register, handleSubmit } = "}</span><span className="text-yellow-300">useForm</span><span className="text-gray-300">{"({"}</span></p>
              <p className="ml-4"><span className="text-sky-300">mode</span><span className="text-gray-300">: </span><span className="text-green-300">{"'onBlur'"}</span><span className="text-gray-300">,</span><span className="text-gray-500 ml-2">{"// フォーカス離脱時にバリデーション"}</span></p>
              <p><span className="text-gray-300">{"});"}</span></p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          タイミングが分かりました。次は「エラーをどこに・どのように表示するか」のUI設計を見ていきます。
        </p>

        {/* ── 概念図B: エラーUI設計 ── */}
        <ConceptDiagram
          title="概念図B"
          description="エラーメッセージの位置・内容・スクリーンリーダー対応"
        >
          <div className="space-y-4">
            {/* Good Example */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 mb-3">良い例 — フィールドの直下に具体的なメッセージ</p>
              <div className="space-y-1 font-mono text-xs">
                <div
                  className="rounded-lg border px-3 py-2"
                  style={{ backgroundColor: "#0f1117", borderColor: "rgba(239,68,68,0.6)" }}
                >
                  <p className="text-gray-400 text-xs">メールアドレス</p>
                  <p className="text-gray-300">abc（不正な入力）</p>
                </div>
                <div className="flex items-center gap-1.5 px-1">
                  <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-xs">有効なメールアドレスを入力してください（例：name@example.com）</p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>フィールドの直下に置く（上や遠い場所は見落としやすい）</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>具体的な入力例を添える</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>アイコンと赤色でエラーと分かる</span>
                </div>
              </div>
            </div>

            {/* Bad Example */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 mb-3">悪い例 — 情報が足りない・位置が分かりにくい</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>「入力エラー」（何が間違っているか不明）</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>フォームの上部にまとめてエラーを表示（どのフィールドか分かりにくい）</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>「入力してください」だけで何を入力すればいいか分からない</span>
                </div>
              </div>
            </div>

            {/* Accessible implementation */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">アクセシブルな実装（aria属性）</p>
              <div className="font-mono text-xs leading-relaxed text-gray-300 space-y-1">
                <p><span className="text-green-300">{"<input"}</span></p>
                <p className="ml-4"><span className="text-sky-300">aria-describedby</span><span className="text-gray-300">={'"email-error"'}</span><span className="text-gray-500 ml-2">{"// エラーとinputを紐付け"}</span></p>
                <p className="ml-4"><span className="text-sky-300">aria-invalid</span><span className="text-gray-300">={"{!!errors.email}"}</span><span className="text-gray-500 ml-2">{"// エラー時にtrueになる"}</span></p>
                <p><span className="text-green-300">{"/>"}</span></p>
                <p className="mt-1"><span className="text-gray-500">{"// エラーテキスト"}</span></p>
                <p><span className="text-green-300">{"<p"}</span></p>
                <p className="ml-4"><span className="text-sky-300">id</span><span className="text-gray-300">={'"email-error"'}</span></p>
                <p className="ml-4"><span className="text-sky-300">role</span><span className="text-gray-300">={'"alert"'}</span><span className="text-gray-500 ml-2">{"// エラー追加時に即座に読み上げ"}</span></p>
                <p><span className="text-green-300">{">"}</span></p>
                <p className="ml-4"><span className="text-gray-300">{"{"}</span><span className="text-yellow-300">errors</span><span className="text-gray-300">.email?.message{"}"}</span></p>
                <p><span className="text-green-300">{"</p>"}</span></p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            aria-describedbyとrole=alertを付けるだけで、スクリーンリーダーがエラーを自動で読み上げるようになる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、エラーはとりあえず赤文字で表示すればいいじゃないですか？ UXとかアクセシビリティとか、正直そこまで考える必要ありますか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "実は、エラーのタイミングと位置だけで離脱率が大きく変わるんですよ、マジさん。\n想像してみてください。ネットショッピングで住所・電話番号・クレジットカード番号を全部入力したあと、送信したら「メールアドレスが無効です」とトップに出たら……どうしますか？\nまた最初から全部入力しますか？ 多くの人は諦めて離脱します。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あ！ ボクもそれでカートを捨てたことあります！\nじゃあ「フォーカスを外れたとき」にエラーを出すのがベストなんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ほとんどの場面ではそうです。\nただしパスワード入力は少し例外です。入力中に強度インジケーター（弱・普通・強）を出すとユーザーが安心できます。これはonChangeが有効なケースですね。\nまた「パスワード確認フィールド」は、入力中のパスワードを変えてからblurすることもあるので、送信時にまとめて照合するのが自然です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なるほど……。aria-describedbyとかrole=alertって正直初めて見ました。\nこれ、付けないとどんな問題が起きるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "スクリーンリーダーを使っているユーザーが、エラーの存在に気づけなくなります。\n視覚的に赤文字でエラーを出しても、読み上げソフトには「エラーが増えた」という通知が届かない。\naria-describedbyでinputとエラーテキストを紐付け、role=alertでエラー追加時に即座に読み上げるよう伝える——この2つで大部分の読み上げ対応ができます。\n実装コストはほぼゼロですよ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ 属性2つ追加するだけでスクリーンリーダーに対応できるんですね。\nじゃあエラーメッセージの文言はどう書けばいいんでしょう？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "「何が問題で、どう直すか」を具体的に書くのがコツです。\n「入力エラー」だけでは何も伝わらない。「有効なメールアドレスを入力してください（例：name@example.com）」のように、正しい入力の例を添えると親切です。\n謝罪は不要です。「失礼しました」は不要で「8文字以上で入力してください」のように直接的に書く。ユーザーは次の行動を知りたいだけです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "……エラー表示って奥が深いんですね。ボク今まで赤文字だけ出して終わりにしてました。\nでもariaの属性は本当にコストが低いのに効果が大きいんですね。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["悪いエラーUX", "良いエラーUX"]}
          rows={[
            {
              label: "エラー表示タイミング",
              cells: ["入力中にリアルタイムでエラーを出す", "フォーカス離脱時またはSubmit時"],
              highlightCol: 1,
            },
            {
              label: "エラーの位置",
              cells: ["フォーム全体の上部にまとめる", "該当フィールドの直下"],
              highlightCol: 1,
            },
            {
              label: "エラーメッセージ内容",
              cells: ["「入力エラー」「必須です」のみ", "「何が問題でどう直すか」を具体的に"],
              highlightCol: 1,
            },
            {
              label: "スクリーンリーダー対応",
              cells: ["視覚的な赤文字のみ", "aria-describedby + role=alert"],
              highlightCol: 1,
            },
            {
              label: "送信ボタンの状態",
              cells: ["常にアクティブ", "エラーがある場合は非活性（disabled）推奨"],
              highlightCol: 1,
            },
          ]}
          note="エラーUXの改善はコード量が少ない割に離脱率低下に直結する。まずフィールド直下配置とaria属性の追加から始めるとコスパが高い。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はより詳細なアクセシビリティ実装と、送信ボタンの状態管理の実践パターンです。"
      />

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 React Hook Formでのアクセシブル実装">
          <p>
            React Hook Formと組み合わせて、アクセシブルなエラー表示を実装する完全なパターンです。
          </p>
          <CodeBlock
            title="accessible-error.tsx"
            language="tsx"
            code={`function EmailField() {
  const { register, formState: { errors } } = useForm({ mode: 'onBlur' });
  const errorId = 'email-error';
  const hasError = !!errors.email;

  return (
    <div>
      <label htmlFor="email">メールアドレス</label>
      <input
        id="email"
        type="email"
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        // aria-invalidがtrueのとき多くのブラウザはinputを赤枠で表示する
        {...register('email', { required: '必須です' })}
      />
      {hasError && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {errors.email?.message}
        </p>
      )}
    </div>
  );
}`}
          />
          <KeyPoint>
            aria-invalid は true のとき多くのブラウザが自動的にinputを視覚的にエラー表示する。CSSで追加のスタイリングも可能だが、基本はaria属性で制御できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 送信ボタンの状態管理">
          <CorrectionCard
            misconception="エラーがあっても送信ボタンは常に押せる状態にしておく"
            correction="フォームにエラーがある場合は送信ボタンをdisabledにするか、押せても必ず再バリデーションしてエラーをハイライトする"
            reason="エラーがある状態で送信ボタンが活性のままだとユーザーは「まだ試してみよう」と繰り返し押して混乱する。ただしdisabledにしすぎると「なぜ押せないか分からない」という別の問題が起きるため、エラーメッセージを表示した上で非活性にするのが正解。"
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: MessageSquare,
                title: "formState.isValid",
                subtitle: "送信ボタン制御に使う",
                description: "すべてのバリデーションが通っているかどうかを示すboolean。disabled={!formState.isValid} で送信ボタンを制御できる。",
                accentColor: "green",
              },
              {
                Icon: Clock,
                title: "formState.isSubmitting",
                subtitle: "二重送信防止",
                description: "送信処理中かどうかを示すboolean。disabled={formState.isSubmitting} で送信中の二重送信を防ぐ。",
                accentColor: "blue",
              },
            ]}
          />
          <WarningPoint>
            isValid を使う場合、useForm に mode: {"'onBlur'"} か mode: {"'onChange'"} を設定していないと、一度もバリデーションが走らないため初期状態では isValid が常に true になる場合がある。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/form/react-hook-form",
            title: "React Hook Form",
            description: "formState.errorsとmodeオプションの基本",
            icon: "BookOpen",
          },
          {
            href: "/form/zod",
            title: "Zodでスキーマ定義",
            description: "エラーメッセージをスキーマで一元管理する方法",
            icon: "Shield",
          },
          {
            href: "/form/server-validation",
            title: "サーバーサイドバリデーション",
            description: "クライアントのエラーUIをサーバーエラーにも対応させる",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={errorUxQuestions} />
    </div>
  );
}
