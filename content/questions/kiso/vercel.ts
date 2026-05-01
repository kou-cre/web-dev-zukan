import type { DrillQuestion } from "@/components/PageDrill";

export const vercelQuestions: DrillQuestion[] = [
  {
    id: "vercel-q1",
    question: "Vercelを一言で説明したものとして最も適切なのはどれ？",
    choices: [
      "ブラウザの中で動くJavaScriptエンジンの一種",
      "GitHubと連携してNext.jsアプリを自動ビルド・世界中に配信してくれるホスティングサービス",
      "Reactの代わりに使えるUIフレームワーク",
      "データベースを提供する BaaS の一種",
    ],
    correctIndex: 1,
    explanation:
      "VercelはNext.jsを開発した Vercel社が運営するホスティングプラットフォーム。GitHub連携・自動ビルド・CDN配信・HTTPS発行までワンセットで提供する。Aはブラウザ側の実行環境、CはUIライブラリの話、DはFirebase/Supabaseなどの領域で、いずれもVercelとは別物。",
  },
  {
    id: "vercel-q2",
    question: "「即日引っ越し業者」の比喩において、CDN配信に対応するのは次のうちどれ？",
    choices: [
      "引っ越しの依頼電話",
      "荷物を梱包してトラックに積む",
      "世界中の倉庫に荷物を分散配置する",
      "内見用の仮住まい",
    ],
    correctIndex: 2,
    explanation:
      "CDN（Content Delivery Network）は世界中の拠点（エッジ）に同じファイルを配置し、ユーザーから一番近い拠点が応答する仕組み。比喩で言えば「世界中の倉庫に荷物を分散配置」。依頼電話はGitHubへのpush、トラック積込はビルド、内見用の仮住まいはPreview Deployment。役割の違いを混ぜないように。",
  },
  {
    id: "vercel-q3",
    question: "Vercelで自動デプロイのトリガーになる「main ブランチへの push」は、デプロイフローのどの位置にある？",
    choices: [
      "最後のステップ（CDN配信が終わった後にpushする）",
      "最初のトリガー（pushを起点にビルド・配信が始まる）",
      "デプロイとは無関係（VercelはGitHubと連動しない）",
      "Preview Deployment 専用で、本番には反映されない",
    ],
    correctIndex: 1,
    explanation:
      "Vercelは GitHub の指定ブランチ（通常はmain）への push を検知して自動的にビルド→CDN配信を開始する。つまり「pushが起点」。手動でデプロイボタンを押す必要はない。Preview Deployment は main 以外のブランチや PR が対象で、本番URLとは別のプレビューURLが発行される。",
  },
  {
    id: "vercel-q4",
    question: "Preview Deployment の説明として最も正しいのはどれ？",
    choices: [
      "本番URLを上書きするので、main マージ前に注意が必要",
      "PRやブランチごとに専用URLが自動発行され、本番に影響を与えずに確認できる",
      "Vercelの有料プランでしか使えない機能",
      "ローカルの npm run dev と同じものでブラウザでは見られない",
    ],
    correctIndex: 1,
    explanation:
      "Preview Deployment は PR やブランチ単位で発行される独立したプレビュー環境。本番URL（mainブランチ）には影響しないので「マージ前の動作確認」「チームレビュー」「クライアントへの仮共有」に使える。個人開発でも「mainに入れる前にスマホで確認する」用途で十分役立つ。無料枠でも標準で使える。",
  },
  {
    id: "vercel-q5",
    question: "このプロジェクト（web-dev-zukan）の構成として最も近いのはどれ？",
    choices: [
      "自前のVPSにNginxを立ててデプロイしている",
      "GitHubのmainにpushすると Vercel が自動でビルド・配信し、本番URLに反映される",
      "Vercelは使わず、GitHub Pagesで静的ホスティングしている",
      "Firebase Hosting にデプロイしており、GitHubとは連動していない",
    ],
    correctIndex: 1,
    explanation:
      "このサイト（web-dev-zukan.vercel.app）自体が Vercel + GitHub の自動デプロイ構成で動いている実例。mainへpushすると数十秒〜数分で本番に反映される。Server Components や API Routes を使う Next.js アプリは、GitHub Pages（静的のみ）では動かせないため、Vercelのようなサーバー対応のホスティングが必要になる。",
  },
];
