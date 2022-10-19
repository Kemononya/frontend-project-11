import onChange from 'on-change';
import * as yup from 'yup';
import i18n from 'i18next';
import ru from './locales/ru.js';
import render from './render.js';

export default () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  const state = {
    fields: {
      url: '',
    },
    error: '',
    addedUrls: [],
    state: '',
  };
  const form = document.querySelector('form.rss-form');
  const watchedState = onChange(state, render(form));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    watchedState.fields.url = url;

    const schema = yup.object().shape({
      url: yup.string().url().nullable().notOneOf(state.addedUrls),
    });
    schema.validate(state.fields).then(() => {
      watchedState.state = 'valid';
      watchedState.state = '';
      watchedState.addedUrls.push(url);
    }).catch((err) => {
      watchedState.error = err;
      watchedState.state = 'invalid';
      watchedState.state = '';
    });
  });
};
