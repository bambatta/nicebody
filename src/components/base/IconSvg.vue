<template>
  <ClientOnly>
    <svg
      class="icon-svg"
      :class="[`icon-svg-${iconName}`, customClass]"
      :width="width"
      :height="height"
      :color="color"
    >
      <use :xlink:href="`/sprite.svg#${iconName}`"></use></svg
  ></ClientOnly>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
    default: "basket",
  },
  customClass: {
    type: String,
    default: "",
  },
  width: {
    type: [Number, String],
    default: "27",
  },
  height: {
    type: [Number, String],
    default: "25",
  },
  color: {
    type: String,
    default: "black",
  },
});
</script>
