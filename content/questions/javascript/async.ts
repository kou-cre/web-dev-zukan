import type { DrillQuestion } from "@/components/PageDrill";

export const asyncQuestions: DrillQuestion[] = [
  {
    id: "async-q1",
    question: "Promiseが取りうる「3つの状態」の組み合わせとして正しいのはどれ？",
    choices: [
      "started / running / stopped",
      "pending / fulfilled / rejected",
      "open / close / error",
      "waiting / success / retry",
    ],
    correctIndex: 1,
    explanation:
      "Promiseは生成直後は pending（待機中）。やがて fulfilled（成功）か rejected（失敗）のいずれかに「解決」され、その後は状態が変わらない（不変）。番号札を受け取った時点では結果が未確定で、料理ができる（fulfilled）か品切れ（rejected）かが後で確定する、というイメージ。",
  },
  {
    id: "async-q2",
    question: "次のうち、async/await の説明として最も正確なのはどれ？",
    choices: [
      "JavaScriptを完全に同期処理に変える機能",
      "Promiseを使わずに非同期処理を書ける新しい仕組み",
      "Promiseチェーンを同期コードに近い書き方で表現できる糖衣構文（シンタックスシュガー）",
      "コールバック関数だけで非同期処理を書く方式",
    ],
    correctIndex: 2,
    explanation:
      "async/awaitは内部的にはPromiseを使い続けている。await は「Promiseが解決されるまで関数の実行を一時停止する」という指示で、見た目は同期コードのように書けるだけ。JavaScript自体がシングルスレッドで動く性質は変わらないし、Promiseが消えるわけでもない。",
  },
  {
    id: "async-q3",
    question:
      "async関数の中で発生した非同期エラーを補足する正しい方法はどれ？",
    choices: [
      "if文でエラー値を逐一チェックする",
      ".catch()メソッドだけが使える（try/catchは使えない）",
      "try/catchで囲み、awaitした処理がrejectedになったらcatch節に入る",
      "throwしておけば自動でブラウザが処理してくれる",
    ],
    correctIndex: 2,
    explanation:
      "async/awaitの大きな利点が「同期コードのようにtry/catchでエラーを捕まえられる」こと。awaitしたPromiseがrejectedになると、その場でthrowされたのと同じ振る舞いになり、catch節に流れ込む。Promiseチェーンの.catch()も使えるが、可読性で勝るのがtry/catch。",
  },
  {
    id: "async-q4",
    question:
      "「JavaScriptはシングルスレッドなのに、なぜ通信中に画面が固まらずに済むのか？」を説明したものとして最も正確なのはどれ？",
    choices: [
      "実は裏で複数のスレッドが立ち上がってJavaScriptを並列実行しているから",
      "通信処理はブラウザ（Web API）に任せ、完了通知をタスクキューに積んでイベントループが順に処理するから",
      "通信が終わるまで画面の描画が一時停止しているだけだから",
      "JavaScriptエンジンが自動でマルチスレッドに切り替えているから",
    ],
    correctIndex: 1,
    explanation:
      "JSの実行スレッド自体は1つきり。fetch などの時間がかかる処理は、JSエンジンの外側（ブラウザのWeb APIやNode.jsのI/O層）に依頼して投げっぱなしにする。完了したらコールバックがタスクキューに積まれ、コールスタックが空になった瞬間にイベントループが取り出して実行する。これが「待つ間に他の処理を進められる」仕組みの正体。",
  },
  {
    id: "async-q5",
    question:
      "複数のPromiseを並列に走らせ、「全部成功したら次へ進む（1つでも失敗したら即fail）」を書きたい時に使うのはどれ？",
    choices: [
      "Promise.race()",
      "Promise.any()",
      "Promise.all()",
      "Promise.allSettled()",
    ],
    correctIndex: 2,
    explanation:
      "Promise.all() は配列で渡したPromiseがすべて fulfilled になったら結果を配列で返す。1つでも rejected が出ると即座に rejected になる（fail-fast）。Promise.allSettled() は全部の結果が揃うまで待ち成功・失敗どちらも見たい時に使う。Promise.race() は最初に解決したものを採用、Promise.any() は最初に成功したものを採用。それぞれ用途が違う。",
  },
];
