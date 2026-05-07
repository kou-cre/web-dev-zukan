import type { DrillQuestion } from "@/components/PageDrill";

export const envVarsQuestions: DrillQuestion[] = [
  {
    id: "env-vars-q1",
    question: ".env.local ファイルをGitHubに公開しないための正しい対処法はどれ？",
    choices: [
      ".env.local のファイル名を secret.txt に変更する",
      ".gitignore に .env*.local を記載して追跡対象から外す",
      ".env.local をprivateフォルダの中に移動する",
      "GitHubのリポジトリをPrivateに設定する",
    ],
    correctIndex: 1,
    explanation:
      ".gitignore に .env*.local を追加することで、Gitが対象ファイルを無視して追跡対象から外れます。ファイル名の変更やフォルダ移動は効果がありません。GitHubをPrivateにしても、将来的に公開に変更した場合や設定ミスのリスクが残るため、.gitignore での除外が最も確実な方法です。",
  },
  {
    id: "env-vars-q2",
    question:
      "Next.jsで環境変数をブラウザ（フロントエンド）のJavaScriptコードから参照可能にするために必要なことはどれ？",
    choices: [
      "変数名を大文字にする",
      "変数名の先頭に NEXT_PUBLIC_ をつける",
      ".env.local ではなく .env.production ファイルに書く",
      "next.config.js に env: {} で設定する",
    ],
    correctIndex: 1,
    explanation:
      "NEXT_PUBLIC_ というプレフィックスをつけた変数だけが、ビルド時にJavaScriptバンドルに埋め込まれてブラウザからも参照できます。プレフィックスのない変数はサーバー（Node.js）側でのみ参照可能です。変数名を大文字にするだけや、ファイルの場所を変えるだけでは、ブラウザから参照可能にはなりません。",
  },
  {
    id: "env-vars-q3",
    question:
      "StripeのシークレットAPIキー（sk-live-xxx）を Next.js プロジェクトで使いたい。正しい変数名はどれ？",
    choices: [
      "NEXT_PUBLIC_STRIPE_SECRET_KEY",
      "stripe_secret_key",
      "STRIPE_SECRET_KEY",
      "PUBLIC_STRIPE_KEY",
    ],
    correctIndex: 2,
    explanation:
      "シークレットAPIキーは絶対にブラウザに公開してはいけないため、NEXT_PUBLIC_ をつけない STRIPE_SECRET_KEY が正解です。NEXT_PUBLIC_STRIPE_SECRET_KEY と書くと、ビルド後のJavaScriptファイルにキーの値が埋め込まれ、ブラウザで誰でも見られる状態になります。Stripeのシークレットキーが漏洩すると不正課金の被害が発生します。",
  },
  {
    id: "env-vars-q4",
    question:
      ".env.example ファイルについて正しい説明はどれ？",
    choices: [
      ".env.local のバックアップとして、実際のAPIキーの値を書いて保存するファイル",
      "変数名と説明だけを書いてGitに含める、チームへの説明書的なファイル",
      "本番環境（Vercel）が読み込む設定ファイルで、本番用のキーを書く",
      ".gitignore に追加して、Git管理対象から外すファイル",
    ],
    correctIndex: 1,
    explanation:
      ".env.example は変数名と説明だけを書いて値を空にし、Gitに含めるファイルです。新しいチームメンバーが「このプロジェクトにはどんな環境変数が必要か」を把握するための設計書の役割を持ちます。実際のAPIキーの値は各自が .env.local に書きます。.env.example に本物の値を書いてしまうと、Gitを通じてシークレットが漏洩します。",
  },
  {
    id: "env-vars-q5",
    question:
      "Next.js で環境変数の読み込み優先順位が最も高いファイルはどれ？",
    choices: [
      ".env",
      ".env.development",
      ".env.production",
      ".env.local",
    ],
    correctIndex: 3,
    explanation:
      ".env.local は最優先で読み込まれます。同じ変数名が複数のファイルに書かれている場合、.env.local の値が優先されます。これがローカル開発時に個人の設定値を上書きできる仕組みになっています。.env は最も優先度が低く、すべてのファイルで上書きされます。",
  },
];
