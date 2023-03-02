<template>
  <div class="modal-wrapper">
    <WrapperLoad v-model="pending">
      <div class="main-page__product" id="main-page__product">
        <div class="main-page__swiper-wrapper">
          <ClientOnly>
            <BlocksSwiper :options="product?.data.images" carusel fancybox />
          </ClientOnly>
        </div>

        <div class="main-page__product-info">
          <h2 class="default-title">{{ product?.data.name }}</h2>
          <form>
            <div class="main-page__product-rating">
              <ClientOnly>
                <BlocksStarRating
                  v-model="rating"
                  :rating="+product?.data.product.rating"
                  read-only
                />
              </ClientOnly>
              <span class="default-text_pink">{{product?.data.product.rating}}</span>
            </div>
            <div
              v-for="(switching, index) in product?.switching"
              :key="index"
              class="default__radio-wrapper"
            >
              <span class="default-text_grey">{{
                switching.attribute.name
              }}</span>
              <div
                v-if="switching.attribute.format === 'image'"
                class="product__color-wrapper"
              >
                <div
                  v-for="(property, index) in switching.properties"
                  :key="index"
                >
                  <img
                    :src="property.property.image?.url"
                    :alt="property.property.value"
                    class="product__color"
                    :class="{ color: property.is_current }"
                    @click.prevent="slug = property.variation.slug"
                  />
                </div>
              </div>
              <div v-else class="default__block-radio">
                <div
                  v-for="(itemProperty, indexProperty) in switching.properties"
                  :key="indexProperty"
                >
                  <FieldsRadio
                    :content="itemProperty.property.value"
                    :name="switching.attribute.slug"
                    :value="itemProperty.is_current"
                    @click.prevent="slug = itemProperty.variation.slug"
                  />
                </div>
              </div>
            </div>

            <div class="main-page__quantity">
              <BlocksCountner
                :price="product?.data.price"
                :price-old="product?.data.price_old"
                v-model="quantity"
              />
              <div class="main-page__quantity-radio">
                <FieldsRadioDiscount
                  content-count="2"
                  content-percent="20%"
                  name="quantity"
                  id="discount5"
                  :value="2"
                  v-model="quantity"
                /><FieldsRadioDiscount
                  contentCount="3 and more"
                  contentPercent="30%"
                  :value="3"
                  name="quantity"
                  id="discount4"
                  v-model="quantity"
                />
              </div>
            </div>
            <div class="main-page__product-btn">
              <button
                class="default-btn default-text"
                @click.prevent="addCart(product?.data, true)"
              >
                Add to cart
              </button>
              <button
                class="default-btn_border default-text"
                @click.prevent="switchToCheckout(product?.data)"
              >
                Buy One Click
              </button>
            </div>
          </form>
        </div>
      </div>
    </WrapperLoad>
  </div>
</template>

<script setup>

const emit = defineEmits(["closeModalProduct"]);

const config = useRuntimeConfig(),
  route = useRoute(),
  router = useRouter(),
  load = ref(false),
  CardIdCookie = useCookie("card_id"),
  slug = ref("");
let quantity = ref(1);

function openProductStatus(e) {
  slug.value = e;
}
defineExpose({
  openProductStatus,
});

const {
  data: product,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-${slug.value}`,
  () =>
    $fetch(config.API_BASE_URL + "/variation/" +
        (slug.value ? slug.value : error), {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        sHost: config.public.API_DOMAIN,
        sLocale: "en",
      },
    }),
  {
    watch: [slug],
  }
);
async function addCart(product, actioan) {
  load.value = true;
  try {
    const data = await $api().carts.addCart(product.id, {
      quantity: quantity.value,
    });
    CardIdCookie.value = await data.cart_id;
    await $store().cart.setCart(await data.cart_id);
    if (actioan) {
      $store().cart.setCartActive(false);
    }
    emit("closeModalProduct");
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
async function switchToCheckout(product) {
  await addCart(product, false);
  router.push("/checkout");
}

</script>
