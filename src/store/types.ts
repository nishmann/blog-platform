export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface ArticleType {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string;
  title: string;
  updatedAt: string;
}

export interface ArticlesState {
  articles: ArticleType[];
  loading: boolean;
  error: string | null;
}
