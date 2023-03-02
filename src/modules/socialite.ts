export default (fetch) => ({
    get(payload) {
      return fetch(`/socialite/${payload}`);
    },
  });
  