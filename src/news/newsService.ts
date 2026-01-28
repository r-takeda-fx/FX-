// ========================================
// ニュースサービス（日本語翻訳対応・株価影響度分析）
// ========================================

// ニュースカテゴリ
export type NewsCategory = 'central-bank' | 'economic' | 'geopolitical' | 'earnings' | 'all';

// 株価影響度レベル
export type ImpactLevel = 'critical' | 'high' | 'medium' | 'low';

// ニュースアイテムの型
export interface NewsItem {
  title: string;
  titleJa: string;
  link: string;
  pubDate: string;
  category: NewsCategory;
  source: string;
  impactScore: number;
  impactLevel: ImpactLevel;
  impactReason: string;
}

// RSSフィード設定
const RSS_FEEDS = [
  {
    url: 'https://feeds.finance.yahoo.co.jp/rss/2.0/category/economy?format=xml',
    source: 'Yahoo!ファイナンス',
    category: 'economic' as NewsCategory,
    isJapanese: true,
  },
  {
    url: 'https://www.reuters.com/rssFeed/businessNews',
    source: 'Reuters',
    category: 'economic' as NewsCategory,
    isJapanese: false,
  },
];

// RSS2JSON API（無料）
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

// MyMemory翻訳API（無料: 1日1000リクエスト）
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

// カテゴリ判定用キーワード
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  'central-bank': ['FRB', 'Fed', 'BOJ', '日銀', '金利', 'interest rate', 'monetary policy', '金融政策', 'Powell', '植田', 'central bank', '中央銀行'],
  'economic': ['GDP', 'inflation', 'インフレ', 'employment', '雇用', 'CPI', 'PMI', '経済指標', 'economic', '景気'],
  'geopolitical': ['war', '戦争', 'sanction', '制裁', 'conflict', '紛争', 'China', '中国', 'Russia', 'ロシア', 'tariff', '関税', 'Ukraine', 'ウクライナ'],
  'earnings': ['earnings', '決算', 'profit', '利益', 'revenue', '売上', 'quarterly', '四半期', '業績'],
  'all': [],
};

// 株価影響度キーワード（スコア付き）
interface ImpactKeyword {
  keyword: string;
  score: number;
  reason: string;
}

const IMPACT_KEYWORDS: ImpactKeyword[] = [
  // 最重要（金融政策関連）- スコア: 100
  { keyword: '利上げ', score: 100, reason: '金利上昇は株価に大きな影響' },
  { keyword: '利下げ', score: 100, reason: '金利低下は株価にプラス' },
  { keyword: 'rate hike', score: 100, reason: '金利上昇は株価に大きな影響' },
  { keyword: 'rate cut', score: 100, reason: '金利低下は株価にプラス' },
  { keyword: 'FOMC', score: 95, reason: 'FRBの金融政策決定会合' },
  { keyword: '金融政策決定会合', score: 95, reason: '日銀の政策決定' },
  { keyword: 'quantitative', score: 90, reason: '量的緩和/引締めは市場に大影響' },
  { keyword: '量的緩和', score: 90, reason: '金融緩和は株価にプラス' },

  // 重要（経済指標関連）- スコア: 70-85
  { keyword: '雇用統計', score: 85, reason: '米国経済の重要指標' },
  { keyword: 'employment report', score: 85, reason: '米国経済の重要指標' },
  { keyword: 'NFP', score: 85, reason: '非農業部門雇用者数' },
  { keyword: 'CPI', score: 80, reason: 'インフレ指標は金融政策に影響' },
  { keyword: '消費者物価', score: 80, reason: 'インフレ動向' },
  { keyword: 'GDP', score: 75, reason: '経済成長率' },
  { keyword: 'PMI', score: 70, reason: '景況感指数' },

  // 重要（地政学リスク）- スコア: 60-80
  { keyword: '戦争', score: 80, reason: '地政学リスク' },
  { keyword: 'war', score: 80, reason: '地政学リスク' },
  { keyword: '制裁', score: 75, reason: '経済制裁は市場に影響' },
  { keyword: 'sanction', score: 75, reason: '経済制裁' },
  { keyword: '関税', score: 70, reason: '貿易摩擦' },
  { keyword: 'tariff', score: 70, reason: '貿易摩擦' },
  { keyword: '緊張', score: 60, reason: '地政学的緊張' },
  { keyword: 'tension', score: 60, reason: '地政学的緊張' },

  // 中程度（決算・業績）- スコア: 50-70
  { keyword: '過去最高', score: 70, reason: '好業績' },
  { keyword: 'record high', score: 70, reason: '過去最高' },
  { keyword: '上方修正', score: 65, reason: '業績見通し改善' },
  { keyword: '下方修正', score: 65, reason: '業績見通し悪化' },
  { keyword: '決算', score: 50, reason: '企業業績発表' },
  { keyword: 'earnings', score: 50, reason: '決算発表' },

  // 市場動向 - スコア: 40-60
  { keyword: '急騰', score: 60, reason: '株価急上昇' },
  { keyword: '急落', score: 60, reason: '株価急落' },
  { keyword: 'surge', score: 60, reason: '急騰' },
  { keyword: 'plunge', score: 60, reason: '急落' },
  { keyword: 'crash', score: 70, reason: '暴落' },
  { keyword: '暴落', score: 70, reason: '市場暴落' },
  { keyword: '最高値', score: 55, reason: '過去最高値更新' },
  { keyword: 'all-time high', score: 55, reason: '過去最高値' },
];

// カテゴリ表示名
const CATEGORY_NAMES: Record<NewsCategory, string> = {
  'central-bank': '中央銀行',
  'economic': '経済指標',
  'geopolitical': '地政学',
  'earnings': '決算',
  'all': 'すべて',
};

// 影響度レベル表示名
const IMPACT_LEVEL_NAMES: Record<ImpactLevel, string> = {
  'critical': '最重要',
  'high': '重要',
  'medium': '注目',
  'low': '一般',
};

// 翻訳キャッシュ
const translationCache = new Map<string, string>();

/**
 * ニュースセクションを初期化
 */
export function initNews(): void {
  setupFilters();
  fetchAllNews();
}

/**
 * フィルターボタンを設定
 */
function setupFilters(): void {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category') as NewsCategory;
      filterNews(category);
    });
  });
}

/**
 * 全ニュースを取得
 */
async function fetchAllNews(): Promise<void> {
  const container = document.getElementById('news-container');
  if (!container) return;

  container.innerHTML = '<div class="loading">ニュースを読み込み中... 翻訳しています...</div>';

  try {
    // まずサンプルニュースを表示
    const sampleNews = getSampleNews();

    // RSS2JSON APIでニュース取得を試みる
    const newsPromises = RSS_FEEDS.map((feed) =>
      fetchRssFeed(feed.url, feed.source, feed.category, feed.isJapanese)
    );
    const results = await Promise.allSettled(newsPromises);

    const allNews: NewsItem[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allNews.push(...result.value);
      }
    });

    if (allNews.length > 0) {
      // 影響度スコアでソート（高い順）、同スコアなら日付順
      allNews.sort((a, b) => {
        if (b.impactScore !== a.impactScore) {
          return b.impactScore - a.impactScore;
        }
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      // 中程度以上の影響度のニュースのみ表示（low以外）
      const highImpactNews = allNews.filter(n => n.impactLevel !== 'low');
      displayNews(highImpactNews.length > 0 ? highImpactNews.slice(0, 15) : allNews.slice(0, 10));
    } else {
      // RSSが取得できない場合はサンプルを表示
      displayNews(sampleNews);
    }
  } catch (error) {
    console.error('ニュース取得エラー:', error);
    displayNews(getSampleNews());
  }
}

/**
 * RSSフィードを取得
 */
async function fetchRssFeed(
  url: string,
  source: string,
  defaultCategory: NewsCategory,
  isJapanese: boolean
): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${RSS2JSON_API}?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS fetch failed');
    }

    const items: NewsItem[] = [];

    for (const item of data.items.slice(0, 10)) {
      let titleJa = item.title;

      // 英語のニュースは翻訳
      if (!isJapanese) {
        titleJa = await translateToJapanese(item.title);
      }

      // 影響度を計算
      const impact = calculateImpact(item.title + ' ' + titleJa);

      items.push({
        title: item.title,
        titleJa: titleJa,
        link: item.link,
        pubDate: item.pubDate,
        category: detectCategory(item.title + ' ' + titleJa, defaultCategory),
        source: source,
        impactScore: impact.score,
        impactLevel: impact.level,
        impactReason: impact.reason,
      });
    }

    return items;
  } catch (error) {
    console.warn(`RSS取得失敗 (${source}):`, error);
    return [];
  }
}

/**
 * テキストを日本語に翻訳（MyMemory API使用）
 */
async function translateToJapanese(text: string): Promise<string> {
  // キャッシュチェック
  if (translationCache.has(text)) {
    return translationCache.get(text)!;
  }

  // 既に日本語っぽい場合はそのまま返す
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) {
    return text;
  }

  try {
    const response = await fetch(
      `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=en|ja`
    );
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache.set(text, translated);
      return translated;
    }

    return text;
  } catch (error) {
    console.warn('翻訳エラー:', error);
    return text;
  }
}

/**
 * タイトルからカテゴリを判定
 */
function detectCategory(title: string, defaultCategory: NewsCategory): NewsCategory {
  const lowerTitle = title.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === 'all') continue;
    if (keywords.some((keyword) => lowerTitle.includes(keyword.toLowerCase()))) {
      return category as NewsCategory;
    }
  }

  return defaultCategory;
}

/**
 * 株価影響度を計算
 */
function calculateImpact(title: string): { score: number; level: ImpactLevel; reason: string } {
  const lowerTitle = title.toLowerCase();
  let totalScore = 0;
  const reasons: string[] = [];

  for (const { keyword, score, reason } of IMPACT_KEYWORDS) {
    if (lowerTitle.includes(keyword.toLowerCase())) {
      totalScore += score;
      if (!reasons.includes(reason)) {
        reasons.push(reason);
      }
    }
  }

  // 影響度レベルを決定
  let level: ImpactLevel;
  if (totalScore >= 90) {
    level = 'critical';
  } else if (totalScore >= 60) {
    level = 'high';
  } else if (totalScore >= 30) {
    level = 'medium';
  } else {
    level = 'low';
  }

  return {
    score: totalScore,
    level,
    reason: reasons.slice(0, 2).join('、') || '一般ニュース',
  };
}

/**
 * ニュースを表示
 */
function displayNews(news: NewsItem[]): void {
  const container = document.getElementById('news-container');
  if (!container) return;

  if (news.length === 0) {
    container.innerHTML = '<div class="error">ニュースを取得できませんでした</div>';
    return;
  }

  container.innerHTML = news.map((item) => `
    <article class="news-item" data-category="${item.category}" data-impact="${item.impactLevel}">
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        <div class="news-badges">
          <span class="news-category ${item.category}">${CATEGORY_NAMES[item.category]}</span>
          <span class="news-impact impact-${item.impactLevel}">${IMPACT_LEVEL_NAMES[item.impactLevel]}</span>
        </div>
        <h3 class="news-title">${escapeHtml(item.titleJa)}</h3>
        ${item.title !== item.titleJa ? `<p class="news-original">${escapeHtml(item.title)}</p>` : ''}
        <p class="news-impact-reason">📊 ${escapeHtml(item.impactReason)}</p>
        <p class="news-meta">${item.source} | ${formatDate(item.pubDate)}</p>
      </a>
    </article>
  `).join('');
}

/**
 * ニュースをフィルター
 */
function filterNews(category: NewsCategory): void {
  const items = document.querySelectorAll('.news-item');

  items.forEach((item) => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      (item as HTMLElement).style.display = 'block';
    } else {
      (item as HTMLElement).style.display = 'none';
    }
  });
}

/**
 * サンプルニュース（APIが使えない場合のフォールバック）
 */
function getSampleNews(): NewsItem[] {
  const now = new Date().toISOString();
  const sampleData = [
    {
      title: 'FOMC announces surprise rate hike of 0.5%',
      titleJa: 'FOMC、0.5%の利上げを発表 - 市場に衝撃',
      category: 'central-bank' as NewsCategory,
    },
    {
      title: 'Bank of Japan ends negative interest rate policy',
      titleJa: '日銀、マイナス金利政策を終了 - 金融政策決定会合で決定',
      category: 'central-bank' as NewsCategory,
    },
    {
      title: 'US employment report shows strong job growth',
      titleJa: '米雇用統計、予想を大幅に上回る - FRBの利上げ継続観測強まる',
      category: 'economic' as NewsCategory,
    },
    {
      title: 'CPI inflation data higher than expected',
      titleJa: 'CPI、予想を上回るインフレ - 株価急落',
      category: 'economic' as NewsCategory,
    },
    {
      title: 'New sanctions announced against Russia',
      titleJa: '対ロシア新制裁を発表 - エネルギー市場に影響',
      category: 'geopolitical' as NewsCategory,
    },
    {
      title: 'NVIDIA reports record quarterly earnings',
      titleJa: 'NVIDIA決算、過去最高益を更新 - AI需要が牽引',
      category: 'earnings' as NewsCategory,
    },
    {
      title: 'Toyota announces upward revision of profit forecast',
      titleJa: 'トヨタ、業績見通しを上方修正 - 円安が追い風',
      category: 'earnings' as NewsCategory,
    },
    {
      title: 'Stock market crash fears as volatility surges',
      titleJa: '株式市場、暴落懸念で急落 - ボラティリティ急上昇',
      category: 'economic' as NewsCategory,
    },
  ];

  return sampleData.map((item) => {
    const impact = calculateImpact(item.title + ' ' + item.titleJa);
    return {
      title: item.title,
      titleJa: item.titleJa,
      link: '#',
      pubDate: now,
      category: item.category,
      source: 'サンプル',
      impactScore: impact.score,
      impactLevel: impact.level,
      impactReason: impact.reason,
    };
  });
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
 * 日付フォーマット
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
