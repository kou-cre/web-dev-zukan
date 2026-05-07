import {
  Scissors,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Minimize2,
  Share2,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { minimalReproQuestions } from "@/content/questions/debug/minimal-repro";

export const metadata = {
  title: "最小再現コードの作り方 | Web開発図解",
  description:
    "問題を切り分けて最小限のコードで再現させる技術を図解で解説。AIや他者への質問精度を上げるデバッグ思考法。",
};

export default function MinimalReproPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/debug" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← デバッグ・エラー対処に戻る
        </Link>
      </div>

      <Hero
        category="デバッグ・エラー対処"
        title="最小再現コードの作り方"
        subtitle={"「問題を絞り込む」がデバッグの核心——AIへの質問が劇的に変わる"}
        body={"余計なものを全て取り除いた最小限のコードで問題を再現させる技術。作る過程がそのままデバッグになる。"}
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "最小再現コード（minimal repro）とは何か",
          "問題を切り分けて絞り込む手順",
          "良い質問と悪い質問の違い",
        ]}
        prerequisites={[
          "コードエディタでコードを書いたことがある",
          "バグや動作しないコードに直面した経験がある",
          "AIや他の人にコードの質問をしたことがある",
        ]}
        outOfScope={[
          "CodeSandbox・StackBlitzでの再現環境の共有",
          "GitHubのissueに再現コードを貼る方法",
          "OSS（オープンソース）へのバグレポートの書き方",
        ]}
      />

      <OnePageSummary
        keyMessage="最小再現コードとは「この問題を最小限の行数で起こせるコード」。問題を切り分けることで原因が自然と見えてくるし、人に聞くときにも「問題を精確に伝えられる」。デバッグの技術の核心は、この『問題の切り分け』にある。"
        metaphorTitle="医師への症状説明"
        metaphorPoints={[
          {
            label: "悪い質問",
            real: "「全身がなんとなく辛い」という説明。診断しようがなく、質問攻めになる",
            metaphor: "全身が辛い",
          },
          {
            label: "良い質問",
            real: "「37.8度の熱と右の喉の痛みだけ、3日前から」という説明。具体的で診断が速い",
            metaphor: "症状を精確に絞り込む",
          },
          {
            label: "切り分け作業",
            real: "「他の部分を消しても問題が起きるか」を確認する作業。消すたびに「これは関係なかった」と分かる",
            metaphor: "関係ない症状を除外する",
          },
          {
            label: "最小再現コード",
            real: "問題を起こす最小限のコード。これを渡せば相手も同じ問題を再現できる",
            metaphor: "症状の再現実験",
          },
        ]}
        definition="最小再現コード（minimal reproducible example / minimal repro）とは、問題を再現できる最小限のコードのこと。本番コードから余計なものを全て取り除き、問題の本質だけを残したもの。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「最小再現コードを作る手順」を把握し、次に良い質問と悪い質問の違いを見てみましょう。
        </p>

        {/* ── 概念図A: 切り分けの5ステップ ── */}
        <ConceptDiagram
          title="概念図A"
          description="最小再現コードを作る5ステップ——削除しながら問題を絞り込む"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={MessageSquare}
              title="問題を1文で言語化"
              subtitle="〇〇すると△△になるはずが□□になる"
              highlight
              accentColor="red"
            />
            <FlowArrow label="→" direction="right" />
            <FlowCard
              Icon={Scissors}
              title="関係ない部分を削除"
              subtitle="ライブラリ・関係ない関数"
            />
            <FlowArrow label="→" direction="right" />
            <FlowCard
              Icon={Target}
              title="まだ再現するか確認"
              subtitle="再現 → また削除を繰り返す"
            />
            <FlowArrow label="→" direction="right" />
            <FlowCard
              Icon={Minimize2}
              title="再現しなくなった1歩前"
              subtitle="それが問題を含む最小コード"
            />
          </div>

          <div
            className="mt-5 rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">具体例: 「APIからデータが来ない」を切り分ける</p>
            <div className="space-y-2">
              {[
                { step: "1", text: "「fetch('/api/users')が空の配列を返す」と1文で定義する", done: true },
                { step: "2", text: "認証・ルーティング・UIコンポーネントを全て除外する", done: true },
                { step: "3", text: "APIのURLを直接ブラウザで開いてデータが返るか確認する", done: true },
                { step: "4", text: "fetchのURLやパラメータだけのシンプルなコードで再現を確認する", done: false },
                { step: "5", text: "再現する最小コードが完成 → これをAIに渡して質問する", done: false },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: item.done ? "rgba(239,68,68,0.2)" : "#1a1d2a",
                      color: item.done ? "#f87171" : "#6b7280",
                      border: item.done ? "1px solid rgba(239,68,68,0.4)" : "1px solid #2d3048",
                    }}
                  >
                    {item.step}
                  </span>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            削除する作業をするほど「何が問題の本質か」が見えてくる。作る過程がそのままデバッグになる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          手順が分かりました。次は「良い質問と悪い質問の違い」を実例で比較してみましょう。
        </p>

        {/* ── 概念図B: 良い質問 vs 悪い質問 ── */}
        <ConceptDiagram
          title="概念図B"
          description="AIや他の開発者への質問——「全体を渡す」と「最小を渡す」の違い"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 悪い質問 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-red-300">悪い質問の例</p>
              </div>
              <div
                className="rounded-lg p-3 text-xs leading-relaxed mb-3"
                style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
              >
                <p className="text-gray-300 mb-2">「コードが動きません。見てください。」</p>
                <p className="text-gray-600">（500行のコードをそのまま貼る）</p>
              </div>
              <ul className="text-xs text-gray-500 space-y-1.5 leading-relaxed">
                <li>▸ 相手が500行の中から問題を探す必要がある</li>
                <li>▸ 何を「期待した動作」とするかが不明</li>
                <li>▸ 再現環境を作れないと回答しにくい</li>
              </ul>
            </div>

            {/* 良い質問 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <p className="text-sm font-semibold text-green-300">良い質問の例</p>
              </div>
              <div
                className="rounded-lg p-3 text-xs leading-relaxed mb-3"
                style={{ backgroundColor: "#0f1117", color: "#d1d5db" }}
              >
                <p className="mb-1">「このコードでuserが常にundefinedになります。」</p>
                <p className="mb-1">「fetchが非同期のタイミング問題か、stateの設定ミスかを判断したいです。」</p>
                <p className="text-gray-500">（20行の再現コードを貼る）</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>▸ 問題が1文で定義されている</li>
                <li>▸ 期待する動作と実際の動作が明確</li>
                <li>▸ 相手がすぐに再現・調査できる</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            質問の質が上がると、答えの質も上がる。最小再現コードは「良い質問のための技術」でもある。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター、バグが起きたときにAIに質問しているんですが、なかなか解決しなくて……。\nコード全体を貼っているんですが、それだとダメですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "問題が起きたコード全体を貼っても、AIは500行の中のどこが問題か探しながら答えることになります。\n『最小再現コード』を作ると、解決速度が劇的に上がります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "最小再現コード……ボク、どうすれば作れるか分からなくて……。\nそもそも何が原因かも分からないから困っているのに。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "分かります。ですから、作る過程が同時にデバッグになるんです。\n関係なさそうなコードを削除して、それでも問題が再現するか確認する。\nこれを繰り返すうちに『どこを消したら再現しなくなったか』で原因が特定できるんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "削除していく作業がそのままデバッグになる……！\nそれは考えたことありませんでした。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "医師への症状説明と同じです。\n『全身が辛い』より『37.8度の熱と右の喉の痛みだけ』の方が診断が速い。\nコードも『問題を起こす最小の症状』に絞り込むほど、自分でも原因が見えやすくなります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。問題を切り分けることが、解決への近道なんですね。\nボク、これを意識して次は質問してみます。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "質問が上手になると、答えの質も上がります。\n最小再現コードが作れる開発者は、問題の解像度が高い開発者です。\nAIへの質問でも、他の人への相談でも、この技術は一生役に立ちます。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["問題のある質問", "最小再現コードを使った質問"]}
          rows={[
            {
              label: "コードの量",
              cells: ["数百〜数千行の本番コード全体", "20〜50行程度の最小コード"],
              highlightCol: 1,
            },
            {
              label: "問題の説明",
              cells: ["「動きません」「なんかおかしい」", "「〇〇すると△△のはずが□□になる」と1文"],
              highlightCol: 1,
            },
            {
              label: "AIの解決速度",
              cells: ["遅い（探す時間がかかる）", "速い（問題がすぐ分かる）"],
              highlightCol: 1,
            },
            {
              label: "デバッグへの副効果",
              cells: ["なし", "作る過程で自己解決できることも多い"],
              highlightCol: 1,
            },
          ]}
          note="最小再現コードを作ろうとする過程で「あ、ここが原因だった」と自己解決することも多い。それ自体がデバッグスキルの鍛錬になる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はCodeSandboxなどのオンラインエディタを使った再現環境の共有方法などです。まず最小再現コードの考え方を習得してから読んでください。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — オンラインエディタでの共有
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          最小再現コードをテキストで渡す代わりに、ブラウザ上で動く再現環境としてURLで共有できるサービスがあります。
          相手がすぐに実行・修正できるため、より正確な回答が得やすくなります。
        </p>

        <TermNote
          terms={[
            {
              word: "minimal repro",
              definition:
                "minimal reproducible exampleの略。GitHubのissueやStack OverflowのQ&Aでは「repro please（再現コードを出して）」という要求が標準的。英語のドキュメントでよく見かける略語。",
            },
            {
              word: "CodeSandbox",
              definition:
                "ブラウザ上でReact・Next.jsなどのコードを動かせる無料サービス。URLを共有するだけで他の人が同じ環境でコードを実行できる。",
            },
            {
              word: "StackBlitz",
              definition:
                "CodeSandboxと同様のブラウザ上IDEサービス。Next.jsプロジェクトの即時起動が速いと言われる。GitHubのリポジトリをURLで指定して開ける機能もある。",
            },
          ]}
        />
      </section>

      {/* ── 詳細解説 ───────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="最小再現コードを作る実践手順">
          <p>
            「APIからデータが来ない」という典型的な問題を例に、最小再現コードを作る手順を見てみましょう。
          </p>
          <Timeline
            items={[
              {
                year: "Step 1",
                label: "問題を1文で定義する",
                description: "「/api/usersにGETすると常に空配列が返る。Firestoreにはデータが存在するはずなのに」と1文で書く。曖昧な表現を排除することで、何を解決したいかが明確になる。",
                accentColor: "rose",
              },
              {
                year: "Step 2",
                label: "関係ない部分を特定して削除する",
                description: "UI（JSXコンポーネント）・認証ロジック・ルーティング・CSSを全て除外する。fetch処理だけを残す。関係ないものを消しても問題が起きるか確認する。",
                accentColor: "rose",
              },
              {
                year: "Step 3",
                label: "APIデータをダミーデータに置き換える",
                description: "外部APIへのfetchを const users = [{ id: 1, name: 'test' }] のようなダミーデータに置き換えて動くか確認する。動くなら問題はfetch側にある。",
                accentColor: "rose",
              },
              {
                year: "Step 4",
                label: "再現する最小コードを確認する",
                description: "削除を繰り返して「これ以上消すと問題が出なくなる」一歩手前のコードが最小再現コード。このコードを使って質問する。",
                accentColor: "rose",
              },
            ]}
          />

          <CodeBlock
            title="APIデータをダミーデータに置き換える例"
            language="javascript"
            code={`// ❌ 問題あり: 外部APIへのfetchが入ると原因の切り分けが難しい
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);

// ✅ まずダミーデータで問題を確認する
// （APIの問題かStateの問題かを分離できる）
useEffect(() => {
  // APIの部分を一旦ダミーに置き換える
  const dummyData = [{ id: 1, name: 'テストユーザー' }];
  setUsers(dummyData);
}, []);

// ダミーでも空になる → Stateの問題
// ダミーは表示される → fetchの問題`}
          />

          <CorrectionCard
            misconception="コードを全部見せないと原因は分からない"
            correction="最小再現コードの方が原因を特定しやすい。500行より20行の方が問題が見えやすい"
            reason="人間もAIも、コードが少ない方が把握しやすい。本番コードには問題と関係ない処理が混在しており、ノイズになる。最小再現コードは『問題だけを抽出したX線写真』で、診断精度が上がる。"
          />

          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Lightbulb,
                title: "作る途中で自己解決",
                subtitle: "最も多いケース",
                description: "不要なコードを削除しているうちに「あ、ここが原因だった」と気づくことが多い。最小再現コードを作ろうとする過程自体がデバッグになる。",
                accentColor: "red",
              },
              {
                Icon: Share2,
                title: "CodeSandboxで共有",
                subtitle: "チームや非同期の質問に",
                description: "codesandbox.ioで新規プロジェクトを作り、最小再現コードを貼ってURLを共有する。相手が実際に動かして確認できるため、答えが正確になる。",
                accentColor: "red",
              },
            ]}
          />
          <KeyPoint>
            「最小再現コードを作れる」ことは、プロの開発者の基本スキル。GitHubのissueやStack Overflowでは、再現コードがない質問への回答を拒否されることも珍しくない。デバッグが上手い人は、問題の切り分けが上手い人。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/debug/breakpoints",
            title: "ブレークポイント",
            description: "ブレークポイントで問題箇所を絞り込んでから最小再現コードを作る",
            icon: "PauseCircle",
          },
          {
            href: "/debug/error-messages",
            title: "エラーメッセージの読み方",
            description: "エラーの内容を正確に読んで質問文に含める",
            icon: "FileWarning",
          },
          {
            href: "/debug/devtools",
            title: "DevTools 基本",
            description: "デバッグに使うDevToolsの全体像を確認する",
            icon: "MonitorDot",
          },
        ]}
      />

      <PageDrill questions={minimalReproQuestions} />
    </div>
  );
}
