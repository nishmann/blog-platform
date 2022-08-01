import React from 'react';

import Article from '../Article';
import style from './ArticleList.module.scss';
import { Pagination } from 'antd';

const ArticleList: React.FC = () => {
  return (
    <div className={style.article__list}>
      <Article />
      <Article />
      <Article />
      <div className={style.article__list_pagination}>
        <Pagination size="small" total={50} />
      </div>
    </div>
  );
};

export default ArticleList;
