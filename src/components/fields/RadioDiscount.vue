<template>
  <div class="radio-wrapper__discount">
    <span v-if="label" class="default-text_grey">{{ label }}</span>
    <input
      type="radio"
      :id="id"
      :modelValue="modelValue"
      @change="changeValue"
      :name="name"
      :value="value"
      :checked="chechedValue"
    />

    <label :for="id" class="default-text_grey"
      >Buy <span> {{ contentCount }} </span> to have
      <span> {{ contentPercent }} </span></label
    >
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
let chechedValue = ref(null);
const props = defineProps({
  contentCount: { type: String, default: "" },
  contentPercent: { type: String, default: "" },
  label: { type: String, default: "" },
  name: { type: String, default: "" },
  modelValue: {
    type: [String, Boolean,Number],
    default: "",
  },
  value: {
    type: [String, Boolean,Number],
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  booleanValue: {
    type: Boolean,
    default: false,
  },
});
function changeValue(e) {
  emit("update:modelValue", props.value);
}
watch(
  () => props.modelValue,
  (val) => {
    if (props.value === props.modelValue || props.value <= props.modelValue) {
      chechedValue.value = val;
    } else {
      chechedValue.value = null;
    }
  }
);
</script>
