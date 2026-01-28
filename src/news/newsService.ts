// ========================================
// ニュースサービス（日本語翻訳対応）
// ========================================

// ニュースカテゴリ
export type NewsCategory = 'central-bank' | 'economic' | 'geopolitical' | 'earnings' | 'all';

// ニュースアイテムの型
export interface NewsItem {
  title: string;
  titleJa: string;
  link: string;
  pubDate: string;
  category: NewsCategory;
  source: string;
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

// カテゴリ表示名
const CATEGORY_NAMES: Record<NewsCategory, string> = {
  'central-bank': '中央銀行',
  'economic': '経済指標',
  'geopolitical': '地政学',
  'earnings': '決算',
  'all': 'すべて',
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
      // 日付でソート（新しい順）
      allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      displayNews(allNews.slice(0, 20));
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

      items.push({
        title: item.title,
        titleJa: titleJa,
        link: item.link,
        pubDate: item.pubDate,
        category: detectCategory(item.title + ' ' + titleJa, defaultCategory),
        source: source,
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
        <h3 class="news-title">${escapeHtml(item.titleJa)}</h3>
        ${item.title !== item.titleJa ? `<p class="news-original">${escapeHtml(item.title)}</p>` : ''}
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
  return [
    {
      title: 'Federal Reserve keeps interest rates unchanged',
      titleJa: 'FRB、金利据え置きを決定 - インフレ動向を注視',
      link: '#',
      pubDate: now,
      category: 'central-bank',
      source: 'サンプル',
    },
    {
      title: 'Bank of Japan maintains monetary policy',
      titleJa: '日銀、金融政策決定会合で現状維持',
      link: '#',
      pubDate: now,
      category: 'central-bank',
      source: 'サンプル',
    },
    {
      title: 'US employment data exceeds expectations',
      titleJa: '米雇用統計、予想を上回る強さ',
      link: '#',
      pubDate: now,
      category: 'economic',
      source: 'サンプル',
    },
    {
      title: 'Toyota reports record quarterly profit',
      titleJa: 'トヨタ自動車、四半期決算で過去最高益を更新',
      link: '#',
      pubDate: now,
      category: 'earnings',
      source: 'サンプル',
    },
    {
      title: 'Middle East tensions impact oil prices',
      titleJa: '中東情勢の緊張、原油価格に影響',
      link: '#',
      pubDate: now,
      category: 'geopolitical',
      source: 'サンプル',
    },
    {
      title: 'Consumer Price Index rises for second month',
      titleJa: '消費者物価指数、2ヶ月連続で上昇',
      link: '#',
      pubDate: now,
      category: 'economic',
      source: 'サンプル',
    },
    {
      title: 'Apple announces new AI features',
      titleJa: 'Apple、新しいAI機能を発表',
      link: '#',
      pubDate: now,
      category: 'earnings',
      source: 'サンプル',
    },
    {
      title: 'NVIDIA stock reaches all-time high',
      titleJa: 'NVIDIA株、過去最高値を更新',
      link: '#',
      pubDate: now,
      category: 'earnings',
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
