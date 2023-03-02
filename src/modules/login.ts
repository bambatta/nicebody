export default (fetch) => ({
    get(payload) {
      return fetch("/login", { body: payload, method: "post" });
    },
  });
  