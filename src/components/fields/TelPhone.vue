<template>
  <div
    class="phoneInput form-group"
    :class="{
      after: afterInput,
      before: beforeInput,
      'has-error': !meta.valid && errorMessage,
    }"
  >
    <label class="default-label" v-if="label"
      >{{ label }} <span v-if="star" class="default-label__star">*</span></label
    >
    <vue-tel-input
      :name="name"
      :id="name"
      :value="inputValue"
      @input="handlerTel"
      :inputOptions="options"
      defaultCountry="us"
    ></vue-tel-input>
    <div v-if="errorMessage" class="errors">
      <p>
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
  <script setup>
import { useField } from "vee-validate";
let options = ref({ placeholder: props.placeholder });

const emit = defineEmits(["update:modelValue","valid"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  star: {
    type: Boolean,
    default: false,
  },
  afterInput: {
    type: Boolean,
    default: false,
  },
  beforeInput: {
    type: Boolean,
    default: false,
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});
function handlerTel(val, country, el) {
  if (country?.number ) {
    emit("update:modelValue", country?.number);
    emit("valid", country?.valid);
  }
}
</script>
