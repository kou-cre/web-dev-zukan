import {
  Laptop,
  Triangle,
  Globe2,
  Monitor,
  GitBranch,
  Hammer,
  Eye,
  Lock,
  KeyRound,
  Rocket,
  GitPullRequest,
  FileCode,
  Server,
  Cloud,
  MapPin,
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
import { StatCards } from "@/components/StatCards";
import { BrowserMock } from "@/components/BrowserMock";
import { vercelQuestions } from "@/content/questions/kiso/vercel";

export const metadata = {
  title: "Vercelって何？ | Web開発図解",
  description:
    "Vercelの基本概念を図解で解説。GitHub連携・自動ビルド・CDN配信・Preview Deployment まで一気通貫で。",
};

export default function VercelPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="基礎概念"
        title="Vercelって何？"
        subtitle={
          "GitHubにpushするだけで世界に公開される、フロントエンドの『即日引っ越し業者』。"
        }
        body={
          "ビルド・配信・SSL・プレビューURLまで全部自動。書き手はコードを書くことだけに集中できる。"
        }
        accentColor="sky"
      />

      <OnePageSummary
        keyMessage="VercelはNext.jsを作ったVercel社が提供するホスティングプラットフォーム。GitHubと連携するとmainブランチへのpushだけで自動的にビルド・デプロイ・CDN配信まで完結する。「コードを書いたら即公開」が現実になるサービス。"
        metaphorTitle="24時間対応の即日引っ越し業者"
        metaphorPoints={[
          {
            label: "GitHub push",
            real: "GitHub の main ブランチへ push する",
            metaphor: "引っ越しの依頼電話（トリガー）",
          },
          {
            label: "ビルド",
            real: "Vercel が npm run build を実行して成果物を作る",
            metaphor: "荷物を梱包してトラックに積む",
          },
          {
            label: "CDN配信",
            real: "世界100以上のエッジ拠点に成果物を配置する",
            metaphor: "世界中の倉庫に荷物を分散配置",
          },
          {
            label: "Preview URL",
            real: "PRごとに専用URLが自動発行される",
            metaphor: "内見用の仮住まい",
          },
        ]}
        definition="VercelとはGitHubと連携してNext.jsアプリを自動ビルド・世界中に配信してくれるホスティングサービス。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="GitHubにpushしてからユーザーのブラウザに表示されるまで、何が起きているかを1本の流れで掴む。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Laptop}
              title="ローカルPC"
              subtitle="コードを書く・git push する"
            />
            <FlowArrow label="push" sublabel="git push origin main" direction="right" />
            <FlowCard
              Icon={GitBranch}
              title="GitHub"
              subtitle="mainブランチに変更が届く"
            />
            <FlowArrow label="Webhook通知" direction="right" />
            <FlowCard
              Icon={Triangle}
              title="Vercel"
              subtitle="自動でビルド実行"
              highlight
              accentColor="sky"
            />
            <FlowArrow label="配置" sublabel="エッジへ配信" direction="right" />
            <FlowCard
              Icon={Globe2}
              title="CDN（世界100+拠点）"
              subtitle="ユーザーに最も近いサーバー"
            />
            <FlowArrow label="表示" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="ユーザーのブラウザ"
              subtitle="高速に画面が表示される"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            push したら、あとは Vercel が全部やる。手作業のデプロイは存在しない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="Vercel が裏で肩代わりしてくれている仕事の一覧。これらを自前でやるとそれぞれ別々の手作業になる。"
        >
          <div className="rounded-xl border-2 border-dashed border-sky-700/50 p-4">
            <p className="text-xs font-semibold text-sky-400 text-center mb-4 tracking-wide uppercase">
              Vercel — やってくれること
            </p>
            <StackLayer
              Icon={GitBranch}
              title="GitHub と連携"
              subtitle="リポジトリを接続するだけで、push を検知してくれる"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Hammer}
              title="自動ビルド"
              subtitle="npm run build を Vercel 側で実行・成果物を生成する"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={Eye}
              title="Preview Deployment"
              subtitle="PR・ブランチごとに専用URLを発行して動作確認できる"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Globe2}
              title="CDN配信"
              subtitle="世界100+拠点のエッジから高速配信される"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={Lock}
              title="HTTPS自動設定"
              subtitle="SSL証明書を自動取得・更新してくれる"
              iconColor="text-rose-400"
            />
            <StackLayer
              Icon={KeyRound}
              title="環境変数管理"
              subtitle=".env の本番版をダッシュボードで管理できる"
              iconColor="text-orange-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            自前サーバーで同じことをやろうとすると、Nginx設定・Let&apos;s Encrypt 更新・CI/CD構築……と全部手作業になる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — Production と Preview の対比"
          description="Vercel には「本番」と「プレビュー」の2系統がある。役割が違うので使い分けを理解しておく。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-sky-400" />
                <p className="text-xs font-bold text-sky-300">Production（本番）</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                main ブランチに紐づく、世界に公開されている本番URL。
              </p>
              <ul className="text-xs text-gray-500 space-y-1 leading-relaxed">
                <li>・URL例: web-dev-zukan.vercel.app</li>
                <li>・mainにpushされた瞬間に最新版に置き換わる</li>
                <li>・ユーザーが普段アクセスする先</li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitPullRequest className="w-4 h-4 text-violet-400" />
                <p className="text-xs font-bold text-violet-300">Preview（プレビュー）</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                mainブランチ以外（PR・ブランチ）ごとに自動発行される確認用URL。
              </p>
              <ul className="text-xs text-gray-500 space-y-1 leading-relaxed">
                <li>・URL例: web-dev-zukan-git-feature-xxx.vercel.app</li>
                <li>・PRを出すたびに新しいURLが発行される</li>
                <li>・本番に影響を与えずに動作確認できる</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            個人開発でも「main に入れる前にスマホで確認する」用途で Preview は便利。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Vercel", "Netlify", "GitHub Pages"]}
          rows={[
            {
              label: "対応FW",
              cells: [
                "Next.js（最優先対応）",
                "React / Vue など汎用",
                "静的サイトのみ",
              ],
              highlightCol: 0,
            },
            {
              label: "自動デプロイ",
              cells: [
                "GitHub連携で自動",
                "GitHub連携で自動",
                "手動 or GitHub Actions",
              ],
              highlightCol: 0,
            },
            {
              label: "サーバーサイド",
              cells: [
                "Server Components・API Routes対応",
                "Functions対応",
                "不可",
              ],
              highlightCol: 0,
            },
            {
              label: "無料枠",
              cells: [
                "個人利用は実質無料",
                "無料枠あり",
                "完全無料",
              ],
              highlightCol: 0,
            },
            {
              label: "Preview",
              cells: [
                "PR単位でURLが発行",
                "PR単位でURLが発行",
                "なし",
              ],
              highlightCol: 0,
            },
            {
              label: "Next.jsとの相性",
              cells: [
                "最優先（同社製のため最も深く対応）",
                "対応しているが挙動差が出ることがある",
                "静的サイトのみ・サーバー機能は不可",
              ],
              highlightCol: 0,
            },
          ]}
          note="Next.js を使うなら Vercel が最も相性が良い（同じ Vercel社製のため）。Netlify でも動かせるが、Server Components・API Routes 周りで挙動の差が出ることがある。GitHub Pages は静的サイトのみで Next.js のサーバー機能は使えない。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ボク正直に言うと「デプロイ」って言葉自体がよくわかっていないんですよ……。「公開する」とは言うんですけど、それって具体的に何が起きているんでしょうか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "正直なご質問、素晴らしいです、マジさん。デプロイとは、たとえるなら「自分の部屋（ローカルPC）で書いた本を、世界中の本屋に並べる作業」のことです。ローカルでは自分しか読めない。デプロイすると初めて、地球の裏側の方からも開ける状態になるわけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあその「本屋に並べる作業」って、毎回ボクが手作業でやらないといけないんですか？ それは大変そうです……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そこで Vercel の出番です。GitHub の main ブランチへ push する、それだけ。あとは Vercel が「梱包（ビルド）」「世界の倉庫へ配置（CDN）」「鍵の準備（HTTPS）」まで全部代行してくれます。マジさんの仕事は『電話をかける（push）』ことだけなのです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "マジ？\nしかも PR を出すと専用URLまで自動で発行されるんですか！？ それはもう……ボクのデプロイ人生が変わりました！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それを Preview Deployment と申します。チームでレビューする際は「本番に入れる前にこのURLで動作を見せ合う」というのが定番の使い方です。マジさんのような個人開発者の場合でも、『main にマージする前にスマホで実機確認する』用途で十分役立ちますよ。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり Vercel は、ボクの代わりにデプロイ作業を全部やってくれる執事みたいな存在なんですね。それなら毎日push するのも怖くなくなります。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い言い表しです、マジさん。実を申しますと、Vercel を使った Next.js サイトはこの仕組みで動いています。main に push するたびに、数分で世界中の方が新しいページを見られるようになる。これが Vercel の正体です。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="8.1 そもそも『デプロイ』とは何か">
          <p>
            <strong className="text-white">デプロイ（deploy）</strong>とは、書いたコードを「実際に動く場所」に配置する作業のこと。
            ローカルで{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>npm run dev</code>{" "}
            して動かしているだけでは、自分のPCの中でしか見られない。デプロイ先（サーバー or ホスティング）に置いて初めて、世界中からアクセス可能になる。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: Laptop,
              title: "ローカル環境",
              subtitle: "localhost:3000",
              description: "自分のPCの中だけで動く。npm run dev で起動中だけ見られる状態。他の人からはアクセス不可。",
              accentColor: "amber",
            },
            {
              Icon: Globe2,
              title: "本番環境",
              subtitle: "web-dev-zukan.vercel.app",
              description: "インターネットに公開された状態。固定URLで誰でも・どこからでもアクセス可能。",
              accentColor: "sky",
            },
          ]} />
          <CorrectionCard
            misconception="デプロイ = FTPソフトでファイルをアップロードする手作業"
            correction="Vercel を使えば git push するだけで自動デプロイが完了する"
            reason="FTPアップロードはかつての手作業デプロイの方法。現代のホスティングサービスはGitHubと連携し、pushを検知して自動でビルド・配信まで完結させる。"
          />
          <KeyPoint>
            「デプロイした」＝「ローカルから本番環境へ、書いたコードの『動く版』を引っ越しさせた」と理解しておけばOK。Vercel はこの引っ越し作業を自動でやってくれる業者と言える。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.2 Vercelのビルドプロセス（push後に何が起きているか）">
          <p>
            GitHub の main に push されると、Vercel は次の順で処理を進める。
          </p>
          <Timeline items={[
            {
              year: "Step 1",
              label: "ソース取得",
              description: "Vercel が GitHub から最新のコードを clone する。pushのタイミングでWebhook通知が届き、自動的に開始される。",
              accentColor: "sky",
            },
            {
              year: "Step 2",
              label: "依存解決（npm install）",
              description: "package.json をもとに node_modules を構築する。キャッシュが効くため2回目以降は高速。",
              accentColor: "sky",
            },
            {
              year: "Step 3",
              label: "ビルド（npm run build）",
              description: "Next.js が静的ファイル＋サーバーコードを生成する。ここで型エラーやビルドエラーがあると失敗する。",
              accentColor: "amber",
            },
            {
              year: "Step 4",
              label: "エッジへ配置",
              description: "生成された成果物を世界100以上のエッジ拠点に配置する。ユーザーに最も近い拠点から配信される状態になる。",
              accentColor: "sky",
            },
            {
              year: "Step 5",
              label: "本番URL切り替え",
              description: "本番URLが新しい成果物を指すように瞬時に置き換わる。ダウンタイムなしで新バージョンが公開される。",
              accentColor: "emerald",
            },
          ]} />
          <KeyPoint>
            ローカルで{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>npm run build</code>{" "}
            が通らないコードは Vercel でも失敗する。push する前に手元で build を通しておくのが基本。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.3 CDNとエッジネットワーク（なぜ速いのか）">
          <p>
            <strong className="text-white">CDN（Content Delivery Network）</strong>：世界中の拠点に同じファイルを配置し、ユーザーから最も近い拠点が応答する仕組み。日本のユーザーには東京拠点、ヨーロッパのユーザーにはフランクフルト拠点が応答する。
          </p>
          <StatCards cols={3} items={[
            {
              value: "100+",
              label: "エッジ拠点数",
              sublabel: "Vercel のグローバル拠点",
              accentColor: "sky",
            },
            {
              value: "200ms+",
              label: "距離による遅延差",
              sublabel: "東京→米国サーバーの往復",
              accentColor: "amber",
            },
            {
              value: "~0ms",
              label: "CDN使用時の距離差",
              sublabel: "最寄り拠点が応答するため",
              accentColor: "emerald",
            },
          ]} />
          <UseCaseGrid cols={2} items={[
            {
              Icon: Server,
              title: "CDNなし（単一サーバー）",
              subtitle: "オリジンサーバーのみ",
              description: "すべてのユーザーが同じ1台のサーバーへアクセスする。物理的に遠いユーザーには通信遅延が発生する。",
              accentColor: "orange",
            },
            {
              Icon: MapPin,
              title: "CDNあり（Vercel）",
              subtitle: "世界100以上のエッジ拠点",
              description: "ユーザーに最も近いエッジ拠点が応答する。日本・欧州・米国それぞれで高速表示される。",
              accentColor: "sky",
            },
          ]} />
          <KeyPoint>
            CDNの本質は「物理距離の問題」を「拠点を増やす」ことで解決すること。Vercelは標準でCDN付きなので、何も設定しなくても世界中で速く表示される。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.4 環境変数の管理（.env と Vercelダッシュボード）">
          <p>
            <strong className="text-white">環境変数</strong>：APIキー・DB接続文字列・各種シークレットなど、コードに直書きしてはいけない値。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: FileCode,
              title: "ローカル（.env.local）",
              subtitle: "Git管理外のファイルに記述",
              description: "プロジェクトルートの .env.local に書く。.gitignore に入れてGitに含めないのが絶対ルール。",
              accentColor: "amber",
            },
            {
              Icon: Cloud,
              title: "本番（Vercelダッシュボード）",
              subtitle: "Settings → Environment Variables",
              description: "Vercel管理画面でキーと値を設定する。デプロイ時に Vercel が自動で読み込むため、コードには書かなくてよい。",
              accentColor: "sky",
            },
          ]} />
          <BrowserMock url="vercel.com/dashboard/settings/environment-variables">
            <div className="p-4 space-y-2">
              <p className="text-xs text-gray-500 mb-3">Environment Variables — Production</p>
              {[
                { key: "NEXT_PUBLIC_FIREBASE_API_KEY", value: "AIzaSy••••••••••••••" },
                { key: "DATABASE_URL", value: "postgresql://user:••••@host/db" },
                { key: "STRIPE_SECRET_KEY", value: "sk_live_••••••••••••••••••" },
              ].map(({ key, value }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 px-3 py-2 rounded-lg text-xs font-mono"
                  style={{ backgroundColor: "#1a1d2a", border: "1px solid #2d3048" }}
                >
                  <span className="text-sky-400">{key}</span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
            </div>
          </BrowserMock>
          <CorrectionCard
            misconception=".env ファイルを GitHub にコミットすれば本番でも使える"
            correction=".env は絶対に Git にコミットしてはいけない。本番の環境変数は Vercel ダッシュボードで管理する"
            reason=".env をリポジトリに含めると APIキーやDBパスワードが公開状態になる。流出すると不正利用・課金被害に直結するため、シークレットはコードから切り離して管理する。"
          />
          <KeyPoint>
            .env をうっかり Git にcommitしないこと。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>.gitignore</code>{" "}
            に{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>.env*.local</code>{" "}
            を必ず入れておく。本番のシークレットは Vercel ダッシュボード経由でのみ管理する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="8.5 Vercelを使う構成のまとめ">
          <p>
            <strong className="text-white">典型的な構成</strong>：GitHub リポジトリ + Vercel の自動デプロイ。リポジトリを連携するだけでセットアップは完了し、以降は push するだけでビルド〜配信が全自動になる。
          </p>
          <Timeline items={[
            {
              year: "① コード変更",
              label: "ローカルで開発・コミット",
              description: "新機能・バグ修正などをローカルで開発し、git commit でまとめる。npm run build でビルドが通ることを確認する。",
              accentColor: "sky",
            },
            {
              year: "② git push",
              label: "GitHubのmainブランチへpush",
              description: "git push origin main を実行するだけ。この瞬間が「デプロイの依頼」になる。",
              accentColor: "sky",
            },
            {
              year: "③ 自動ビルド",
              label: "Vercel がビルドを自動実行",
              description: "Webhook を受けた Vercel が clone → npm install → npm run build を自動で行う。ダッシュボードで進捗を確認できる。",
              accentColor: "amber",
            },
            {
              year: "④ CDN配信",
              label: "世界100以上の拠点に配置",
              description: "ビルド成果物が世界各地のエッジ拠点にデプロイされる。ダウンタイムなしで旧版から新版へ切り替わる。",
              accentColor: "sky",
            },
            {
              year: "⑤ 本番反映",
              label: "ユーザーが新バージョンを参照",
              description: "固定URLにアクセスすると最新版が表示される。Preview URLには PR ごとの確認版が残る。",
              accentColor: "emerald",
            },
          ]} />
          <p>
            main ブランチへの push をトリガーに、Vercel が自動でビルド・CDN配信を行い、数分で本番URLに反映される。手動デプロイの作業は一切ない。
          </p>
          <KeyPoint>
            「push したら世界中に届く」この仕組みこそが Vercel の本質。GitHub への push がトリガーになり、世界100以上のエッジ拠点経由でHTMLがブラウザに届く。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "Vercelが裏で動かしているサーバーの正体",
            icon: "Server",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "Vercelと組み合わせるバックエンドの選択肢",
            icon: "Cloud",
          },
          {
            href: "/kiso/database",
            title: "データベースって何？",
            description: "Vercel + BaaS の構成で扱うデータの置き場",
            icon: "Database",
          },
        ]}
      />

      <PageDrill questions={vercelQuestions} />
    </div>
  );
}
