import type {
  ApiCategory,
  ApiResponse,
  ArticleDetail,
  MostReadArticle,
  NewsArticle,
  NewsSection,
} from "@/types/news";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://news-api-v2.vercel.app";

async function fetchFromApi<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`API Error ${res.status}: ${res.statusText} at ${endpoint}`);
      return null;
    }

    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success && !json.data) {
      return null;
    }
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<ApiCategory[]> {
  const data = await fetchFromApi<ApiCategory[]>("/api/categories");
  if (!data) return [];
  // Only return scrapable categories for navigation
  return data.filter((cat) => cat.scrapable && !cat.slug.startsWith("/bengali"));
}

export async function getNews(params?: {
  limit?: number;
  offset?: number;
  category?: string;
  q?: string;
}): Promise<NewsArticle[]> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.q) searchParams.set("q", params.q);

  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const data = await fetchFromApi<NewsArticle[]>(`/api/news${query}`);
  if (!data) return [];
  return data.filter((item) => item.type !== "link");
}

export async function getSections(): Promise<NewsSection[]> {
  const data = await fetchFromApi<NewsSection[]>("/api/news/sections");
  if (!data) return [];

  // Filter out any articles with type === 'link' and exclude empty sections
  return data
    .map((section) => ({
      ...section,
      articles: section.articles.filter((art) => art.type !== "link"),
    }))
    .filter((section) => section.articles.length > 0);
}

export async function getMostRead(): Promise<MostReadArticle[]> {
  const data = await fetchFromApi<MostReadArticle[]>("/api/news/most-read");
  if (!data) return [];
  return data.filter((item) => item.type !== "link");
}

export async function getCategoryNews(slug: string): Promise<{ title: string; articles: NewsArticle[] } | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/category/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json.success && !json.data) {
      return null;
    }

    const articles = ((json.data as NewsArticle[]) || []).filter((item) => item.type !== "link");
    return {
      title: json.title || slug,
      articles,
    };
  } catch (error) {
    console.error(`Failed to fetch category ${slug}:`, error);
    return null;
  }
}

export async function getArticle(id: string): Promise<ArticleDetail | null> {
  const data = await fetchFromApi<ArticleDetail>(`/api/article/${encodeURIComponent(id)}`);
  return data;
}
