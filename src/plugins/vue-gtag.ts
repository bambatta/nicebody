import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  if (config.public.GA_TRACKING_ID) {
    nuxtApp.vueApp.use(VueGtag, {
      config: {
        id: config.public.GA_TRACKING_ID,
      },
    }, nuxtApp.$router);
  }
});
