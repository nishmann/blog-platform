import React from 'react';
import { Avatar, Tag, Typography } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';

import style from './Article.module.scss';

const { Text } = Typography;

const Article: React.FC = () => {
  return (
    <div className={style.card}>
      <div className={style.card__content}>
        <div className={style.card__head}>
          <h1 className={style.card__title}>Some article title</h1>
          <button className={style.card__btn}>
            <HeartOutlined /> 12
          </button>
        </div>
        <Tag>Tag1</Tag>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.{' '}
        </p>
      </div>
      <div className={style.card__avatar}>
        <div className={style.card__avatar_info}>
          <p>John Doe</p>
          <Text type="secondary">March 5, 2020 </Text>
        </div>
        <Avatar icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Article;
