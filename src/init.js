import onChange from 'on-change';
import * as yup from 'yup';
import render from './render.js';

export default () => {
  const state = {
    fields: {
      url: '',
    },
    error: '',
    oldUrl: [],
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
      url: yup.string().url().nullable().notOneOf(state.oldUrl),
    });
    schema.validate(state.fields).then(() => {
      watchedState.state = 'valid';
      watchedState.state = '';
      watchedState.oldUrl.push(url);
    }).catch((err) => {
      watchedState.error = err;
      watchedState.state = 'invalid';
      watchedState.state = '';
    });
  });
};
