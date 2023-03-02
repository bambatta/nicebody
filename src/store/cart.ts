export const useCartStore = defineStore("cart", {
  state: () => ({
    cartActive: true,
    cart: [],
    /*  cartId: "", */
    cartQuantity: 0,
    cartShipping: 0,
  }),

  actions: {
    setCartActive(cartActive) {
      this.cartActive = cartActive;
      document.body.classList.toggle("active");

    },
    async setCart(id) {
      let CardIdCookie = useCookie("card_id");
      let totalPriceCookie = useCookie("total_price");
      try {
        const data = await $api().carts.getCarts(id);
        this.cart = data;
        this.cartQuantity = data.total.quantity;
        this.cartShipping = data.total.delivery;
        totalPriceCookie.value = data.total.total;
        if (data.data.cart_id) {
          CardIdCookie.value = data.data.cart_id;
        }
      } catch (e) {
        this.cart = [];
        this.cartQuantity = 0;
      }
    },
    /*   setCartId(cartId) {
      this.cartId = cartId;
    }, */
  },
  getters: {
    getCartActive: (state) => state.cartActive,
    getCart: (state) => state.cart,
    /*  getCartId: (state) => state.cartId, */
  },
});
