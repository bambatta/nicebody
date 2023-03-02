<template>
  <div class="page-wrapper">
    <BaseCart />
    <slot />
  </div>
</template>
<script setup>
let store = $store(),
  route = useRoute();
onMounted(() => {

  setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
});
</script>
