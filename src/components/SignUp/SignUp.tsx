import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from './SignUp.module.scss';

const { Title } = Typography;

type FormInputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    reset,
    watch,
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
        Create new account
      </Title>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.form__label} htmlFor="username">
          <span className={style.form__label_title}>Username</span>
          <input
            className={style.form__input}
            id="username"
            {...register('username', {
              required: 'Please input your username!',
              minLength: {
                value: 3,
                message: '3 characters minimum',
              },
              maxLength: {
                value: 20,
                message: '20 character maximum',
              },
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
          <span className={style.form__label_title}>Password</span>
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
        <label className={style.form__label} htmlFor="RepeatPassword">
          <span className={style.form__label_title}>Repeat Password</span>
          <input
            className={style.form__input}
            id="RepeatPassword"
            type="password"
            {...register('repeatPassword', {
              validate: (value: string) => {
                if (watch('password') !== value) {
                  return 'The passwords do not match';
                }
              },
              required: 'Please input your repeatPassword!',
              minLength: {
                value: 6,
                message: '6 characters minimum',
              },
              maxLength: {
                value: 40,
                message: '40 character maximum',
              },
            })}
            placeholder="Repeat Password"
          />
          <div className={style.form__error_text}>
            {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
          </div>
        </label>
        <label className={style.form__checkbox} htmlFor="checkbox">
          <div className={style.form__checkbox}>
            <input type="checkbox" required id="checkbox" />
            <span className={style.form__checkbox_text}>I agree to the processing of my personal information</span>
          </div>
        </label>
        <label className={style.form__submit} htmlFor="submit">
          <input className={style.form__submit_input} id="submit" type="submit" value="Create" />
          <span className={style.form__submit_span}>
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default SignUp;
