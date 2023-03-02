<template>
  <ClientOnly>
    <img :src="src" :alt="alt" :class="customClass" />
  </ClientOnly>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
    alt: {
    type: String,
    default: "",
  },
    customClass: {
    type: String,
    default: "",
  },
});
</script>