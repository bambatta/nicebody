export default (fetch) => ({
  getCarts(id) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts`, {
      headers: {
        sCart: id || cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  addCart(id, payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/${id}/add`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  deleteCart(id, payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/${id}/remove`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  updateCart(payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/sync`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  checkout(payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/checkout`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  sentPromocode(payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/promocode/add`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
  removePromocode(payload) {
    let cartId = useCookie("card_id");
    const config = useRuntimeConfig();
    return fetch(`/carts/promocode/remove`, {
      body: payload,
      method: "post",
      headers: {
        sCart: cartId.value,
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    });
  },
});
