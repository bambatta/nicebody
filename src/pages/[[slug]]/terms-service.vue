<template>
  <main class="static-page__wrapper">
    <div class="container">
      <BlocksNavigation
      />

      <WrapperLoad v-model="load">
        <div class="default__static-page static-page">
          <h1 class="default-title">{{ page.name }}</h1>
          <div v-html="page.body" class="static-page__body"></div>
        </div>
      </WrapperLoad>
    </div>
  </main>
</template>
<script setup>
let load = ref(false),
  page = ref({ name: "", body: "" });
async function getPage() {
  load.value = true;
  try {
    const { data } = await await $api().pages.get("terms-service");
    page.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
onMounted(() => {
  getPage();
});
</script>
