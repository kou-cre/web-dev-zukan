import type { DrillQuestion } from "@/components/PageDrill";

export const apiKeyLeakQuestions: DrillQuestion[] = [
  {
    id: "api-key-leak-q1",
    question:
      "APIキーを誤ってGitHubにpushしてしまったとき、最初にすべき対応はどれ？",
    choices: [
      "すぐに git push --force で履歴を上書きする",
      "GitHubリポジトリをPrivateに変更する",
      "漏洩したAPIキーをサービスのダッシュボードで即座に無効化（revoke）する",
      "コミットを git revert で取り消す",
    ],
    correctIndex: 2,
    explanation:
      "まず最初にAPIキーを無効化することが最優先です。GitHubにpushした時点で、自動スキャンBotがすでにキーを収集している可能性があります。Gitの履歴を削除しても、既に記録されたキーは使われる恐れがあります。無効化でキーを使えなくしてから、その後で履歴削除やPrivate化などの作業を行います。",
  },
  {
    id: "api-key-leak-q2",
    question:
      "`git rm --cached .env.local` コマンドの効果として正しいのはどれ？",
    choices: [
      ".env.local ファイルをディスクから物理的に削除する",
      "Gitの追跡対象から外す（ファイル自体は残る）",
      ".env.local の内容を空にしてコミットする",
      "過去のコミット履歴から .env.local の全変更を削除する",
    ],
    correctIndex: 1,
    explanation:
      "git rm --cached は指定したファイルをGitのインデックス（追跡対象）から外すコマンドです。ファイル自体はディスクに残ります。これにより次のコミットから .env.local がGitに含まれなくなります。その後 .gitignore に追加すれば、今後も自動的に追跡対象外になります。過去の履歴を書き換えるものではないため、すでにコミット済みのファイルは別途対処が必要です。",
  },
  {
    id: "api-key-leak-q3",
    question:
      "すでにpushした履歴からAPIキーの文字列を削除するためのツールとして推奨されるのはどれ？",
    choices: [
      "git stash",
      "git revert",
      "BFG Repo Cleaner",
      "git cherry-pick",
    ],
    correctIndex: 2,
    explanation:
      "BFG Repo Cleaner はGitリポジトリの全コミット履歴から特定のファイルや文字列を削除するための専用ツールです。git filter-branch よりも高速で使いやすいため、現在の推奨ツールです。git stash は作業中の変更を一時保存するコマンド、git revert はコミットを打ち消す（履歴は残る）コマンドです。cherry-pickは別ブランチのコミットを取り込むコマンドで、どれも履歴から文字列を削除する用途には使えません。",
  },
  {
    id: "api-key-leak-q4",
    question:
      ".env.example ファイルを用意する目的として最も適切なのはどれ？",
    choices: [
      "本番環境でAPIキーを自動的に読み込むための設定ファイルとして使う",
      "GitHubにアップして、どんな環境変数が必要かをチームに伝えるための説明書",
      ".env.local のバックアップとして、実際のAPIキーを保存しておく",
      "Vercelが本番デプロイ時に自動で読み込む設定ファイル",
    ],
    correctIndex: 1,
    explanation:
      ".env.example は変数名と説明だけを書いて値を空にし、Gitに含めるファイルです。新しいチームメンバーが「このプロジェクトにはどんな環境変数が必要か」を把握するための設計書の役割を持ちます。実際のAPIキーは各自が .env.local に書きます。.env.example に本物の値を書いてGitに含めると、それ自体がAPIキー漏洩になります。",
  },
  {
    id: "api-key-leak-q5",
    question:
      "APIキー漏洩の再発防止策として最も効果的なのはどれ？",
    choices: [
      "GitHubリポジトリを常にPrivateに設定する",
      "コードに直接書かず、最初から .env.local に書いて .gitignore に追加する習慣をつける",
      "APIキーを短くして覚えやすくする",
      "GitHubのcommitメッセージにAPIキーの変更履歴を詳しく書く",
    ],
    correctIndex: 1,
    explanation:
      "最も効果的な再発防止は「コードに直書きしない習慣の定着」です。新しいプロジェクトを始めるとき、最初に .env.local を作成して .gitignore に追加してからコードを書き始めるルーティンを作れば、大半の事故を防げます。GitHubをPrivateにしても、将来の公開変更や設定ミスでリスクが残ります。APIキーの文字数はセキュリティには無関係です。",
  },
];
