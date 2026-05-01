import type { DrillQuestion } from "@/components/PageDrill";

export const databaseQuestions: DrillQuestion[] = [
  {
    id: "database-q1",
    question: "「データベース（DB）」を一言で説明したものとして最も適切なのはどれ？",
    choices: [
      "ブラウザを閉じると消える、その場限りの一時メモのこと",
      "データをルールに従って保存・検索・更新・削除できる仕組みの総称",
      "サーバーの電源そのもののこと",
      "JavaScriptの変数を保持しているメモリ領域のこと",
    ],
    correctIndex: 1,
    explanation:
      "DBは「アプリの長期記憶」。保存（Create）・検索（Read）・更新（Update）・削除（Delete）の4つを安全に・速くこなす仕組みの総称。Aは sessionStorage / 変数のレベル、Cはハードウェア、Dはランタイムのメモリで、いずれもページをリロードすれば消える。DBは「電源を切っても消えない・誰がアクセスしても同じ答えが返る」が条件。",
  },
  {
    id: "database-q2",
    question:
      "「CRUD」とは何の頭文字を取った言葉？",
    choices: [
      "Connect / Run / Update / Disconnect",
      "Create / Read / Update / Delete",
      "Cache / Render / Upload / Download",
      "Code / Review / User / Database",
    ],
    correctIndex: 1,
    explanation:
      "CRUD = Create（追加）/ Read（取得）/ Update（更新）/ Delete（削除）。DBに対する基本4操作のこと。Firestore で言えば addDoc / getDocs / updateDoc / deleteDoc が、それぞれ CRUD に対応している。SQLでは INSERT / SELECT / UPDATE / DELETE。言葉は違えど概念は同じ。",
  },
  {
    id: "database-q3",
    question:
      "RDB（リレーショナルデータベース）と NoSQL の違いとして、最も正しい説明はどれ？",
    choices: [
      "RDBは無料、NoSQLは有料という料金面の違い",
      "RDBは「テーブル（行と列）」で、NoSQLは「ドキュメント（JSONなど）」でデータを表現する",
      "RDBはブラウザでしか動かず、NoSQLはサーバーでしか動かない",
      "RDBは新しい技術、NoSQLは古い技術",
    ],
    correctIndex: 1,
    explanation:
      "本質的な違いはデータ構造。RDB（PostgreSQL / MySQL / Supabase など）は表形式で行と列に値を入れる。NoSQL（Firestore / MongoDB など）はJSONのようなドキュメント単位で保存し、後から項目を増やしやすい。料金や新旧で分かれているわけではなく、両方とも現役で使われていて、適材適所で選ぶ。",
  },
  {
    id: "database-q4",
    question:
      "「ブラウザのJavaScript変数に値を入れて保持する」のと「データベースに保存する」のは何が違う？",
    choices: [
      "どちらも同じで、書き方が違うだけ",
      "変数はリロードで消えるが、DBに保存した値は電源を切っても消えず、別の人がアクセスしても同じデータを取り出せる",
      "DBの方が高速だが、変数の方が安全",
      "変数は無料、DBは必ず有料になる",
    ],
    correctIndex: 1,
    explanation:
      "ここがDBを学ぶ最大の理由。変数（メモリ）は揮発性で、ページをリロードした瞬間に消える。DBは永続化された記憶領域で、別ユーザーがアクセスしても同じデータを返せる。「アプリが何かを覚えている」と感じる場面の裏側には、ほぼ必ずDBがいる。Firestore には無料枠があるので、Dも誤り。",
  },
  {
    id: "database-q5",
    question:
      "Firestore で「users コレクションに新しいユーザーを1件追加する」のは、CRUDのどれに該当する？",
    choices: [
      "Create（addDoc など）",
      "Read（getDocs など）",
      "Update（updateDoc など）",
      "Delete（deleteDoc など）",
    ],
    correctIndex: 0,
    explanation:
      "「新しく作る」のが Create。Firestore では addDoc / setDoc がこれに当たる。Read は既存データの取得（getDoc / getDocs / onSnapshot）、Update は既存データの一部書き換え（updateDoc）、Delete は削除（deleteDoc）。最初は名前が違って混乱するが、SQLの INSERT / SELECT / UPDATE / DELETE と1対1で対応していると覚えておくと整理しやすい。",
  },
];
