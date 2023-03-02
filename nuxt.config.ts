import { defineNuxtConfig } from "nuxt";

const scripts = [];
const metas = [
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  {
    hid: "description",
    name: "description",
    content: "Shapewear",
  },
  {
    hid: "msapplication-TileColor",
    name: "msapplication-TileColor",
    content: "#da532c",
  },
  {
    hid: "theme-color",
    name: "theme-color",
    content: "#ffffff",
  },
];
!!process.env.NUXT_FB_PIXEL_ID ? scripts.push({ src:'/fb-pixel.js', type: 'text/javascript' }) : '';
!!process.env.NUXT_FB_VERIFY ? metas.push({ name: "facebook-domain-verification", content: process.env.NUXT_FB_VERIFY }) : '';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    API_BASE_URL: process.env.NUXT_APP_ROOT_API,
    API_DOMAIN: process.env.NUXT_DOMAIN,
    NUXT_FB_PIXEL_ID: process.env.NUXT_FB_PIXEL_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
  },
  srcDir: "src/",
  alias: {
    "@": "src/",
  },

  ssr: true,
  app: {
    head: {
      title: "",
      titleTemplate: "%s",
      meta: metas,
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: 'favicon/safari-pinned-tab.svg" color="#5bbad5',
        },
      ],
      script: scripts
    },
  },
  /*  generate: {
    exclude: [
      /^\/Swiper/
    ]
  }, */
  build: {
    transpile: ["swiper"],
  },
  css: ["~/assets/scss/common.scss"],
  buildModules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `usePinia()`
          "defineStore",
          // automatically imports `usePinia()` as `usePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
    "@nuxtjs/moment",
  ],
});
