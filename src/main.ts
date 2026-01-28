// ========================================
// 株式投資ダッシュボード - メインスクリプト
// ========================================

import { initTradingViewWidgets } from './widgets/tradingview';
import { initNews } from './news/newsService';
import { initStocks } from './stocks/stocksData';

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('📈 株式投資ダッシュボード 初期化中...');

  // TradingViewウィジェット初期化
  initTradingViewWidgets();

  // ニュース初期化
  initNews();

  // おすすめ銘柄初期化
  initStocks();

  console.log('✅ 初期化完了');
});
