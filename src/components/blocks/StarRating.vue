<template>
  <div>
    <star-rating
      :star-size="size"
      :inactive-color="inactiveColor"
      :border-color="colorStar"
      :active-color="colorStar"
      :border-width="borderWidth"
      :active-border-color="colorStar"
      :show-rating="showRating"
      :read-only="readOnly"
      :padding="padding"
      :rating="increment===1?parseInt(rating):rating"
      :round-start-rating="false"
      @update:rating="setRating"
    ></star-rating>
  </div>
</template>
<script setup>
const colorStar = getComputedStyle(document.documentElement).getPropertyValue('--color-star') || '#fff'
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  size: { type: Number, default: 24 },
  inactiveColor: { type: String, default: "#fff" },
  borderWidth: { type: Number, default: 3 },
  increment: { type: Number, default: 0.01 },
  padding: { type: Number, default: 2 },
  rating: {
    type: [String, Number],
    default: null,
  },
  readOnly: { type: Boolean, default: false },
  showRating: { type: Boolean, default: false },
  modelValue: {
    type: Number,
    default: null,
  },
});
function setRating(e) {
  emit("update:modelValue", e);
}
</script>