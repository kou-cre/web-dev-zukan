import type { DrillQuestion } from "@/components/PageDrill";

export const tanstackQueryQuestions: DrillQuestion[] = [
  {
    id: "tanstack-query-q1",
    question:
      "useQuery を使うときに必ず指定する2つのプロパティはどれ？",
    choices: [
      "queryKey と queryFn",
      "url と method",
      "key と fetch",
      "id と callback",
    ],
    correctIndex: 0,
    explanation:
      "useQuery では `queryKey`（キャッシュを識別する配列）と `queryFn`（データを取得する関数・Promiseを返す必要あり）の2つが必須。queryKeyは「このクエリはどのデータか」を識別するラベル。同じqueryKeyのクエリはキャッシュを共有する。queryFnはfetch等でサーバーからデータを取得してPromiseを返す関数。",
  },
  {
    id: "tanstack-query-q2",
    question:
      "useQuery が返す isLoading と isFetching の違いとして正しいのはどれ？",
    choices: [
      "違いはない。どちらも「データ取得中かどうか」を示す全く同じ値",
      "isLoading はキャッシュがない初回取得中にtrue、isFetching はバックグラウンドの再取得中もtrue",
      "isLoading は成功した場合にtrue、isFetching はエラーが起きたときにtrue",
      "isFetching は廃止予定であり、isLoading を使うべき",
    ],
    correctIndex: 1,
    explanation:
      "isLoading はキャッシュがなく初めてデータを取得している最中だけ true になる。isFetching はバックグラウンドの再取得（stale-while-revalidate による自動更新）中にも true になる。初回ローディングUIを表示したいときはisLoading、ローディングスピナーをより細かく制御したい（バックグラウンド再取得中も表示したい）ときはisFetchingを使う。",
  },
  {
    id: "tanstack-query-q3",
    question:
      "queryKey の役割として最も正確なのはどれ？",
    choices: [
      "HTTPリクエストのURLを指定するための配列",
      "TanStack Queryがキャッシュを識別するための一意のキー。同じキーなら同じキャッシュを共有する",
      "Reactコンポーネントの key prop と同じ役割で、リスト描画の最適化に使う",
      "認証トークンなどセキュリティ情報を安全に渡すための暗号化キー",
    ],
    correctIndex: 1,
    explanation:
      "queryKey はTanStack Queryがキャッシュを識別するための「ラベル」。['users'] と ['users', 1] は別々のキャッシュエントリになる。同じ queryKey を複数のコンポーネントで使うと同じキャッシュを参照するため、fetchは1回しか走らない（重複排除）。queryKey の配列の中身が変わると新しいクエリとして扱われ、再取得が実行される。URLを直接指定するのではなく、意味のあるキー名を自分で決めて配列で指定する。",
  },
  {
    id: "tanstack-query-q4",
    question:
      "TanStack Query の stale-while-revalidate 戦略として正しいのはどれ？",
    choices: [
      "データが古い（stale）と判断したら画面を非表示にして新しいデータが来るまで待つ",
      "古いキャッシュを先に表示しながら、バックグラウンドで最新データを取得して差し替える",
      "データが古くなったら自動でエラー表示に切り替え、ユーザーに手動更新を促す",
      "staleTimeを0にするとstale-while-revalidateが無効化され、毎回新しいデータだけを表示する",
    ],
    correctIndex: 1,
    explanation:
      "stale-while-revalidate は「古いデータを表示しながら最新を取りに行く」戦略。キャッシュが存在する場合、まず古いデータをすぐに表示してユーザーが待たないようにし、バックグラウンドで最新データを取得して差し替える。このためユーザーはほとんどローディングスピナーを見ずに済む。staleTime を設定することで「何秒間は新鮮とみなして再取得しない」を制御できる（デフォルトは0=常にstale扱い）。",
  },
  {
    id: "tanstack-query-q5",
    question:
      "useMutation の onSuccess コールバックでよく行う処理として最も適切なのはどれ？",
    choices: [
      "mutate() の戻り値を useState に保存する",
      "queryClient.invalidateQueries で関連するキャッシュを無効化し、最新データを再取得させる",
      "再レンダリングを強制するために window.location.reload() を呼ぶ",
      "成功したデータをlocalStorageに保存してページをリロードする",
    ],
    correctIndex: 1,
    explanation:
      "useMutationのonSuccessで最も一般的に行うのが`queryClient.invalidateQueries({ queryKey: ['todos'] })`のようなキャッシュの無効化。例えばTodoを追加（POST）した後、onSuccessでtodosのキャッシュを無効化すると、TanStack Queryが自動でtodosの最新データを再取得してUIを更新する。これにより「書き込み→キャッシュ無効化→自動再取得→UI更新」という流れが完結する。window.location.reloadはページ全体をリセットする荒っぽい方法で、SPAでは避けるべき。",
  },
];
