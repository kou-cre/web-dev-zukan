import {
  Smartphone,
  Globe,
  Lock,
  FileJson,
  Cog,
  WifiOff,
  Bell,
  Maximize,
  Monitor,
  Database,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Paintbrush,
  Link,
  LayoutTemplate,
  Zap,
  Network,
  RotateCcw,
  ShoppingCart,
  ListTodo,
  Bluetooth,
  Camera,
} from "lucide-react";

import { Hero } from "@/components/Hero";
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
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { pwaQuestions } from "@/content/questions/kiso/pwa";

export const metadata = {
  title: "PWAって何？ | Web開発図解",
  description:
    "PWA（Progressive Web App）の基本概念を図解で解説。manifest.json・Service Worker・キャッシュ戦略まで。",
};

export default function PwaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="基礎概念"
        title="PWAって何？"
        subtitle={
          "Webサイトをアプリのように動かす技術——インストール・オフライン・プッシュ通知を手に入れる。"
        }
        body={
          "manifest.json と Service Worker、たった2つの仕掛けでWebサイトは『アプリ化』する。"
        }
        accentColor="rose"
      />

      <OnePageSummary
        keyMessage="PWA（Progressive Web App）とは、Webサイトをネイティブアプリに近い体験で使えるようにする技術の総称。ホーム画面に追加・オフライン動作・プッシュ通知など、これまでアプリストアのアプリにしかできなかったことがブラウザ上で実現できる。"
        metaphorTitle="Webサイトが『変身』してスマホアプリになる魔法"
        metaphorPoints={[
          {
            label: "manifest.json",
            real: "アイコン・名前・起動色を定義する設定ファイル",
            metaphor: "変身セットの設定書",
          },
          {
            label: "Service Worker",
            real: "ブラウザに常駐してキャッシュ・オフラインを担当する常駐スクリプト",
            metaphor: "裏で待機する影武者",
          },
          {
            label: "キャッシュ戦略",
            real: "何をどう保存し、いつ返すかを決める方針（Cache First / Network First など）",
            metaphor: "影武者の作戦マニュアル",
          },
          {
            label: "HTTPS",
            real: "PWAを動かすための前提条件（セキュアな通信）",
            metaphor: "変身できる安全な舞台",
          },
        ]}
        definition="PWAとは、Webサイトに manifest.json と Service Worker を追加することで、アプリのような体験を提供できるようにする技術。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="通常のWebサイトとPWAでは、ユーザーから見える体験がここまで違う。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <p className="text-xs font-bold text-white">通常のWebサイト</p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>ブラウザを開かないと使えない</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>オフラインでは閲覧不可</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>プッシュ通知は送れない</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>ホーム画面のアイコンにはならない</span>
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(244,63,94,0.06)",
                borderColor: "rgba(244,63,94,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-rose-400" />
                <p className="text-xs font-bold text-rose-300">PWA</p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>ホーム画面から直接起動できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>オフラインでもキャッシュから動く</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>プッシュ通知を送れる（要許可）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>全画面表示でアプリのように見える</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            同じWebサイトでも、PWA化されているかどうかで体験は別物になる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="PWAは3つの層で成り立っている。HTTPSが土台、manifest.jsonが顔、Service Workerが裏方。"
        >
          <div className="rounded-xl border-2 border-dashed border-rose-700/50 p-4">
            <p className="text-xs font-semibold text-rose-400 text-center mb-4 tracking-wide uppercase">
              PWA — 3要素の構造
            </p>
            <StackLayer
              Icon={Lock}
              title="HTTPS（前提条件）"
              subtitle="セキュアな通信が成立していること — Vercelなら自動で設定される"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={FileJson}
              title="manifest.json（アプリの顔）"
              subtitle="アイコン・名前・テーマカラー・起動モードを定義 — ホーム画面追加時に使われる"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Cog}
              title="Service Worker（影武者）"
              subtitle="ブラウザに常駐してキャッシュ・オフライン・プッシュ通知を担当する"
              iconColor="text-rose-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            この3つが揃って初めて「ブラウザがインストール可能なアプリ」として認識する。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C"
          description="Service Worker のキャッシュ戦略フロー。リクエストが来たとき、影武者は何を見て、何を返すのか。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Monitor}
              title="ブラウザ"
              subtitle="ページ・画像・APIをリクエスト"
            />
            <FlowArrow label="リクエスト" sublabel="GET /index.html" direction="right" />
            <FlowCard
              Icon={Cog}
              title="Service Worker"
              subtitle="キャッシュを確認"
              highlight
              accentColor="rose"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-300">キャッシュにある</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                影武者がキャッシュからレスポンスを即返す。ネットワークを使わないので速い・オフラインでも動く。
              </p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-300">キャッシュにない</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                ネットワークへ取りに行き、取得したものをキャッシュに保存しつつブラウザへ返す。次回以降は即返せる。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            この『キャッシュ確認 → 分岐』のロジックを書くのが、Service Worker の主な役割。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D"
          description="PWAでできるようになる『アプリっぽい体験』の代表例。これらが全部Web技術だけで実現できる。"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FlowCard
              Icon={Smartphone}
              title="ホーム画面追加"
              subtitle="アプリストア不要"
            />
            <FlowCard
              Icon={WifiOff}
              title="オフライン動作"
              subtitle="圏外でも開ける"
            />
            <FlowCard
              Icon={Bell}
              title="プッシュ通知"
              subtitle="再訪問のきっかけ"
            />
            <FlowCard
              Icon={Maximize}
              title="全画面表示"
              subtitle="アドレスバーが消える"
            />
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["ネイティブアプリ", "PWA", "通常のWebサイト"]}
          rows={[
            {
              label: "インストール",
              cells: [
                "アプリストア経由（審査あり）",
                "ホーム画面に追加（ストア不要）",
                "なし（毎回ブラウザで開く）",
              ],
              highlightCol: 1,
            },
            {
              label: "オフライン",
              cells: [
                "対応",
                "Service Worker で対応可能",
                "基本不可",
              ],
              highlightCol: 1,
            },
            {
              label: "プッシュ通知",
              cells: [
                "対応",
                "対応（要ユーザー許可）",
                "不可",
              ],
              highlightCol: 1,
            },
            {
              label: "開発コスト",
              cells: [
                "iOS / Android で別々に開発",
                "Web技術1本で対応できる",
                "Web技術のみ",
              ],
              highlightCol: 1,
            },
            {
              label: "配布方法",
              cells: [
                "App Store / Google Play",
                "URLを共有するだけ",
                "URLを共有するだけ",
              ],
              highlightCol: 1,
            },
          ]}
          note="PWAは『ネイティブと通常Webの中間』ではなく、『Web技術のままアプリ体験を取り込む』というポジション。配布の手軽さはWeb、機能性はネイティブに寄せている。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、最近よく『PWA』って単語を見るんですけど、結局アプリとWebサイトって何が違うんですか？ ボクの中で全部混ざってしまっています……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良いタイミングで聞いてくださいました、マジさん。PWAは「変身できるWebサイト」だと思ってください。普段はブラウザの中にいるWebサイトが、`manifest.json` と `Service Worker` という2つの仕掛けを身につけることで、ホーム画面に住みつき、オフラインでも動き、通知まで送れるアプリ風の存在に変身する。これがPWAです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ、App Storeに申請しなくてもアプリみたいに配れるってことですか？ それは革命すぎます！ 全人類がPWAになるべきです！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "落ち着いてください、マジさん。確かに配布方法は劇的に楽になります。URLを共有するだけで、AndroidならChromeが「インストールしますか？」と提案してくれますし、iOSならSafariの「ホーム画面に追加」で同じことができます。ストアの審査もなく、アップデートはサイトを更新するだけで全ユーザーに届く。ただし、革命というより『選択肢が増えた』と捉えるのが冷静な見方です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あ、でもマスター。オフラインで動くって、データはどこに保存されているんですか？ 勝手にスマホの中に色々保存されると、なんだか怖くて……。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "良い疑問です。Service Worker が保存するのは、あくまでそのデバイスのブラウザキャッシュの中。別のサイトや別のアプリから覗かれることはありません。図書館でいうと「自分専用の貸出棚に本を一時的に置いておく」ようなイメージです。ただし、機密情報まで何でも保存していいわけではなく、何をキャッシュするかは設計者が選びます。そこは普通のWebアプリと同じ責任範囲ですよ。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。つまりPWAは、Webサイトにちょっとした魔法（manifest.json + Service Worker）をかけるだけで、アプリっぽくなれるということですね。Webの手軽さは保ったまま、アプリの便利さを取り込む、と。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです、マジさん。しかも嬉しいことに、Next.js プロジェクトなら `next-pwa` のようなライブラリを使えば、manifest.json の生成も Service Worker の登録もほぼ自動でやってくれます。ステージ1の段階では深追い不要ですが、「ある時点でWebサイトを一気にアプリ化できるカードを持っている」と知っておくだけで、設計の選択肢がぐっと広がりますよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="8.1 manifest.json とは何か">
          <p>
            <strong className="text-white">manifest.json</strong> は、Webサイトを『インストール可能なアプリ』としてブラウザに認識させるためのJSONファイル。サイトのルートに置いて{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fda4af" }}
            >
              &lt;link rel=&quot;manifest&quot; href=&quot;/manifest.json&quot;&gt;
            </code>{" "}
            で読み込ませる。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: FileJson,
              title: "name / short_name",
              subtitle: "アプリの名前",
              description: "ホーム画面アイコン下に表示される名前。short_name はスペースが少ない場所で使われる短縮版。",
              accentColor: "rose",
            },
            {
              Icon: Paintbrush,
              title: "icons",
              subtitle: "アイコン画像（複数サイズ）",
              description: "192px・512pxなど複数サイズを指定。ホーム画面・スプラッシュ画面で使われるため、丁寧に用意するほど見栄えが良くなる。",
              accentColor: "violet",
            },
            {
              Icon: Link,
              title: "start_url",
              subtitle: "起動時に開くURL",
              description: "ホーム画面から起動したときに最初に開くパス。通常は / を指定するが、アプリの入口ページを指定することもある。",
              accentColor: "blue",
            },
            {
              Icon: LayoutTemplate,
              title: "display",
              subtitle: "表示モード",
              description: "standalone（アドレスバーなし）/ fullscreen（完全全画面）/ browser（通常ブラウザ）から選ぶ。アプリらしくするには standalone が定番。",
              accentColor: "amber",
            },
          ]} />
          <CorrectionCard
            misconception="manifest.json を置けば、それだけでPWAになる"
            correction="manifest.json はPWAの『顔』を定義するだけ。オフライン動作・プッシュ通知などには Service Worker が別途必要"
            reason="manifest.json だけでも『ホーム画面に追加』は機能するが、それだけでは通常のWebサイトとオフライン体験は変わらない。Service Worker とセットで初めてフル機能のPWAになる。"
          />
          <KeyPoint>
            manifest.json は『アプリの顔』。ここを丁寧に書いておくと、ホーム画面追加時の見た目・起動時のスプラッシュ画面まできれいに整う。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.2 Service Worker とは何か">
          <p>
            <strong className="text-white">Service Worker</strong> は、ブラウザのバックグラウンドで動作するJavaScript。Webページとは別のスレッドで動き、ネットワークリクエストを横取り（インターセプト）して、キャッシュから返したり、オフライン時のフォールバックを返したりできる。
          </p>
          <Timeline items={[
            {
              year: "install",
              label: "最初の登録",
              description: "Service Worker がブラウザに初めて登録されたとき発火。静的アセット（CSS・JS・画像）を事前キャッシュするのがここ。一度だけ実行される。",
              accentColor: "rose",
            },
            {
              year: "activate",
              label: "古いWorkerと交代",
              description: "新しいバージョンの Service Worker が有効になったとき発火。古いキャッシュのクリーンアップをここで行う。全タブが閉じられるまで待機することもある。",
              accentColor: "amber",
            },
            {
              year: "fetch",
              label: "リクエストのたびに呼ばれる",
              description: "ページからのすべてのネットワークリクエストをインターセプトする。キャッシュから返すか、ネットワークへ転送するかをここで判断する。最も頻繁に実行される。",
              accentColor: "blue",
            },
          ]} />
          <p>
            主なできること：オフライン対応、リクエストのキャッシュ、プッシュ通知の受信、バックグラウンド同期。
          </p>
          <KeyPoint>
            Service Worker は『ページが閉じていても動ける』ところがポイント。Webページの寿命とは独立して、ブラウザが許す限り常駐する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.3 キャッシュ戦略の3パターン">
          <UseCaseGrid cols={3} items={[
            {
              Icon: Zap,
              title: "Cache First",
              subtitle: "速度優先・静的アセット向け",
              description: "まずキャッシュを見て、あれば即返す。なければネットワークへ。CSS・JS・画像・フォントなど変化しないリソースに最適。",
              accentColor: "emerald",
            },
            {
              Icon: Network,
              title: "Network First",
              subtitle: "鮮度優先・APIレスポンス向け",
              description: "まずネットワークへ取りに行き、失敗したらキャッシュへフォールバック。ニュース・APIデータなど最新情報が重要なものに使う。",
              accentColor: "blue",
            },
            {
              Icon: RotateCcw,
              title: "Stale While Revalidate",
              subtitle: "速度と鮮度のバランス型",
              description: "とりあえずキャッシュを返しつつ、裏でネットワークから最新を取ってキャッシュを更新。次回アクセス時に最新が返る。",
              accentColor: "amber",
            },
          ]} />
          <KeyPoint>
            『どのリソースに、どの戦略を当てるか』を設計するのが Service Worker の腕の見せどころ。全部 Cache First にすると更新が反映されず、全部 Network First にするとオフラインの恩恵が消える。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.4 Next.js でPWAを実装するには">
          <p>
            自分でゼロから manifest.json と Service Worker を書くこともできるが、Next.js では{" "}
            <strong className="text-white">next-pwa</strong> や{" "}
            <strong className="text-white">@serwist/next</strong> といったライブラリを使うのが一般的。
          </p>
          <Timeline items={[
            {
              year: "Step 1",
              label: "ライブラリをインストール",
              description: "npm install next-pwa または @serwist/next をインストール。Service Worker の生成・登録・キャッシュ戦略の設定が自動化される。",
              accentColor: "rose",
            },
            {
              year: "Step 2",
              label: "next.config.js にラッパーを追加",
              description: "withPWA() などのラッパー関数で既存の next.config.js を包む。ビルド時に sw.js が自動生成されるようになる。",
              accentColor: "amber",
            },
            {
              year: "Step 3",
              label: "public/manifest.json とアイコンを置く",
              description: "public/ 直下に manifest.json を作成し、アイコン画像（192px・512px）を置く。app/layout.tsx の <head> で manifest をリンクする。",
              accentColor: "blue",
            },
            {
              year: "Step 4",
              label: "Vercel にデプロイすれば完了",
              description: "Vercel は自動で HTTPS を設定するため、PWAの前提条件は自動でクリア。デプロイ後すぐにインストール可能なアプリとして認識される。",
              accentColor: "emerald",
            },
          ]} />
          <CorrectionCard
            misconception="Service Worker は難しいので、自分でゼロから書かなければならない"
            correction="next-pwa や @serwist/next を使えば、Service Worker の生成・登録・キャッシュ設定はほぼ自動で行われる"
            reason="個人開発の初期段階では、ライブラリに任せて manifest.json とアイコンを置くだけで十分。Service Worker の内部構造は、PWA体験をカスタムしたくなったタイミングで深掘りすれば良い。"
          />
          <KeyPoint>
            Vercelにデプロイする場合、HTTPSは自動で設定されるのでPWAの前提条件はクリア済み。あとは manifest.json と Service Worker を載せるだけで、いつでもアプリ化できる状態にある。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.5 PWAが向く場面・向かない場面">
          <UseCaseGrid cols={2} items={[
            {
              Icon: ShoppingCart,
              title: "ECサイト・ニュース",
              subtitle: "向く場面",
              description: "再訪問を促したい・オフラインでもコンテンツを見せたい・プッシュ通知でセール告知したい——Web完結型プロダクトに最適。",
              accentColor: "emerald",
            },
            {
              Icon: ListTodo,
              title: "社内ツール・ダッシュボード",
              subtitle: "向く場面",
              description: "PCやスマホから手軽に開きたい業務ツール。ストア審査なしでアップデートを即反映できるのが強み。",
              accentColor: "blue",
            },
            {
              Icon: Bluetooth,
              title: "Bluetooth・NFC連携アプリ",
              subtitle: "向かない場面",
              description: "iOSではPWAからBluetooth/NFCにアクセスできない。デバイス機能を深く使う場合はネイティブアプリが堅い選択。",
              accentColor: "orange",
            },
            {
              Icon: Camera,
              title: "高度なカメラ・AR機能",
              subtitle: "向かない場面",
              description: "iOSのPWAサポートはAndroidより制限が多い。カメラや加速度センサーの高度な制御が必要なら、React Nativeなどネイティブ寄りの選択肢を検討する。",
              accentColor: "orange",
            },
          ]} />
          <CorrectionCard
            misconception="PWAにすれば、ネイティブアプリと完全に同じことができる"
            correction="PWAはWeb技術の範囲内でアプリ体験を拡張する技術。iOSのデバイスAPI制限など、ネイティブにしかできないことは今もある"
            reason="特にiOSではAndroidに比べてPWAのサポートが限定的。プッシュ通知もiOS 16.4以降でようやく対応。すべての機能が両プラットフォームで同じように動くわけではない。"
          />
          <KeyPoint>
            PWAは『どんなアプリも置き換える銀の弾丸』ではない。Web技術で十分なものをアプリ体験に近づける道具、と捉えるのが現実的。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "PWAが取りに行く先のリクエスト・レスポンスの仕組み",
            icon: "Server",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "PWAと組み合わせるバックエンドの選択肢",
            icon: "Cloud",
          },
          {
            href: "/kiso/vercel",
            title: "Vercelって何？",
            description: "HTTPSを自動で用意してくれるデプロイ先",
            icon: "Triangle",
          },
        ]}
      />

      <PageDrill questions={pwaQuestions} />
    </div>
  );
}
