import onChange from 'on-change';
import * as yup from 'yup';
import render from './render.js';

export default () => {
  const state = {
    fields: {
      url: '',
    },
    oldUrl: [],
    state: 'invalid',
  };
  const schema = yup.object().shape({
    url: yup.string().url().nullable(),
  });
  const form = document.querySelector('form.rss-form');
  const watchedState = onChange(state, render(form));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    watchedState.fields.url = url;
    schema.validate(state.fields).then(() => {
      watchedState.state = 'valid';
      watchedState.oldUrl.push(url);
    }).catch(() => {
      watchedState.state = 'invalid';
    });
  });
};
