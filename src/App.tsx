import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import style from './App.module.scss';
import 'antd/dist/antd.css';
import ArticleList from './components/ArticleList';
import ArticleDetailPage from './components/ArticleDetailPage';
import Header from './components/Header';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Header />
        <div className={style.app__content}>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
