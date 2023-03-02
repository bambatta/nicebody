export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: false,
  }),

  actions: {
    setMenu(menu) {
      this.menu = menu;
    },
  },
  getters: {
    getMenu: (state) => state.menu,
  },
});
