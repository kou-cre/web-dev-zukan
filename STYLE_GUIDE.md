# Web開発図解サイト — スタイルガイド

ページ作成・修正時に必ず参照すること。

---

## 情報設計の原則：スパイラル学習構造

ページ全体を「全体像 → 全体像＋詳細 → 全体像＋さらに詳細」の3層で設計する。

| 層 | セクション | 役割 |
|---|---|---|
| 第1層（全体像） | `keyMessage` | 1文で答えを言い切る |
| 第2層（全体像＋流れ） | `metaphorPoints`（ストーリーフロー） | 比喩を使って流れで理解させる |
| 第3層（全体像＋詳細） | `DetailSection` | 深く知りたい人向けの詳細 |

### OnePageSummary の設計ルール

- `keyMessage` — 「〇〇とは〜〜だ」という一言。答えを先に言う
- `metaphorPoints` — 矢印フローカードで「ストーリーの流れ」として見せる。表（＝で並べる）にしない
- `definition` — 全体像を1文に結晶化。keyMessage と重複しないよう注意

### 禁止パターン

- セクションを「情報の羅列」として積み上げるだけの構成
- 比喩を「A = B」の対応表として表示する（羅列感が出る）
- 全体像を見せる前に細かい詳細から始める

---

## タイポグラフィ基準

### フォントサイズスケール

| 用途 | Tailwindクラス | サイズ | 備考 |
|------|-------------|--------|------|
| ページタイトル（H1） | `text-3xl font-bold` | 30px | Hero コンポーネント |
| ページサブタイトル | `text-lg font-medium` | 18px | Hero subtitle |
| セクション見出し（H2） | `text-xs font-semibold text-gray-500 uppercase tracking-widest` | 12px | DETAIL / DIAGRAM 等のラベル |
| ブロック見出し（H3） | `text-base font-semibold text-white` | 16px | DetailBlock heading |
| **本文（最重要）** | `text-sm leading-relaxed` | **14px** | すべての説明文・吹き出し・解説 |
| カード説明文 | `text-xs leading-relaxed` | 12px | カード内の補足説明 |
| 極小テキスト | `text-[10px]` / `text-[11px]` | 10–11px | メタ情報・タグ・バッジのみ |

### 行間ルール（日本語）
- 本文: `leading-relaxed`（1.625）— グローバル適用済み（layout.tsx）
- 日本語本文は 1.6〜1.8 が推奨読みやすさ範囲

### 禁止パターン
- **H2 < 本文サイズ** はアンチパターン（セクションラベルは text-xs で意図的に小さい設計）
- 本文に `text-base`（16px）を使わない（H3見出しのみ text-base）
- 本文に `text-xs`（12px）を使わない（カード説明文専用）
- `leading-tight` / `leading-none` を本文に使わない

---

## カラー基準

### グレースケール（コントラスト）

| 用途 | クラス | 用途例 |
|------|-------|-------|
| 最重要テキスト | `text-white` | 見出し・ハイライト |
| 本文 | `text-gray-200` / `text-gray-300` | 解説文・吹き出し |
| 補助 | `text-gray-400` | 矢印・ラベル・説明文 |
| 無効化 | `text-gray-500` | セクションラベルのみ |
| **禁止** | `text-gray-600以下` | 本文・補助テキストに使用不可（WCAG AA違反） |

### アクセントカラー（ページ別割り当て）

| ページ | アクセント |
|--------|-----------|
| /kiso/server | emerald |
| /kiso/baas | blue |
| /kiso/database | violet |
| /kiso/vercel | sky |
| /kiso/pwa | rose |
| /javascript/variables | yellow |
| /javascript/async | amber |
| /javascript/dom | lime |
| /javascript/fetch | cyan |
| /javascript/modules | orange |
| /javascript/error | red |

### 高明度アクセント（yellow/amber/lime）の注意
背景透明度は `0.10`、ボーダーは `0.7` を使用（他のアクセントカラーと視覚的重みを揃えるため）。

---

## コンポーネント別チェックリスト

### Hero
- [ ] `accentColor` prop を必ず渡す（ページのテーマカラーと一致させる）
- [ ] body説明文は `text-base text-gray-400`

### ConceptDiagram
- [ ] FlowCard の `highlight` prop を付ける場合は `accentColor` も必ず渡す
- [ ] FlowArrow の矢印・ラベル・sublabel はすべて `text-gray-400`
- [ ] StackLayer の矢印も `text-gray-400`
- [ ] yellow/amber/lime の accentColor: `bg 0.10 / border 0.7`（他は `0.06 / 0.6`）

### DetailSection
- [ ] DetailBlock 本文: `text-sm leading-relaxed`
- [ ] KeyPoint: `text-sm text-amber-300`
- [ ] WarningPoint: `text-sm text-red-300`
- [ ] ブロック間隔: `space-y-5`、本文内間隔: `space-y-3`

### MajiDialogue
- [ ] 吹き出し本文: `text-sm leading-relaxed`
- [ ] ターン間隔: 十分な `gap-4` 以上

### PageDrill
- [ ] 選択肢ボタン: `text-sm`（text-xs にしない）
- [ ] キーボードヒント kbd: `bg #1e2130 / border #4b5280 / text-gray-300`
- [ ] useCallback で handleSubmit をメモ化

### ComparisonTable
- [ ] モバイル: `details/summary` アコーディオン表示
- [ ] `highlightCol` prop でデフォルト開閉制御

### NestedDiagram（入れ子構造）
- [ ] コンポーネントツリー・スコープ階層・コンテナ構造の図解に使う
- [ ] `accentColor` = 外枠のカラー、各 `group.accentColor` = 内枠カラー（別色にすると見やすい）
- [ ] `caption` でダイアグラム下に説明テキストを追加できる

### UseCaseGrid（ビジュアル埋め込みパターン）
- [ ] `visual` prop（ReactNode）に JSX を渡すとカード上部にミニ図解を表示できる
- [ ] `BrowserMock` / `TerminalBlock` / インライン JSX を `visual` に渡してカードを多様化する
- [ ] 全カード同じ見た目にならないよう、ビジュアルありとなしを混在させてよい

---

## 図解レイアウト多様化の原則

**固定パターンを繰り返さない。** 1ページの中でレイアウトが単調にならないよう、以下を意識する。

| 情報の種類 | 推奨コンポーネント |
|-----------|-----------------|
| 役割の対比（A vs B） | `UseCaseGrid` (cols=2) |
| 複数の選択肢・機能一覧 | `UseCaseGrid` (cols=3) |
| ミニUI・コード実例付きカード | `UseCaseGrid` + `visual` prop |
| 入れ子・階層・ツリー構造 | `NestedDiagram` |
| 段階的な進化・学習ステップ | `Timeline` |
| よくある誤解の訂正 | `CorrectionCard` |
| コードそのもの | `CodeBlock` |
| コマンドライン操作 | `TerminalBlock` |
| ブラウザUIの再現 | `BrowserMock` |
| 重要な数値・指標 | `StatCards` |

同じコンポーネントを連続して3回以上使わない。

---

## スペーシング規則

- セクション間: `mb-10`
- カード内パディング: `p-5`
- ブロック間: `space-y-5`
- テキスト段落間: `space-y-3`
- アイコン＋テキスト gap: `gap-2` または `gap-3`

---

## 新規ページ作成前チェックリスト

```
□ Hero に accentColor を渡した
□ FlowCard highlight に accentColor を渡した
□ 本文テキストが text-base になっている（text-sm を使っていない）
□ gray-500以下のテキストが本文・補助文に使われていない
□ yellow/amber/lime の透明度が 0.10/0.7 になっている
□ DetailBlock 本文が text-base leading-relaxed になっている
□ PageDrill 選択肢が text-base になっている
□ 吹き出し本文が text-base leading-relaxed になっている
□ 矢印・ラベルが text-gray-400 になっている
```
