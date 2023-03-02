export default (fetch) => ({
  getProfile(token) {
 
    const access_token = useCookie("access_token");
    return fetch("/my/profile", {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${access_token.value ? access_token.value : token}`,
      },
    });
  },
  getShipping() {
    return fetch("/my/shipping");
  },
  getOrder() {
    return fetch("/my/orders");
  },

  updateProfile(payload) {
    return fetch("/my/profile", { body: payload, method: "post" });
  },
  updateShipping(payload) {
    return fetch("/my/shipping", { body: payload, method: "post" });
  },
  deleteOrder(id) {
    return fetch(`/my/orders/${id}/canceled`, { method: "post" });
  },
});
