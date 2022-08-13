import React, { useEffect, useState } from 'react';
import { Button, Tag, Typography, Modal } from 'antd';
import ReactMarkdown from 'react-markdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import styleAvatar from '../Article/Article.module.scss';
import style from './ArticleDetailPage.module.scss';
import { deleteArticle, getArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ArticleType } from '../../store/types';
import { shortText } from '../../utils/shortText';
import FavoriteArticle from '../FavoriteArticle';
import avatar from '../../assets/img/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846330.jpg';

const { Title, Text } = Typography;
const { confirm } = Modal;

const ArticleDetailPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.authSlice);
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
    const { title, body, slug, description, favoritesCount, tagList, updatedAt, author, favorited } = element;

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
              <FavoriteArticle slug={slug} favoritesCount={favoritesCount} favorited={favorited} />
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
            <img className={styleAvatar.avatar__logo} src={`${author.image}`} alt={`Avatar ${author.username}`} />
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
