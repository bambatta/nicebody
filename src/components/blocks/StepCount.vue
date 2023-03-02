<template>
  <div class="step">
    <div class="step-block">
      <ul class="step-list">
        <li
          v-for="(item, index) in 3"
          :key="index"
          class="step-item"
          :class="{ active: item <= step }"
        >
          <span v-if="item >= step" class="step-count">
            {{ index + 1 }}
          </span>
          <span v-else>
            <BaseIconSvg
              icon-name="check"
              width="14px"
              height="14px"
              customClass="icon-pink"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  step: { type: Number, default: 1 },
});
</script>
