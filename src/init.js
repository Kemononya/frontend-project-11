import onChange from 'on-change';
import * as yup from 'yup';
import i18n from 'i18next';
import axios from 'axios';
import ru from './locales/ru.js';
import render from './render.js';
import parser from './parser.js';

export default () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources: {
      ru,
    },
  });

  const state = {
    fields: {
      url: '',
    },
    feeds: [
      {
        id: 1,
        title: '',
        description: '',
      },
    ],
    posts: [
      {
        feedId: 1,
        title: '',
        description: '',
        link: '',
      },
    ],
    error: '',
    addedUrls: [],
    state: '',
  };
  const form = document.querySelector('form.rss-form');
  const watchedState = onChange(state, render(state, form));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.fields.url = url;

    const schema = yup.object().shape({
      url: yup.string().url().nullable().notOneOf(state.addedUrls),
    });
    schema.validate(state.fields)
      .then(() => {
        const modifiedUrl = `${i18nInstance.t('proxy')}${encodeURIComponent(url)}`;
        return axios.get(modifiedUrl);
      })
      .then((response) => parser(watchedState, response.data))
      .then(() => {
        watchedState.state = 'valid';
        state.state = '';
        state.addedUrls.push(url);
        console.log(state);
      })
      .catch((err) => {
        watchedState.state = 'invalid';
        state.state = '';
        watchedState.error = err;
        console.log(state);
      });
  });
};
