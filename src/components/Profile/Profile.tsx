import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from '../SignUp/SignUp.module.scss';

const { Title } = Typography;

type FormInputs = {
  username: string;
  email: string;
  password: string;
  avatarImg: string;
};

const Profile: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

  const onSubmit = (data: object): any => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className={style.register}>
      <Title style={{ textAlign: 'center', marginBottom: '21px' }} level={3}>
        Edit Profile
      </Title>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.form__label} htmlFor="username">
          <span className={style.form__label_title}>Username</span>
          <input
            className={style.form__input}
            id="username"
            {...register('username', {
              required: 'Please input your username!',
            })}
            placeholder="Username"
          />
          <div className={style.form__error_text}>{errors.username && <p>{errors.username.message}</p>}</div>
        </label>
        <label className={style.form__label} htmlFor="email">
          <span className={style.form__label_title}>Email address</span>
          <input
            className={style.form__input}
            {...register('email', {
              required: 'Please input your email!',
            })}
            type="email"
            placeholder="Email address"
            id="email"
          />
          <div className={style.form__error_text}>{errors.email && <p>{errors.email.message}</p>}</div>
        </label>
        <label className={style.form__label} htmlFor="password">
          <span className={style.form__label_title}>New password</span>
          <input
            className={style.form__input}
            id="password"
            type="password"
            {...register('password', {
              required: 'Please input your password!',
              minLength: {
                value: 6,
                message: '6 characters minimum',
              },
              maxLength: {
                value: 40,
                message: '40 character maximum',
              },
            })}
            placeholder="Password"
          />
          <div className={style.form__error_text}>{errors.password && <p>{errors.password.message}</p>}</div>
        </label>
        <label className={style.form__label} htmlFor="avatar">
          <span className={style.form__label_title}>Avatar image (url)</span>
          <input
            className={style.form__input}
            id="avatar"
            type="url"
            {...register('avatarImg', {
              required: 'Please input your avatar image!',
            })}
            placeholder="Avatar image"
          />
          <div className={style.form__error_text}>{errors.avatarImg && <p>{errors.avatarImg.message}</p>}</div>
        </label>
        <label className={style.form__submit} htmlFor="submit">
          <input className={style.form__submit_input} id="submit" type="submit" value="Save" />
        </label>
      </form>
    </div>
  );
};

export default Profile;
