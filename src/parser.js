import uniqueId from 'lodash/uniqueId';

export default (state, data) => {
  if (data.contents) {
    const parser = new DOMParser();
    const document = parser.parseFromString(data.contents, 'text/xml');

    const id = uniqueId();
    const chaTitle = document.querySelector('channel > title').textContent;
    const chaDescription = document.querySelector('channel > description').textContent;
    state.feeds.push({
      id, title: chaTitle, description: chaDescription,
    });

    const items = document.querySelectorAll('item');
    items.forEach((item) => {
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;
      const postId = uniqueId();
      state.posts.push({
        feedId: id, id: postId, title, description, link,
      });
    });
    state.newFeed = id;
  } else {
    throw new Error(data.status.error.name);
  }
};
