import React from 'react';

import { Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <div className={style.header__inner}>
        <Link to="/articles">
          <h3>Blog Platform</h3>
        </Link>
        <div>
          <Button type="link">Sign In</Button>
          <Button type="primary">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
