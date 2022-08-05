import React, { useEffect, useState } from 'react';

import { Pagination } from 'antd';
import Article from '../Article';
import style from './ArticleList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles } from '../../store/slices/articlesSlice';

const ArticleList: React.FC = () => {
  const { articles } = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [page]);
  return (
    <div className={style.article__list}>
      {articles.map((article) => {
        return <Article key={article.slug} {...article} />;
      })}
      <div className={style.article__list_pagination}>
        <Pagination onChange={(n) => setPage(n)} size="small" total={50} />
      </div>
    </div>
  );
};

export default ArticleList;
