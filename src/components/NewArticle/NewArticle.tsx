import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import style from './NewArticle.module.scss';
import styleInput from '../SignUp/SignUp.module.scss';
import { createArticle } from '../../store/slices/articlesSlice';
import { useAppDispatch } from '../../hooks';

const { Title } = Typography;

type NewArticleType = {
  title: string;
  description: string;
  body: string;
  cart: {
    name: string;
  }[];
};

const NewArticle: React.FC = () => {
  const navigate: any = useNavigate();
  const [newArticle, setNewArticle] = useState();
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewArticleType>({ defaultValues: { cart: [{ name: '' }] }, mode: 'onBlur' });
  const { fields, append, remove } = useFieldArray({ name: 'cart', control });

  const onSubmit = (data: NewArticleType) => {
    const { cart, title, description, body } = data;
    const tagList = Object.values(cart).map((el) => el.name);
    const newData = { title, description, body, tagList };
    dispatch(createArticle(newData)).then((result: any) => {
      const { slug } = result.payload.article;
      setNewArticle(slug);
    });
  };

  if (newArticle) return navigate(`/articles/${newArticle}`);

  return (
    <div className={style.new_article}>
      <div className={style.new_article__inner}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Create new article
        </Title>
        <form className={styleInput.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styleInput.form__label} htmlFor="title">
            <span className={styleInput.form__label_title}>Title</span>
            <input
              className={styleInput.form__input}
              {...register('title', {
                required: 'Title должен быть не менее 6 и не более 20 символов',
                minLength: {
                  value: 6,
                  message: '6 characters minimum',
                },
                maxLength: {
                  value: 60,
                  message: '60 character maximum',
                },
              })}
              id="title"
              placeholder="Title"
            />
            <div className={styleInput.form__error_text}>{errors.title && <p>{errors.title.message}</p>}</div>
          </label>
          <label className={styleInput.form__label} htmlFor="shortDescription">
            <span className={styleInput.form__label_title}>Short description</span>
            <input
              className={styleInput.form__input}
              {...register('description', {
                required: 'Description должен быть не менее 6 и не более 150 символов',
                minLength: {
                  value: 6,
                  message: '6 characters minimum',
                },
                maxLength: {
                  value: 150,
                  message: '150 character maximum',
                },
              })}
              id="shortDescription"
              placeholder="short description"
            />
            <div className={styleInput.form__error_text}>
              {errors.description && <p>{errors.description.message}</p>}
            </div>
          </label>
          <label className={styleInput.form__label} htmlFor="description">
            <span className={styleInput.form__label_title}>Description</span>
            <textarea
              className={`${styleInput.form__input} ${style.new_article__textArea}`}
              {...register('body', {
                required: 'Description должен быть не менее 6 и не более 1500 символов',
                minLength: {
                  value: 6,
                  message: '6 characters minimum',
                },
                maxLength: {
                  value: 5000,
                  message: '5000 character maximum',
                },
              })}
              id="description"
              placeholder="description"
            />
            <div className={styleInput.form__error_text}>{errors.body && <p>{errors.body.message}</p>}</div>
          </label>
          <label className={styleInput.form__label} htmlFor="tags">
            <span className={styleInput.form__label_title}>Tags</span>
            <div className={style.new_article__tags_wrapper}>
              <div className={style.new_article__tags}>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className={style.new_article__tags_inner} key={field.id}>
                        <input
                          className={`${styleInput.form__input} ${style.new_article__tags_input}`}
                          placeholder="tag"
                          {...register(`cart.${index}.name` as const, {
                            required: true,
                          })}
                          defaultValue={field.name}
                        />
                        <Button danger onClick={() => remove(index)}>
                          Delete
                        </Button>
                      </section>
                    </div>
                  );
                })}
              </div>
              <div className={style.new_article__tags_add}>
                <Button type="primary" ghost onClick={() => append({ name: '' })}>
                  Add tag
                </Button>
              </div>
            </div>
          </label>
          <label htmlFor="send">
            <input className={style.new_article__submit} type="submit" value="Send" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
