---
description: Streamlitアプリを起動する
---

# プロジェクト実行

## 実行手順

1. **仮想環境を有効化**
   ```bash
   # Windows
   venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate
   ```

2. **依存パッケージをインストール（初回のみ）**
   ```bash
   pip install -r requirements.txt
   ```

3. **Streamlitアプリを起動**
   ```bash
   streamlit run output/v1.0/scripts/app.py
   ```

4. **ブラウザで開く**
   - 自動的にブラウザが開きます
   - 開かない場合: http://localhost:8501

## 注意事項

- 必ず仮想環境内で実行すること
- 環境変数（APIキー）が必要な場合は `.env` ファイルを作成
- 開発中は `streamlit run --server.runOnSave=true` でホットリロード有効化
