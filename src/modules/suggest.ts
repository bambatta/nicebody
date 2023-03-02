export default (fetch) => ({
  getCountry(payload) {
    return fetch(`/suggest/countries`, {
      params: {
        ...payload,
      },
    });
  },
  getSocialite() {
    return fetch(`/suggest/variables`);
  },
  getPayments() {
    return fetch(`/suggest/payments`);
  },
});
