import React from 'react';
import { Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import style from './Article.module.scss';
import { ArticleType } from '../../store/types';
import { shortText } from '../../utils/shortText';
import FavoriteArticle from '../FavoriteArticle';

const { Text } = Typography;

const Article: React.FC<ArticleType> = ({
  title,
  favoritesCount,
  favorited,
  slug,
  tagList,
  author,
  description,
  updatedAt,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card__content}>
        <div className={style.card__head}>
          <Link to={`/articles/${slug}`}>
            <h1 className={style.card__title}>{title}</h1>
          </Link>
          <FavoriteArticle slug={slug} favoritesCount={favoritesCount} favorited={favorited} />
        </div>
        <Tag>{tagList}</Tag>
        <p>{shortText(description, 150)}</p>
      </div>
      <div className={style.card__avatar}>
        <div className={style.card__avatar_info}>
          <p>{author.username}</p>
          <Text type="secondary">{format(new Date(updatedAt), 'MMMM d, u')}</Text>
        </div>
        <img className={style.avatar__logo} src={`${author.image}`} alt={`Avatar ${author.username}`} />
      </div>
    </div>
  );
};

export default Article;
