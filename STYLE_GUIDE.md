# Web開発図解サイト — スタイルガイド

ページ作成・修正時に必ず参照すること。

---

## タイポグラフィ基準

### フォントサイズスケール

| 用途 | Tailwindクラス | サイズ | 備考 |
|------|-------------|--------|------|
| ページタイトル（H1） | `text-3xl font-bold` | 30px | Hero コンポーネント |
| ページサブタイトル | `text-lg font-medium` | 18px | Hero subtitle |
| セクション見出し（H2） | `text-xs font-semibold text-gray-500 uppercase tracking-widest` | 12px | DETAIL / DIAGRAM 等のラベル |
| ブロック見出し（H3） | `text-base font-semibold text-white` | 16px | DetailBlock heading |
| **本文（最重要）** | `text-base leading-relaxed` | **16px** | すべての説明文・吹き出し・解説 |
| 補助テキスト | `text-sm` | 14px | タグ・バッジ・キャプション |
| 極小テキスト | `text-xs` | 12px | メタ情報・ラベルのみ |

### 行間ルール（日本語）
- 本文: `leading-relaxed`（1.625）— グローバル適用済み（layout.tsx）
- 日本語本文は 1.6〜1.8 が推奨読みやすさ範囲

### 禁止パターン
- **H2 < 本文サイズ** はアンチパターン（セクションラベルは text-xs で意図的に小さい設計）
- 本文に `text-sm`（14px）を使わない
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
- [ ] DetailBlock 本文: `text-base leading-relaxed`
- [ ] KeyPoint: `text-base text-amber-300`
- [ ] WarningPoint: `text-base text-red-300`
- [ ] ブロック間隔: `space-y-5`、本文内間隔: `space-y-3`

### MajiDialogue
- [ ] 吹き出し本文: `text-base leading-relaxed`
- [ ] ターン間隔: 十分な `gap-4` 以上

### PageDrill
- [ ] 選択肢ボタン: `text-base`（14px にしない）
- [ ] キーボードヒント kbd: `bg #1e2130 / border #4b5280 / text-gray-300`
- [ ] useCallback で handleSubmit をメモ化

### ComparisonTable
- [ ] モバイル: `details/summary` アコーディオン表示
- [ ] `highlightCol` prop でデフォルト開閉制御

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
