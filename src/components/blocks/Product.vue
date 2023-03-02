<template>
  <div class="product">
    <WrapperLoad v-model="load">
      <div
        v-for="(cart, index) in options"
        :key="index"
        class="profile__top-wrapper"
      >
        <div v-if="order">
          <button
            class="profile-btn__order-collapse collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapseExample${cart.id}`"
            :aria-expanded="order ? false : true"
            :aria-controls="`collapseExample${cart.id}`"
          >
            <span class="default-text_grey">
              {{ $moment(cart.ordered_at).format("DD.MM.YYYY") }}
            </span>
            <span class="profile-btn__wrapper">
              <span class="default-title profile__accordion-title">
                Order №{{ cart.number }}
              </span>
              <span
                v-show="cart.status_obj"
                :style="{
                  color: cart?.status_obj?.color,
                  background: cart?.status_obj?.bg,
                }"
                class="status-label"
                >{{ cart?.status_obj?.name }}</span
              >
              <BaseIconSvg
                icon-name="toggle"
                width="13"
                height="7"
                customClass="icon-pink"
              />
            </span>
          </button>
          <button
            v-if="cart.status === 'new'"
            class="default-btn_border-none default-text_pink"
            @click="deleteOrder(), (orderId = cart.id)"
          >
            Сancel order
          </button>
        </div>
        <div :class="{ collapse: order }" :id="`collapseExample${cart.id}`">
          <div
            v-for="(purchas, indexPurchas) in cart?.purchases"
            :key="indexPurchas"
            class="product-top"
          >
            <div class="product-top__wrapper">
              <BaseImage
                :src="
                  purchas.variation?.images[0]?.url || '/images/main/photo.webp'
                "
                customClass="product-img"
              />
              <span class="navigation-count"> {{ purchas.quantity }}</span>
            </div>

            <div class="product-wrapper">
              <h5 class="default-text_black">{{ purchas.variation?.name }}</h5>
              <h6 class="default-text_grey product-title">
                {{ specificationName(purchas.variation.specification) }}
              </h6>
              <div class="countner-price">
                <del
                  v-if="
                    purchas.price_old &&
                    purchas.price_old > 0
                  "
                  class="product-price_old"
                  >{{ cartPrice(purchas.price_old) }}</del
                >
                <span class="product-price_new">
                  {{ cartPrice(purchas.price) }}</span
                >
                <span
                  class="product-price_discount"
                  v-if="purchas.variation.discount_percent > 0"
                  >-{{ purchas.variation.discount_percent }}%</span
                >
              </div>
            </div>
          </div>
          <div class="promocod" v-if="promocod">
            <slot name="promocod"></slot>
          </div>

          <ul class="product-list">
            <li class="product-item">
              <span class="default-text_grey">Goods :</span
              ><span class="default-text_black">{{
                cartPrice(cart?.total?.purchases_all) || 0
              }}</span>
            </li>
            <li class="product-item">
              <span class="default-text_grey">Shipping:</span
              ><span class="default-text_black">{{
                cartPrice(cart?.total?.delivery) || 0
              }}</span>
            </li>
            <li class="product-item">
              <span class="default-text_grey">Discount:</span
              ><span class="default-text_black">{{
                cartPrice(cart?.total?.order_discount) || 0
              }}</span>
            </li>
            <li class="product-item">
              <span class="default-text_grey big">Total:</span
              ><span class="default-text_black">{{
                cartPrice(cart?.total?.total) || 0
              }}</span>
            </li>
          </ul>
        </div>
        <NuxtLink v-if="route.path === '/profile'" v-show="cart.ttn" :to="{ path: `/tracking`, query: {ttn: cart?.ttn}}" class="product-item__link">Tracking</NuxtLink>
      </div>
    </WrapperLoad>
    <ClientOnly
      ><teleport to="body">
        <b-modal
          hide-footer
          hide-header
          centered
          ok-only
          id="order"
          class="auth modal-popap"
          v-model="showOrder"
        >
          <div class="modal-header">
            <h3 class="default-title">
              Are you sure you want to cancel the order?
            </h3>
            <button class="close-btn" @click.prevent="deleteOrder">
              <BaseIconSvg
                icon-name="close"
                width="16"
                height="16"
                customClass="icon-pink"
              />
            </button>
          </div>
          <div class="modal-wrapper">
            <div class="modal-btn__wrapper">
              <button @click="cancleOrder" class="default-btn default-text">
                Cancel</button
              ><button class="default-btn_border" @click="deleteOrder">
                Go back
              </button>
            </div>
          </div>
        </b-modal></teleport
      >
    </ClientOnly>
  </div>
</template>
<script setup>
const { $moment } = useNuxtApp();
const emit = defineEmits(["update"]);
const route = useRoute();
const props = defineProps({
  promocod: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [Array, Object],
    default() {
      return [];
    },
  },
});
let showOrder = ref(false),
  load = ref(false),
  orderId = ref("");
let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const cartPrice = (price) => {
  return formatter.format(price);
};
function specificationName(specification) {
  return Object.values(specification).join(" / ");
}
function deleteOrder() {
  showOrder.value = !showOrder.value;
}



async function cancleOrder() {
  load.value = true;
  try {
    const { data } = await $api().my.deleteOrder(orderId.value);
    deleteOrder();
    emit("update");
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
</script>
