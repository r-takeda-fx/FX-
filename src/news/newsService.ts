// ========================================
// ニュースサービス
// ========================================

// ニュースカテゴリ
export type NewsCategory = 'central-bank' | 'economic' | 'geopolitical' | 'earnings' | 'all';

// ニュースアイテムの型
export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  category: NewsCategory;
  source: string;
}

// RSSフィード設定
const RSS_FEEDS = [
  {
    url: 'https://www.reuters.com/rssFeed/businessNews',
    source: 'Reuters',
    category: 'economic' as NewsCategory,
  },
  {
    url: 'https://feeds.bloomberg.com/markets/news.rss',
    source: 'Bloomberg',
    category: 'economic' as NewsCategory,
  },
];

// RSS2JSON API（無料）
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

// カテゴリ判定用キーワード
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  'central-bank': ['FRB', 'Fed', 'BOJ', '日銀', '金利', 'interest rate', 'monetary policy', '金融政策', 'Powell', '植田'],
  'economic': ['GDP', 'inflation', 'インフレ', 'employment', '雇用', 'CPI', 'PMI', '経済指標'],
  'geopolitical': ['war', '戦争', 'sanction', '制裁', 'conflict', '紛争', 'China', '中国', 'Russia', 'ロシア', 'tariff', '関税'],
  'earnings': ['earnings', '決算', 'profit', '利益', 'revenue', '売上', 'quarterly', '四半期'],
  'all': [],
};

// カテゴリ表示名
const CATEGORY_NAMES: Record<NewsCategory, string> = {
  'central-bank': '中央銀行',
  'economic': '経済指標',
  'geopolitical': '地政学',
  'earnings': '決算',
  'all': 'すべて',
};

/**
 * ニュースセクションを初期化
 */
export function initNews(): void {
  // フィルターボタンのイベント設定
  setupFilters();

  // ニュース取得
  fetchAllNews();
}

/**
 * フィルターボタンを設定
 */
function setupFilters(): void {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // アクティブクラスの切り替え
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // フィルター適用
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

  container.innerHTML = '<div class="loading">ニュースを読み込み中...</div>';

  try {
    // サンプルニュースを表示（実際のAPIが使えない場合のフォールバック）
    const sampleNews = getSampleNews();
    displayNews(sampleNews);

    // RSS2JSON APIでニュース取得を試みる
    const newsPromises = RSS_FEEDS.map((feed) => fetchRssFeed(feed.url, feed.source, feed.category));
    const results = await Promise.allSettled(newsPromises);

    const allNews: NewsItem[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allNews.push(...result.value);
      }
    });

    if (allNews.length > 0) {
      // 日付でソート（新しい順）
      allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      displayNews(allNews.slice(0, 20));
    }
  } catch (error) {
    console.error('ニュース取得エラー:', error);
    // サンプルニュースを表示
    displayNews(getSampleNews());
  }
}

/**
 * RSSフィードを取得
 */
async function fetchRssFeed(url: string, source: string, defaultCategory: NewsCategory): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${RSS2JSON_API}?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS fetch failed');
    }

    return data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      category: detectCategory(item.title, defaultCategory),
      source: source,
    }));
  } catch (error) {
    console.warn(`RSS取得失敗 (${source}):`, error);
    return [];
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
    <article class="news-item" data-category="${item.category}">
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        <span class="news-category ${item.category}">${CATEGORY_NAMES[item.category]}</span>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
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
  return [
    {
      title: 'FRB、金利据え置きを決定 - インフレ動向を注視',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'central-bank',
      source: 'サンプル',
    },
    {
      title: '日銀、金融政策決定会合で現状維持',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'central-bank',
      source: 'サンプル',
    },
    {
      title: '米雇用統計、予想を上回る強さ',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'economic',
      source: 'サンプル',
    },
    {
      title: 'トヨタ自動車、四半期決算で過去最高益',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'earnings',
      source: 'サンプル',
    },
    {
      title: '中東情勢の緊張、原油価格に影響',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'geopolitical',
      source: 'サンプル',
    },
    {
      title: '消費者物価指数、2ヶ月連続で上昇',
      link: '#',
      pubDate: new Date().toISOString(),
      category: 'economic',
      source: 'サンプル',
    },
  ];
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
