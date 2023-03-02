<template>
  <div class="custum-swiper-wrapper">
    <div class="swiper">
      <div class="swiper-wrapper-top" :class="{ carusel: carusel }">
        <Swiper
          :slidesPerView="perView"
          :spaceBetween="spaceBetween"
          :modules="[Thumbs, Navigation, Pagination, Lazy]"
          :thumbs="{ swiper: thumbsSwiper }"
          :breakpoints="swiperOptionsTop.breakpoints"
          :pagination="{
            type: 'fraction',
            dynamicBullets: true,
            dynamicMainBullets: 5,
          }"
          lazy
          :navigation="{
            prevEl: prevTop,
            nextEl: nextTop,
          }"
          @swiper="setSwiperRef"
        >
          <SwiperSlide v-for="(slide, index) in options" :key="index">
            <div class="swiper__slide-wrapper">
              <a
                v-if="fancybox"
                :href="
                  slide.url || slide.images[0]?.url || '/images/main/photo.webp'
                "
                data-fancybox="gallery"
              >
                <BaseImage
                  :src="
                    slide.url ||
                    slide.images[0]?.url ||
                    '/images/main/photo.webp'
                  "
                  customClass="swiper-img__top"
                />
              </a>
              <NuxtLink
                v-else
                :to="{ path: `/${slide.slug}`, hash: '#main-page__product' }"
              >
                <BaseImage
                  :src="
                    slide.url ||
                    slide.images[0]?.url ||
                    '/images/main/photo.webp'
                  "
                  customClass="swiper-img__top"
                />
              </NuxtLink>
            </div>
            <div v-if="!carusel" class="swiper-content">
              <NuxtLink
                :to="{ path: `/${slide.slug}`, hash: '#main-page__product' }"
                class="default-text_black"
              >
               {{ slide.name }}
              </NuxtLink>
              <div class="swiper-rating">
                <ClientOnly>
                  <BlocksStarRating
                    :rating="+slide.product.rating"
                    read-only
                    :padding="3"
                  />
                </ClientOnly>
                <span class="swiper-count"
                  >({{ slide.product.comments_count }})</span
                >
              </div>
              <span class="swiper-price">${{ slide.price }}</span>
              <button class="default-btn default-text" @click="openProductPopup(slide.slug)">Buy</button>
            </div>

          </SwiperSlide>
        </Swiper>
      </div>

      <div
        v-if="carusel"
        class="swiper-wrapper-bottom"
        :class="{ width: options.length < 2 }"
      >
        <Swiper
          :modules="[Thumbs, Navigation, Lazy]"
          @swiper="setThumbsSwiper"
          lazy
          :navigation="{
            prevEl: prev,
            nextEl: next,
          }"
          :breakpoints="swiperOptions.breakpoints"
          :slidesPerView="4"
          :spaceBetween="14"
          class="swiper-bottom"
        >
          <SwiperSlide v-for="(slide, index) in options" :key="index">
            <BaseImage :src="slide.url" customClass="swiper-img__bottom" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div v-if="carusel" ref="prev" class="swiper-button-prev">
        <BaseIconSvg icon-name="arrow-swiper" customClass="icon-swiper" />
      </div>
      <div v-if="carusel" ref="next" class="swiper-button-next">
        <BaseIconSvg icon-name="arrow-swiper" customClass="icon-swiper" />
      </div>

      <div ref="prevTop" class="swiper-button-prev">
        <BaseIconSvg icon-name="arrow-swiper" customClass="icon-swiper" />
      </div>
      <div ref="nextTop" class="swiper-button-next">
        <BaseIconSvg icon-name="arrow-swiper" customClass="icon-swiper" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import { Navigation, Lazy, Thumbs, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/lazy";
const emit = defineEmits(["modalProduct","modalProductPopupStatus"]);
const props = defineProps({
  options: {
    type: [Array, Object],
    default() {
      return [];
    },
  },
  carusel: {
    type: Boolean,
    default: false,
  },
  fancybox: {
    type: Boolean,
    default: false,
  },
  perView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 1,
  },
  breakpointsTabPerView: {
    type: Number,
    default: 1,
  },
  breakpointsMobilePerView: {
    type: Number,
    default: 1,
  },
});
let swiperOptions = ref({
  breakpoints: {
    900: {
      slidesPerView: 4,
    },
    360: {
      slidesPerView: 3,
    },
  },
});
let swiperOptionsTop = ref({
  breakpoints: {
    1200: {
      slidesPerView: props.perView,
      pagination: {
        type: "bullets",
      },
    },
    766: {
      slidesPerView: props.breakpointsTabPerView,
      pagination: {
        type: "bullets",
      },
    },
    360: {
      slidesPerView: props.breakpointsMobilePerView,
      pagination: {
        type: "bullets",
      },
    },
  },
});

const prev = ref(null);
const next = ref(null);
const prevTop = ref(null);
const nextTop = ref(null);
let exSwiper = null;



const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  if (swiper) {
    thumbsSwiper.value = swiper;
  }
};

function setSwiperRef(swiper) {
  exSwiper = swiper;
}

function openProductPopup(slug) {

  if(!props.carusel) {
    emit("modalProduct", slug)
  }
}

watch(
  () => props.options,
  () => {
    if (exSwiper) {
      exSwiper.slideTo(0);
    }
  },
  { deep: true }
);
</script>
