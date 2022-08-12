import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editArticle, getArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch } from '../../hooks';
import FormArticle from '../FormArticle';

type NewArticleType = {
  title: string;
  description: string;
  body: string;
  cart: {
    name: string;
  }[];
};

const EditArticle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [article, setArticle] = useState<any>();
  const [updatedArticle, setUpdatedArticle] = useState();
  const navigate: any = useNavigate();

  useEffect(() => {
    if (id != null) {
      dispatch(getArticle(id)).then((el) => setArticle(el.payload));
    }
  }, []);

  const onSubmit = (data: NewArticleType) => {
    const { cart, title, description, body } = data;
    const tagList = Object.values(cart).map((el) => el.name);
    const newData = { title, description, body, tagList, id };
    dispatch(editArticle(newData)).then((result: any) => {
      const { slug } = result.payload.article;
      setUpdatedArticle(slug);
    });
  };

  if (updatedArticle) return navigate(`/articles/${updatedArticle}`);

  return (
    <div>
      <FormArticle onSubmit={onSubmit} {...article} componentTitle="Edit article" />
    </div>
  );
};

export default EditArticle;
