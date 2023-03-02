import { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('swiper', Swiper),
  nuxtApp.vueApp.component('swiper-slide', SwiperSlide)

})