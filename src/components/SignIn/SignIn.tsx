import React from 'react';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from '../SignUp/SignUp.module.scss';
import { login } from '../../store/slices/authenticationSlice';
import { setToken } from '../../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../../hooks';

const { Title } = Typography;

type FormInputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const navigate: any = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

  const onSubmit = (data: FormInputs) => {
    dispatch(login(data)).then((res: any) => setToken(res.payload.token));
    reset();
  };

  if (user !== null) return navigate('/articles');

  return (
    <div className={style.register}>
      <Title style={{ textAlign: 'center', marginBottom: '21px' }} level={3}>
        Sign In
      </Title>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
          <span className={style.form__label_title}>Password</span>
          <input
            className={style.form__input}
            id="password"
            type="password"
            {...register('password', {
              required: 'Please input your password!',
            })}
            placeholder="Password"
          />
          <div className={style.form__error_text}>{errors.password && <p>{errors.password.message}</p>}</div>
        </label>
        <label className={style.form__submit} htmlFor="submit">
          <input className={style.form__submit_input} id="submit" type="submit" value="Create" />
          <span className={style.form__submit_span}>
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default SignIn;
