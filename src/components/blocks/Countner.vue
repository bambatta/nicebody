<template>
  <div class="countner__wrapper">
    <div class="countner">
      <div class="countner-count">
        <button
          class="default-btn default-text countner-btn"
          @click.prevent="minusCount"
        >
          -
        </button>
        <input
          type="text"
          v-model="count"
          @input="handlerNumber"
          class="countner-input"
        />
        <button
          class="default-btn default-text countner-btn"
          @click.prevent="addCount"
        >
          +
        </button>
      </div>
      <div class="countner-price">
        <del v-if="priceOld && priceOld > 0" class="countner-price_old"
          >${{ priceOld }}</del
        >
        <span class="countner-price_new" :class="{ black: !priceOld }">
          {{ cartPrice }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import _ from "lodash";
const { $moment } = useNuxtApp();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  priceOld: {
    type: [String, Boolean],
    default: null,
  },
  price: {
    type: [String, Number],
    default: "",
  },
  discount: {
    type: [String, Number],
    default: "",
  },
  total: {
    type: [String, Number],
    default: "",
  },
});
let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
let count = ref(props.modelValue);
function addCount() {
  if (count.value < 999) {
    count.value++;
    emit("update:modelValue", count.value);
  }
}
function minusCount() {
  if (count.value > 1 && count.value <= 999) {
    count.value--;
    emit("update:modelValue", count.value);
  }
}
function handlerNumber(e) {
  count.value = e.target.value
    .replace(/[^0-9]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
  updateHandler(count.value);
}
const updateHandler = _.debounce((val) => {
  if (count.value === "") {
    emit("update:modelValue", 1);
    count.value = 1;
  } else {
    emit("update:modelValue", val);
  }
}, 600);
const cartPrice = computed(() => {
  return formatter.format(props.total || props.price);
});
watch(
  () => props.modelValue,
  (value) => {
    count.value = value;
  }
);
</script>
