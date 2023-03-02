<template>
  <footer class="footer">
    <div class="default-page__container">
      <div class="footer-top">
        <div class="fototer-contact">
          <NuxtLink to="/">
            <BaseImage
              src="/images/logo-footer.svg"
              customClass="footer-logo"
            />
          </NuxtLink>

          <div class="footer__contacts">
            <NuxtLink
              v-if="store.variables.variables?.site?.email"
              :to="`mailto:${store.variables.variables?.site?.email || ''}`"
              class="default-text footer__link"
            >
              <BaseIconSvg
                icon-name="mail"
                height="17"
                customClass="footer--icon"
              />{{ store.variables.variables?.site?.email }}
            </NuxtLink>
            <NuxtLink
              v-if="store.variables.variables?.site?.phone"
              :to="`tel:${store.variables.variables?.site?.phone}`"
              class="default-text footer__link"
            >
              <BaseIconSvg
                icon-name="phone"
                height="24"
                width="27"
                customClass="footer--icon"
              />
              {{ store.variables.variables?.site?.phone || "" }}
            </NuxtLink>
            <div class="footer__social">
              <NuxtLink
                v-for="(option, idx) in socialLinks"
                :key="idx"
                :to="option.path"
                target="_blank"
                class="default-text footer__social-link"
              >
                <BaseIconSvg
                  v-if="option.name == 'facebook'"
                  :icon-name="option.name"
                  height="21"
                  width="11"
                  customClass="footer--icon"
                />
                <BaseIconSvg
                  v-if="option.name == 'instagram'"
                  :icon-name="option.name"
                  height="21"
                  width="20"
                  customClass="footer--icon"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
        <nav class="footer-nav">
          <ul class="footer-list">
            <li class="footer-item"><NuxtLink to="/">Home </NuxtLink></li>
            <li class="footer-item">
              <NuxtLink to="/about">About us</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/contact">Contact us</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/tracking">Tracking</NuxtLink>
            </li>
          </ul>
          <ul class="footer-list">
            <li class="footer-item">
              <button
                class="default-btn_border-none default-text"
                @click.prevent="getModal('terms-service')"
              >
                Terms of Service
              </button>
            </li>
            <li class="footer-item">
              <button
                class="default-btn_border-none default-text"
                @click.prevent="getModal('return-refund-policy')"
              >
                Return & Refund policy
              </button>
            </li>
            <li class="footer-item">
              <button
                class="default-btn_border-none default-text"
                @click.prevent="getModal('privacy-policy')"
              >
                Privacy policy
              </button>
            </li>
            <li class="footer-item">
              <button
                class="default-btn_border-none default-text"
                @click.prevent="getModal('shipping-policy')"
              >
                Shipping policy
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <hr class="footer-hr" />
    <div class="default-page__container">
      <div class="footer-bottom">
        <div class="footer-payment">
          <template
            v-for="(payment, index) in store.variables.variables?.payments"
            :key="index"
            class="footer-payment__item"
          >
            <BaseImage :src="`/images/footer/${payment}.svg`" />
            <template v-if="payment === 'fondy'">
              <BaseImage src="/images/footer/mastercard.svg" />
              <BaseImage src="/images/footer/visa.svg" />
            </template>
          </template>
        </div>

        <p class="default-text">
          {{ store.variables.variables?.site?.footer_info }}
        </p>

        <p class="footer-copyright default-text">
          {{ store.variables.variables?.site?.copyright }}
        </p>
      </div>
    </div>

    <ClientOnly
      ><teleport to="body">
        <b-modal
          hide-footer
          hide-header
          centered
          ok-only
          class="auth static-page"
          id="termsService"
          v-model="showModal"
        >
          <WrapperLoad v-model="load">
            <div class="modal-header">
              <h3 class="default-title">{{ modalInfo.name }}</h3>
              <button class="close-btn" @click.prevent="showModal = !showModal">
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div v-html="modalInfo.body"></div>
          </WrapperLoad> </b-modal
      ></teleport>
    </ClientOnly>
  </footer>
</template>
<script setup>
let store = $store();
let socialLinks = ref([]);
let load = ref(false),
  modalInfo = ref({ body: "", name: "" }),
  showModal = ref(null);
async function getModal(slug) {
  load.value = true;
  try {
    showModal.value = !showModal.value;
    const { data } = await await $api().pages.get(slug);
    modalInfo.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}

async function getMenu() {
  try {
    const { data } = await $api().menu.getMenu();
    socialLinks.value = data.find((el) => el.slug === "socials")?.items;
  } catch (e) {
    console.error(e);
  }
}
async function getSocialite() {
  load.value = true;
  try {
    const data = await $api().suggest.getSocialite();
    $store().variables.setVariables(data.data);
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
onMounted(() => {
  setTimeout(() => {
    getMenu();
    getSocialite();
  }, 1000);
});
</script>
