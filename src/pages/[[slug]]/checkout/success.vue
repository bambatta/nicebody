<template>
  <div>

    <Head>
      <Title>NICEBODY - Success</Title>
      <Meta
        property="fb:app_id"
        :content="store.variables.variables?.seo?.fb_app_id"
      />
    </Head>
    <div class="checkout-page">
      <WrapperLoad v-model="load">
        <div class="default-page__container">
          <div class="checkout__form-submit">
            <NuxtLink to="/">
              <BaseImage src="/images/logo.svg" customClass="checkout-logo" />
            </NuxtLink>
            <div class="checkout-img__wrapper">
              <BaseImage
                src="/images/check-green.webp"
                customClass="checkout-img"
              />
            </div>
            <h3 class="default-title status">Thanks!</h3>
            <p class="default-text_black">
              Payment in the amount of ${{ totalPrice }} was successful
            </p>
            <NuxtLink to="/" class="checkout__status-btn default-text"
              >Ok</NuxtLink
            >
          </div>
        </div>
        <!--  <hr />
      <p class="default-text_grey checkout-copyright">
        Copyright © 2022, Pencus store
      </p> -->
      </WrapperLoad>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "checkout",
});
let load = ref(false);
let store = $store();
let totalPrice = useCookie("total_price");
</script>