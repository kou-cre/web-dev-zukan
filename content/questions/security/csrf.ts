import type { DrillQuestion } from "@/components/PageDrill";

export const csrfQuestions: DrillQuestion[] = [
  {
    id: "csrf-q1",
    question:
      "CSRF（クロスサイトリクエストフォージェリ）とは何か、正しい説明を選べ。",
    choices: [
      "攻撃者が悪意あるJavaScriptをWebページに埋め込む攻撃",
      "ログイン中のユーザーのCookieを悪用して、別サイトから不正なリクエストを送る攻撃",
      "ブラウザが別オリジンへのリクエストをブロックするセキュリティ機能",
      "データベースへのSQL文を不正に改ざんする攻撃",
    ],
    correctIndex: 1,
    explanation:
      "CSRFはログイン中ユーザーのCookieをブラウザが自動的に送る性質を悪用します。攻撃者のサイトに設置された偽フォームを経由して、ターゲットサイトに不正なリクエストを送る攻撃です。選択肢1はXSS、選択肢3はCORSの説明です。CSRFはCross-Site Request Forgeryの略で、『クロスサイト』の名前はXSS（Cross-Site Scripting）と似ていますが全く別の概念です。",
  },
  {
    id: "csrf-q2",
    question:
      "CSRFトークンを使った対策の仕組みとして正しいものはどれ？",
    choices: [
      "フォームを送信するたびにHTTPSに切り替えて、通信を暗号化する",
      "サーバーがフォームを生成するときにランダムなトークンを埋め込み、送信時に検証する",
      "ユーザーのIPアドレスを確認して、登録済みIPからのみリクエストを受け付ける",
      "フォームのaction属性を隠して、攻撃者がURLを知れないようにする",
    ],
    correctIndex: 1,
    explanation:
      "CSRFトークンはサーバーがフォーム表示時にランダムなワンタイム値を生成し、フォームに埋め込みます。フォーム送信時にこのトークンをサーバーが検証し、一致しない場合はリクエストを拒否します。攻撃者は同一オリジンポリシーによって相手サイトのHTMLを読めないため、トークンの値を事前に知ることができません。IPアドレスは変動するため認証には使えません。",
  },
  {
    id: "csrf-q3",
    question:
      "Cookie の `SameSite=Lax` 属性を設定した場合の挙動として正しいのはどれ？",
    choices: [
      "どのサイトからのリクエストでもCookieを送る（従来と同じ）",
      "同一サイトからのリクエストのみCookieを送り、外部サイトからのPOSTリクエストにはCookieを送らない",
      "CookieをJavaScriptから読み取れなくする",
      "Cookie をHTTPS通信のときのみ送る",
    ],
    correctIndex: 1,
    explanation:
      "SameSite=Lax は『同一サイト内のナビゲーション（リンクのクリック等）にはCookieを送るが、別サイトからのフォームPOSTにはCookieを送らない』という設定です。これによりCSRFの主要な手段（別サイトのフォームPOSTによる攻撃）を防げます。現代のブラウザはデフォルトでLax設定になっています。HttpOnlyはJSからの読み取り制限、SecureはHTTPS限定の設定です。",
  },
  {
    id: "csrf-q4",
    question:
      "CSRFとCORSの違いとして正しい説明はどれ？",
    choices: [
      "CSRFとCORSは同じ仕組みで、名前が違うだけ",
      "CSRFは攻撃の名前で、CORSはブラウザのセキュリティ機能の名前。全くの別物",
      "CORSはフォームPOSTを防ぐ機能で、CSRFはJavaScriptのfetchを防ぐ攻撃手法",
      "CSRFはサーバー側の問題で、CORSはクライアント側の問題",
    ],
    correctIndex: 1,
    explanation:
      "CSRFは攻撃手法の名前で、CORSはブラウザのセキュリティ機能の名前です。名前が似ていますが全く別の概念です。CORSはJavaScriptのfetchによる別オリジンリクエストを制限しますが、フォームのPOSTリクエストはCORSの制限外です。そのためCSRF攻撃はCORSがあっても成立するケースがあります。SameSite CookieとCSRFトークンがCSRFの主要な対策です。",
  },
  {
    id: "csrf-q5",
    question:
      "HttpOnly Cookie を使えばCSRFを防げる、という主張は正しいか？",
    choices: [
      "正しい。JavaScriptからCookieを読めなくすれば、攻撃者はCookieを盗めない",
      "誤り。HttpOnly CookieはXSSでCookieを盗まれることを防ぐが、CSRFは防げない",
      "正しい。HttpOnly CookieはブラウザがCookieを自動送信しなくなる設定",
      "誤り。HttpOnly Cookie を使うとフォームが送信できなくなる",
    ],
    correctIndex: 1,
    explanation:
      "HttpOnly CookieはJavaScriptからCookieを読み取れなくする設定で、XSSでCookieを盗む攻撃（セッションハイジャック）を防ぎます。しかしCSRFはCookieの『値を盗む』のではなく、ブラウザが『自動的にCookieを送る』性質を悪用します。HttpOnlyはブラウザの自動送信には影響しないため、CSRFは防げません。CSRFにはSameSite=LaxまたはCSRFトークンが必要です。",
  },
];
