// ========================================
// TradingView ウィジェット
// ========================================

// チャート設定（無料で使えるCFDシンボルを使用）
const CHARTS = [
  { containerId: 'chart-nikkei', symbol: 'OANDA:JP225USD', name: '日経平均' },
  { containerId: 'chart-sp500', symbol: 'OANDA:SPX500USD', name: 'S&P 500' },
  { containerId: 'chart-nasdaq', symbol: 'OANDA:NAS100USD', name: 'NASDAQ' },
  { containerId: 'chart-nikkei-futures', symbol: 'FX:USDJPY', name: 'USD/JPY' },
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
 * チャートウィジェットを初期化（ミニチャートウィジェット使用）
 */
function initChart(containerId: string, symbol: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // ミニチャートウィジェットを使用
  container.innerHTML = `
    <div class="tradingview-widget-container" style="height: 100%; width: 100%;">
      <div class="tradingview-widget-container__widget" style="height: 100%; width: 100%;"></div>
    </div>
  `;

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbol: symbol,
    width: '100%',
    height: '100%',
    locale: 'ja',
    dateRange: '1M',
    colorTheme: 'light',
    isTransparent: false,
    autosize: true,
    largeChartUrl: '',
  });

  container.querySelector('.tradingview-widget-container')?.appendChild(script);
}
