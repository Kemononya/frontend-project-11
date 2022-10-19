export default (state, data) => {
  if (data.contents) {
    const parser = new DOMParser();
    console.log(data.contents);
  } else {
    throw new Error(data.status.error.name);
  }
};
