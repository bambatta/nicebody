export default (fetch) => ({
  getProduct() {
    return fetch(`/variation/first`);
  },
  getVariatition(id) {
    return fetch(`/variation/${id}`);
  },
});
