import registration from "./registration";
import login from "./login";
import logout from "./logout";
import incomings from "./incomings";
import my from "./my";
import socialite from "./socialite";
import state from "./state";
import suggest from "./suggest";
import variations from "./variations";
import products from "./products";
import carts from "./carts";
import verify from "./verify";
import password from "./password";
import pages from "./pages";
import tracking from "./tracking";
import menu from "./menu";
export default () => {
  const { $apiSettings } = useNuxtApp();
  return {
    registration: registration($apiSettings),
    login: login($apiSettings),
    logout: logout($apiSettings),
    incomings: incomings($apiSettings),
    my: my($apiSettings),
    socialite: socialite($apiSettings),
    state: state($apiSettings),
    suggest: suggest($apiSettings),
    variations: variations($apiSettings),
    products: products($apiSettings),
    carts: carts($apiSettings),
    verify: verify($apiSettings),
    password: password($apiSettings),
    pages: pages($apiSettings),
    tracking: tracking($apiSettings),
    menu: menu($apiSettings),
  };
};
