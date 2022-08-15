import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { editArticle, getArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormArticle from '../FormArticle';
import SpinErr from '../Error/SpinErr';
import Warning from '../Error/Warning';
import ErrorInternet from '../Error/ErrorInternet';

type NewArticleType = {
  title: string;
  description: string;
  body: string;
  cart: {
    name: string;
  }[];
};

const EditArticle: React.FC = () => {
  const { user, error, loading } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [article, setArticle] = useState<any>();
  const [updatedArticle, setUpdatedArticle] = useState();
  const navigate: any = useNavigate();

  useEffect(() => {
    if (id != null) {
      dispatch(getArticle(id))
        .then((el) => setArticle(el.payload))
        .catch((e) => <Warning text={e.message} />);
    }
  }, []);

  if (loading) return <SpinErr />;
  if (error) return <Warning text={error} />;

  const onSubmit = (data: NewArticleType) => {
    const { cart, title, description, body } = data;
    const tagList = Object.values(cart).map((el) => el.name);
    const newData = { title, description, body, tagList, id };
    dispatch(editArticle(newData))
      .then((result: any) => {
        const { slug } = result.payload.article;
        setUpdatedArticle(slug);
      })
      .catch(() => <ErrorInternet />);
  };

  if (user == null) return <Navigate to="/sign-in" />;
  if (updatedArticle) return navigate(`/articles/${updatedArticle}`);

  return (
    <div>
      <FormArticle onSubmit={onSubmit} {...article} componentTitle="Edit article" />
    </div>
  );
};

export default EditArticle;
