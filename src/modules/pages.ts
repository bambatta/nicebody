export default (fetch) => ({
    get(payload) {
      return fetch(`/pages/${payload}`);
    },
    
  });
  