import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import style from './App.module.scss';
import 'antd/dist/antd.css';

import ArticleList from './components/ArticleList';
import ArticleDetailPage from './components/ArticleDetailPage';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { useAppDispatch } from './hooks';
import { getUser } from './store/slices/authenticationSlice';
import NewArticle from './components/NewArticle';
import EditArticle from './components/EditArticle';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
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
