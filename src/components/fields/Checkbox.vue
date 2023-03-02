<template>
  <div class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      :id="id"
      @update:modelValue="changeValue"
    />
    <label :for="id">
      <BaseIconSvg
        icon-name="check"
        width="22px"
        height="21px"
        customClass="icon-pink"
    /></label>
    <label :for="id" v-if="label" class="default-text_black">{{ label }}</label>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "id",
  },
  value: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
function changeValue(e) {
  emit("update:modelValue", e);
}
</script>
