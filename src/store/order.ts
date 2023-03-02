export const useOrderStore = defineStore("order", {
    state: () => ({
      order: false,
    }),
  
    actions: {
      setOrder(order) {
        this.order = order;
      },
    },
    getters: {
      getOrder: (state) => state.order,
    },
  });
  