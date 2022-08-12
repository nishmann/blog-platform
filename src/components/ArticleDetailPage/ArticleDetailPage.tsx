import React, { useEffect, useState } from 'react';
import { Avatar, Button, Tag, Typography, Modal } from 'antd';
import ReactMarkdown from 'react-markdown';
import { ExclamationCircleOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import styleAvatar from '../Article/Article.module.scss';
import style from './ArticleDetailPage.module.scss';
import { deleteArticle, getArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch } from '../../hooks';
import { ArticleType } from '../../store/types';
import { shortText } from '../../utils/shortText';

const { Title, Text } = Typography;
const { confirm } = Modal;

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      dispatch(getArticle(id)).then((el) => setArticle(el.payload));
    }
  }, []);

  const renderElement = (element: ArticleType): any => {
    const { title, body, slug, description, favoritesCount, tagList, updatedAt, author } = element;

    const removeAr = () => {
      dispatch(deleteArticle(slug)).then(() => navigate('/articles'));
    };

    const showDeleteConfirm = () => {
      confirm({
        title: 'Are you sure delete this article?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          removeAr();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    return (
      <div className={style.article__page}>
        <div className={`${styleAvatar.card} ${style.card__not_filter}`}>
          <div className={styleAvatar.card__content}>
            <div className={styleAvatar.card__head}>
              <Link to={`/articles/${slug}`}>
                <h1 className={styleAvatar.card__title}>{title}</h1>
              </Link>
              <button className={styleAvatar.card__btn} type="button">
                <HeartOutlined /> {favoritesCount}
              </button>
            </div>
            <Tag>{tagList}</Tag>
            <div className={style.article__page__desc_block}>
              <p>{shortText(description, 150)}</p>
              <div className={style.article__page__buttons}>
                <Button onClick={showDeleteConfirm} danger>
                  Delete
                </Button>
                <Link to={`/articles/${slug}/edit`}>
                  <Button style={{ borderColor: '#52C41A', color: '#52C41A' }}>Edit</Button>
                </Link>
              </div>
            </div>
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
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    );
  };
  return <div>{article && renderElement(article)}</div>;
};

export default ArticleDetailPage;
