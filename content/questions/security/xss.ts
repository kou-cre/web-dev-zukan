import type { DrillQuestion } from "@/components/PageDrill";

export const xssQuestions: DrillQuestion[] = [
  {
    id: "xss-q1",
    question:
      "XSS（クロスサイトスクリプティング）とは何か、正しい説明を選べ。",
    choices: [
      "別のサイトからのリクエストをブロックするブラウザのセキュリティ機能",
      "攻撃者が悪意あるJavaScriptをWebページに埋め込む攻撃",
      "ログイン中のユーザーになりすましてリクエストを送る攻撃",
      "APIキーを環境変数に保存しないで使う危険な実装",
    ],
    correctIndex: 1,
    explanation:
      "XSSは攻撃者がWebページに悪意あるJavaScriptを埋め込む攻撃です。ユーザーの入力をHTMLとして解釈することで発生します。選択肢1はCORSの説明、選択肢3はCSRFの説明です。XSSが成功すると、セッションCookieの盗難・フィッシング・マルウェアの配布などが行われます。",
  },
  {
    id: "xss-q2",
    question:
      "ReactのJSXで `{userComment}` と書いて変数を表示した場合、XSSに対してどのような挙動をするか？",
    choices: [
      "XSSの攻撃が成立する可能性がある（手動でエスケープが必要）",
      "ReactがHTMLを自動的にエスケープするため、スクリプトは実行されない",
      "コンソールにエラーが出るが、ページは表示される",
      "コンポーネントがクラッシュしてエラーになる",
    ],
    correctIndex: 1,
    explanation:
      "ReactはJSXの {} 式で変数を表示するとき、HTMLの特殊文字（<, >, & など）を自動的にエスケープします。例えば <script> という文字列は &lt;script&gt; に変換され、HTMLタグとして解釈されず単なる文字列として表示されます。これがReactを使うだけでXSSの大半を防げる理由です。",
  },
  {
    id: "xss-q3",
    question:
      "React の `dangerouslySetInnerHTML` を使う場合、XSS対策として正しい対応はどれ？",
    choices: [
      "React が自動でエスケープするので何もしなくてよい",
      "DOMPurify などのサニタイズライブラリを通してから渡す",
      "TypeScript の型定義を厳格にする",
      "HTTPS 通信を使うことで防げる",
    ],
    correctIndex: 1,
    explanation:
      "dangerouslySetInnerHTML はReactの自動エスケープをバイパスして、渡した文字列をHTMLとして直接解釈します。ユーザー入力を渡す場合は、DOMPurify.sanitize() を通してから渡すことでXSSを防げます。TypeScriptやHTTPSはXSS対策にはなりません。dangerouslySetInnerHTML の名前に『dangerous（危険）』が入っているのは、開発者に注意を促すためです。",
  },
  {
    id: "xss-q4",
    question:
      "Reactを使っていても XSS リスクが残る可能性があるケースはどれ？（最も適切なものを選べ）",
    choices: [
      "通常の JSX で {value} を使ってテキストを表示する場合",
      "href 属性にユーザー入力のURLを直接設定する場合",
      "CSS クラス名に変数を使う場合",
      "React コンポーネントの props を文字列型で渡す場合",
    ],
    correctIndex: 1,
    explanation:
      "href 属性にユーザー入力のURLを直接設定する場合、`javascript:alert(1)` のような javascript: スキームを含む値が設定されるとXSSになる可能性があります。href はReactのエスケープ対象外だからです。URLが http:// または https:// で始まることを確認してから設定するか、Next.jsのLinkコンポーネントを使いましょう。通常の {} での表示は自動エスケープされるため安全です。",
  },
  {
    id: "xss-q5",
    question:
      "CSP（Content Security Policy）についての正しい説明はどれ？",
    choices: [
      "CSPを設定すれば dangerouslySetInnerHTML の安全なサニタイズは不要になる",
      "CSPはHTTPヘッダーで許可するスクリプトの出所を指定する仕組みで、XSS対策の第二の防衛線",
      "CSPはAPIキーの漏洩を防ぐための設定",
      "CSPを設定するとブラウザでJavaScriptが一切動かなくなる",
    ],
    correctIndex: 1,
    explanation:
      "CSPはHTTPレスポンスヘッダーで「このページで許可するスクリプトの出所」を指定する仕組みです。万が一XSSが成功しても、外部の悪意あるスクリプトの読み込みをブロックできます。ただしCSPはエスケープの代わりにはならず、エスケープ + CSPの二重の対策が推奨されます。CSPを設定してもJavaScript自体は動き続けます（設定内容に依存）。",
  },
];
