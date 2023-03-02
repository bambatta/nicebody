<template>
  <div class="radio-wrapper">
    <span v-if="label" class="default-text_grey">{{ label }}</span>

    <input
      :type="type"
      :modelValue="modelValue"
      @change="changeValue"
      :name="name"
      :value="value"
      :checked="value"
    />

    <label :for="name" class="default-text_grey">{{ content }}</label>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  content: { type: String, default: "" },
  label: { type: String, default: "" },
  name: { type: String, default: "" },
  modelValue: {
    type: [String, Boolean],
    default: "",
  },
  value: {
    type: [String, Boolean],
    default: null,
  },
  type: {
    type: String,
    default: "radio",
  },
});
function changeValue(e) {
  let val = e.target.value;
  emit("update:modelValue", props.name);
}
</script>
