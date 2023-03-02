<template>
  <div>
    <Head>
      <Meta property="og:url" :content="metaLinkAlternative" />
    </Head>
    <div class="contact">
      <BlocksNavigation />
      <div class="default-page__container">
        <div class="contact-wrapper">
          <h1 class="default-title contact-title">Contacts</h1>
          <NuxtLink
            v-if="store.variables.variables?.site?.email"
            :to="`mailto:${store.variables.variables?.site?.email || ''}`"
            class="default-text_pink"
            >{{ store.variables.variables?.site?.email }}
          </NuxtLink>

          <p class="default-text_black contact-text">
            Have a question? Write us and we will answer soon
          </p>
          <ClientOnly>
            <vee-form @submit="onSubmit" class="default__form">
              <FieldsInput
                placeholder="Name"
                v-model="incomings.name"
                name="name"
              />
              <FieldsInput
                placeholder="E-mail"
                v-model="incomings.email"
                name="email"
              />
              <FieldsTextArea
                placeholder="Message"
                :rows="5"
                v-model="incomings.message"
                name="message"
              />
              <button class="default-btn default-text" type="submit">
                Send
              </button>
            </vee-form>
          </ClientOnly>
          <div class="popup__bg" v-if="popapSuccess || popapFail">
            <div v-if="popapSuccess" class="popap-img">
              <BaseImage
                src="/images/check-green.webp"
                customClass="checkout-img"
              />
            </div>
            <div v-else class="popap-img">
              <BaseImage src="/images/failed.webp" customClass="checkout-img" />
            </div>
            <span v-if="popapSuccess"> The message has been sent</span>
            <span v-else>Message not send</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let store = $store();
const config = useRuntimeConfig();
let incomings = ref({ name: "", email: "", message: "", type: "contacts" });
let load = ref(false);
let metaLinkAlternative = ref("");
let popapFail = ref(false),
  popapSuccess = ref(false);
function deletePopapSuccess() {
  popapSuccess.value = true;
  setTimeout(() => {
    popapSuccess.value = false;
  }, 3000);
}
function deletePopapFail() {
  popapFail.value = true;
  setTimeout(() => {
    popapFail.value = false;
  }, 3000);
}

async function onSubmit(val, actions) {
  try {
    const { data } = await $api().incomings.get(incomings.value);
    incomings.value = { name: "", email: "", message: "", type: "contacts" };
    deletePopapSuccess();
  } catch (e) {
    deletePopapFail();
    actions.setErrors(e.data.errors);
  }
}
const {
  data: data,
  pending,
  error,
  refresh,
} = await useAsyncData("contacts", () =>
  $fetch(config.API_BASE_URL + "/pages/contacts", {
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
    { property: "fb:app_id", content:data.value.seo.fb_app_id},
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
