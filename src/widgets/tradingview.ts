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

  // チャート初期化（少し遅延させて確実に読み込む）
  setTimeout(() => {
    CHARTS.forEach((chart, index) => {
      setTimeout(() => {
        initSymbolOverview(chart.containerId, chart.symbol);
      }, index * 100);
    });
  }, 500);
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
 * シンボルオーバービューウィジェットを初期化
 */
function initSymbolOverview(containerId: string, symbol: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // ユニークなIDを生成
  const widgetId = `${containerId}-widget-${Date.now()}`;

  container.innerHTML = `
    <div class="tradingview-widget-container" style="height: 100%; width: 100%;">
      <div class="tradingview-widget-container__widget" id="${widgetId}" style="height: 100%; width: 100%;"></div>
    </div>
  `;

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: [[symbol]],
    chartOnly: false,
    width: '100%',
    height: '100%',
    locale: 'ja',
    colorTheme: 'light',
    autosize: true,
    showVolume: true,
    showMA: true,
    hideDateRanges: false,
    hideMarketStatus: false,
    hideSymbolLogo: false,
    scalePosition: 'right',
    scaleMode: 'Normal',
    fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
    fontSize: '10',
    noTimeScale: false,
    valuesTracking: '1',
    changeMode: 'price-and-percent',
    chartType: 'area',
    maLineColor: '#2962FF',
    maLineWidth: 1,
    maLength: 9,
    lineWidth: 2,
    lineType: 0,
    dateRanges: [
      '1d|1',
      '1m|30',
      '3m|60',
      '12m|1D',
      '60m|1W',
      'all|1M'
    ]
  });

  const widgetContainer = container.querySelector('.tradingview-widget-container');
  if (widgetContainer) {
    widgetContainer.appendChild(script);
  }
}
