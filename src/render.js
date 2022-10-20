export default (state, form, i18n) => (path, value) => {
  if (path === 'state') {
    const input = form.elements.url;
    if (value === 'invalid') {
      input.classList.add('is-invalid');
    } else if (value === 'valid') {
      input.classList.remove('is-invalid');
      form.reset();
      input.focus();
    }
  }
  if (path === 'feeds') {
    const feedsContainer = document.querySelector('.feeds');
    feedsContainer.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('card', 'border-0');
    feedsContainer.append(container);
    const cardBody = `<div class="card-body"><h2 class="card-title h4">${i18n.t('feeds')}</h2></div>`;
    container.innerHTML = cardBody;

    const list = document.createElement('ul');
    list.classList.add('list-group', 'border-0', 'rounded-0');
    container.append(list);
    state.feeds.forEach((feed) => {
      const listEl = document.createElement('li');
      listEl.classList.add('list-group-item', 'border-0', 'border-end-0');
      list.append(listEl);

      const title = document.createElement('h3');
      title.classList.add('h6', 'm-0');
      title.textContent = feed.title;
      listEl.append(title);

      const description = document.createElement('p');
      description.classList.add('m-0', 'small', 'text-black-50');
      description.textContent = feed.description;
      listEl.append(description);
    });
  }
  if (path === 'posts') {
    const postsContainer = document.querySelector('.posts');
  }
};
