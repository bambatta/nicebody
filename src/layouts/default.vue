<template>
  <div class="page-wrapper">
    <BaseHeader />
    <BaseCart />
    <slot />
    <BaseFooter />
  </div>
</template>
<script setup>
let store = $store(),
  route = useRoute();
const { $fbqId } = useNuxtApp();
const router = useRouter();
onUpdated(async () => {
  if (!route.params.slug && !route.hash) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  }
});
onMounted(() => {
  if ($fbqId) {
    fbq("init", $fbqId);
  }
});



router.afterEach((to, from) => {
  if ($fbqId) {
    fbq("track", "PageView");
  }
});
</script>
<style lang="scss">


</style>
