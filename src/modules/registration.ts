export default (fetch) => ({
  get(payload) {
    return fetch("/register", { body: payload, method: "post" });
  },
});
