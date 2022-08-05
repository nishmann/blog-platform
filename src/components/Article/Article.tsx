import React from 'react';
import { Avatar, Tag, Typography } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import style from './Article.module.scss';
import { ArticleType } from '../../store/types';
import { shortText } from '../../utils/shortText';

const { Text } = Typography;

const Article: React.FC<ArticleType> = ({
  title,
  favoritesCount,
  favorited,
  slug,
  tagList,
  author,
  createdAt,
  description,
  updatedAt,
  body,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card__content}>
        <div className={style.card__head}>
          <Link to={`/articles/${slug}`}>
            <h1 className={style.card__title}>{title}</h1>
          </Link>
          <button className={style.card__btn}>
            <HeartOutlined /> {favoritesCount}
          </button>
        </div>
        <Tag>{tagList}</Tag>
        <p>{shortText(description, 150)}</p>
      </div>
      <div className={style.card__avatar}>
        <div className={style.card__avatar_info}>
          <p>{author.username}</p>
          <Text type="secondary">{format(new Date(updatedAt), 'MMMM d, u')}</Text>
        </div>
        <Avatar icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Article;