export default (fetch) => ({
    getState() {
      return fetch(`/state`);
    },
  });
  