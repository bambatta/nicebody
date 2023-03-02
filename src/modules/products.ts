export default (fetch) => ({
  getReview(id, payload) {
    return fetch(`/products/${id}/comments`, {
      params: {
    ...payload
      },
    });
  },
  sentReview(id, payload) {
    return fetch(`/products/${id}/comments`, { body: payload, method: "post" });
  },
});
