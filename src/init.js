import onChange from 'on-change';
import render from './render.js';

export default () => {
  const state = {};
  const watchedState = onChange(state, render);
  const form = document.querySelector('form.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    watchedState.url = formData.get('url');
  });
};
