import { useCartStore } from "./cart";
import { useCheckoutStore } from "./checkout";
import { useMenuStore } from "./menu";
import { useOrderStore } from "./order";
import { useVariablesStore } from "./variables";
export default () => {
  return {
    cart: useCartStore(),
    checkout: useCheckoutStore(),
    menu: useMenuStore(),
    order: useOrderStore(),
    variables: useVariablesStore(),
  };
};
