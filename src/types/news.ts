export interface ApiCategory {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export type ArticleType = "article" | "video" | "link";

export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  type: ArticleType;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
  rank?: number;
}

export interface NewsSection {
  title: string;
  curationId?: string;
  count: number;
  articles: NewsArticle[];
}

export interface MostReadArticle extends NewsArticle {
  rank: number;
}

export interface BodyBlockImage {
  type: "image";
  url: string;
  width?: number;
  height?: number;
  caption?: string | null;
  altText?: string | null;
  copyrightHolder?: string | null;
}

export interface BodyBlockText {
  type: "text";
  text: string;
}

export interface BodyBlockSubheading {
  type: "subheading";
  text: string;
}

export interface BodyBlockList {
  type: "list";
  items?: string[];
  ordered?: boolean;
}

export interface BodyBlockQuote {
  type: "quote";
  text?: string;
  citation?: string;
}

export interface BodyBlockOther {
  type: string;
  [key: string]: unknown;
}

export type BodyBlock =
  | BodyBlockImage
  | BodyBlockText
  | BodyBlockSubheading
  | BodyBlockList
  | BodyBlockQuote
  | BodyBlockOther;

export interface ArticleTopic {
  id: string;
  name: string;
}

export interface ArticleDetail {
  id: string;
  title: string;
  description: string | null;
  link: string;
  firstPublished: string | null;
  lastPublished: string | null;
  byline: string | null;
  topics: ArticleTopic[];
  tags: string[];
  imageUrl: string | null;
  body: BodyBlock[];
  text?: string;
  wordCount?: number;
  source: string;
  sourceUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  total?: number;
  cachedAt?: string;
  data: T;
}
