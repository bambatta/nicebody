<template>
  <div class="profile">
    <BlocksNavigation :tokenCookie="tokenCookie" />
    <WrapperLoad v-model="load">
      <div class="default-page__container">
        <div class="profile-wrapper">
          <div v-show="!activeBlock" class="profile__block">
            <div class="profile__block-top">
              <h2 class="profile__block-title">My profile</h2>
              <button
                class="default-btn_border-none default-text_pink media"
                @click="toogleBlock"
              >
                See Order history
              </button>
              <button
                class="default-btn_border-none default-text_pink"
                @click.prevent="logoutModal"
              >
                Log out
              </button>
            </div>

            <div class="profile-accordion">
              <div class="profile__accordion-item">
                <p>
                  <button
                    class="profile-btn__collapse collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample2"
                    aria-expanded="false"
                    aria-controls="collapseExample2"
                  >
                    <span class="default-title profile__accordion-title"
                      ><span>Profile</span> information</span
                    >
                    <BaseIconSvg
                      icon-name="toggle"
                      width="13"
                      height="7"
                      customClass="icon-pink"
                    />
                  </button>
                </p>
                <div class="collapse" id="collapseExample2">
                  <vee-form
                    @submit="updateProfile"
                    :validation-schema="scheme"
                    class="checkout-form default__form"
                  >
                    <FieldsInput
                      label="Name"
                      class="default__form-input"
                      name="name"
                      v-model="profile.name"
                    >
                    </FieldsInput>

                    <FieldsInput
                      label="Email"
                      class="default__form-input"
                      name="email"
                      v-model="profile.email"
                    >
                    </FieldsInput>

                    <FieldsTelPhone
                      name="phone"
                      v-model="profile.phone"
                      placeholder="Phone number"
                      @valid="validPhone = $event"
                    />

                    <div v-show="chancePassword" class="profile-password">
                      <FieldsInput
                        placeholder="New password"
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        class="default__form-input"
                        v-model="profile.password"
                        afterInput
                      >
                        <template #afterInput>
                          <button
                            @click.prevent="showPassword = !showPassword"
                            class="default-btn_border-none"
                          >
                            <BaseIconSvg
                              :icon-name="showPassword ? 'show' : 'showed'"
                              width="23px"
                              height="14px"
                              customClass="icon-help"
                            />
                          </button> </template
                      ></FieldsInput>
                      <FieldsInput
                        placeholder="Confirm password"
                        :type="confirmPassword ? 'text' : 'password'"
                        name="confirm_password"
                        class="default__form-input"
                        v-model="profile.password_confirmation"
                        afterInput
                        ><template #afterInput>
                          <button
                            @click.prevent="confirmPassword = !confirmPassword"
                            class="default-btn_border-none"
                          >
                            <BaseIconSvg
                              :icon-name="confirmPassword ? 'show' : 'showed'"
                              width="23px"
                              height="14px"
                              customClass="icon-help"
                            />
                          </button> </template
                      ></FieldsInput>
                    </div>
                    <button
                      v-show="!chancePassword"
                      @click.prevent="chancePassword = !chancePassword"
                      class="default-btn_border-none default-text_pink"
                    >
                      Change password
                    </button>
                    <button class="default-btn_border" type="submit">
                      Save
                    </button>
                  </vee-form>
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
                    <span v-if="popapSuccess">
                      The profile has been update</span
                    >
                    <span v-else> Profile not updated</span>
                  </div>
                </div>
              </div>
              <div class="profile__accordion-item">
                <p>
                  <button
                    class="profile-btn__collapse collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample3"
                    aria-expanded="false"
                    aria-controls="collapseExample3"
                  >
                    <span class="default-title profile__accordion-title"
                      ><span>Shipping</span> address</span
                    >
                    <BaseIconSvg
                      icon-name="toggle"
                      width="13"
                      height="7"
                      customClass="icon-pink"
                    />
                  </button>
                </p>
                <div class="collapse" id="collapseExample3">
                  <vee-form
                    @submit="updateShipping"
                    class="checkout-form default__form"
                    autocomplete="off"
                  >
                    <FieldsSelect
                      label="Country/region"
                      name="country"
                      @search="searchCountry"
                      :options="countries"
                      searchable
                      :load="loadSelect"
                      :reduce="(el) => el.code"
                      v-model="shipping.country"
                    />
                    <FieldsInput
                      label="State"
                      placeholder="State"
                      name="state"
                      v-model="shipping.state"
                      class="default__form-input"
                    />
                    <div class="default__form-block">
                      <FieldsInput
                        label="First name"
                        name="firstname"
                        v-model="shipping.firstname"
                        class="default__form-input"
                      />
                      <FieldsInput
                        label="Last name"
                        name="lastname"
                        v-model="shipping.lastname"
                        class="default__form-input"
                      />
                    </div>

                    <FieldsInput
                      label="Adress"
                      name="address"
                      v-model="shipping.address"
                      class="default__form-input"
                    />
                    <FieldsInput
                      label="Apartment, suite, etc. (optional)"
                      name="apartment"
                      v-model="shipping.apartment"
                      class="default__form-input"
                    />
                    <div class="default__form-block">
                      <FieldsInput
                        label="City"
                        name="city"
                        v-model="shipping.city"
                        class="default__form-input"
                      />

                      <FieldsInput
                        label="Zip code"
                        name="zipcode"
                        v-model="shipping.zipcode"
                        class="default__form-input"
                      />
                    </div>
                    <FieldsTelPhone
                      name="phone"
                      v-model="shipping.phone"
                      placeholder="Phone number"
                    />
                    <button
                      v-show="isButton"
                      class="default-btn_border"
                      type="submit"
                    >
                      Save
                    </button>
                  </vee-form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="profile__block profile__order"
            :class="{ active: activeBlock }"
          >
            <div class="profile__block-top">
              <h2 class="profile__block-title">Order history</h2>
              <button
                class="default-btn_border-none default-text_pink media"
                @click="toogleBlock"
              >
                My profile
              </button>
            </div>

            <BlocksProduct
              class="default__form-input"
              order
              :options="order"
              @update="getProfile"
            >
            </BlocksProduct>
          </div>
        </div>
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
          v-model="showLogout"
        >
          <div class="modal-header">
            <h3 class="default-title">Are you sure you want to log out?</h3>
            <button class="close-btn" @click.prevent="showLogout = !showLogout">
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
              <button @click="logout()" class="default-btn default-text">
                Log out</button
              ><button
                class="default-btn_border"
                @click="showLogout = !showLogout"
              >
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
import * as yup from "yup";
let router = useRouter();
let subscription = ref({ email: "" }),
  load = ref(false),
  tokenCookie = useCookie("access_token"),
  order = ref([]),
  countries = ref([]),
  showLogout = ref(false),
  isButton = ref(false),
  active = ref(false),
  chancePassword = ref(false),
  confirmPassword = ref(false),
  loadSelect = ref(false),
  profile = ref({
    email: "",
    phone: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
let shipping = ref({
  firstname: "",
  lastname: "",
  country: "",
  state: "",
  phone: "",
  city: "",
  zipcode: "",
  address: "",
  apartment: "",
});
let showPassword = ref(false);
let popapFail = ref(false),
  popapSuccess = ref(false);
let activeBlock = ref(false);
let validPhone = ref(false);

const scheme = yup.object().shape({
  phone: yup
    .string()
    .test({
      name: "power_supply",
      message: "Invalid Number",
      test: () => {
        return validPhone.value;
      },
    })
    .required(),
});
useHead({
  title: "NICEBODY - Profile",
});
function toogleBlock() {
  activeBlock.value = !activeBlock.value;
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
function logoutModal() {
  showLogout.value = !showLogout.value;
}
async function getProfile() {
  load.value = true;
  try {
    const payload = await Promise.all([
      $api().suggest.getCountry(),
      $api().my.getProfile(),
      $api().my.getOrder(),
      $api().my.getShipping(),
    ]);
    countries.value = payload[0].data;
    subscription.value.email = payload[1].data.email;

    profile.value = {
      name: payload[1].data.name,
      email: payload[1].data.email,
      phone: `+${payload[1].data.phone}`,
    };
    order.value = payload[2].data;
    shipping.value = payload[3].data;
    active.value = true;
    isButton.value = true;
  } catch (e) {
    console.log(e);
  } finally {
    load.value = false;
  }
}
async function updateProfile(val, actions) {
  load.value = true;
  let payload = {};
  if (!chancePassword.value) {
    payload = {
      phone: profile.value.phone,
      email: profile.value.email,
      name: profile.value.name,
    };
  } else {
    payload = {
      phone: profile.value.phone,
      email: profile.value.email,
      name: profile.value.name,
      password: profile.value.password,
      password_confirmation: profile.value.password_confirmation,
    };
  }

  try {
    const { data } = await $api().my.updateProfile(payload);
    deletePopapSuccess();
    chancePassword.value = false;
  } catch (e) {
    deletePopapFail();
    actions.setErrors(e.data.errors);
  } finally {
    load.value = false;
  }
}
async function updateShipping(val, actions) {
  load.value = true;
  try {
    await $api().my.updateShipping(shipping.value);
  } catch (e) {
    actions.setErrors(e.data.errors);
  } finally {
    load.value = false;
  }
}
async function logout() {
  load.value = true;
  try {
    let tokenCookie = useCookie("access_token");
    await $api().logout.get(tokenCookie.value);
    router.push("/");
    tokenCookie.value = "";
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
async function searchCountry(e) {
  loadSelect.value = true;
  try {
    let { data } = await $api().suggest.getCountry({
      q: e,
      limit: 10,
    });
    countries.value = await data;
  } catch (e) {
    actions.setErrors(e.data.errors);
  } finally {
    loadSelect.value = false;
  }
}
onMounted(() => {
  getProfile();
  $store().cart.setCart();
});
watch(
  () => shipping.value,
  (val) => {
    isButton.value = true;
    if (active.value) {
      isButton.value = false;
      active.value = false;
    }
  },
  { deep: true }
);
</script>
