import Link from "next/link";
import {
  Smartphone,
  CreditCard,
  Train,
  ShoppingCart,
  Eye,
  Search,
  MessageSquare,
  Image as ImageIcon,
  Layers,
  ScanLine,
  ArrowDownNarrowWide,
  AlignLeft,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import {
  ConceptDiagram,
  FlowCard,
  StackLayer,
} from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { seeingQuestions } from "@/content/questions/uiux/seeing";

export const metadata = {
  title: "UIを見る目を養う | UIデザイン | Web開発図解",
  description:
    "「なんかいい」を言葉にする — UIを見る目を養う第一歩を、比喩・対話・図解で解説。直感→観察→言語化の3層、ぼかし観察、Z型/F型の視線パターンまで。",
};

export default function SeeingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ── 戻るリンク ──────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/uiux"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← UIデザイン に戻る
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero
        category="UIデザイン"
        title="UIを見る目を養う"
        subtitle={"「なんかいい」を言葉にする — UIが見えるようになる第一歩"}
        accentColor="pink"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "UIとは「人と画面の接点」であること",
          "「なんかいい」を直感→観察→言語化の3層で分解する考え方",
          "ぼかし観察・視線の動き（Z型/F型）など、目を仕込む基礎技法",
        ]}
        prerequisites={[
          "Webサイトやアプリを日常的に使っている",
          "「このUI使いやすい / 使いにくい」と感じた経験がある",
          "デザインツール（Figmaなど）の知識は不要",
        ]}
        outOfScope={[
          "具体的な配色ルール（/uiux/color で扱う）",
          "デザインの4大原則の詳細（/uiux/principles で扱う）",
          "Figmaの操作方法・実装テクニック",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"UIを見る目とは「整理されている理由を言語化できる力」のこと。料理の「美味しい」を塩加減や火入れで説明できると再現できるのと同じで、UIも「なんかいい」を言葉にできれば作れるようになる。"}
        metaphorTitle="UIは料理 — 美味しいを言語化できると作れる"
        metaphorPoints={[
          {
            label: "直感",
            real: "「なんとなく美味しい」「なんとなくいい」で止まる段階",
            metaphor: "第1層",
          },
          {
            label: "観察",
            real: "塩が効いている・余白が広い、と要素に気づく段階",
            metaphor: "第2層",
          },
          {
            label: "言語化",
            real: "「対比が効いて主役が立っている」と原則で説明できる段階",
            metaphor: "第3層",
          },
        ]}
        definition={"UIを見る = 整理されている理由を言語化できること"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram ──────────── */}
      <Bridge
        from="UIを見る目の正体は「言語化」だと分かった"
        to="まずUIがどこにいるかを見渡してから、3層モデルを図で確認する"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: UIはどこにいる？ */}
        <ConceptDiagram
          title="概念図A — UIはどこにいる？"
          description={"スマホもATMも改札もコンビニのレジも、すべて「人と画面の接点」=UI"}
        >
          <div className="grid grid-cols-2 gap-3">
            <FlowCard
              Icon={Smartphone}
              title="スマホアプリ"
              subtitle="毎日触る最も身近なUI"
              highlight
              accentColor="pink"
            />
            <FlowCard
              Icon={CreditCard}
              title="ATM"
              subtitle="銀行の窓口を画面化したUI"
              accentColor="pink"
            />
            <FlowCard
              Icon={Train}
              title="改札の画面"
              subtitle="数秒で判断させるUI"
              accentColor="pink"
            />
            <FlowCard
              Icon={ShoppingCart}
              title="コンビニのレジ"
              subtitle="店員と客が共有するUI"
              accentColor="pink"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            UIは「アプリのデザイン」だけを指すのではない。人が画面を通してシステムと触れる場所はすべてUI。
          </p>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="UIが日常に溢れていることが見えた"
          to={"次は、その中の「なんかいい」を3層で分解する"}
        />

        {/* 概念図B: 「なんかいい」を3層で分解 */}
        <ConceptDiagram
          title={"概念図B — 「なんかいい」を3層で分解"}
          description="直感から言語化まで、層を上がるほどUIが「見える」ようになる"
        >
          <StackLayer
            Icon={Eye}
            title="第1層: 直感"
            subtitle={"「なんとなくいい」「なんか好き」— 言葉にできない段階"}
            iconColor="text-pink-400"
          />
          <StackLayer
            Icon={Search}
            title="第2層: 観察"
            subtitle={"「揃ってる」「余白が広い」「主役がはっきりしている」— 要素に気づく段階"}
            iconColor="text-pink-400"
          />
          <StackLayer
            Icon={MessageSquare}
            title="第3層: 言語化"
            subtitle={"「整列と対比で階層を作っている」— 原則で説明できる段階"}
            iconColor="text-pink-400"
            showArrow={false}
          />
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            第3層まで届くと、自分のUIにも応用できる。観察と言語化の往復が「目を仕込む」訓練。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前） ──────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "デザインってセンスでしょ？俺、絵心ないから無理ですよ。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "センスの正体は観察と原則です。料理人が「塩を一つまみ」と言葉にできるのと同じで、UIも目を仕込めば見えるようになる。生まれつきのものじゃない。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "目を細めるだけで骨格が見えるの？ そんな簡単な話なんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "装飾を削ぐと骨格が見える、というだけの話です。骨格が分かれば「なんかいい」が言葉になる。それが目を仕込む第一歩。",
          },
        ]}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="目を仕込む具体的な技法（ぼかし観察・視線パターン）を紹介します"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS ───────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: ぼかし観察 */}
        <ConceptDiagram
          title="概念図C — ぼかして見ると骨格が見える"
          description="目を細める / スクショをぼかすと、装飾が消えて構造だけが残る"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={ImageIcon}
              title="鮮明に見る"
              subtitle="装飾・色・文字に目が引っ張られて骨格が見えにくい"
              accentColor="pink"
            />
            <FlowCard
              Icon={Layers}
              title="ぼかして見る"
              subtitle="細部が消えて、レイアウト・コントラスト・余白だけが残る"
              highlight
              accentColor="pink"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            良いUIはぼかしても骨格が整っている。逆に「なんとなく雑」なUIは、ぼかすと階層がぼやけて主役が分からなくなる。
          </p>
        </ConceptDiagram>

        {/* Bridge C → D */}
        <Bridge
          from="骨格を見る訓練法が分かった"
          to="次は、視線がどう動くかのパターンを覚える"
        />

        {/* 概念図D: 視線の動き */}
        <ConceptDiagram
          title="概念図D — 視線の動き（Z型・F型）"
          description={"画面の種類で「読まれる順番」が変わる。設計時に意識すると主役を置く位置が決まる"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={ScanLine}
              title="Z型"
              subtitle={"広告・LP向け。左上→右上→左下→右下と「Z」の形に視線が動く"}
              highlight
              accentColor="pink"
            />
            <FlowCard
              Icon={AlignLeft}
              title="F型"
              subtitle={"記事・リスト向け。左から右に流し読みして、次の行へ"}
              highlight
              accentColor="pink"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            Z型とF型の2つを覚えておけば、ヒーロー画像の位置・CTAの配置・本文の改行幅をルールで決められる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. センスとは何か — 観察と原則の積み重ね">
          <p>
            「センスがある人」は、生まれつき特別な感性を持っているわけではない。良いUIを大量に見てきて、なぜ良いかを言語化してきた結果、瞬時に判断できるようになっただけ。
          </p>
          <p>
            観察と言語化を繰り返すと「整列が効いている」「コントラストで主役を作っている」という感覚が言葉になり、自分が作るときも再現できるようになる。これが「センス」の正体。
          </p>
          <KeyPoint>
            センスは才能ではなく訓練。良いUIを見て、なぜ良いかをノートに3行で書く習慣をつけるだけで、3ヶ月で見える景色が変わる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. 名前をつけると見える">
          <p>
            「対比」「整列」「近接」のような名前を覚えると、それまで「なんとなく整っている」と感じていたものが「対比で階層を作っている」と見えるようになる。これは色の名前を覚えると風景の解像度が上がるのと同じ現象。
          </p>
          <p>
            次のページで扱う4大原則（近接・整列・反復・対比）は、UIを観察するための「単語帳」だと思って覚える。単語が増えるほど見える解像度が上がる。
          </p>
          <KeyPoint>
            観察→言語化のループでは「名前を持つ言葉」で書くこと。「いい感じ」では訓練にならない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. ぼかして骨格を確認する訓練">
          <p>
            自分が作ったUIや、参考にしたいUIを、目を細めて見る / スクリーンショットを軽くぼかして見る。装飾が消えるので、骨格（レイアウト・コントラスト・余白）だけが残る。
          </p>
          <p>
            ぼかしても主役が分かるUIは整っている。ぼかすと「どこを見ればいいか分からない」UIは、装飾で誤魔化している可能性が高い。
          </p>
          <WarningPoint>
            装飾（色・影・グラデーション）で見栄えを補うクセはやめる。骨格が崩れていると、装飾を盛るほど雑に見える。まず骨格を整える。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/uiux/principles",
            title: "デザインの4大原則",
            description: "近接・整列・反復・対比 — 整ったUIの正体",
            icon: "Code2",
          },
          {
            href: "/kiso/server",
            title: "Webの基礎から始める",
            description: "サーバー・データベース・PWAの基礎概念",
            icon: "Server",
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill questions={seeingQuestions} />
    </div>
  );
}
