import type { DrillQuestion } from "@/components/PageDrill";

export const baasQuestions: DrillQuestion[] = [
  {
    id: "baas-q1",
    question: "BaaS（Backend as a Service）を一言で説明したものとして最も適切なのはどれ？",
    choices: [
      "ブラウザ上だけで動くJavaScriptフレームワークのこと",
      "認証・DB・ストレージなどバックエンド機能をクラウドが丸ごと提供してくれるサービス",
      "自前のサーバーを運用するためのOSの一種",
      "デプロイ専用のCDNサービスのこと",
    ],
    correctIndex: 1,
    explanation:
      "BaaSは「サーバーを自分で建てずに、認証・DB・ストレージ・通知などのバックエンド機能を全部借りられるクラウドサービス」。Firebase / Supabase が代表例。Aはフロントエンド、Cはサーバー運用基盤、Dは配信網（CDN）の話で、いずれもBaaSではない。",
  },
  {
    id: "baas-q2",
    question:
      "「フルオプション付きのシェアキッチン」という比喩において、Auth（認証）に対応するのは次のうちどれ？",
    choices: [
      "食材の冷蔵庫",
      "ドアの鍵と来客管理",
      "調理器具の棚",
      "出前代行",
    ],
    correctIndex: 1,
    explanation:
      "認証は「誰が入っていいか」を判定する仕組み。比喩で言えばドアの鍵と来客名簿。食材の冷蔵庫はDB（Firestore等）、調理器具の棚はStorage、出前代行はCloud Functionsに対応する。役割の違いを混ぜないよう整理しておくこと。",
  },
  {
    id: "baas-q3",
    question: "BaaSを使うと「サーバーが完全に消える」という理解は正しい？",
    choices: [
      "正しい。BaaSではサーバーは存在しなくなる",
      "正しくない。BaaS提供側のサーバーが代わりに動いている",
      "正しい。BaaSはブラウザだけで完結する",
      "正しい。BaaSはピアツーピア通信のため中央サーバーがない",
    ],
    correctIndex: 1,
    explanation:
      "サーバーが消えたわけではなく、自分が建てなくて済むだけ。FirebaseもSupabaseも、Googleや各社のデータセンターで物理（または仮想）サーバーが動いている。「誰かのサーバーを間借りしている」と理解すると、後でサーバーレスや自前サーバーに進んだときの地続き感が違う。",
  },
  {
    id: "baas-q4",
    question: "Firebase と Supabase の違いとして正しい組み合わせはどれ？",
    choices: [
      "Firebase は PostgreSQL、Supabase は NoSQL",
      "Firebase は NoSQL（Firestore）、Supabase は PostgreSQL（RDB）",
      "Firebase はオープンソース、Supabase は Googleが提供",
      "両者ともリアルタイム同期に対応していない",
    ],
    correctIndex: 1,
    explanation:
      "Firebase の Firestore は NoSQL（ドキュメント型）で、リアルタイム同期に強み。Supabase は PostgreSQL ベースの RDB で、SQLが書けてオープンソース。Firebase は Google、Supabase は OSS の Firebase 代替として作られた。リアルタイム同期は両者とも対応している（Supabase は Realtime Subscriptions）。",
  },
  {
    id: "baas-q5",
    question: "このプロジェクトの方針として最も近いのはどれ？",
    choices: [
      "ステージ1から自前サーバー＋自作認証で全て実装する",
      "ステージ1は Firebase（または Supabase）で動くものを最短で出し、必要が出たらステージ2で自前構築に踏み込む",
      "BaaSは怪しいので使わず、すべて静的サイトで完結させる",
      "Firebase だけ使えれば十分なので、サーバーの仕組みは一切学ばない",
    ],
    correctIndex: 1,
    explanation:
      "ステージ1は BaaS で最短で動くものを出すのが方針。「今は触らない、でも構造は知っている」状態を目指す。Aは学習コストが重く挫折しやすい。Dのように仕組みを学ばないと、ベンダーロックインやクエリ制限にぶつかったときに身動きが取れなくなる。「使う」と「依存する」の間に線を引いておくこと。",
  },
];
