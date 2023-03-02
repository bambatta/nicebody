export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    checkout: {
      name: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      apartment: "",
      city: "",
      zipcode: "",
    },
  }),

  actions: {
    setCheckout(checkout) {
      this.checkout = checkout;
    },
  },
  getters: {
    getCheckout: (state) => state.checkout,
  },
});
