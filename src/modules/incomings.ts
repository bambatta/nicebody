export default (fetch) => ({
    get(payload) {
      return fetch("/incomings", { body: payload, method: "post" });
    },
   /*  getToken() {
      return fetch("/socialite/github/callback?code=beb5340a00222b402835");
    }, */
  });
  