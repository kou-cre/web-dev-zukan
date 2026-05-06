import type { DrillQuestion } from "@/components/PageDrill";

export const routingQuestions: DrillQuestion[] = [
  {
    id: "routing-q1",
    question: "react-routerでルーティングを設定するとき、アプリ全体を包む最外側のコンポーネントはどれか？",
    choices: [
      "Routes",
      "Route",
      "BrowserRouter",
      "Link",
    ],
    correctIndex: 2,
    explanation:
      "BrowserRouterがアプリ全体を包み、ブラウザのURLの変化を監視する役割を担う。BrowserRouterの中にRoutesを置き、さらにその中に個々のRouteを定義する。BrowserRouterはアプリに1つだけ配置する。",
  },
  {
    id: "routing-q2",
    question: "react-routerのLinkコンポーネントと通常のaタグの最大の違いはどれか？",
    choices: [
      "Linkはhref属性を使い、aタグはto属性を使う",
      "Linkはページ全体を再読み込みせずにURLだけを変える",
      "Linkはサーバーからデータを取得してから遷移する",
      "Linkはモバイルでのみ動作する",
    ],
    correctIndex: 1,
    explanation:
      "LinkコンポーネントをクリックするとブラウザのHistory APIを使ってURLだけが変わり、Reactの状態（ログイン情報・カートの中身など）は維持される。通常のaタグはページ全体を再読み込みするためReactの状態がリセットされる。なお、Linkはtoプロパティを使い（hrefではない）、aタグはhref属性を使う点も覚えておこう。",
  },
  {
    id: "routing-q3",
    question: "Route のpath='/users/:id' に対して '/users/42' にアクセスしたとき、URLパラメータ id の値を取得するHookはどれか？",
    choices: [
      "useParams()",
      "useQuery()",
      "useLocation()",
      "useState()",
    ],
    correctIndex: 0,
    explanation:
      "useParams()はURLパラメータの値を取り出すHookで、const { id } = useParams() の形で使う。'/users/42' にアクセスした場合、id の値は '42' になる。useQuery()はReact Queryのフックであり、useLocation()はURLのパス情報全体を取得するフック、useState()はコンポーネントのローカル状態管理用。",
  },
  {
    id: "routing-q4",
    question: "SPA（シングルページアプリケーション）の特徴として正しいものはどれか？",
    choices: [
      "ページ移動のたびにサーバーから新しいHTMLを取得する",
      "1つのHTMLを読み込んでおき、URLの変化に応じてJavaScriptでコンポーネントを切り替える",
      "ページ数に応じてHTMLファイルが増える",
      "JavaScriptを使わずにページ切り替えを行う",
    ],
    correctIndex: 1,
    explanation:
      "SPAは1つのHTMLページを最初に読み込み、それ以降はJavaScriptがURLの変化を検知してコンポーネントを差し替える。ページ全体の再読み込みが起きないためアプリの状態が維持され、ページ遷移が速く感じられる。これがLINEやTwitterのような「アプリ的なUI」を実現する仕組み。",
  },
  {
    id: "routing-q5",
    question: "useNavigateを使う典型的なシーンはどれか？",
    choices: [
      "ナビゲーションバーのリンクを作るとき",
      "ページの見出しをクリックして別ページへ遷移するとき",
      "フォーム送信後にプログラムでリダイレクトするとき",
      "画像をクリックして拡大表示するとき",
    ],
    correctIndex: 2,
    explanation:
      "useNavigateはLinkコンポーネントを使わずにJavaScript側からページ遷移を発生させるHook。ログイン成功後に管理画面へリダイレクト、フォーム送信後に完了ページへ遷移するといった「クリックではなく処理の結果として遷移したい」場面で使う。単純なリンクにはLinkコンポーネントを使うほうがシンプル。",
  },
];
