import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';
import 'antd/dist/antd.css';
import Articles from './components/ArticleList';
import style from './App.module.scss';
import ArticleDetailPage from './components/ArticleDetailPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Header />
        <div className={style.app__content}>
          <Routes>
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
