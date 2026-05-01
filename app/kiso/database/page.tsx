import {
  Monitor,
  Server,
  Database,
  Cloud,
  Table,
  FileJson,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { databaseQuestions } from "@/content/questions/kiso/database";

export const metadata = {
  title: "データベースって何？ | Web開発図解",
  description:
    "データベースの基本概念を図解で解説。CRUD・RDBとNoSQLの違い・Firestoreでの扱い方まで。",
};

export default function DatabasePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="基礎概念"
        title="データベースって何？"
        subtitle={"アプリの記憶を担う「デジタル倉庫」——消えないデータの置き場の正体。"}
        body={"変数は閉じれば消える。DBに入れた値はずっと残る。この差を1枚で掴む。"}
        accentColor="violet"
      />

      <OnePageSummary
        keyMessage="データベースとは「データを整理して保存し、必要なときに素早く取り出せる仕組み」のこと。アプリが「ユーザーを覚えている」「投稿が消えない」「ログインしたら自分のデータが出てくる」と感じるのは、地球のどこかのDBが、電源を切ってもデータを保持し、誰がアクセスしても同じ答えを返してくれているから。"
        metaphorTitle="超優秀な司書がいる図書館"
        metaphorPoints={[
          { label: "保存", real: "新しい本を棚の正しい位置に追加する", metaphor: "Create（addDoc）" },
          { label: "検索", real: "「〇〇について書かれた本を全部持ってきて」と頼む", metaphor: "Read（getDocs）" },
          { label: "更新", real: "本の内容を新しい版に差し替える", metaphor: "Update（updateDoc）" },
          { label: "削除", real: "古くなった本を棚から廃棄する", metaphor: "Delete（deleteDoc）" },
        ]}
        definition="データベースとは、データをルールに従って保存・検索・更新・削除できる仕組みの総称。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="ブラウザに表示されているデータは、どこから来ているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard Icon={Monitor} title="ブラウザ" subtitle="一覧ページを開く" />
            <FlowArrow label="リクエスト" sublabel="GET /posts" direction="right" />
            <FlowCard Icon={Cloud} title="BaaS / サーバー" subtitle="DBから取り出す指示を出す" />
            <FlowArrow label="クエリ" sublabel="getDocs(...)" direction="right" />
            <FlowCard Icon={Database} title="データベース" subtitle="保存データの本体" highlight accentColor="violet" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            ブラウザはDBに直接話しかけない。必ずサーバー（またはBaaS）が間に入って取り次ぐ。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="DBには大きく2つの流派がある。データの持ち方が根本から違う。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Table className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-semibold text-blue-300">RDB（テーブル型）</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Excelのような表で持つ。行が1件のデータ、列が項目。SQLで操作する。
              </p>
              <div
                className="rounded-md border text-xs font-mono overflow-hidden"
                style={{ borderColor: "#2d3048" }}
              >
                <div
                  className="grid grid-cols-3 px-2 py-1.5 text-gray-500"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <span>id</span>
                  <span>name</span>
                  <span>email</span>
                </div>
                <div className="grid grid-cols-3 px-2 py-1.5 text-gray-300 border-t" style={{ borderColor: "#2d3048" }}>
                  <span>1</span>
                  <span>maji</span>
                  <span>m@x.jp</span>
                </div>
                <div className="grid grid-cols-3 px-2 py-1.5 text-gray-300 border-t" style={{ borderColor: "#2d3048" }}>
                  <span>2</span>
                  <span>master</span>
                  <span>s@x.jp</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                例: PostgreSQL / MySQL / Supabase
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(139,92,246,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="w-4 h-4 text-violet-400" />
                <p className="text-xs font-semibold text-violet-300">NoSQL（ドキュメント型）</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                JSONのような塊で持つ。コレクションの中にドキュメント、その中にフィールド。
              </p>
              <pre
                className="rounded-md border text-xs font-mono px-3 py-2 text-gray-300 leading-relaxed overflow-x-auto"
                style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}
              >
{`users / {
  abc123: {
    name: "maji",
    email: "m@x.jp"
  }
}`}
              </pre>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                例: Firestore / MongoDB / DynamoDB
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            個人開発でNoSQLを選ぶ場合、Firestore（Firebase）がよく使われる選択肢のひとつ。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — CRUD"
          description="DBに対する操作は、たった4種類しかない。これを CRUD と呼ぶ。"
        >
          <StackLayer
            Icon={PlusCircle}
            title="C — Create（作成）"
            subtitle="新しいデータを1件追加する — Firestore: addDoc / setDoc / SQL: INSERT"
            iconColor="text-emerald-400"
          />
          <StackLayer
            Icon={Search}
            title="R — Read（取得）"
            subtitle="既存データを取り出す・検索する — Firestore: getDoc / getDocs / onSnapshot / SQL: SELECT"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={Pencil}
            title="U — Update（更新）"
            subtitle="既存データの一部を書き換える — Firestore: updateDoc / setDoc(merge) / SQL: UPDATE"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={Trash2}
            title="D — Delete（削除）"
            subtitle="不要になったデータを消す — Firestore: deleteDoc / SQL: DELETE"
            iconColor="text-rose-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-600 text-center mt-4">
            どんなアプリも、結局はこの4つの組み合わせで動いている。SNSの投稿も、ECの注文も、家計簿アプリも。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "RDB（Supabase / PostgreSQL）",
            "NoSQL（Firestore / MongoDB）",
          ]}
          rows={[
            {
              label: "データ構造",
              cells: [
                "テーブル（行と列）",
                "ドキュメント（JSONオブジェクト）",
              ],
              highlightCol: 1,
            },
            {
              label: "クエリ言語",
              cells: [
                "SQL（SELECT * FROM users WHERE ...）",
                "独自API（collection().where(...)）",
              ],
              highlightCol: 1,
            },
            {
              label: "スキーマ",
              cells: [
                "厳格（後から列を増やすのは慎重に）",
                "柔軟（後から項目を追加しやすい）",
              ],
              highlightCol: 1,
            },
            {
              label: "リアルタイム同期",
              cells: [
                "別途設定が必要（Realtime機能などを有効化）",
                "標準対応（onSnapshot で即反映）",
              ],
              highlightCol: 1,
            },
            {
              label: "よく選ばれる場面",
              cells: [
                "スキーマを厳密に管理したい・SQL経験がある場合",
                "最短で動かしたい・リアルタイム同期が必要な場合",
              ],
              highlightCol: 1,
            },
          ]}
          note="どちらが優れているという話ではなく、データの形と要求次第で選ぶ。「行と列でカチッと管理したい」ならRDB、「とりあえず動かして後から育てたい」ならNoSQL、というざっくりした目安でまずは十分。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、データベースって、結局Excelとどう違うんですか？ ボクの中ではどっちも「表に値を書き込んでいくやつ」というイメージで、正直あまり区別がついていません……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "とても自然な疑問ですよ、マジさん。例えるなら、Excelは「自分の机の引き出しに入れたノート」、データベースは「街の図書館にいる超優秀な司書」です。Excelは自分しか開けず、ファイルを誰かに送らないと共有できません。司書（DB）は、世界中のお客様から同時に「あの本を出して」「これを差し替えて」と言われても、混乱せず順番にさばいてくれます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ Firebase の Firestore というのも、その「司書」にあたるってことですか？ 名前だけは聞いたことあるんですけど、何者なのかさっぱりで……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "その通りです。FirestoreはBaaSを使う構成の主役のひとつで、NoSQL型のデータベースです。構造は「引き出しの中に、さらに引き出しが入っている」イメージで、`users` というコレクション（大きな引き出し）の中に、ユーザー1人ずつのドキュメント（小さな引き出し）が並んでいる、と覚えていただければ十分です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "うっ……でも、ボクSQLっていう謎の呪文みたいなのも聞いたことがあります。これは絶対にマスターしないとデータベースは使えないんですよね？ もしそうならボクの開発人生はここで終わってしまいます、これは完全に革命的な絶望です……！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "落ち着いてください、マジさん。Firestore を使うなら、SQLは1行も書きません。Firestore には独自のAPI（`addDoc` / `getDocs` / `updateDoc` / `deleteDoc`）が用意されていて、これがSQLの `INSERT` / `SELECT` / `UPDATE` / `DELETE` に1対1で対応しています。「概念だけ知っておく」レベルで今は十分です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……つまりCRUDという言葉は、Create・Read・Update・Delete の頭文字で、どんなDBでもこの4つしか操作の種類がない、ということですね。これは革命的に整理されました。ボクこの4つだけ覚えればいいんですか！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "本質的にはその4つです。SNSの投稿も、ECの注文も、家計簿アプリも、結局はCRUDの組み合わせでできています。データベースを知れば、アプリが何を覚えていて、何を忘れていて、どこから取り出しているのかが見えてきますよ、マジさん。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 なぜDBが必要か — 「変数」では足りない理由">
          <p>
            JavaScriptの変数や React の useState に値を入れても、ページをリロードすれば一瞬で消える。これは「揮発性のメモリ」に置いているから。
          </p>
          <p>
            DBは「永続化された記憶領域」で、電源を切ってもデータが残り、別の端末・別のユーザーからアクセスしても同じ値を返す。アプリが「ユーザーを覚えている」と感じるのは、ほぼ必ずDBが裏にいるから。
          </p>
          <KeyPoint>
            DBはアプリの長期記憶。変数はページをリロードすると消えるが、DBに保存した値は残る。「消えてほしくないデータ」は必ずDBに置く。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 RDBとNoSQLの使い分け指針">
          <p>
            <strong className="text-white">RDB（Supabase / PostgreSQL）</strong>：データの関係性を厳密に表したいとき、表計算的に集計したいときに強い。「この投稿は誰のもので、コメントは誰が書いたか」を JOIN でつなげるのが得意。
          </p>
          <p>
            <strong className="text-white">NoSQL（Firestore / MongoDB）</strong>：データ構造が柔軟で、まず動かしてから育てたいとき・リアルタイム同期が欲しいときに強い。Firestore の `onSnapshot` を使えば、DBの変更が即座にブラウザに反映される。
          </p>
          <KeyPoint>
            初学者が個人開発でアプリを最短で動かすなら、Firestore（NoSQL）から入るのがおすすめ。SQLを書かずに済み、リアルタイム同期も標準でついてくる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 Firestore のデータモデル">
          <p>
            Firestore は「コレクション ＞ ドキュメント ＞ フィールド」の3階層で考える。
          </p>
          <p>
            <strong className="text-white">コレクション</strong>：同じ種類のデータをまとめる入れ物。例: `users`、`posts`。
          </p>
          <p>
            <strong className="text-white">ドキュメント</strong>：コレクションの中の1件1件。ユニークなIDを持ち、JSON のような構造で値を持つ。
          </p>
          <p>
            <strong className="text-white">フィールド</strong>：ドキュメントの中身。`name: "maji"` のようなキーと値のペア。
          </p>
          <p>
            CRUDはそれぞれ `addDoc`（追加）/ `getDoc`・`getDocs`・`onSnapshot`（取得）/ `updateDoc`（更新）/ `deleteDoc`（削除）で操作する。最初はこの4セットだけ覚えればOK。
          </p>
        </DetailBlock>

        <DetailBlock heading="6.4 DBの選び方 — 学習ステップの考え方">
          <p>
            <strong className="text-white">最初の選択</strong>：学習コストを最小にしたいなら Firestore（Firebase）が入りやすい。無料枠が広く、リアルタイム同期が標準で、フロントエンドから直接叩ける感覚で書けるため、DBの全体像を掴むのに向いている。
          </p>
          <p>
            <strong className="text-white">次のステップ</strong>：データの関係性が複雑になったり、集計処理が増えてきたら Supabase（PostgreSQL）も検討する。SQLを深く学ぶのはこの段階からでも十分間に合う。
          </p>
          <KeyPoint>
            「DBを選ぶ」のは「アプリの土台を選ぶ」と同じくらい重い決断。ただし最初から完璧を求める必要はない。動かしながら必要になったら学ぶ、で問題ない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.5 セキュリティの最低ライン — 認証とルール">
          <p>
            DBは「誰でも読み書きできる状態」にしてはいけない。Firestore には「セキュリティルール」、Supabase には「Row Level Security（RLS）」という仕組みがあり、「ログインしているユーザーだけが自分のデータを読み書きできる」というルールを書ける。
          </p>
          <p>
            開発初期に「テストモード（誰でも読み書き可能）」のまま本番デプロイしてしまうと、世界中の誰でもDBを覗ける・書き換えられる状態になる。これは事故になる前に必ず塞ぐ。
          </p>
          <KeyPoint>
            DBを公開する前に、必ずアクセスルールを設定する。「自分のデータは自分しか触れない」を最低ラインとする。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "DBの相棒となる、リクエストを受けて返す側",
            icon: "Server",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "サーバーとDBをまとめて借りる選択肢の正体",
            icon: "Cloud",
          },
          {
            href: "/kiso/vercel",
            title: "Vercelって何？",
            description: "Next.jsアプリのデプロイ先として広く使われるサービス",
            icon: "Triangle",
          },
        ]}
      />

      <PageDrill questions={databaseQuestions} />
    </div>
  );
}
