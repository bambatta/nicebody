<template>
  <ClientOnly>
    <div
      class="default-select__wrapper form-group"
      :class="{'has-error': !meta.valid && errorMessage,
      }"
    >
      <div :class="['select', {'select--selected' : focusSelect}]">
        <label v-if="label" class="default-label">{{ label }}</label>

        <v-select
          :name="name"
          :id="name"
          :model-value="modelValue"
          :searchable="searchable"
          :reduce="reduce"
          :loading="load"
          :options="options"
          :value="modelValue"
          :placeholder="placeholder"
          :clearable="clearable"
          :label="labelName"
          @update:modelValue="emit('update:modelValue', $event)"
          @search="onSearch"
          @open="togglePicker(true)"
          @close="togglePicker(false)"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <BaseIconSvg icon-name="toggle" width="13" height="7" />
            </span>
          </template>
          <template #no-options>{{ noOptionsMessage }}</template>
        </v-select>
      </div>

      <div v-if="errorMessage" class="errors">
        <p>
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </ClientOnly>
</template>
 <script setup>
import { useField } from "vee-validate";
import _ from "lodash";
const emit = defineEmits(["update:modelValue", "search"]);
const focusSelect = ref(false)

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },

  searchable: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    default: "",
  },
  labelName: {
    type: String,
    default: "name",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  load: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [Array, Object],
    default() {
      return [];
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  reduce: {
    type: Function,
    default: (option) => option,
  },
});

let noOptionsMessage = ref("Start typing to select an option");
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
function changeValue(e) {
  emit("update:modelValue", e);
}
function onSearch(search, loading) {
  if (props.autocomplite && search) {
    searchItems(loading, search);
  }
}
function togglePicker(e) {
  focusSelect.value = e
}
const searchItems = _.debounce(async (loading, search) => {
  if (search) {
    noOptionsMessage.value = "Nothing found";
  } else {
    noOptionsMessage.value = "Start typing to select an option";
  }

  emit("search", search);
}, 350);
</script>