export default (fetch) => ({
    getMenu() {
      return fetch("/menu");
    }
  });