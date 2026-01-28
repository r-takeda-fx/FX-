# 株式投資アプリ (FX-) 作業ログ

## 2026-01-28 プロジェクト開始

### 重点項目
- **集中すべき20%**: 市場データの取得・表示とシンプルなUIの構築
- **MVP**: 市場サマリー + ニュース分類 + AI要約

### 概要
- GitHubリポジトリ（r-takeda-fx/FX-）にプロジェクトをセットアップ
- 標準フォルダ構造を作成
- 設計書（DESIGN.md）を作成
- Plans.md（Harness形式）を作成

### 作成したファイル
- `DESIGN.md`: 設計書
- `CLAUDE.md`: プロジェクト設定
- `Plans.md`: タスク管理
- `.memory/context.md`: 長期記憶
- `.claude/memory/decisions.md`: 意思決定記録
- `.claude/memory/patterns.md`: 再利用パターン
- `.claude/agents/team.json`: サブエージェント構成

### 次回TODO
- [ ] Python仮想環境のセットアップ（`python -m venv venv` 実行）
- [ ] 必要パッケージのインストール（`pip install -r requirements.txt`）
- [ ] Streamlit基本構造の作成
- [ ] yfinanceでのデータ取得テスト
- [ ] GitHubへの初回コミット・プッシュ
