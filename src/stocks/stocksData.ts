// ========================================
// おすすめ銘柄データ（リスク別分類）
// ========================================

// リスクレベル
export type RiskLevel = 'low' | 'medium' | 'high';

// 銘柄データの型
export interface Stock {
  code: string;
  name: string;
  nameEn?: string;
  description: string;
  tag: string;
  reason: string;
  market: 'JP' | 'US';
  risk: RiskLevel;
}

// ========================================
// 小リスク銘柄（安定・高配当・インデックス）
// ========================================
const LOW_RISK_STOCKS: Stock[] = [
  // 日本株 - 高配当・安定
  {
    code: '9432',
    name: '日本電信電話(NTT)',
    description: '国内最大の通信会社。安定した事業基盤。',
    tag: '高配当',
    reason: '通信インフラは景気に左右されにくい。株式分割で買いやすく、配当も安定。',
    market: 'JP',
    risk: 'low',
  },
  {
    code: '8306',
    name: '三菱UFJフィナンシャル・グループ',
    description: '日本最大の金融グループ。',
    tag: '高配当',
    reason: '安定した配当が魅力。メガバンクは倒産リスクが極めて低い。',
    market: 'JP',
    risk: 'low',
  },
  {
    code: '2914',
    name: '日本たばこ産業(JT)',
    description: 'たばこ国内最大手。海外展開も。',
    tag: '高配当',
    reason: '高い配当利回り（5%超）。ディフェンシブ銘柄の代表格。',
    market: 'JP',
    risk: 'low',
  },
  // 米国株 - 安定
  {
    code: 'JNJ',
    name: 'Johnson & Johnson',
    nameEn: 'Johnson & Johnson',
    description: '医薬品・医療機器・日用品の世界的企業。60年以上連続増配。',
    tag: '配当王',
    reason: '景気に左右されにくいヘルスケア。60年以上連続増配の「配当王」。',
    market: 'US',
    risk: 'low',
  },
  {
    code: 'PG',
    name: 'Procter & Gamble',
    nameEn: 'Procter & Gamble',
    description: '日用品世界最大手（P&G）。アリエール、パンパース等。',
    tag: '配当王',
    reason: '生活必需品は不況でも売れる。60年以上連続増配。',
    market: 'US',
    risk: 'low',
  },
  {
    code: 'KO',
    name: 'Coca-Cola',
    nameEn: 'The Coca-Cola Company',
    description: '飲料世界最大手。コカ・コーラ、ファンタ等。',
    tag: '配当王',
    reason: 'バフェットも長期保有。60年以上連続増配の超安定企業。',
    market: 'US',
    risk: 'low',
  },
  // ETF - インデックス
  {
    code: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    nameEn: 'Vanguard S&P 500 ETF',
    description: 'S&P500に連動。経費率0.03%と超低コスト。',
    tag: 'ETF',
    reason: '米国上位500社に分散投資。長期投資の王道。経費率最安レベル。',
    market: 'US',
    risk: 'low',
  },
  {
    code: 'VT',
    name: 'Vanguard Total World Stock ETF',
    nameEn: 'Vanguard Total World Stock ETF',
    description: '全世界の株式（約9000銘柄）に投資。',
    tag: 'ETF・全世界',
    reason: 'これ1本で全世界に分散投資。究極のリスク分散。',
    market: 'US',
    risk: 'low',
  },
  {
    code: '1306',
    name: 'TOPIX連動型上場投資信託',
    description: '東証プライム全体に投資できるETF。',
    tag: 'ETF・日本',
    reason: '日本株全体に分散。個別株リスクを回避。',
    market: 'JP',
    risk: 'low',
  },
];

// ========================================
// 中リスク銘柄（優良成長株）
// ========================================
const MEDIUM_RISK_STOCKS: Stock[] = [
  // 日本株 - 優良株
  {
    code: '7203',
    name: 'トヨタ自動車',
    description: '世界最大級の自動車メーカー。EV・水素車にも投資。',
    tag: '大型株',
    reason: '世界的ブランド力。ただしEV競争激化で中リスク。',
    market: 'JP',
    risk: 'medium',
  },
  {
    code: '6758',
    name: 'ソニーグループ',
    description: 'エンタメ・半導体・金融の複合企業。',
    tag: '大型株',
    reason: 'ゲーム・音楽・映画と多角化。イメージセンサーで世界トップ。',
    market: 'JP',
    risk: 'medium',
  },
  {
    code: '4063',
    name: '信越化学工業',
    description: '半導体材料で世界トップシェア。',
    tag: '優良株',
    reason: '半導体需要の恩恵。財務健全だが、半導体市況に左右される。',
    market: 'JP',
    risk: 'medium',
  },
  // 米国株 - GAFAM
  {
    code: 'AAPL',
    name: 'Apple',
    nameEn: 'Apple Inc.',
    description: 'iPhone、Mac、サービス事業を展開する世界最大級のテクノロジー企業。',
    tag: 'GAFAM',
    reason: '強力なブランド力とエコシステム。成熟企業だが成長も継続。',
    market: 'US',
    risk: 'medium',
  },
  {
    code: 'MSFT',
    name: 'Microsoft',
    nameEn: 'Microsoft Corporation',
    description: 'Windows、Azure、Office 365を展開。AI分野でも積極投資。',
    tag: 'GAFAM',
    reason: 'クラウド（Azure）が成長ドライバー。AI投資でも先行。',
    market: 'US',
    risk: 'medium',
  },
  {
    code: 'GOOGL',
    name: 'Alphabet (Google)',
    nameEn: 'Alphabet Inc.',
    description: 'Google検索、YouTube、Androidを運営。',
    tag: 'GAFAM',
    reason: '検索広告の圧倒的シェア。ただしAI競争で投資負担増。',
    market: 'US',
    risk: 'medium',
  },
  {
    code: 'AMZN',
    name: 'Amazon',
    nameEn: 'Amazon.com, Inc.',
    description: 'EC最大手。クラウド（AWS）が利益の柱。',
    tag: 'GAFAM',
    reason: 'AWSが高収益。EC・広告・サブスクと多角化。',
    market: 'US',
    risk: 'medium',
  },
  // ETF - セクター
  {
    code: 'QQQ',
    name: 'Invesco QQQ Trust',
    nameEn: 'Invesco QQQ Trust',
    description: 'NASDAQ100に連動。テック企業中心のETF。',
    tag: 'ETF・テック',
    reason: 'テック大手に集中投資。成長期待が高いがボラティリティも。',
    market: 'US',
    risk: 'medium',
  },
];

// ========================================
// 大リスク銘柄（ハイリターン期待）
// ========================================
const HIGH_RISK_STOCKS: Stock[] = [
  // 日本株 - 成長株
  {
    code: '9984',
    name: 'ソフトバンクグループ',
    description: '世界的な投資会社。AI・テクノロジー企業に積極投資。',
    tag: '投資会社',
    reason: 'AI投資で大きなリターン期待。ただし株価変動が非常に大きい。',
    market: 'JP',
    risk: 'high',
  },
  {
    code: '6861',
    name: 'キーエンス',
    description: 'FA（工場自動化）センサーのトップ企業。',
    tag: '成長株',
    reason: '高い利益率と成長性。ただしPERが高く、期待値込みの株価。',
    market: 'JP',
    risk: 'high',
  },
  // 米国株 - 高成長
  {
    code: 'NVDA',
    name: 'NVIDIA',
    nameEn: 'NVIDIA Corporation',
    description: 'GPU世界最大手。AI・データセンター向けチップで急成長。',
    tag: 'AI関連',
    reason: 'AI半導体で圧倒的シェア。爆発的成長だが、期待値が非常に高い。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'TSLA',
    name: 'Tesla',
    nameEn: 'Tesla, Inc.',
    description: 'EV世界最大手。自動運転・エネルギー事業も展開。',
    tag: 'EV',
    reason: 'EV市場のリーダー。株価変動が非常に大きい。イーロン・マスクの発言でも動く。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'META',
    name: 'Meta (Facebook)',
    nameEn: 'Meta Platforms, Inc.',
    description: 'Facebook、Instagram、WhatsAppを運営。メタバースに巨額投資。',
    tag: 'GAFAM',
    reason: 'SNS広告で高収益。メタバース投資の成否で株価が大きく動く。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'AMD',
    name: 'AMD',
    nameEn: 'Advanced Micro Devices, Inc.',
    description: 'CPU・GPUメーカー。IntelやNVIDIAの競合。',
    tag: 'AI関連',
    reason: 'AI半導体でNVIDIAを追撃。成長期待大だが競争激しい。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'COIN',
    name: 'Coinbase',
    nameEn: 'Coinbase Global, Inc.',
    description: '米国最大の暗号資産取引所。',
    tag: '暗号資産',
    reason: 'ビットコイン価格に連動。暗号資産市場の成長に賭けるなら。',
    market: 'US',
    risk: 'high',
  },
];

// リスクレベルの表示情報
const RISK_INFO: Record<RiskLevel, { label: string; emoji: string; color: string; description: string }> = {
  low: {
    label: '小リスク',
    emoji: '🟢',
    color: '#16a34a',
    description: '安定志向。配当重視、インデックス投資向け。値動きは小さいが、大きなリターンも期待しにくい。',
  },
  medium: {
    label: '中リスク',
    emoji: '🟡',
    color: '#f59e0b',
    description: 'バランス型。成長と安定のバランス。GAFAM等の優良成長株。',
  },
  high: {
    label: '大リスク',
    emoji: '🔴',
    color: '#dc2626',
    description: '高リターン狙い。株価変動が大きい。利益も損失も大きくなる可能性。余裕資金で投資を。',
  },
};

/**
 * おすすめ銘柄セクションを初期化
 */
export function initStocks(): void {
  const container = document.getElementById('stocks-container');
  if (!container) return;

  const html = `
    ${renderRiskCategory('low', LOW_RISK_STOCKS)}
    ${renderRiskCategory('medium', MEDIUM_RISK_STOCKS)}
    ${renderRiskCategory('high', HIGH_RISK_STOCKS)}
  `;

  container.innerHTML = html;
}

/**
 * リスクカテゴリをレンダリング
 */
function renderRiskCategory(risk: RiskLevel, stocks: Stock[]): string {
  const info = RISK_INFO[risk];

  return `
    <div class="stocks-category risk-${risk}">
      <h3 class="stocks-category-title">
        ${info.emoji} ${info.label}
        <span class="risk-badge" style="background: ${info.color}20; color: ${info.color};">${info.label}</span>
      </h3>
      <p class="risk-description">${info.description}</p>
      <div class="stocks-grid-inner">
        ${stocks.map((stock) => renderStockCard(stock)).join('')}
      </div>
    </div>
  `;
}

/**
 * 銘柄カードをレンダリング
 */
function renderStockCard(stock: Stock): string {
  const codeDisplay = stock.market === 'JP' ? `${stock.code}.T` : stock.code;
  const marketLabel = stock.market === 'JP' ? '東証' : 'NYSE/NASDAQ';
  const riskInfo = RISK_INFO[stock.risk];

  return `
    <div class="stock-card">
      <div class="stock-header">
        <div>
          <div class="stock-name">${escapeHtml(stock.name)}</div>
          <div class="stock-code">${codeDisplay} | ${marketLabel}</div>
        </div>
        <div class="stock-tags">
          <span class="stock-tag ${stock.market === 'US' ? 'stock-tag-us' : ''}">${escapeHtml(stock.tag)}</span>
        </div>
      </div>
      <p class="stock-description">${escapeHtml(stock.description)}</p>
      <div class="stock-reason">
        <strong>おすすめ理由:</strong><br>
        ${escapeHtml(stock.reason)}
      </div>
    </div>
  `;
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
