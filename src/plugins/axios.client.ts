import _ from "lodash";
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig(),
    access_token = useCookie("access_token"),
    route = useRoute(),
    router = useRouter();
  const axiosSettings = $fetch.create({
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${access_token.value || ""}`,
      sHost:config.public.API_DOMAIN,
      sLocale:'en'
    },
    baseURL: config.public.API_BASE_URL,

    async onRequest({ request, options }) {
      const access_token = useCookie("access_token");
      options.headers["Authorization"] = `Bearer ${access_token.value}`;

      // Log request
      // console.log("[fetch request]", request, options);
    },
    async onRequestError({ request, options, error }) {
      // Log error
      // console.log("[fetch request error]", request, error);
    },
    async onResponse({ request, response, options }) {
      // Log response
      // console.log("[fetch response]", request, response._data);
      // return response._data;
    },
    async onResponseError({ request, response, options }) {
      // return response._data
      if (response.status == 400) {
        let obj = {
          status: response._data.status,
          message: response._data.message,
          errors: {},
        };
        _.forEach(response._data.fields, function (value, key) {
          let keySplit = key.split("params.")[1];
          Object.assign(obj.errors, { [keySplit]: value.message });
        });
        response._data = obj;
      } else if (response.status === 401) {
        // if (
        //   route.path !== "/auth/login" &&
        //   route.path !== "/auth/registration" &&
        //   route.path !== "/auth/password-reset"
        // ) {
        //   token.value = ''
        router.push("/");
        // }
      }
      return response._data;
    },
  });

  return {
    provide: {
      apiSettings: axiosSettings,
    },
  };
});
