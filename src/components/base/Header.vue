<template>
  <header>
    <div class="header" id="header">
      <div class="default-page__container">
        <a href="#subscribe" class="default-text header-link">
          {{ store.variables.variables?.site?.header_info }}
        </a>
      </div>
    </div>
  </header>
</template>
<script setup>
let store = $store();
</script>