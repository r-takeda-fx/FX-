// ========================================
// おすすめ銘柄データ（リスク別分類 + 自動更新）
// ========================================

// リスクレベル
export type RiskLevel = 'low' | 'medium' | 'high' | 'expert';

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

// 更新状態
let lastUpdateTime: Date | null = null;
let isUpdating = false;

// ========================================
// 小リスク銘柄（安定・高配当・インデックス）
// ========================================
const LOW_RISK_STOCKS: Stock[] = [
  {
    code: '9432',
    name: '日本電信電話(NTT)',
    description: '国内最大の通信会社。安定した事業基盤。',
    tag: '高配当',
    reason: '通信インフラは景気に左右されにくい。配当も安定。',
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
    code: 'JNJ',
    name: 'Johnson & Johnson',
    description: '医薬品・医療機器・日用品の世界的企業。',
    tag: '配当王',
    reason: '60年以上連続増配の「配当王」。景気に左右されにくい。',
    market: 'US',
    risk: 'low',
  },
  {
    code: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    description: 'S&P500に連動。経費率0.03%。',
    tag: 'ETF',
    reason: '米国上位500社に分散投資。長期投資の王道。',
    market: 'US',
    risk: 'low',
  },
  {
    code: 'VT',
    name: 'Vanguard Total World Stock ETF',
    description: '全世界の株式に投資。',
    tag: 'ETF・全世界',
    reason: 'これ1本で全世界に分散投資。究極のリスク分散。',
    market: 'US',
    risk: 'low',
  },
];

// ========================================
// 中リスク銘柄（優良成長株）
// ========================================
const MEDIUM_RISK_STOCKS: Stock[] = [
  {
    code: '7203',
    name: 'トヨタ自動車',
    description: '世界最大級の自動車メーカー。',
    tag: '大型株',
    reason: '世界的ブランド力。EV競争激化で中リスク。',
    market: 'JP',
    risk: 'medium',
  },
  {
    code: 'AAPL',
    name: 'Apple',
    description: 'iPhone、Mac、サービス事業を展開。',
    tag: 'GAFAM',
    reason: '強力なブランド力とエコシステム。',
    market: 'US',
    risk: 'medium',
  },
  {
    code: 'MSFT',
    name: 'Microsoft',
    description: 'Windows、Azure、Office 365を展開。',
    tag: 'GAFAM',
    reason: 'クラウドとAI投資で先行。',
    market: 'US',
    risk: 'medium',
  },
  {
    code: 'GOOGL',
    name: 'Alphabet (Google)',
    description: 'Google検索、YouTube、Androidを運営。',
    tag: 'GAFAM',
    reason: '検索広告の圧倒的シェア。',
    market: 'US',
    risk: 'medium',
  },
];

// ========================================
// 大リスク銘柄（ハイリターン期待）
// ========================================
const HIGH_RISK_STOCKS: Stock[] = [
  {
    code: '9984',
    name: 'ソフトバンクグループ',
    description: '世界的な投資会社。AI企業に積極投資。',
    tag: '投資会社',
    reason: 'AI投資で大きなリターン期待。株価変動が非常に大きい。',
    market: 'JP',
    risk: 'high',
  },
  {
    code: 'NVDA',
    name: 'NVIDIA',
    description: 'GPU世界最大手。AI半導体で急成長。',
    tag: 'AI関連',
    reason: 'AI半導体で圧倒的シェア。期待値が非常に高い。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'TSLA',
    name: 'Tesla',
    description: 'EV世界最大手。自動運転にも注力。',
    tag: 'EV',
    reason: 'EV市場のリーダー。株価変動が非常に大きい。',
    market: 'US',
    risk: 'high',
  },
  {
    code: 'AMD',
    name: 'AMD',
    description: 'CPU・GPUメーカー。NVIDIAの競合。',
    tag: 'AI関連',
    reason: 'AI半導体でNVIDIAを追撃。成長期待大。',
    market: 'US',
    risk: 'high',
  },
];

// ========================================
// 上級者向け銘柄（ハイリスク・ハイリターン）
// ========================================
const EXPERT_STOCKS: Stock[] = [
  {
    code: 'TQQQ',
    name: 'ProShares UltraPro QQQ',
    description: 'NASDAQ100の3倍レバレッジETF。',
    tag: 'レバレッジ3倍',
    reason: '上昇相場で大きなリターン。下落時は損失も3倍。短期向け。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: 'SOXL',
    name: 'Direxion Semiconductor Bull 3X',
    description: '半導体セクターの3倍レバレッジETF。',
    tag: 'レバレッジ3倍',
    reason: '半導体相場に3倍で連動。NVIDIA等の上昇で大きなリターン。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: 'SPXL',
    name: 'Direxion S&P 500 Bull 3X',
    description: 'S&P500の3倍レバレッジETF。',
    tag: 'レバレッジ3倍',
    reason: '米国株全体に3倍レバレッジ。長期保有には向かない。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: 'SQQQ',
    name: 'ProShares UltraPro Short QQQ',
    description: 'NASDAQ100の逆3倍ETF（ベア型）。',
    tag: 'インバース3倍',
    reason: '下落相場でリターン。上昇時は損失。ヘッジや短期トレード向け。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: 'MARA',
    name: 'Marathon Digital Holdings',
    description: '北米最大級のビットコインマイニング企業。',
    tag: '暗号資産関連',
    reason: 'ビットコイン価格に連動。暗号資産相場で大きく動く。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: 'GME',
    name: 'GameStop',
    description: 'ゲーム小売。ミーム株の代表格。',
    tag: 'ミーム株',
    reason: 'SNSで話題になると急騰。ファンダメンタルズより投機的。',
    market: 'US',
    risk: 'expert',
  },
  {
    code: '1570',
    name: 'NEXT FUNDS 日経平均レバレッジ',
    description: '日経平均の2倍レバレッジETF。',
    tag: 'レバレッジ2倍',
    reason: '日経平均に2倍で連動。日本株の上昇相場で有効。',
    market: 'JP',
    risk: 'expert',
  },
  {
    code: '1357',
    name: 'NEXT FUNDS 日経ダブルインバース',
    description: '日経平均の逆2倍ETF。',
    tag: 'インバース2倍',
    reason: '日経平均下落時にリターン。暴落へのヘッジに。',
    market: 'JP',
    risk: 'expert',
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
    description: '高リターン狙い。株価変動が大きい。利益も損失も大きくなる可能性。',
  },
  expert: {
    label: '上級者向け',
    emoji: '⚠️',
    color: '#7c3aed',
    description: 'レバレッジ・インバース・ミーム株等。大きな損失リスクあり。短期トレード向け。初心者は避けるべき。',
  },
};

// 動的に取得する話題の銘柄（シミュレート）
async function fetchTrendingStocks(): Promise<Stock[]> {
  // 実際のAPIがないため、時間帯に応じて異なる銘柄を返すことでシミュレート
  const hour = new Date().getHours();
  const trendingPool: Stock[] = [
    {
      code: 'PLTR',
      name: 'Palantir Technologies',
      description: 'ビッグデータ分析のAI企業。政府・企業向け。',
      tag: '話題',
      reason: 'AI関連で注目度上昇中。防衛・政府向けAIで強み。',
      market: 'US',
      risk: 'high',
    },
    {
      code: 'SMCI',
      name: 'Super Micro Computer',
      description: 'AIサーバー・ストレージのメーカー。',
      tag: '話題',
      reason: 'AI需要でサーバー販売好調。NVIDIA製品と組み合わせ。',
      market: 'US',
      risk: 'high',
    },
    {
      code: 'ARM',
      name: 'Arm Holdings',
      description: '半導体設計大手。スマホ・AI向けチップ設計。',
      tag: '話題',
      reason: 'AI・スマホ向け半導体設計でシェア拡大中。',
      market: 'US',
      risk: 'high',
    },
    {
      code: 'AVGO',
      name: 'Broadcom',
      description: '半導体・インフラソフトウェア大手。',
      tag: '話題',
      reason: 'AI向け半導体とVMware買収で成長期待。',
      market: 'US',
      risk: 'medium',
    },
    {
      code: 'CRWD',
      name: 'CrowdStrike',
      description: 'サイバーセキュリティのクラウド企業。',
      tag: '話題',
      reason: 'サイバー攻撃増加でセキュリティ需要拡大。',
      market: 'US',
      risk: 'high',
    },
    {
      code: '6920',
      name: 'レーザーテック',
      description: '半導体検査装置で世界シェアトップ。',
      tag: '話題',
      reason: 'EUV露光の検査装置で独占的地位。半導体需要で恩恵。',
      market: 'JP',
      risk: 'high',
    },
  ];

  // 時間帯に応じて異なる銘柄を選択（更新感を出す）
  const selectedIndices = [
    hour % trendingPool.length,
    (hour + 1) % trendingPool.length,
    (hour + 2) % trendingPool.length,
    (hour + 3) % trendingPool.length,
  ];

  return selectedIndices.map(i => trendingPool[i]);
}

/**
 * おすすめ銘柄セクションを初期化
 */
export async function initStocks(): Promise<void> {
  const container = document.getElementById('stocks-container');
  if (!container) return;

  // 初回読み込み
  await updateStocksDisplay();

  // 5分ごとに自動更新
  setInterval(async () => {
    await updateStocksDisplay();
  }, 5 * 60 * 1000);
}

/**
 * 銘柄表示を更新
 */
async function updateStocksDisplay(): Promise<void> {
  const container = document.getElementById('stocks-container');
  if (!container || isUpdating) return;

  isUpdating = true;

  try {
    // 話題の銘柄を取得
    const trendingStocks = await fetchTrendingStocks();
    lastUpdateTime = new Date();

    const html = `
      <div class="stocks-update-info">
        <span class="update-time">最終更新: ${formatTime(lastUpdateTime)}</span>
        <button class="update-btn" onclick="window.refreshStocks()">
          🔄 更新
        </button>
      </div>
      ${renderRiskCategory('low', LOW_RISK_STOCKS)}
      ${renderRiskCategory('medium', MEDIUM_RISK_STOCKS)}
      ${renderRiskCategory('high', HIGH_RISK_STOCKS)}
      ${renderTrendingCategory(trendingStocks)}
      ${renderRiskCategory('expert', EXPERT_STOCKS)}
    `;

    container.innerHTML = html;
  } finally {
    isUpdating = false;
  }
}

// グローバルに更新関数を公開
(window as any).refreshStocks = async () => {
  const btn = document.querySelector('.update-btn') as HTMLButtonElement;
  if (btn) {
    btn.disabled = true;
    btn.textContent = '更新中...';
  }
  await updateStocksDisplay();
  if (btn) {
    btn.disabled = false;
    btn.textContent = '🔄 更新';
  }
};

/**
 * 話題の銘柄カテゴリをレンダリング
 */
function renderTrendingCategory(stocks: Stock[]): string {
  return `
    <div class="stocks-category risk-trending">
      <h3 class="stocks-category-title">
        🔥 話題の銘柄
        <span class="risk-badge" style="background: #f9731620; color: #f97316;">自動更新</span>
        <span class="auto-update-badge">5分ごと更新</span>
      </h3>
      <p class="risk-description">SNSやニュースで話題の銘柄。短期的な値動きに注目。投資は慎重に。</p>
      <div class="stocks-grid-inner">
        ${stocks.map((stock) => renderStockCard(stock)).join('')}
      </div>
    </div>
  `;
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

  return `
    <div class="stock-card">
      <div class="stock-header">
        <div>
          <div class="stock-name">${escapeHtml(stock.name)}</div>
          <div class="stock-code">${codeDisplay} | ${marketLabel}</div>
        </div>
        <div class="stock-tags">
          <span class="stock-tag ${stock.market === 'US' ? 'stock-tag-us' : ''} ${stock.risk === 'expert' ? 'stock-tag-expert' : ''}">${escapeHtml(stock.tag)}</span>
        </div>
      </div>
      <p class="stock-description">${escapeHtml(stock.description)}</p>
      <div class="stock-reason">
        <strong>ポイント:</strong> ${escapeHtml(stock.reason)}
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

/**
 * 時刻フォーマット
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
