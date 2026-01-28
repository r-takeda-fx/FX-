# Plans.md - タスク管理

## プロジェクト: 株式投資アプリ (FX-)

### 概要
- **目的**: 株式投資未経験者が市場情報を簡単に把握できるアプリ
- **MVP**: 市場サマリー + ニュース分類 + AI要約
- **技術**: Python + Streamlit + yfinance
- **リポジトリ**: https://github.com/r-takeda-fx/FX-

---

## フェーズ1: 基盤構築 `cc:WIP`

- [x] プロジェクト初期化 `cc:完了`
- [x] GitHubリポジトリセットアップ `cc:完了`
- [ ] Python仮想環境のセットアップ `cc:TODO`
- [ ] 必要パッケージのインストール `cc:TODO`
- [ ] Streamlit基本構造の作成 `cc:TODO`
- [ ] 環境変数の設定（APIキー等） `cc:TODO`

## フェーズ2: 市場データ `cc:TODO`

- [ ] yfinanceで日経平均取得 `cc:TODO`
- [ ] yfinanceで米国市場（S&P500, NASDAQ）取得 `cc:TODO`
- [ ] 先物データ取得 `cc:TODO`
- [ ] ダッシュボードUI作成 `cc:TODO`
- [ ] データ表示の整形・可視化 `cc:TODO`

## フェーズ3: ニュース機能 `cc:TODO`

- [ ] ニュースAPI調査・選定 `cc:TODO`
- [ ] カテゴリ定義（FRB/日銀、インフレ、雇用統計、地政学、決算） `cc:TODO`
- [ ] ニュース取得機能の実装 `cc:TODO`
- [ ] カテゴリ分類ロジックの実装 `cc:TODO`
- [ ] ニュースセクションUI作成 `cc:TODO`

## フェーズ4: AI要約 `cc:TODO`

- [ ] Claude API連携 `cc:TODO`
- [ ] 市場状況要約プロンプト設計 `cc:TODO`
- [ ] 「ひとこと解説」生成機能 `cc:TODO`
- [ ] UIへの組み込み `cc:TODO`

## フェーズ5: おすすめ銘柄 `cc:TODO`

- [ ] 銘柄選定ロジック設計 `cc:TODO`
- [ ] 初心者向け銘柄リスト作成 `cc:TODO`
- [ ] 銘柄情報取得・表示 `cc:TODO`
- [ ] 免責表示の追加 `cc:TODO`

## フェーズ6: 仕上げ `cc:TODO`

- [ ] コードレビュー（`/harness-review`） `cc:TODO`
- [ ] 動作確認・テスト `cc:TODO`
- [ ] ドキュメント整備 `cc:TODO`

---

## マーカー説明

| マーカー | 意味 |
|---------|------|
| `cc:TODO` | 未着手 |
| `cc:WIP` | 作業中 |
| `cc:完了` | 完了 |
