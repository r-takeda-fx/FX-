// ========================================
// TradingView ウィジェット
// ========================================

declare const TradingView: any;

// ウィジェット設定
const WIDGET_CONFIG = {
  autosize: true,
  symbol: '',
  interval: 'D',
  timezone: 'Asia/Tokyo',
  theme: 'light',
  style: '1',
  locale: 'ja',
  toolbar_bg: '#f1f3f6',
  enable_publishing: false,
  hide_top_toolbar: true,
  hide_legend: false,
  save_image: false,
  container_id: '',
};

// チャート設定
const CHARTS = [
  { containerId: 'chart-nikkei', symbol: 'TVC:NI225', name: '日経平均' },
  { containerId: 'chart-sp500', symbol: 'FOREXCOM:SPXUSD', name: 'S&P 500' },
  { containerId: 'chart-nasdaq', symbol: 'NASDAQ:NDX', name: 'NASDAQ' },
  { containerId: 'chart-nikkei-futures', symbol: 'CME_MINI:NKD1!', name: '日経先物' },
];

/**
 * TradingViewウィジェットを初期化
 */
export function initTradingViewWidgets(): void {
  // ティッカー初期化
  initTicker();

  // チャート初期化
  CHARTS.forEach((chart) => {
    initChart(chart.containerId, chart.symbol);
  });
}

/**
 * ティッカーウィジェットを初期化
 */
function initTicker(): void {
  const container = document.getElementById('tradingview-ticker');
  if (!container) return;

  // ティッカーウィジェットのHTMLを挿入
  container.innerHTML = `
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
    </div>
  `;

  // TradingViewティッカーテープウィジェットのスクリプトを動的に追加
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: 'TVC:NI225', title: '日経平均' },
      { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
      { proName: 'NASDAQ:NDX', title: 'NASDAQ' },
      { proName: 'FX:USDJPY', title: 'USD/JPY' },
      { proName: 'CME_MINI:NKD1!', title: '日経先物' },
      { proName: 'TVC:GOLD', title: 'ゴールド' },
      { proName: 'BITSTAMP:BTCUSD', title: 'ビットコイン' },
    ],
    showSymbolLogo: true,
    colorTheme: 'light',
    isTransparent: false,
    displayMode: 'adaptive',
    locale: 'ja',
  });

  container.querySelector('.tradingview-widget-container')?.appendChild(script);
}

/**
 * チャートウィジェットを初期化
 */
function initChart(containerId: string, symbol: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // TradingViewウィジェットが読み込まれているか確認
  if (typeof TradingView === 'undefined') {
    console.warn('TradingView is not loaded yet');
    // フォールバック: iframeで埋め込み
    container.innerHTML = `
      <iframe
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(symbol)}&interval=D&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=f1f3f6&theme=light&style=1&timezone=Asia%2FTokyo&locale=ja"
        style="width: 100%; height: 100%; border: none;"
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    `;
    return;
  }

  // TradingViewウィジェットを作成
  new TradingView.widget({
    ...WIDGET_CONFIG,
    symbol: symbol,
    container_id: containerId,
  });
}
