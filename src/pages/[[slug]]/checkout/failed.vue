<template>
  <div>
    <Head>
      <Title>NICEBODY - Failed</Title>
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
            <div v-if="!status" class="checkout-img__wrapper failed">
              <BaseImage src="/images/failed.webp" customClass="checkout-img" />
            </div>
            <h3 v-if="!status" class="default-title status failed">Failed!</h3>
            <p v-if="!status" class="default-text_black">Your payment failed</p>
            <div v-if="!status" class="checkout__wrapper-btn">
              <!--   <button class="default-btn default-text">Try again</button> -->
              <NuxtLink to="/contact" class="default-btn_border default-text"
                >Contact us</NuxtLink
              >
            </div>
          </div>
        </div>
        <!--       <hr />
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
let store = $store();
</script>