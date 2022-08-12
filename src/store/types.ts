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

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  email: string;
  username: string;
  password: string;
  image: string;
}

export interface UserResponse {
  username: string;
  email: string;
  password: string;
  token: string;
  bio: string;
  image: string;
}

export type AuthType = {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
};

export type Article = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type ArticleUpdate = {
  id?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  author?: Author;
};

export type ArticleResponse = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: 'string';
    bio: 'string';
    image: 'string';
    following: true;
  };
};
