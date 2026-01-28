// ========================================
// おすすめ銘柄データ
// ========================================

// 銘柄データの型
export interface Stock {
  code: string;
  name: string;
  description: string;
  tag: string;
  reason: string;
}

// 初心者向けおすすめ銘柄（静的リスト）
const RECOMMENDED_STOCKS: Stock[] = [
  {
    code: '7203',
    name: 'トヨタ自動車',
    description: '世界最大級の自動車メーカー。EV・水素車にも積極投資。',
    tag: '大型株',
    reason: '安定した業績、配当あり。日本を代表する企業で初心者にも分かりやすい。',
  },
  {
    code: '9984',
    name: 'ソフトバンクグループ',
    description: '世界的な投資会社。AI・テクノロジー企業に積極投資。',
    tag: '成長株',
    reason: 'テクノロジートレンドへの投資。値動きは大きいがリターンも期待できる。',
  },
  {
    code: '6758',
    name: 'ソニーグループ',
    description: 'エンタメ・半導体・金融の複合企業。',
    tag: '大型株',
    reason: 'ゲーム・音楽・映画など多角化。イメージセンサーで世界シェアトップ。',
  },
  {
    code: '8306',
    name: '三菱UFJフィナンシャル・グループ',
    description: '日本最大の金融グループ。',
    tag: '高配当',
    reason: '安定した配当が魅力。金利上昇で恩恵を受ける可能性。',
  },
  {
    code: '9432',
    name: '日本電信電話(NTT)',
    description: '国内最大の通信会社。',
    tag: '高配当',
    reason: '安定した事業基盤と配当。株式分割で買いやすくなった。',
  },
  {
    code: '4063',
    name: '信越化学工業',
    description: '半導体材料で世界トップシェア。',
    tag: '優良株',
    reason: '半導体需要の恩恵。財務健全で長期投資向き。',
  },
  {
    code: '6861',
    name: 'キーエンス',
    description: 'FA（工場自動化）センサーのトップ企業。',
    tag: '優良株',
    reason: '高い利益率と成長性。日本を代表する高収益企業。',
  },
  {
    code: '2914',
    name: '日本たばこ産業(JT)',
    description: 'たばこ国内最大手。海外展開も。',
    tag: '高配当',
    reason: '高い配当利回り。ディフェンシブ銘柄として人気。',
  },
];

// ETF（上場投資信託）
const RECOMMENDED_ETFS: Stock[] = [
  {
    code: '1306',
    name: 'TOPIX連動型上場投資信託',
    description: '東証プライム全体に投資できるETF。',
    tag: 'ETF',
    reason: '個別株リスクを分散。日本株全体の成長に投資できる。',
  },
  {
    code: '1321',
    name: '日経225連動型上場投資信託',
    description: '日経平均株価に連動するETF。',
    tag: 'ETF',
    reason: 'ニュースでよく見る日経平均に投資。初心者に分かりやすい。',
  },
  {
    code: '1655',
    name: 'iシェアーズ S&P500 米国株ETF',
    description: '米国S&P500に投資できるETF。',
    tag: 'ETF・米国',
    reason: '世界最強の米国株式市場に日本円で投資可能。',
  },
];

/**
 * おすすめ銘柄セクションを初期化
 */
export function initStocks(): void {
  const container = document.getElementById('stocks-container');
  if (!container) return;

  // 個別株とETFを結合
  const allStocks = [...RECOMMENDED_STOCKS, ...RECOMMENDED_ETFS];

  container.innerHTML = allStocks.map((stock) => `
    <div class="stock-card">
      <div class="stock-header">
        <div>
          <div class="stock-name">${escapeHtml(stock.name)}</div>
          <div class="stock-code">${stock.code}.T</div>
        </div>
        <span class="stock-tag">${escapeHtml(stock.tag)}</span>
      </div>
      <p class="stock-description">${escapeHtml(stock.description)}</p>
      <div class="stock-reason">
        <strong>初心者おすすめ理由:</strong><br>
        ${escapeHtml(stock.reason)}
      </div>
    </div>
  `).join('');
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
