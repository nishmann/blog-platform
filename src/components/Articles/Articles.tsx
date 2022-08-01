import React from 'react';
import Article from '../Article';
import style from './Articles.module.scss';

const Articles: React.FC = () => {
  return (
    <div className={style.article__list}>
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
  );
};

export default Articles;
