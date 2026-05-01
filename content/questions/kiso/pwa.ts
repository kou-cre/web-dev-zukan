import type { DrillQuestion } from "@/components/PageDrill";

export const pwaQuestions: DrillQuestion[] = [
  {
    id: "pwa-q1",
    question: "PWA（Progressive Web App）を一言で説明したものとして最も適切なのはどれ？",
    choices: [
      "ネイティブアプリをWebViewで包んで配布する技術",
      "Webサイトをアプリのような体験（インストール・オフライン・プッシュ通知）で使えるようにする技術の総称",
      "Webサイトをスマホ用に自動最適化するレスポンシブデザイン手法",
      "アプリストアに自動申請してくれるビルドツール",
    ],
    correctIndex: 1,
    explanation:
      "PWAは「Webサイトをネイティブアプリに近い体験で使えるようにする技術の総称」。manifest.jsonとService Workerを追加することで、ホーム画面に追加・オフライン動作・プッシュ通知などが実現できる。Aはハイブリッドアプリ（Cordova等）、Cはレスポンシブデザイン、Dは別の概念で、いずれもPWAそのものではない。",
  },
  {
    id: "pwa-q2",
    question: "PWAを成立させる『3要素』として正しい組み合わせはどれ？",
    choices: [
      "HTML / CSS / JavaScript",
      "HTTPS / manifest.json / Service Worker",
      "React / Next.js / Vercel",
      "Cookie / LocalStorage / IndexedDB",
    ],
    correctIndex: 1,
    explanation:
      "PWAの前提は「HTTPS（セキュアな通信）」「manifest.json（アプリの顔となる設定書）」「Service Worker（裏で待機する影武者）」の3要素。HTTPSは前提条件、manifest.jsonでアイコン・名前・起動モードを定義し、Service Workerでオフライン対応やキャッシュを実現する。",
  },
  {
    id: "pwa-q3",
    question: "manifest.jsonの役割として最も適切なのはどれ？",
    choices: [
      "Webサイトのアクセス解析データを保存するファイル",
      "アプリのアイコン・名前・テーマカラー・起動モードなどをブラウザに伝える設定ファイル",
      "ユーザーのログイン情報を保管するファイル",
      "サーバー側のルーティングを定義する設定ファイル",
    ],
    correctIndex: 1,
    explanation:
      "manifest.jsonは「アプリの顔」。ホーム画面に追加されたときに使われるアイコン・短縮名・テーマカラー・起動モード（standalone等）といった、アプリとして見せるためのメタ情報をまとめたJSONファイル。ブラウザはこれを読んで「インストール可能なアプリ」として扱う。",
  },
  {
    id: "pwa-q4",
    question: "Service Workerについての説明として最も正しいのはどれ？",
    choices: [
      "サーバー上で動くNode.jsの常駐プロセスのこと",
      "ブラウザとネットワークの間に立ち、リクエストを横取りしてキャッシュ等を制御できるブラウザ常駐スクリプト",
      "アプリストアに代わってPWAを審査・配布する仕組み",
      "ユーザーのデバイス情報をサーバーに送るトラッキング機能",
    ],
    correctIndex: 1,
    explanation:
      "Service Workerは「ブラウザに常駐して、ネットワークリクエストを横取りできる影武者のようなスクリプト」。キャッシュからレスポンスを返したり、オフライン時のフォールバックを返したり、プッシュ通知を受け取ったりできる。サーバー側ではなく、あくまでブラウザ内で動く点に注意。",
  },
  {
    id: "pwa-q5",
    question: "キャッシュ戦略のうち「まずキャッシュを確認し、なければネットワークへ取りに行く」方式の名前はどれ？",
    choices: [
      "Network First",
      "Cache First",
      "Stale While Revalidate",
      "Network Only",
    ],
    correctIndex: 1,
    explanation:
      "Cache First はその名の通り「まずキャッシュ」。静的ファイル（CSS・JS・画像など）に向いている。Network First はAPIなど鮮度を優先したい場面で使う。Stale While Revalidate は「キャッシュをすぐ返しつつ裏で最新を取りに行く」ハイブリッド方式で、用途に応じて使い分ける。",
  },
];
