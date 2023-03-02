export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  // const router = useRouter();
  return {
      provide: {
        fbqId: config.public.NUXT_FB_PIXEL_ID,
      },
    };
});
