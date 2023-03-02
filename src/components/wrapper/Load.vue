<template>
  <div class="loader" :class="{ auto: auto }">
    <div v-if="modelValue" class="loader__background"></div>
    <svg
      v-if="modelValue"
      class="loader__progress"
      stroke="#2f55d4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg preserveAspectRatio="xMidYMid meet" viewBox="-6 -6 50 50">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity="0.2" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </svg>
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  auto: { type: Boolean, default: false },
});
</script>

