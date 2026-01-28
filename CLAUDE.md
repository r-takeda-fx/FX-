# Project: 株式投資アプリ (FX-)

## Task Workflow
@~/.claude/docs/task-workflow.md

## 設計書
@DESIGN.md

## 長期記憶システム【重要】
@.memory/context.md

**セッション開始時に必ず `.memory/context.md` を読むこと！**

### 記憶システムの構成
| ファイル | 用途 | 更新タイミング |
|---------|------|---------------|
| `.memory/context.md` | 現在の状況サマリー | 毎セッション終了時 |
| `.memory/sessions/YYYY-MM-DD.md` | セッション詳細ログ | 毎セッション終了時 |
| `.memory/decisions/DEC-XXX.md` | 重要な意思決定 | 決定時 |
| `.memory/learnings/LEARN-XXX.md` | 学び・気づき | 発見時 |

## Value

| Value | 適用方針 |
|------|---------|
| **80/20** | 成果の8割を生む20%に集中 |
| **Quick and Small** | MVP優先。完璧より「動くもの」を先に |
| **Creative Thinking** | 前提を疑う。別アプローチを常に検討 |
| **Leverage the Team** | 既存資産・AI・サブエージェントを最大活用 |
| **Be Respectful** | イエスマンにならない |

---

## Folder Structure

| フォルダ | 用途 |
|---------|------|
| input/ | 入力データを配置 |
| output/v{X.Y}/scripts/ | 処理スクリプト |
| output/v{X.Y}/results/ | 実行結果 |
| venv/ | Python仮想環境 |
| **.memory/** | **長期記憶システム** |

## Commands（Harness統合）

| コマンド | 説明 |
|---------|------|
| /work | Plans.mdのタスクを実行（サブエージェント並行処理） |
| /re-plan | 新機能の計画を立てる |
| /harness-review | コードレビュー |
| /sync-status | 進捗確認 |
| /run | プロジェクトのメインスクリプトを実行 |

## サブエージェント活用ルール【重要】

以下の場合は**必ず**Task toolでサブエージェントを起動し並行処理すること：

1. **独立した複数タスクの実行**
2. **複数ファイルの同時処理**
3. **調査と実装の分離**

### サブエージェントの使い方
```
Task tool を subagent_type=general-purpose で複数同時呼び出し
→ run_in_background=true で並行実行
→ TaskOutput で結果収集
```

## 技術スタック

- **フロントエンド**: Streamlit
- **バックエンド**: Python
- **データ取得**: yfinance, NewsAPI, RSS
- **AI要約**: Claude API

## Team
@.claude/agents/team.json

## GitHub
- **リポジトリ**: https://github.com/r-takeda-fx/FX-
- **ブランチ戦略**: main（メイン）
