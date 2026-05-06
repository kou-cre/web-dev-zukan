import type { DrillQuestion } from "@/components/PageDrill";

export const securityRulesQuestions: DrillQuestion[] = [
  {
    id: "security-rules-q1",
    question:
      "Firebaseセキュリティルールが必要な理由として正しいものはどれ？",
    choices: [
      "Next.jsのAPIルートがないとFirestoreにアクセスできないため",
      "FirestoreはクライアントからDBに直接アクセスできるため、ルールがないと全データが誰でも読み書きできる状態になる",
      "セキュリティルールを書かないと自動的に全データが暗号化されてアクセスできなくなる",
      "Firebase SDKを使う場合、セキュリティルールはアプリ側のJavaScriptで実行される",
    ],
    correctIndex: 1,
    explanation:
      "FirestoreはBaaSなのでサーバーを書かずにクライアントから直接DBにアクセスできる。これが便利な反面、ルールがないと誰でも全データを読み書きできるリスクがある。セキュリティルールはFirestore側（Googleのサーバー）で評価され、クライアントがどれだけコードを書き換えても突破できない。",
  },
  {
    id: "security-rules-q2",
    question:
      "セキュリティルールの `request.auth != null` が意味することは何か？",
    choices: [
      "管理者ユーザーだけがアクセスできる条件",
      "Firebase Authでログイン済みのユーザーであればアクセスを許可する条件",
      "リクエストに認証トークンが付いていないことを確認する条件",
      "データが空でないことを確認する条件",
    ],
    correctIndex: 1,
    explanation:
      "`request.auth` はFirebase Authのログイン情報を持つオブジェクトで、未ログインのときは null になる。`request.auth != null` は「ログイン済みユーザーかどうか」を確認する条件式で、最低限の認証チェックとしてよく使われる。",
  },
  {
    id: "security-rules-q3",
    question:
      "セキュリティルールで「自分のドキュメントだけ書き換えられる」を実現するための正しい条件式はどれ？",
    choices: [
      "`allow write: if request.auth != null;`",
      "`allow write: if resource.data.userId == request.auth.uid;`",
      "`allow write: if request.auth.uid == userId;`（パスに {userId} が含まれている場合）",
      "`allow write: if true;`",
    ],
    correctIndex: 2,
    explanation:
      "`match /users/{userId}` のようにパスにワイルドカード `{userId}` が含まれている場合、`request.auth.uid == userId` で「ログイン中のユーザーIDとドキュメントIDが一致するか」を確認できる。これがオーナーのみ書き換えを許可する基本パターン。`resource.data` はドキュメントの既存フィールドへのアクセスに使う。",
  },
  {
    id: "security-rules-q4",
    question:
      "開発中に使う `allow read, write: if true;` のルールについて正しい説明はどれ？",
    choices: [
      "ログイン済みユーザーだけにアクセスを許可するため、本番環境でも安全に使える",
      "全員が全データを読み書きできる状態になるため、開発初期の動作確認専用で本番では必ず削除・変更する",
      "Googleの審査を通過したユーザーだけに許可される特殊なルール",
      "このルールはFirestoreの読み取りにしか影響せず、書き込みは別途設定が必要",
    ],
    correctIndex: 1,
    explanation:
      "`if true` は条件なしで全員を許可するルール。URLを知っている人ならだれでも全データを読み書きできる危険な状態になる。動作確認のために使うことはあるが、本番公開前に必ず適切な認証・所有権チェックに書き換える必要がある。",
  },
  {
    id: "security-rules-q5",
    question:
      "クライアント側（JavaScriptコード）でFirestoreへのアクセスを制限すれば、セキュリティルールは不要だという考えについて、正しい評価はどれ？",
    choices: [
      "正しい。JavaScriptのコードでif文を使ってアクセスを制限すれば十分で、セキュリティルールは不要",
      "間違い。クライアント側のコードはブラウザの開発者ツールで確認・改ざんできるため、セキュリティはサーバー側（セキュリティルール）で行う必要がある",
      "部分的に正しい。JavaScriptで制限した場合、セキュリティルールはパフォーマンス向上だけを目的として使う",
      "正しい。Firebaseが提供するSDKを使っている限り、クライアント側のコードは外部から改ざんされない",
    ],
    correctIndex: 1,
    explanation:
      "クライアント側（ブラウザで動くJavaScript）のコードは、ブラウザの開発者ツールやcurlなどを使えば簡単に確認・迂回できる。セキュリティの原則は「クライアントを信頼しない」こと。Firebaseのセキュリティルールはサーバー側で評価されるため、クライアントのコードを書き換えても突破できない唯一の防壁になる。",
  },
];
