import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticlesState } from '../types';

export const fetchArticles = createAsyncThunk('articles/fetchArticlesStatus', async (page: number) => {
  const { data } = await axios.get(`https://blog.kata.academy/api/articles?limit=10&offset=${page}`);
  return data.articles;
});

export const getArticle = createAsyncThunk('articles/getArticle', async (id: string) => {
  const { data } = await axios.get(`https://blog.kata.academy/api/articles/${id}`);
  return data.article;
});

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

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
