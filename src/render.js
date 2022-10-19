export default (state, form) => (path, value) => {
  const input = form.elements.url;
  if (path === 'state') {
    if (value === 'invalid') {
      input.classList.add('is-invalid');
    } else if (value === 'valid') {
      input.classList.remove('is-invalid');
      form.reset();
      input.focus();
    }
  }
};
