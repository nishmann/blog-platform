import React from 'react';
import './App.module.scss';
import 'antd/dist/antd.css';
import Articles from './components/Articles';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.app}>
      <div className={style.app__content}>
        <Articles />
      </div>
    </div>
  );
}

export default App;
