import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import style from './App.module.scss';
import 'antd/dist/antd.css';

import ArticleList from './components/ArticleList';
import ArticleDetailPage from './components/ArticleDetailPage';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { useAppDispatch, useAppSelector } from './hooks';
import { getUser } from './store/slices/authenticationSlice';
import NewArticle from './components/NewArticle';
import EditArticle from './components/EditArticle';
import SpinErr from './components/Error/SpinErr';
import Warning from './components/Error/Warning';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) return <SpinErr />;
  if (error) return <Warning text={error} />;

  return (
    <BrowserRouter>
      {user == null && <Navigate to="/sign-in" />}
      <div className={style.app}>
        <Header />
        <div className={style.app__content}>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/articles/:id/edit" element={<EditArticle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
