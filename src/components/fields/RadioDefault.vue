<template>
  <label
    class="checkmark-container"
    :class="{ 'checkmark-container_gren': styleGreen }"
  >
    <span
      v-if="label"
      class="checkmark-label default-text_black"
      name="radio"
      >{{ label }}</span
    >
    <input
      type="radio"
      :modelValue="modelValue"
      @change="changeValue"
      :name="name"
      :value="value"
      :checked="value === modelValue"
    />
    <span class="checkmark" :class="{'checkmark-img':labelImg}"></span>
    <div class="label-img" v-if="labelImg">
      <slot name="label-img"></slot>
    </div>
  </label>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Boolean],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  labelImg: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  booleanValue: {
    type: Boolean,
    default: false,
  },
  styleGreen: {
    type: Boolean,
    default: false,
  },
});
function changeValue(e) {

  emit("update:modelValue", e.target.value);
}
</script>
