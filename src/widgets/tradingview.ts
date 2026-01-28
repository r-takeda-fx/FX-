// ========================================
// TradingView ウィジェット
// ========================================

// チャート設定（無料で使えるCFDシンボルを使用）
const CHARTS = [
  { containerId: 'chart-nikkei', symbol: 'OANDA:JP225USD', name: '日経平均' },
  { containerId: 'chart-sp500', symbol: 'OANDA:SPX500USD', name: 'S&P 500' },
  { containerId: 'chart-nasdaq', symbol: 'OANDA:NAS100USD', name: 'NASDAQ' },
  { containerId: 'chart-usdjpy', symbol: 'FX:USDJPY', name: 'USD/JPY' },
];

/**
 * TradingViewウィジェットを初期化
 */
export function initTradingViewWidgets(): void {
  // ティッカー初期化
  initTicker();

  // チャート初期化
  CHARTS.forEach((chart) => {
    initAdvancedChart(chart.containerId, chart.symbol);
  });
}

/**
 * ティッカーウィジェットを初期化
 */
function initTicker(): void {
  const container = document.getElementById('tradingview-ticker');
  if (!container) return;

  container.innerHTML = `
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
    </div>
  `;

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: 'OANDA:JP225USD', title: '日経平均' },
      { proName: 'OANDA:SPX500USD', title: 'S&P 500' },
      { proName: 'OANDA:NAS100USD', title: 'NASDAQ' },
      { proName: 'FX:USDJPY', title: 'USD/JPY' },
      { proName: 'FX:EURUSD', title: 'EUR/USD' },
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
 * 高度なチャートウィジェットを初期化（詳細・広範囲表示対応）
 */
function initAdvancedChart(containerId: string, symbol: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 高度なチャートウィジェットを使用
  container.innerHTML = `
    <div class="tradingview-widget-container" style="height: 100%; width: 100%;">
      <div id="${containerId}-widget" style="height: 100%; width: 100%;"></div>
    </div>
  `;

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    autosize: true,
    symbol: symbol,
    interval: 'D',
    timezone: 'Asia/Tokyo',
    theme: 'light',
    style: '1',
    locale: 'ja',
    allow_symbol_change: true,
    calendar: false,
    support_host: 'https://www.tradingview.com',
    hide_side_toolbar: false,
    withdateranges: true,
    range: '3M',
    details: true,
    hotlist: false,
    show_popup_button: true,
    popup_width: '1000',
    popup_height: '650',
    container_id: `${containerId}-widget`,
  });

  container.querySelector('.tradingview-widget-container')?.appendChild(script);
}
