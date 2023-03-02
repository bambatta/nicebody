<template>
  <div>
    <Head>
      <Meta property="og:url" :content="metaLinkAlternative" />
    </Head>
    <main class="static-page__wrapper">
      <div class="container">
        <BlocksNavigation />

        <WrapperLoad v-model="load">
          <div class="default__static-page static-page">
            <h1 class="default-title">{{ data.data.name }}</h1>
            <div v-html="data.data.body" class="static-page__body"></div>
          </div>
        </WrapperLoad>
      </div>
    </main>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
let metaLinkAlternative = ref("");
let load = ref(false);

const {
  data: data,
  pending,
  error,
  refresh,
} = await useAsyncData("about", () =>
  $fetch(config.API_BASE_URL + "/pages/about", {
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      sHost: config.public.API_DOMAIN,
      sLocale: "en",
    },
  })
);
useHead({
  title: data.value.seo.title,
  meta: [
    { property: "og:image", content: data.value.seo.og_image },
    { property: "fb:app_id", content: data.value.seo.fb_app_id },
    { property: "og:description", content: data.value.seo.og_description },
    { property: "og:locale", content: data.value.seo.og_locale },
    { property: "og:site_name", content: data.value.seo.og_site_name },
    { property: "og:title", content: data.value.seo.og_title },
    { property: "og:type", content: data.value.seo.og_type },
    { name: "description", content: data.value.seo.description },
    { name: "twitter:title", content: data.value.seo.twitter_title },
    {
      name: "twitter:description",
      content: data.value.seo.twitter_description,
    },
  ],
});
onMounted(async () => {
  refresh();
  metaLinkAlternative.value = window.location.href;
});
</script>
