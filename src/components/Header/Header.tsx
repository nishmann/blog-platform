import React from 'react';

import { Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import avatar from '../../assets/img/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846330.jpg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeToken } from '../../utils/localStorage';
import { deleteUser } from '../../store/slices/authenticationSlice';

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const logOut = () => {
    removeToken();
    dispatch(deleteUser());
  };

  const content = () => {
    if (user !== null) {
      return (
        <div className={style.header__auth}>
          <Link to="/new-article">
            <Button style={{ borderColor: '#52C41A', color: '#52C41A' }} type="primary" ghost>
              Create article
            </Button>
          </Link>
          <Link to="/profile">
            <div className={style.avatar}>
              <p className={style.avatar__name}>{user.username}</p>
              <img
                className={style.avatar__img}
                src={`${user.image ? user.image : avatar}`}
                alt={`Avatar ${user.username}`}
              />
            </div>
          </Link>
          <Link to="/sign-in">
            <Button onClick={() => logOut()} block>
              Log Out
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/new-article">
          <Button style={{ borderColor: '#52C41A', color: '#52C41A' }} type="primary" ghost>
            Create article
          </Button>
        </Link>
        <Link to="sign-in">
          <Button type="link">Sign In</Button>
        </Link>
        <Link to="/sign-up">
          <Button type="primary">Sign Up</Button>
        </Link>
      </div>
    );
  };

  return (
    <div className={style.header}>
      <div className={style.header__inner}>
        <Link to="/articles">
          <h3>Blog Platform</h3>
        </Link>
        {content()}
      </div>
    </div>
  );
};

export default Header;
