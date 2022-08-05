import React, { useEffect, useState } from 'react';
import { Avatar, Tag, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';

import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import styleAvatar from '../Article/Article.module.scss';
import style from './ArticleDetailPage.module.scss';
import { getArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch } from '../../hooks';
import { ArticleType } from '../../store/types';
import { shortText } from '../../utils/shortText';

const { Title, Text } = Typography;

const ArticleDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id != null) {
      dispatch(getArticle(id)).then((el) => setArticle(el.payload));
    }
  }, []);
  const renderElement = (element: ArticleType) => {
    const { title, body, slug, description, favoritesCount, favorited, tagList, updatedAt, createdAt, author } =
      element;
    return (
      <div className={style.article__page}>
        <div className={`${styleAvatar.card} ${style.card__not_filter}`}>
          <div className={styleAvatar.card__content}>
            <div className={styleAvatar.card__head}>
              <Link to={`/articles/${slug}`}>
                <h1 className={styleAvatar.card__title}>{title}</h1>
              </Link>
              <button className={styleAvatar.card__btn}>
                <HeartOutlined /> {favoritesCount}
              </button>
            </div>
            <Tag>{tagList}</Tag>
            <p>{shortText(description, 150)}</p>
          </div>
          <div className={styleAvatar.card__avatar}>
            <div className={styleAvatar.card__avatar_info}>
              <p>{author.username}</p>
              <Text type="secondary">{format(new Date(updatedAt), 'MMMM d, u')}</Text>
            </div>
            <Avatar icon={<UserOutlined />} />
          </div>
        </div>
        <Title level={3}>{title}</Title>
        <ReactMarkdown children={body} />
      </div>
    );
  };
  return <div>{article && renderElement(article)}</div>;
};

export default ArticleDetailPage;
