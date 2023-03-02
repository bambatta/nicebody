<template>
  <div
    class="form-group"
    :class="{
      'has-error': !meta.valid && errorMessage,
    }"
  >
    <div>
      <input
        type="file"
        :name="name"
        id="upload-btn"
        class="upload-btn"
        accept="image/*"
        multiple
        @change="uploadFile($event)"
      />

      <label for="upload-btn" class="default-btn_border">Choose image</label>
      <div class="upload-content">
        <div v-for="(fileName, index) in fileNames" :key="index">
          <span class="default-text_black">{{ fileName }}</span>
          <button
            class="upload-content__btn"
            @click.prevent="deleteFile(index)"
          >
            <BaseIconSvg
              icon-name="close"
              width="12"
              height="12"
              customClass="icon-pink"
            />
          </button>
        </div>
      </div>
    </div>
    <div v-if="errorMessage || imageErrorMessage" class="errors">
      <p>
        {{ errorMessage || imageErrorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  imageErrorMessage: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
});

let file = ref([]),
  fileNames = ref([]);
function deleteFile(index) {
  file.value.splice(index, 1);
  fileNames.value.splice(index, 1);
  emit("update:modelValue", file.value);
}
async function uploadFile(e) {
  Object.values(e.target.files).forEach((element) => {
    file.value.push(element);
    fileNames.value.push(element.name);
  });
  emit("update:modelValue", file.value);
}
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
