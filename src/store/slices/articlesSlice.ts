import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Article, ArticlesState, ArticleType } from '../types';
import { getToken } from '../../utils/localStorage';

const token = `Token ${getToken()}`;

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticlesStatus', async (page: number) => {
  const { data } = await axios.get(`https://blog.kata.academy/api/articles?limit=10&offset=${page}`);
  return data.articles;
});

export const getArticle = createAsyncThunk('articles/getArticle', async (id: string) => {
  const { data } = await axios.get(`https://blog.kata.academy/api/articles/${id}`);
  return data.article;
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug: string) => {
  await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
    headers: {
      Authorization: token,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

export const createArticle = createAsyncThunk('articles/create', async (data: Article): Promise<ArticleType> => {
  const { title, description, body, tagList } = data;
  const res = await axios.post(
    'https://blog.kata.academy/api/articles',
    {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
    {
      headers: {
        Authorization: token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  return res.data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticles.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchArticles.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    [fetchArticles.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default articlesSlice.reducer;
