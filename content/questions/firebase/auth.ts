import type { DrillQuestion } from "@/components/PageDrill";

export const authQuestions: DrillQuestion[] = [
  {
    id: "auth-q1",
    question:
      "Firebase Authの「認証（Authentication）」が確認していることとして、最も正しいものはどれ？",
    choices: [
      "そのユーザーが何のデータにアクセスできるかという「権限（認可）」を確認する",
      "そのユーザーが「本当に主張する本人かどうか」という身元を確認する",
      "そのユーザーのパスワードを暗号化して保存する処理を行う",
      "そのユーザーのログイン回数を記録してデータベースに保存する",
    ],
    correctIndex: 1,
    explanation:
      "認証（Authentication）は「あなたは誰ですか？」という身元確認。Firebase Authはこの確認をGoogleのサーバー側で行い、正当なユーザーにはuidを発行する。「誰が何にアクセスできるか」という権限の管理は認可（Authorization）であり、Firestoreのセキュリティルールが担当する別の概念。",
  },
  {
    id: "auth-q2",
    question:
      "Firebase Authを使う大きなメリットはどれ？",
    choices: [
      "パスワードをFirestoreのコレクションに平文で保存できるため管理が簡単になる",
      "認証機能を自前で実装しないため、パスワードのハッシュ化・セッション管理・不正アクセス対策をGoogleに任せられる",
      "ログイン状態がLocalStorageに自動保存されるため、onAuthStateChangedを使う必要がなくなる",
      "Firebase AuthはReactとしか連携できないため、Next.jsには使えない",
    ],
    correctIndex: 1,
    explanation:
      "認証を自前で実装すると、パスワードのハッシュ化・ソルト付与・セッション管理・不正ログイン対策など、セキュリティ上きわめて難しい課題を全て自分で解決しなければならない。Firebase Authを使えばこれらをGoogleが提供する実績あるインフラに任せられる。自前実装は専門知識がないと重大な脆弱性を生みやすい。",
  },
  {
    id: "auth-q3",
    question:
      "onAuthStateChanged について正しい説明はどれ？",
    choices: [
      "ログインボタンを押したときだけ1回呼ばれる関数で、ログイン処理を手動で実行する",
      "ユーザーのログイン状態（ログイン中 / 未ログイン）が変化するたびに自動でコールバックが呼ばれる購読型の関数",
      "Firestoreのデータが変わったときに呼ばれるリアルタイム同期のメソッドで、onSnapshotの別名",
      "ログアウト処理のみを担当するメソッドで、サインアウト後に自動で呼び出される",
    ],
    correctIndex: 1,
    explanation:
      "onAuthStateChangedはFirebase Authのリアルタイム購読関数。ページを開いた瞬間・ログイン成功時・ログアウト時に自動でコールバックが呼ばれる。Reactではuseeffect内でサブスクライブし、クリーンアップでunsubscribeを呼ぶのが定番パターン。ページリロード後もログイン状態を復元してくれる。",
  },
  {
    id: "auth-q4",
    question:
      "Firebase AuthのuidをFirestoreのセキュリティルールで使う目的として正しいのはどれ？",
    choices: [
      "uidをFirestoreのドキュメントIDとして自動設定するため",
      "uidをパスワードの代わりに保存するため、パスワードを省略できる",
      "ルール内でrequest.auth.uidを使い「自分のデータだけ書き換えられる」という所有者チェックを実装するため",
      "uidが一致する場合だけFirestoreへのすべての読み書きを許可するグローバルルールとして機能するため",
    ],
    correctIndex: 2,
    explanation:
      "Firestoreのセキュリティルール内でrequest.auth.uidを使うと、「リクエストを送ってきたユーザーのuid」を取得できる。これをドキュメントのパス変数（例: userId）と比較することで「自分のドキュメントだけ書き換えられる」というIDORを防ぐルールが実装できる。認証（Auth）と認可（セキュリティルール）の連携の核心部分。",
  },
  {
    id: "auth-q5",
    question:
      "「Firebase Authを設定したので、もうFirestoreのセキュリティルールは書かなくてよい」という考え方について正しいのはどれ？",
    choices: [
      "正しい。Firebase Authでログインが必須になった時点で、Firestoreへの不正アクセスはすべて遮断される",
      "誤り。Firebase Authは「誰かを確認する」だけで、「何にアクセスできるか」はセキュリティルールが別途制御する必要がある",
      "正しい。Firebase Authを有効にするとFirestoreのセキュリティルールがデフォルトで認証済みのみに変更される",
      "誤り。Firebase AuthとFirestoreはまったく別のサービスなので、どちらもコードなしで連携することはできない",
    ],
    correctIndex: 1,
    explanation:
      "Firebase Authは「あなたが誰か」を確認するだけ。ログイン済みのユーザーがあなた以外のデータにアクセスできるかどうかはセキュリティルールで制御する。たとえばFirebase Authなしでも「全ユーザーが全データを読める」というルールにすればアクセスできてしまう。認証と認可は別の層であり、どちらも設定が必要。",
  },
];
