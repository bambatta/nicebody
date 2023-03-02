<template>
  <div
    class="form-group contact__form"
    :class="{
      'has-error': !meta.valid && errorMessage,
    }"
  >
    <div class="textarea-wrapper">
      <label v-if="label" class="default-label"
        >{{ label }}
        <span v-if="star" class="default-label__star">*</span></label
      >
      <textarea
        :name="name"
        :id="name"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        :rows="rows"
        class="textarea default-text_grey"
        :resize="false"
      />
    </div>
    <div v-if="errorMessage" class="errors">
      <p>
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: null,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  errors,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});
</script>
