export default (fetch) => ({
  get(payload) {
    return fetch("/verify", { body: payload, method: "post" });
  },
  resend(payload) {
    return fetch("/verify/resend", { body: payload, method: "post" });
  },
});
