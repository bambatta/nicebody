<template>
  <div
    class="form-group"
    :class="{
      'has-error': !meta.valid && errorMessage,
    }"
  >
    <div :class="['input-wrapper', {'input-wrapper--focused' : focusInput}]">
      <label class="label" v-if="label">
          {{ label }}
      </label>

        <input
          @focusin="togglePicker(true)"
          @focusout="togglePicker(false)"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :value="inputValue"
          @input="handleChange"
          :disabled="disabled"
          class="input default-text_grey"
        />
      <div class="after-input" v-if="afterInput">
        <slot name="afterInput"></slot>
      </div>
    </div>
    <div v-if="errorMessage" class="errors">
      <p>
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
const focusInput = ref(false);
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },

  afterInput: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  beforeInput: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
    default: "",
  },
  iconWidth: {
    type: Number,
    default: 20,
  },
  iconHeight: {
    type: Number,
    default: 20,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const name = toRef(props, "name");

function togglePicker(e) {
  focusInput.value = e
}

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
