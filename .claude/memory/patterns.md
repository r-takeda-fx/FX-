# 再利用パターン集（Patterns）

プロジェクトで使用する/発見したパターンを記録します。

---

## P1: Streamlit基本構造

**カテゴリ**: コード

### 使用場面
Streamlitアプリの新規ページ作成時

### パターン
```python
import streamlit as st

st.set_page_config(
    page_title="株式投資アプリ",
    page_icon="📈",
    layout="wide"
)

st.title("タイトル")

# サイドバー
with st.sidebar:
    st.header("設定")

# メインコンテンツ
col1, col2 = st.columns(2)

with col1:
    st.subheader("セクション1")

with col2:
    st.subheader("セクション2")
```

### 注意点
- `layout="wide"` でワイド表示
- カラムレイアウトでレスポンシブ対応

---

## P2: yfinance株価取得

**カテゴリ**: コード

### 使用場面
株価データの取得時

### パターン
```python
import yfinance as yf

# 日経平均
nikkei = yf.Ticker("^N225")
nikkei_data = nikkei.history(period="1d")

# S&P500
sp500 = yf.Ticker("^GSPC")
sp500_data = sp500.history(period="1d")

# 個別銘柄
ticker = yf.Ticker("7203.T")  # トヨタ
info = ticker.info
```

### 注意点
- 日本株は `.T` サフィックスが必要
- データは15分遅延
