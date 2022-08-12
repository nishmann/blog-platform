import React, { useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import styleAvatar from '../Article/Article.module.scss';
import { useAppDispatch } from '../../hooks';
import { getToken } from '../../utils/localStorage';
import { disLikeArticle, likeArticle } from '../../store/slices/articlesSlice';

type FavoriteTypes = {
  slug: string;
  favoritesCount: number;
  favorited: boolean;
};

const FavoriteArticle: React.FC<FavoriteTypes> = ({ favoritesCount, slug, favorited }) => {
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    setLike(favorited);
    setCountLike(favoritesCount);
  }, []);

  const renderLike = () => {
    if (token) {
      if (like) {
        dispatch(disLikeArticle(slug)).then((el) => {
          const { favorited, favoritesCount } = el.payload.article;
          setLike(favorited);
          setCountLike(favoritesCount);
        });
      }
      dispatch(likeArticle(slug)).then((el) => {
        const { favorited, favoritesCount } = el.payload.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      });
    }
  };

  return (
    <button className={styleAvatar.card__btn} type="button" onClick={renderLike}>
      {like ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} {countLike}
    </button>
  );
};

export default FavoriteArticle;
