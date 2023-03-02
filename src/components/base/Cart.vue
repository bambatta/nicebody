<template>
  <div class="cart" :class="{ active: !store.cart.cartActive }">
    <WrapperLoad v-model="loadCart">
      <div class="cart__title">
        <h2 class="default-title cart__title-text">Cart</h2>
        <button class="close-btn cart-close" @click="closeCart">
          <BaseIconSvg
            icon-name="close"
            width="16"
            height="16"
            customClass="icon-pink"
          />
        </button>
      </div>

      <div
        v-if="!store.cart.cart?.data?.purchases.length"
        class="cart-wrapper"
      >
        <div class="cart-list cart-empty">
          <p class="default-text_grey">Your cart is empty!</p>
        </div>
        <NuxtLink to="/" class="default-btn default-text" @click="closeCart"
          >Go shopping</NuxtLink
        >
      </div>
      <div v-else class="cart-wrapper">
        <div class="cart-list">
          <div
            v-for="(cart, index) in store.cart.cart?.data?.purchases"
            :key="index"
            class="cart-item"
          >
            <BaseImage
              :src="cart.variation?.images[0]?.url || '/images/main/photo.webp'"
              customClass="cart-img"
            />

            <div class="cart-info">
              <h3 class="default-text_black">{{ cart.variation.name }}</h3>
              <h4 class="default-text_grey">
                ${{ cart.price }} <span v-show="cart.variation.specification.length>0">/</span>
                {{ specificationName(cart.variation.specification) }}
              </h4>
              <BlocksCountner
                v-model="cart.quantity"
                :modelValue="cart.quantity"
                :price="cart.price"
                :total="cart?.total"
                :priceOld="false"
                @update:modelValue="changeCart(cart.id, $event)"
                class="cart-countner"
              />
            </div>
            <button
              class="default-btn_border-none"
              @click.prevent="deleteCart(cart.id, index, cart.quantity)"
            >
              <BaseIconSvg
                icon-name="trash"
                width="21"
                height="27"
                customClass="icon-grey"
              />
            </button>
            <BlocksCountner
              v-model="cart.quantity"
              :modelValue="cart.quantity"
              :price="cart.price"
              :total="cart?.total"
              :priceOld="false"
              :discount="cart.discount"
              @update:modelValue="changeCart(cart.id, $event)"
              class="cart-countner_media"
            />
          </div>
        </div>
        <div class="cart-total">
          <span class="default-text_grey">Subtotal:</span>
          <del
            class="countner-price_old"
            :class="{ black: !store.cart.cart?.total?.order_discount }"
            >${{ store.cart.cart?.total?.purchases_all.toFixed(2) || 0 }}</del
          >
          <span
            v-if="store.cart.cart?.total?.order_discount"
            class="countner-price_new"
            >${{
              (
                store.cart.cart?.total?.purchases -
                store.cart.cart?.total?.order_discount
              ).toFixed(2)
            }}</span
          >
          <span
            v-if="store.cart.cart?.total?.order_discount"
            class="product-price_discount"
            >-{{
              (
                (store.cart.cart?.total?.order_discount * 100) /
                store.cart.cart?.total?.purchases_all
              ).toFixed(0)
            }}%</span
          >
        </div>

        <div class="cart-buttons">
          <NuxtLink
            to="/checkout"
            class="default-btn default-text"
            @click="closeCart"
            >Check out</NuxtLink
          >
          <button
            class="default-btn_border default-text"
            @click.prevent="closeCart"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </WrapperLoad>
  </div>
</template>
<script setup>
let store = $store();
const route = useRoute();
const router = useRouter();
let loadCart = ref(false);
function closeCart() {
  $store().cart.setCartActive(true);

}
function specificationName(specification) {
  return Object.values(specification).join(" / ");
}
async function deleteCart(id, index, quantity) {
  loadCart.value = true;
  try {
    const { data } = await $api().carts.deleteCart(id, {
      quantity: quantity,
    });
    await $store().cart.setCart();
    if (route.name === "checkout" && $store().cart.cart.length === 0) {
      router.push("/");
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadCart.value = false;
  }
}

async function changeCart(id, e) {
  loadCart.value = true;
  try {
    const data = await $api().carts.updateCart({
      changed: [
        {
          id: id,
          quantity: e,
        },
      ],
    });
    await $store().cart.setCart();
  } catch (e) {
    console.error(e);
  } finally {
    loadCart.value = false;
  }
}
</script>
