export default (fetch) => ({
  get(payload) {
    return fetch("/logout", {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "Authorization": `Bearer ${payload}`,
      },
      method: "post",
    });
  },
});
