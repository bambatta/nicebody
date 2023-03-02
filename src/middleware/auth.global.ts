export default defineNuxtRouteMiddleware((to, from) => {
  const config = useRuntimeConfig();
  const access_token = useCookie("access_token");
  $fetch.create({
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${access_token.value}`,
      sHost: config.public.API_DOMAIN,
      sLocale: 'en'
    },
  });

  if (!access_token.value && to.path !== "/") {
    /* return navigateTo("/"); */
  }
});
