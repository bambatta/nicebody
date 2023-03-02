export default (fetch) => ({
    getStatus(payload) {
      return fetch(`/suggest/tracker`, {params: payload});
    },
  });