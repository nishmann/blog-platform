import React from 'react';
import { Checkbox, Typography } from 'antd';
import { Link } from 'react-router-dom';

import style from './SignUp.module.scss';

const { Title } = Typography;

const SignUp: React.FC = () => {
  return (
    <div className={style.register}>
      <Title style={{ textAlign: 'center', marginBottom: '21px' }} level={3}>
        Create new account
      </Title>
      <form className={style.form}>
        <label className={style.form__label}>
          <span className={style.form__label_title}>Username</span>
          <input className={style.form__input} placeholder="Username" />
        </label>
        <label className={style.form__label}>
          <span className={style.form__label_title}>Email address</span>
          <input className={style.form__input} placeholder="Email address" />
        </label>
        <label className={style.form__label}>
          <span className={style.form__label_title}>Password</span>
          <input className={style.form__input} placeholder="Password" />
        </label>
        <label className={style.form__label}>
          <span className={style.form__label_title}>Repeat Password</span>
          <input className={style.form__input} placeholder="Repeat Password" />
        </label>
        <label className={style.form__checkbox}>
          <Checkbox />
          <span className={style.form__checkbox_text}>I agree to the processing of my personal information</span>
        </label>
        <label className={style.form__submit}>
          <input className={style.form__submit_input} type="submit" value="Create" />
          <span className={style.form__submit_span}>
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default SignUp;
