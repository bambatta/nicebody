export default (fetch) => ({
  forgotPassword(payload) {
    return fetch("/password/forgot", { body: payload, method: "post" });
  },
  resetPassword(payload) {
    return fetch("/password/reset", { body: payload, method: "post" });
  },
});
