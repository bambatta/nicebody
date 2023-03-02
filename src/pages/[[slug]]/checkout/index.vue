<template>
  <div class="checkout-page">
    <WrapperLoad v-model="load">
      <div class="default-page__container">
        <div class="checkout">
          <div class="checkout-wrapper">
            <div class="checkout__container">
              <NuxtLink to="/">
                <BaseImage src="/images/logo.svg" customClass="checkout-logo" />
                
              </NuxtLink>
              
            </div>
            <div class="checkout-cart_media">
              <div class="accordion" role="tablist">
                <ClientOnly>
                  <b-card no-body>
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        block
                        v-b-toggle.accordion-1
                        variant="info"
                        class="checkout-btn"
                        >Show order summary:
                        {{ cartPrice(carts[0]?.total?.total) }}
                        <BaseIconSvg
                          icon-name="toggle"
                          height="20"
                          width="20"
                          customClass="icon-white"
                      /></b-button>
                    </b-card-header>
                    <b-collapse
                      id="accordion-1"
                      visible
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <button
                          class="
                            default-text_pink
                            default-btn_border-none
                            cart-btn
                          "
                          @click="activatedCart"
                        >
                          Edit cart
                        </button>

                        <BlocksProduct
                          label="Phone"
                          mask="+# ### ### ####"
                          v-model="checkout.phone"
                          :options="carts"
                          class="default__form-input"
                          promocod
                        >
                          <template #promocod>
                            <vee-form
                              v-if="!promocodeCookie"
                              @submit="sentPromocode"
                              class="promocod"
                            >
                              <FieldsInput
                                v-model="promocode.promocode"
                                name="promocode"
                                class="default__form-input"
                                label="Promocode"
                              />
                              <button
                                class="default-btn default-text"
                                
                                type="submit"
                              >
                                Apply
                              </button></vee-form
                            >
                            
                            <div v-else class="product-promocode">
                              <div class="product-promocode__img-wrapper">
                                <BaseImage
                                  src="/images/check-green.webp"
                                  customClass="product-promocode__img"
                                />
                              </div>
                              <span class="product-promocode__text"
                                >The promocode was applied</span
                              >
                              <button
                                class="product-promocode__btn"
                                @click.prevent="deletePromocode"
                              >
                                Remove
                              </button>
                            </div>
                          </template>
                        </BlocksProduct>
                        <div class="popup__bg" v-if="popapSuccess || popapFail">
                          <div v-if="popapSuccess" class="popap-img">
                            <BaseImage
                              src="/images/check-green.webp"
                              customClass="checkout-img"
                            />
                          </div>
                          <div v-else class="popap-img">
                            <BaseImage
                              src="/images/failed.webp"
                              customClass="checkout-img"
                            />
                          </div>
                          <span v-if="popapSuccess"
                            >Promocode has been applied</span
                          >
                          <span v-else> Promocode has not been applied</span>
                        </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </ClientOnly>
              </div>
            </div>
            <CheckoutStepOne :shipping="shipping" />
            <p class="checkout-copyrigh">
              {{ store.variables.variables?.site?.copyright }}
            </p>
          </div>
          <div class="checkout-cart">
            <button
              class="default-text_pink default-btn_border-none cart-btn"
              @click="activatedCart"
            >
              Edit cart
            </button>

            <BlocksProduct
              :options="carts"
              class="default__form-input"
              quantity
              promocod
            >
              <template #promocod>
                <vee-form
                  v-if="!promocodeCookie"
                  @submit="sentPromocode"
                  class="promocod"
                >
                  <FieldsInput
                    label="Promocode"
                    v-model="promocode.promocode"
                    name="promocode"
                    class="default__form-input"
                  />
                  <button class="default-btn default-text" type="submit">
                    Apply
                  </button></vee-form
                >
                <div v-else class="product-promocode">
                  <div class="product-promocode__img-wrapper">
                    <BaseImage
                      src="/images/check-green.webp"
                      customClass="product-promocode__img"
                    />
                  </div>
                  <span class="product-promocode__text"
                    >The promocode was applied</span
                  >
                  <button
                    class="product-promocode__btn"
                    @click.prevent="deletePromocode"
                  >
                    Remove
                  </button>
                </div>
                <div class="popup__bg" v-if="popapSuccess || popapFail">
                  <div v-if="popapSuccess" class="popap-img">
                    <BaseImage
                      src="/images/check-green.webp"
                      customClass="checkout-img"
                    />
                  </div>
                  <div v-else class="popap-img">
                    <BaseImage
                      src="/images/failed.webp"
                      customClass="checkout-img"
                    />
                  </div>
                  <span v-if="popapSuccess">Promocode has been applied</span>
                  <span v-else> Promocode has not been applied</span>
                </div>
              </template>
            </BlocksProduct>
          </div>
        </div>
      </div>
    </WrapperLoad>
  </div>
</template>
<script setup>
import * as yup from "yup";
definePageMeta({
  layout: "checkout",
});
useHead({
  title: "NICEBODY - Checkout",
});
let store = $store();
let router = useRouter();
let popapFail = ref(false),
  popapSuccess = ref(false);
let promocode = ref({ promocode: null });
let checkout = ref({
  name: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  apartment: "",
  city: "",
  zipcode: "",
});
let carts = ref([]);
let shipping = ref({});
let load = ref(false);
let promocodeCookie = useCookie("promocode");
function activatedCart() {
  $store().cart.setCart();
  $store().cart.setCartActive(false);
}
function deletePopapSuccess() {
  popapSuccess.value = true;

  setTimeout(() => {
    popapSuccess.value = false;
  }, 3000);
}
function deletePopapFail() {
  popapFail.value = true;
  setTimeout(() => {
    popapFail.value = false;
  }, 3000);
}
async function getCart() {
  load.value = true;
  try {
    const payload = await Promise.all([$api().carts.getCarts()]);
    if (payload[0].length === 0) {
      router.push("/");
    } else {
      carts.value[0] = payload[0].data;
      carts.value[0].total = payload[0]?.total;
      promocode.value.promocode = payload[0].promocode.code;
      shipping.value = payload[0].data.shipping;
    }
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const cartPrice = (price) => {
  return formatter.format(price);
};
async function deletePromocode() {
  load.value = true;
  try {
    await $api().carts.removePromocode({ promocode: promocodeCookie.value });
    promocodeCookie.value = "";
    getCart();
  } catch (e) {
    console.log(e);
  } finally {
    load.value = false;
  }
}
async function sentPromocode(val, actions) {
  load.value = true;

  try {
    await $api().carts.sentPromocode(promocode.value);
    promocodeCookie.value = promocode.value.promocode;
    deletePopapSuccess();
    getCart();
  } catch (e) {
    deletePopapFail();
    actions.setErrors(e.data.errors);
  } finally {
    load.value = false;
  }
}
async function sentPromocodeCocie() {
  load.value = true;
  try {
    await $api().carts.sentPromocode({ promocode: promocodeCookie.value });
    getCart();
  } catch (e) {
    promocodeCookie.value = "";
  } finally {
    load.value = false;
  }
}



onMounted(() => {
  getCart();
  if (promocodeCookie.value) {
    sentPromocodeCocie();
  }
});

watch(
  () => store.cart.cartQuantity,
  () => {
    getCart();
  }
);
</script>
