// ========================================
// おすすめ銘柄データ（日本株 + 海外株）
// ========================================

// 銘柄データの型
export interface Stock {
  code: string;
  name: string;
  nameEn?: string;
  description: string;
  tag: string;
  reason: string;
  market: 'JP' | 'US';
}

// ========================================
// 日本株
// ========================================
const JAPANESE_STOCKS: Stock[] = [
  {
    code: '7203',
    name: 'トヨタ自動車',
    description: '世界最大級の自動車メーカー。EV・水素車にも積極投資。',
    tag: '大型株',
    reason: '安定した業績、配当あり。日本を代表する企業で初心者にも分かりやすい。',
    market: 'JP',
  },
  {
    code: '6758',
    name: 'ソニーグループ',
    description: 'エンタメ・半導体・金融の複合企業。',
    tag: '大型株',
    reason: 'ゲーム・音楽・映画など多角化。イメージセンサーで世界シェアトップ。',
    market: 'JP',
  },
  {
    code: '8306',
    name: '三菱UFJフィナンシャル・グループ',
    description: '日本最大の金融グループ。',
    tag: '高配当',
    reason: '安定した配当が魅力。金利上昇で恩恵を受ける可能性。',
    market: 'JP',
  },
  {
    code: '9432',
    name: '日本電信電話(NTT)',
    description: '国内最大の通信会社。',
    tag: '高配当',
    reason: '安定した事業基盤と配当。株式分割で買いやすくなった。',
    market: 'JP',
  },
  {
    code: '4063',
    name: '信越化学工業',
    description: '半導体材料で世界トップシェア。',
    tag: '優良株',
    reason: '半導体需要の恩恵。財務健全で長期投資向き。',
    market: 'JP',
  },
];

// ========================================
// 米国株
// ========================================
const US_STOCKS: Stock[] = [
  {
    code: 'AAPL',
    name: 'Apple',
    nameEn: 'Apple Inc.',
    description: 'iPhone、Mac、サービス事業を展開する世界最大級のテクノロジー企業。',
    tag: 'GAFAM',
    reason: '強力なブランド力とエコシステム。安定した収益とキャッシュフロー。',
    market: 'US',
  },
  {
    code: 'MSFT',
    name: 'Microsoft',
    nameEn: 'Microsoft Corporation',
    description: 'Windows、Azure、Office 365を展開。AI分野でも積極投資。',
    tag: 'GAFAM',
    reason: 'クラウド（Azure）が急成長。OpenAIとの提携でAI分野をリード。',
    market: 'US',
  },
  {
    code: 'GOOGL',
    name: 'Alphabet (Google)',
    nameEn: 'Alphabet Inc.',
    description: 'Google検索、YouTube、Androidを運営。広告収入が主力。',
    tag: 'GAFAM',
    reason: '検索広告の圧倒的シェア。YouTubeとクラウドも成長中。',
    market: 'US',
  },
  {
    code: 'AMZN',
    name: 'Amazon',
    nameEn: 'Amazon.com, Inc.',
    description: 'EC最大手。クラウド（AWS）が利益の柱。',
    tag: 'GAFAM',
    reason: 'AWSが高収益。EC・広告・サブスクと多角化。',
    market: 'US',
  },
  {
    code: 'NVDA',
    name: 'NVIDIA',
    nameEn: 'NVIDIA Corporation',
    description: 'GPU世界最大手。AI・データセンター向けチップで急成長。',
    tag: 'AI関連',
    reason: 'AI半導体で圧倒的シェア。ChatGPT等のAIブームで恩恵。',
    market: 'US',
  },
  {
    code: 'TSLA',
    name: 'Tesla',
    nameEn: 'Tesla, Inc.',
    description: 'EV世界最大手。自動運転・エネルギー事業も展開。',
    tag: 'EV',
    reason: 'EV市場のリーダー。ただし株価変動が大きいので注意。',
    market: 'US',
  },
  {
    code: 'META',
    name: 'Meta (Facebook)',
    nameEn: 'Meta Platforms, Inc.',
    description: 'Facebook、Instagram、WhatsAppを運営。メタバースにも注力。',
    tag: 'GAFAM',
    reason: 'SNS広告で高収益。AI投資とコスト削減で業績回復。',
    market: 'US',
  },
  {
    code: 'JPM',
    name: 'JPMorgan Chase',
    nameEn: 'JPMorgan Chase & Co.',
    description: '米国最大の銀行。投資銀行・資産運用も展開。',
    tag: '金融',
    reason: '米国金融の代表格。金利上昇局面で恩恵。配当も魅力。',
    market: 'US',
  },
];

// ========================================
// ETF（上場投資信託）
// ========================================
const ETFS: Stock[] = [
  {
    code: '1306',
    name: 'TOPIX連動型上場投資信託',
    description: '東証プライム全体に投資できるETF。',
    tag: 'ETF・日本',
    reason: '個別株リスクを分散。日本株全体の成長に投資できる。',
    market: 'JP',
  },
  {
    code: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    nameEn: 'Vanguard S&P 500 ETF',
    description: 'S&P500に連動する米国ETF。経費率0.03%と超低コスト。',
    tag: 'ETF・米国',
    reason: '米国株式市場全体に低コストで投資。長期投資の王道。',
    market: 'US',
  },
  {
    code: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    nameEn: 'Vanguard Total Stock Market ETF',
    description: '米国株式市場全体（約4000銘柄）に投資するETF。',
    tag: 'ETF・米国',
    reason: '大型株から小型株まで幅広く分散。経費率0.03%。',
    market: 'US',
  },
  {
    code: 'QQQ',
    name: 'Invesco QQQ Trust',
    nameEn: 'Invesco QQQ Trust',
    description: 'NASDAQ100に連動。テック企業中心のETF。',
    tag: 'ETF・米国',
    reason: 'Apple、Microsoft、NVIDIA等のテック大手に投資。成長期待が高い。',
    market: 'US',
  },
  {
    code: 'VT',
    name: 'Vanguard Total World Stock ETF',
    nameEn: 'Vanguard Total World Stock ETF',
    description: '全世界の株式（約9000銘柄）に投資するETF。',
    tag: 'ETF・全世界',
    reason: 'これ1本で全世界に分散投資。究極の分散投資。',
    market: 'US',
  },
  {
    code: '1655',
    name: 'iシェアーズ S&P500 米国株ETF',
    description: '東証上場のS&P500連動ETF。円で購入可能。',
    tag: 'ETF・日本上場',
    reason: '日本の証券口座で米国株式市場に投資できる。',
    market: 'JP',
  },
];

/**
 * おすすめ銘柄セクションを初期化
 */
export function initStocks(): void {
  const container = document.getElementById('stocks-container');
  if (!container) return;

  // カテゴリ別に表示
  const html = `
    <div class="stocks-category">
      <h3 class="stocks-category-title">🇯🇵 日本株</h3>
      <div class="stocks-grid-inner">
        ${JAPANESE_STOCKS.map(renderStockCard).join('')}
      </div>
    </div>
    <div class="stocks-category">
      <h3 class="stocks-category-title">🇺🇸 米国株</h3>
      <div class="stocks-grid-inner">
        ${US_STOCKS.map(renderStockCard).join('')}
      </div>
    </div>
    <div class="stocks-category">
      <h3 class="stocks-category-title">📊 ETF（上場投資信託）</h3>
      <div class="stocks-grid-inner">
        ${ETFS.map(renderStockCard).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
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
        <span class="stock-tag ${stock.market === 'US' ? 'stock-tag-us' : ''}">${escapeHtml(stock.tag)}</span>
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
