# 年号 ↔ 西暦

西暦と和暦を、指でなぞって行き来するだけの道具。<br>
Move between Japanese era years and Gregorian years by dragging. Nothing to type.

**https://lyuin.github.io/jp-nengo/**

[日本語](#日本語) ・ [English](#english)

---

## 日本語

### これは何か

「1985年は昭和何年だっけ」「令和8年って西暦何年」を、数字を打たずに調べるためのものです。

西暦と和暦をつねに並べて表示するので、**変換の「方向」という概念がありません**。片方を指定すれば、もう片方は必ず隣に見えています。

iPhone の Safari で使うことを主眼に作っていますが、iPad や PC でも同じように動きます。

### 使い方

**中央の行が答えです。** 上下の行は前後の年で、フリックすると年が中央へ流れ込んで大きくなります。1年ずつの微調整に向いています。

**下の帯は遠くへ飛ぶためのもの**です。明治から令和までを横一本に並べてあり、なぞるとその位置の年が中央に出ます。

**元号をタップすると、その元号だけに拡大します。** 昭和なら1926〜1989だけの定規に変わるので、細かく狙えます。**もう一度帯をタップすると全体に戻ります。**

**`今年` ボタン**はいつでも押せます。元号の奥に入っていても、一発で全体表示＋今年に戻ります。

起動時はなにも操作しなくても今年が表示されています。

### URL に年を持たせる

`#1985` を付けて開くと、その年から始まります。

```
https://lyuin.github.io/jp-nengo/#1985
```

年を動かすと URL も追従するので、**自分の生まれ年をブックマークしておけば一発で開けます**。ホーム画面に年ちがいで複数置くこともできます。

今年を選んでいるときはハッシュが消えるので、**素の URL は常に「今日」を意味します**（来年以降もずれません）。

### 年度

答えの下に、4月始まりの年度を出しています。期間も併記してあるので、1〜3月に見ているときは「その期間に入っていない」ことから前の年度だと判断できます。

改元が年度の途中に起きた年は、呼び名が2つになります。

| 暦年 | 年度 |
|---|---|
| 1912 | 明治45年度 ／ 大正元年度 |
| 1926 | 大正15年度 ／ 昭和元年度 |
| 1989 | 平成元年度（改元が1月なので1つだけ） |
| 2019 | 平成31年度 ／ 令和元年度 |

### 対応範囲と精度について

**明治元年（1868年）以降**が対象です。江戸以前の元号は数が多く旧暦なので、意図的に対象外にしています。

以下は割り切っている点です。

**明治初期（1868〜1872年）は厳密には年の境目がずれます。** 当時は太陰太陽暦で、明治5年12月2日の翌日が明治6年1月1日（グレゴリオ暦の1873年1月1日）でした。明治元年はグレゴリオ暦の1868年10月23日〜1869年2月10日に相当するため、「1868年＝明治元年」は慣例的な近似です。

**改元年の日付は後続の元号の開始日だけを出しています。** `平成元年 1/8〜` と書けば昭和64年が1月7日までだと読み取れますが、1912年と1926年は改元日が両方の元号に属する（明治45年7月30日と大正元年7月30日が両方存在する）ため、その細部は表現していません。

**年度は1886年（明治19年度）以降だけ出します。** 4月始まりの年度はこの年に始まったもので、それ以前は区切りが異なります。

公的な書類に記入する際は、最終的にご自身で確認してください。

### ホーム画面に追加する

PWA なので、Safari の共有ボタンから「ホーム画面に追加」すると単体アプリとして起動します。アドレスバーが消え、**圏外でも動きます**。

オフライン対応はネットワーク優先・キャッシュはフォールバックという方式なので、通信があるときは常に最新版が表示されます。

### 新しい元号が始まったら

`index.html` の3箇所（`ERAS` ・ 色定義 ・ `TRANS`）を直せば対応できます。

1. `ERAS` の令和の行に、最後の暦年（`e`）と最終日（`to`、`YYYYMMDD`）を入れる
2. `ERAS` に新元号の行を足す（`s` 開始暦年、`e:null`、`from` 改元日、`to:null`）
3. `:root` と `@media (prefers-color-scheme:dark)` の両方に `--<id>` の色を追加する
4. `TRANS` に改元年の行を足す（`['〜M/D','M/D〜']` の形）

### 構成

`index.html` 1枚だけで完結しています。ビルド手順なし、依存パッケージなし。ローカルで見るならファイルを開くだけです（ただし Service Worker と URL ハッシュは `http(s)` 配信でないと動きません）。

```
index.html            本体（HTML / CSS / JS すべて）
manifest.webmanifest  PWA の定義
sw.js                 オフライン用 Service Worker
icons/                アイコン
```

---

## English

### What this is

A tool for answering "what year in Shōwa was 1985?" or "what year is Reiwa 8?" without typing any numbers.

Gregorian and Japanese era years are always shown side by side, so **there is no notion of conversion direction**. Pick one and the other is already next to it.

Built primarily for Safari on iPhone, but works the same on iPad and desktop.

### How to use

**The centre row is the answer.** Rows above and below are neighbouring years; flick and years scroll into the centre and grow. Good for nudging one year at a time.

**The band at the bottom is for travelling far.** It lays out Meiji through Reiwa in a single strip; drag it and the year under your finger appears in the centre.

**Tap an era to zoom into it.** Tap Shōwa and the band becomes a ruler covering only 1926–1989, so you can aim precisely. **Tap the band again to return to the full range.**

**The `今年` (this year) button** is always available. Even deep inside an era, one tap returns you to the full view on the current year.

On launch the current year is already shown; no interaction needed.

### Putting a year in the URL

Open with a hash to start on that year.

```
https://lyuin.github.io/jp-nengo/#1985
```

The URL follows as you move, so you can **bookmark your birth year** and open straight to it, or add several to the home screen with different years.

While on the current year the hash is removed, so **the bare URL always means "today"** and stays correct in future years.

### Fiscal years

Below the answer, the Japanese fiscal year (April to March) is shown along with its span. Because the span is spelled out, in January to March you can see that the date falls outside it and belongs to the previous fiscal year.

When an era change falls inside a fiscal year, that year has two names.

| Gregorian | Fiscal year |
|---|---|
| 1912 | Meiji 45 / Taishō 1 |
| 1926 | Taishō 15 / Shōwa 1 |
| 1989 | Heisei 1 only (the era changed in January, before April) |
| 2019 | Heisei 31 / Reiwa 1 |

### Coverage and accuracy

Covers **Meiji 1 (1868) onward**. Earlier eras are deliberately out of scope: there are many of them and they use the lunisolar calendar.

Known simplifications:

**Early Meiji (1868–1872) year boundaries do not line up exactly.** Japan used the lunisolar calendar then; the day after Meiji 5-12-02 was Meiji 6-01-01 (1 January 1873 Gregorian). Meiji 1 actually spans 23 October 1868 to 10 February 1869, so "1868 = Meiji 1" is the conventional approximation.

**For transition years only the incoming era's start date is shown.** `平成元年 1/8〜` implies Shōwa 64 ran through 7 January, but for 1912 and 1926 the transition date belongs to both eras (Meiji 45-07-30 and Taishō 1-07-30 both exist), and that detail is not represented.

**Fiscal years are shown from 1886 (Meiji 19) onward**, when the April-start fiscal year began. Earlier arrangements differed.

Please verify for yourself before writing anything on an official document.

### Install to the home screen

This is a PWA. Use Share → Add to Home Screen in Safari and it launches as a standalone app with no address bar, and **works offline**.

Caching is network-first with cache as fallback, so you always get the latest version when online.

### When a new era begins

Three places in `index.html` need editing: `ERAS`, the colour variables, and `TRANS`.

1. In `ERAS`, give the Reiwa entry its final Gregorian year (`e`) and final date (`to`, as `YYYYMMDD`)
2. Add a row to `ERAS` for the new era (`s` start year, `e:null`, `from` transition date, `to:null`)
3. Add a `--<id>` colour to both `:root` and `@media (prefers-color-scheme:dark)`
4. Add the transition year to `TRANS` in the form `['〜M/D','M/D〜']`

### Layout

Everything lives in a single `index.html`. No build step, no dependencies. Opening the file directly works, though the service worker and URL hash need to be served over `http(s)`.

```
index.html            the app (HTML / CSS / JS)
manifest.webmanifest  PWA manifest
sw.js                 service worker for offline use
icons/                icons
```

---

## License

MIT © lyuin
