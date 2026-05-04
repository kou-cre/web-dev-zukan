import type { DrillQuestion } from "@/components/PageDrill";

export const gitBasicsQuestions: DrillQuestion[] = [
  {
    id: "git-basics-q1",
    question:
      "GitとGitHubの違いについて、正しい説明はどれ？",
    choices: [
      "GitとGitHubは同じもので、どちらもMicrosoftが提供するクラウドサービスだ",
      "Gitはローカルで動くバージョン管理ソフト。GitHubはGitのリポジトリをクラウドで共有するサービス",
      "GitはGitHubが作ったツールで、GitHubなしでは動かない",
      "GitはGitHubの有料版で、ローカルに保存できる機能が追加されている",
    ],
    correctIndex: 1,
    explanation:
      "Gitはローカルで動くバージョン管理ソフトで、インターネットがなくても使える。履歴管理・ブランチ・マージはすべてGit単体の機能。GitHubはそのリポジトリをクラウドに置いてチームで共有するためのサービス。GitLabやBitbucketも同じ役割を果たす別サービス。「Gitがゲームのセーブ機能」で「GitHubはそのセーブデータのクラウド同期サービス」というイメージで覚えると分かりやすい。",
  },
  {
    id: "git-basics-q2",
    question:
      "ファイルを編集した後、その変更をローカルリポジトリに記録（コミット）するまでの正しい手順はどれ？",
    choices: [
      "git commit → git add の順に実行する",
      "git push だけ実行すればローカルにも自動で記録される",
      "git add でステージに追加してから、git commit でローカルに記録する",
      "git save を実行すると変更が自動でコミットされる",
    ],
    correctIndex: 2,
    explanation:
      "Gitには「作業ツリー → ステージ → ローカルリポジトリ」という3つのエリアがある。ファイルを編集しただけではまだ作業ツリーにある状態。git add でステージ（次のコミットに含めるものを選ぶ場所）に追加し、git commit でステージの内容をローカルリポジトリに記録する。ステージというワンクッションがあるおかげで「今回のコミットに含める変更だけを選んで」記録できる。",
  },
  {
    id: "git-basics-q3",
    question:
      "git pull と git fetch の違いとして正しいのはどれ？",
    choices: [
      "どちらも全く同じ動作をする。どちらを使っても結果は同じ",
      "git fetch はリモートの情報を取得するだけで作業ツリーは変えない。git pull は取得後にマージまで自動で行う",
      "git pull はリモートへ送信するコマンドで、git fetch はローカルに取得するコマンド",
      "git fetch は新規ファイルのみ取得し、git pull は変更ファイルのみ取得する",
    ],
    correctIndex: 1,
    explanation:
      "git fetch はリモートの最新状態をローカルリポジトリに取得するが、作業ツリー（実際のファイル）は変更しない。「どんな変更があるか確認だけしたい」ときに使う。git pull は fetch + merge をまとめて行うコマンドで、リモートの変更を取得してそのまま現在のブランチに適用する。競合が起きると困るタイミングでは fetch で確認してから手動でマージするのが安全。",
  },
  {
    id: "git-basics-q4",
    question:
      ".gitignore に書いて Git の管理対象から除外すべきファイルはどれ？",
    choices: [
      "index.html や style.css などの成果物ファイル",
      "README.md などのドキュメントファイル",
      "node_modules/ や .env ファイル",
      "src/ ディレクトリ以下のすべてのソースコード",
    ],
    correctIndex: 2,
    explanation:
      "node_modules/ はnpmでインストールした依存パッケージが入るフォルダで、数万ファイルになることもある。package.json があれば npm install で復元できるので Git に含める必要はない。.env はAPIキーやパスワードなどの秘密情報が書かれることが多く、GitHubに公開すると情報漏洩になる。他にも .DS_Store（MacのOS生成ファイル）も除外するのが一般的。ソースコードや設定ファイル、ドキュメントは管理対象に含めるべきもの。",
  },
  {
    id: "git-basics-q5",
    question:
      "Firebase の設定キーについて、GitHubのパブリックリポジトリに公開しても問題ないのはどれ？",
    choices: [
      "Firebase Service Account の JSON ファイル（サーバーサイド用の秘密鍵）",
      "Firebase Web SDK の設定オブジェクト（apiKey / projectId など）",
      "データベースの接続パスワードを書いた .env ファイル",
      "全ての Firebase 関連ファイルは公開してはいけない",
    ],
    correctIndex: 1,
    explanation:
      "Firebase Web SDK の設定（apiKey / authDomain / projectId など）はブラウザから呼ぶ設計のため、公開しても問題ない。実際のアクセス制御はFirebaseのセキュリティルールで行う。一方、Firebase Service Account の JSON ファイルはサーバー側の秘密鍵で、これが漏れると Firestore・Storage などすべてのリソースに無制限アクセスできてしまう。絶対にGitに含めてはいけない。「ブラウザに配布されるもの」と「サーバーだけが持つ秘密鍵」を区別することが重要。",
  },
];
