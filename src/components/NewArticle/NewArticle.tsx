import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { createArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormArticle from '../FormArticle';

type NewArticleType = {
  title: string;
  description: string;
  body: string;
  cart: {
    name: string;
  }[];
};

const NewArticle: React.FC = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const navigate: any = useNavigate();
  const [newArticle, setNewArticle] = useState<any>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: NewArticleType) => {
    const { cart, title, description, body } = data;
    const tagList = Object.values(cart).map((el) => el.name);
    const newData = { title, description, body, tagList };
    dispatch(createArticle(newData)).then((result: any) => {
      const { slug } = result.payload.article;
      setNewArticle(slug);
    });
  };

  if (user == null) return <Navigate to="/sign-in" />;
  if (newArticle) return navigate(`/articles/${newArticle}`);

  return (
    <div>
      <FormArticle onSubmit={onSubmit} {...newArticle} componentTitle="Create new article" />
    </div>
  );
};

export default NewArticle;
