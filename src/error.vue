<template>
  <div>
    <BaseHeader />
    <div class="error">
        <BlocksNavigation />
      <div class="error__wrapper">
        <div class="error__content">
          <img src="/images/404.webp" alt="Error" class="error-img" />
          <p class="error__content-text">Page not found</p>
          <NuxtLink to="/" class="default-btn default-text">Go home</NuxtLink>
          <button @click="router.go(-1)" class="default-btn_border">
            Go back
          </button>
        </div>
      </div>
    </div>
    <BaseFooter />
  </div>
</template>
  
  <script setup>
const route = useRoute();
const router = useRouter();
const props = defineProps({
  error: Object,
});
useHead({
  title: `ITS - ${
    props.error.statusCode == 404 || props.error.statusCode == 500
      ? "404"
      : props.error.statusCode
  }`,
});
</script>
  