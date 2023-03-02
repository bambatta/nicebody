export const useVariablesStore = defineStore("variables", {
    state: () => ({
      variables: null,
    }),
  
    actions: {
      setVariables(variables) {
        this.variables = variables;
      },
    },
    getters: {
      getVariables: (state) => state.variables,
    },
  });
  