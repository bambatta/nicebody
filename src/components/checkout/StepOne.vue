<template>
  <div class="checkout__container">
    <ClientOnly>
      <WrapperLoad v-model="load">
        <vee-form
          @invalid-submit="scrollToErrors"
          @submit="onSubmit"
          :validation-schema="tokenCookie ? scheme : schemeToken"
          class="checkout-form default__form"
        >
          <div v-if="!tokenCookie" class="default__form-title_wrapper">
            <h5 class="default__form-title">Contact information</h5>
            <button
              class="default-btn_border-none default-text_pink"
              @click.prevent="showModalLogin = !showModalLogin"
            >
              I have an account
            </button>
          </div>
          <FieldsInput
            v-if="!tokenCookie"
            label="E-mail"
            name="email"
            v-model="email"
            class="default__form-input"
          />

          <div class="default__form-backdown"></div>
          <h5 class="default__form-title">Shipping address</h5>

          <FieldsSelect
            label="Country/region"
            name="country"
            @search="searchCountry"
            :options="country"
            searchable
            :load="loadSelect"
            :reduce="(el) => el.code"
            v-model="checkout.country"
          />
          <FieldsInput
            label="State"
            name="state"
            v-model="checkout.state"
            class="default__form-input"
          />
          <div class="default__form-block">
            <FieldsInput
              label="First name"
              name="firstname"
              v-model="checkout.firstname"
              class="default__form-input"
            />
            <FieldsInput
              label="Last name"
              name="lastname"
              v-model="checkout.lastname"
              class="default__form-input"
            />
          </div>
          <FieldsInput
            label="Adress"
            name="address"
            v-model="checkout.address"
            class="default__form-input"
          />
          <FieldsInput
            label="Apartment, suite, etc. (optional)"
            name="apartment"
            v-model="checkout.apartment"
            class="default__form-input"
          />
          <div class="default__form-block">
            <FieldsInput
              label="City"
              name="city"
              v-model="checkout.city"
              class="default__form-input"
            />
            <FieldsInput
              label="ZIP Code"
              name="zipcode"
              v-model="checkout.zipcode"
              class="default__form-input"
            />
          </div>
          <FieldsTelPhone
            name="phone"
            v-model="checkout.phone"
            placeholder="Phone number"
            @valid="validPhone = $event"
          />
          <div v-if="payments.length > 1" class="default__form-item_wrapper">
            <h5 class="default__form-title">Payment method</h5>
            <div
              v-for="(payment, index) in payments"
              :key="index"
              class="default__form-item"
            >
              <FieldsRadioDefault
                name="payment"
                v-model="paymentMethod.gateway"
                :value="payment.key"
                booleanValue
                labelImg
              >
                <template #label-img>
                  <BaseImage
                    :src="`/images/checkout/${payment.key}.svg`"
                    customClass="default__form-info img"
                  />
                </template>
              </FieldsRadioDefault>
            </div>
          </div>

          <p class="auth-text default-text_black">
            By clicking Pay now you agree with with
            <button
              class="default-btn_border-none default-text_pink"
              @click.prevent="getModalAgree('terms-service')"
            >
              Terms of Service
            </button>
            and
            <button
              class="default-btn_border-none default-text_pink"
              @click.prevent="getModalAgree('privacy-policy')"
            >
              Privacy Policy
            </button>
          </p>
          <button type="submit" class="default-btn default-text">
            Pay now
          </button>
        </vee-form>
      </WrapperLoad>
    </ClientOnly>
    <WrapperLoad v-model="load">
      <ClientOnly>
        <teleport to="body">
          <b-modal
            hide-footer
            hide-header
            centered
            ok-only
            id="login"
            class="auth"
            v-model="showModalLogin"
          >
            <div class="modal-header">
              <h3 class="default-title">
                {{ !forgot ? "Sign in" : "Reset password" }}
              </h3>
              <button class="close-btn" @click.prevent="showModalLogin = false">
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div class="modal-wrapper">
              <div
                v-if="!forgot && socialites.length !== 0"
                class="auth-social"
              >
                <span class="default-text_black">Sign in with:</span>
                <button
                  v-for="(socialite, index) in socialites"
                  :key="index"
                  class="modal-social"
                  @click="socialAuth(socialite)"
                >
                  <BaseImage
                    :src="`/images/${socialite}.webp`"
                    customClass="modal-social"
                  />
                </button>
              </div>
              <p
                v-if="!forgot && socialites.length !== 0"
                class="modal-or default-text_black"
              >
                OR
              </p>
              <WrapperLoad v-model="load">
                <vee-form
                  v-if="!forgot"
                  @submit="loginSubmit"
                  class="modal-form"
                >
                  <FieldsInput
                    placeholder="Phone or email"
                    v-model="login.email"
                    class="default__form-input"
                    name="login"
                  />
                  <FieldsInput
                    placeholder="Password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="login.password"
                    class="default__form-input"
                    name="password"
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
                      </button>
                    </template>
                  </FieldsInput>

                  <div class="auth-bottom">
                    <FieldsCheckbox
                      label="Remember me"
                      id="remember"
                      v-model="login.remember"
                    />
                    <button
                      class="default-btn_border-none default-text_pink"
                      @click.prevent="forgot = !forgot"
                    >
                      I forgot password
                    </button>
                  </div>
                  <div class="modal-btn__wrapper">
                    <button class="default-btn default-text" type="submit">
                      Sign in</button
                    ><button
                      class="default-btn_border"
                      @click.prevent="togglenModal"
                    >
                      Sign Up
                    </button>
                  </div>
                </vee-form>
                <vee-form
                  v-else
                  @submit="sentForm"
                  class="modal-form modal-form__forgot"
                >
                  <FieldsInput
                    v-if="!forgotReset"
                    placeholder="Email"
                    v-model="forgotForm.email"
                    class="default__form-input"
                    name="email"
                  />
                  <div v-else>
                    <FieldsInput
                      placeholder="Code"
                      v-model="forgotForm.code"
                      class="default__form-input"
                      name="code"
                    />
                    <p class="auth-text default-text_black" type="submit">
                      Don’t have a code?
                      <button
                        class="default-btn_border-none default-text_pink"
                        @click.prevent="forgotReset = !forgotReset"
                      >
                        Send code again
                      </button>
                    </p>

                    <FieldsInput
                      placeholder="New password"
                      :type="forgotPasswordShow ? 'text' : 'password'"
                      v-model="forgotForm.password"
                      class="default__form-input"
                      name="password"
                      afterInput
                    >
                      <template #afterInput>
                        <button
                          @click.prevent="
                            forgotPasswordShow = !forgotPasswordShow
                          "
                          class="default-btn_border-none"
                        >
                          <BaseIconSvg
                            :icon-name="forgotPasswordShow ? 'show' : 'showed'"
                            width="23px"
                            height="14px"
                            customClass="icon-help"
                          />
                        </button>
                      </template>
                    </FieldsInput>

                    <FieldsInput
                      placeholder="Confirm password"
                      :type="forgotConfirmPasswordShow ? 'text' : 'password'"
                      v-model="forgotForm.confirm_password"
                      class="default__form-input"
                      name="confirm_password"
                      afterInput
                    >
                      <template #afterInput>
                        <button
                          @click.prevent="
                            forgotConfirmPasswordShow =
                              !forgotConfirmPasswordShow
                          "
                          class="default-btn_border-none"
                        >
                          <BaseIconSvg
                            :icon-name="
                              forgotConfirmPasswordShow ? 'show' : 'showed'
                            "
                            width="23px"
                            height="14px"
                            customClass="icon-help"
                          />
                        </button>
                      </template>
                    </FieldsInput>
                  </div>

                  <div v-if="!forgotReset" class="modal-btn__wrapper">
                    <button class="default-btn default-text" type="submit">
                      Send code
                    </button>
                    <button
                      class="default-btn_border"
                      @click="forgot = !forgot"
                    >
                      Go back
                    </button>
                  </div>
                  <div v-else class="modal-btn__wrapper">
                    <button class="default-btn default-text" type="submit">
                      Change password
                    </button>
                    <button
                      class="default-btn_border"
                      @click="forgot = !forgot"
                    >
                      Go back
                    </button>
                  </div>
                </vee-form>
              </WrapperLoad>
            </div>
          </b-modal>
        </teleport>
      </ClientOnly>
      <ClientOnly>
        <teleport to="body">
          <b-modal
            hide-footer
            hide-header
            centered
            ok-only
            id="registration"
            class="auth"
            v-model="showModalRegistration"
          >
            <div class="modal-header">
              <h3 class="default-title">Register</h3>
              <button
                class="close-btn"
                @click.prevent="showModalRegistration = !showModalRegistration"
              >
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div class="modal-wrapper">
              <WrapperLoad v-model="load">
                <div
                  v-if="!forgot && socialites.length !== 0"
                  class="auth-social"
                >
                  <span class="default-text_black">Sign in with:</span>
                  <button
                    v-for="(socialite, index) in socialites"
                    :key="index"
                    class="modal-social"
                    @click="socialAuth(socialite)"
                  >
                    <BaseImage
                      :src="`/images/${socialite}.webp`"
                      customClass="modal-social"
                    />
                  </button>
                </div>
                <p
                  v-if="!forgot && socialites.length !== 0"
                  class="modal-or default-text_black"
                >
                  OR
                </p>

                <vee-form
                  v-if="!codeConfirm"
                  @submit="registrationSubmit"
                  :validation-schema="scheme"
                  class="modal-form modal-form__register"
                >
                  <FieldsInput
                    label="Name"
                    v-model="registration.name"
                    class="default__form-input"
                    name="name"
                  />

                  <FieldsTelPhone
                  name="phone"
                  v-model="registration.phone"
                  placeholder="Phone number"
                  @valid="validPhone = $event"
                  />

                  <FieldsInput
                    label="E-mail"
                    name="email"
                    v-model="registration.email"
                    class="default__form-input"
                  />

                  <FieldsCheckbox
                    label="E-mail me with news and offers"
                    id="offers"
                    v-model="registration.accept"
                    name="accept"
                  />
                  <FieldsInput
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="registration.password"
                    class="default__form-input"
                    name="password"
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
                      </button>
                    </template>
                  </FieldsInput>
                  <FieldsInput
                    v-model="confirm_password"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm password"
                    class="default__form-input"
                    name="confirm_password"
                    afterInput
                  >
                    <template #afterInput>
                      <button
                        @click.prevent="
                          showConfirmPassword = !showConfirmPassword
                        "
                        class="default-btn_border-none"
                      >
                        <BaseIconSvg
                          :icon-name="showConfirmPassword ? 'show' : 'showed'"
                          width="23px"
                          height="14px"
                          customClass="icon-help"
                        />
                      </button>
                    </template>
                  </FieldsInput>

                  <div class="modal-btn__wrapper">
                    <button class="default-btn default-text" type="submit">
                      Register</button
                    ><button
                      class="default-btn_border"
                      @click.prevent="togglenModal"
                    >
                      I have account
                    </button>
                  </div>
                  <p id="box" class="auth-text default-text_black">
                    By clicking Register you agree with with
                    <button
                      class="default-btn_border-none default-text_pink"
                      @click.prevent="getModalAgree('terms-service')"
                    >
                      Terms of Service
                    </button>
                    and
                    <button
                      class="default-btn_border-none default-text_pink"
                      @click.prevent="getModalAgree('privacy-policy')"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </vee-form>
                <vee-form @submit="verify" v-else class="modal-form">
                  <FieldsInput
                    placeholder="Code"
                    v-model="code"
                    class="default__form-input"
                    name="code"
                  />
                  <p class="auth-text default-text_black">
                    The code was sent to the mail.

                    <button
                      class="default-btn_border-none default-text_pink"
                      @click.prevent="resendVerify"
                    >
                      Send the code
                    </button>
                  </p>
                  <div class="modal-btn__wrapper">
                    <button class="default-btn default-text" type="submit">
                      Confirm code</button
                    ><button
                      class="default-btn_border"
                      @click="codeConfirm = !codeConfirm"
                    >
                      Go back
                    </button>
                  </div>
                </vee-form>
              </WrapperLoad>
            </div>
          </b-modal>
        </teleport>
      </ClientOnly>
      <ClientOnly>
        <teleport to="body">
          <b-modal
            hide-footer
            hide-header
            centered
            ok-only
            class="auth static-page"
            id="modal"
            v-model="showModalPolicy"
          >
            <div class="modal-header">
              <h3 class="default-title">{{ modalPolicy.name }}</h3>
              <button
                class="close-btn"
                @click.prevent="showModalPolicy = !showModalPolicy"
              >
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div v-html="modalPolicy.body"></div>
          </b-modal>
        </teleport>
      </ClientOnly>
      <ClientOnly>
        <teleport to="body">
          <b-modal
            hide-footer
            hide-header
            centered
            ok-only
            id="order"
            class="order"
            v-model="showOderModal"
          >
            <div class="modal-header">
              <button class="close-btn" @click="showOderModal = false">
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div class="main-page__subscribe-wrapper">
              <h2 class="default-title">Get <span>10% off</span> your order</h2>
              <p class="default-text_black">
                Sign up and unlock your instant discount (you can unsubscribe at
                any time)
              </p>
              <vee-form
                v-if="!submitOrderForm"
                @submit="submitOrder"
                class="default__form"
              >
                <FieldsInput
                  placeholder="E-mail"
                  name="email"
                  v-model="order.email"
                />
                <button class="default-btn default-text" type="submit">
                  Get
                </button>
                <button
                  class="default-btn_border"
                  @click.prevent="showOderModal = false"
                >
                  No, thanks
                </button>
              </vee-form>
              <div v-if="submitOrderForm">
                <div class="main-page__subscribe-cart">
                  <p class="default-text">
                    {{ subscribeOrderText }}
                  </p>
                </div>
              </div>
              <button v-if="submitOrderForm" class="default-btn_border">
                Go shopping
              </button>
            </div>
          </b-modal>
        </teleport>
      </ClientOnly>
    </WrapperLoad>
  </div>
</template>
<script setup>
import * as yup from "yup";
import { ref } from "vue";

const props = defineProps({
  shipping: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["step"]);
const router = useRouter();
const schemeToken = yup.object().shape({
  email: yup.string().required().email(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  state: yup.string().required(),
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
  country: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  zipcode: yup.string().required(),
});
const scheme = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  state: yup.string().required(),
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
  country: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  zipcode: yup.string().required(),
});
let cartId = useCookie("");

let loadSelect = ref(false);
let country = ref([]);
let store = $store();
let email = ref(store.checkout.checkout?.shipping?.email || "");
let checkout = ref({
  lastname: props.shipping.lastname || "",
  state: props.shipping.state || "",
  firstname: props.shipping.firstname || "",
  phone: props.shipping.phone || "",
  country: props.shipping.country || "US",
  address: props.shipping.address || "",
  apartment: props.shipping.apartment || "",
  city: props.shipping.city || "",
  zipcode: props.shipping.zipcode || "",
});
let showPassword = ref(false),
  showConfirmPassword = ref(false),
  forgotReset = ref(false);
let forgotForm = ref({
  email: "",
  password: "",
  code: "",
  confirm_password: "",
});
let order = ref({ email: "", type: "newsletter" }),
  validPhone = ref(false);
let showModalPolicy = ref(false),
  load = ref(false),
  socialites = ref([]),
  forgot = ref(false),
  codeConfirm = ref(false),
  forgotPasswordShow = ref(false),
  forgotConfirmPasswordShow = ref(false),
  modalPolicy = ref({ name: "", body: "" });
let paymentMethod = ref({ gateway: "" });
let tokenCookie = useCookie("access_token"),
  showOderModal = ref(false);
let showModalLogin = ref(false),
  showModalRegistration = ref(false);
let login = ref({ email: "", password: "", remember: false });
let payments = ref([]);
let registration = ref({
  name: "",
  phone: "",
  email: "",
  accept: false,
  password: "",
});

//--  Auth
async function registrationSubmit(val, actions) {
  try {
    if (confirm_password.value === registration.value.password) {
      const { payload } = await $api().registration.get(registration.value);
      codeConfirm.value = true;
      showModalRegistration.value = true;
    } else {
      actions.setErrors({
        confirm_password: ["Password and confirm password is diferent"],
      });
    }
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}
async function getModalAgree(slug) {
  load.value = true;
  try {
    const { data } = await await $api().pages.get(slug);
    modalPolicy.value = data;
    showModalPolicy.value = !showModalPolicy.value;
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
async function loginSubmit(val, actions) {
  try {
    const { data } = await $api().login.get(login.value);
    tokenCookie.value = data.access_token;
    showOderModal.value = !showOderModal.value;
    if (val !== false) {
      showModalLogin.value = !showModalLogin.value;
    }
    if (router.currentRoute.value.query.slug) {
      changeVariation(router.currentRoute.value.query.slug);
    }
    actions.resetForm({
      email: "",
      password: "",
      remember: "",
    });
    setTimeout(() => {
      getProfile();
      getShipping();
    }, 1);
  } catch (e) {
    if (e?.data?.status === "unverified") {
      registerCode();
    }
    actions.setErrors(e.data.errors);
  }
}
function registerCode() {
  showModalLogin.value = false;
  codeConfirm.value = true;
  showModalRegistration.value = true;
  registration.value.email = login.value.email;
  resendVerify();
}
async function resendVerify() {
  try {
    const data = await $api().verify.resend({
      email: registration.value.email,
    });
  } catch (e) {
    console.error(e);
  }
}
async function verify(val, actions) {
  try {
    await $api().verify.get({
      email: registration.value.email,
      code: code.value,
    });
    login.value.email = registration.value.email;
    login.value.password = registration.value.password;
    showModalRegistration.value = !showModalRegistration.value;
    loginSubmit(false);
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}
async function sentEmail(val, actions) {
  try {
    await $api().password.forgotPassword({
      email: forgotForm.value.email,
    });
    forgotReset.value = !forgotReset.value;
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}
async function sentResetPassword(val, actions) {
  try {
    if (forgotForm.value.confirm_password === forgotForm.value.password) {
      await $api().password.resetPassword(forgotForm.value);
      forgotReset.value = !forgotReset.value;
      forgot.value = false;
    } else {
      actions.setErrors({
        confirm_password: ["Password and confirm password is diferent"],
      });
    }
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}

function togglenModal() {
  showModalLogin.value = !showModalLogin.value;
  showModalRegistration.value = !showModalRegistration.value;
  forgot.value = false;
}
async function socialAuth(social) {
  try {
    const data = await $api().socialite.get(social);
    window.location.href = data.destination;
  } catch (e) {
    console.error(e);
  }
}
async function getSocialite() {
  load.value = true;
  try {
    const data = await $api().suggest.getSocialite();
    socialites.value = data.data.socialites;
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
function sentForm(val, actions) {
  if (forgotReset.value !== true) {
    sentEmail(val, actions);
  } else {
    sentResetPassword(val, actions);
  }
}

//--  Methods
function toggleMenu() {
  $store().menu.setMenu(!$store().menu.$state.menu);
  menuActive.value = !menuActive.value;
}
function toggelMenuUser() {
  menuActiveUser.value = !menuActiveUser.value;
}
async function searchCountry(e) {
  loadSelect.value = true;
  try {
    let { data } = await $api().suggest.getCountry({
      q: e,
    });
    country.value = await data;
  } catch (e) {
    console.error(e);
  } finally {
    loadSelect.value = false;
  }
}
async function getProfile() {
  load.value = true;
  try {
    const { data } = await $api().my.getProfile();

    email.value = data.email;
  } catch (e) {
    console.log(e);
  } finally {
    load.value = false;
  }
}
async function getShipping() {
  load.value = true;
  try {
    const { data } = await $api().my.getShipping();
    checkout.value = {
      lastname: data.lastname || "",
      firstname: data.firstname || "",
      phone: data.phone || "",
      country: data.country || "",
      state: data.state || "",
      address: data.address || "",
      apartment: data.apartment || "",
      city: data.city || "",
      zipcode: data.zipcode || "",
    };
  } catch (e) {
    console.log(e);
  } finally {
    load.value = false;
  }
}

async function onSubmit(val, actions) {
  load.value = true;
  try {
    let payload = {
      shipping: {
        lastname: checkout.value.lastname,
        firstname: checkout.value.firstname,
        phone: checkout.value.phone,
        country: checkout.value.country,
        state: checkout.value.state,
        address: checkout.value.address,
        apartment: checkout.value.apartment,
        city: checkout.value.city,
        zipcode: checkout.value.zipcode,
        method: "postal",
      },
      payment: { gateway: paymentMethod.value.gateway },
      email: email.value,
    };
    if (!paymentMethod.value.gateway) {
      delete payload.payment;
    }
    const data = await $api().carts.checkout(payload);
    if (data.destination.length !== 0) {
      window.location.href = data.destination;
    } else {
      router.push("/checkout/success");
    }
  } catch (e) {
    actions.setErrors(e.data.errors);
  } finally {
    load.value = false;
  }
}
function scrollToErrors(e) {
  const hasError = document.getElementsByClassName("errors");

  hasError[0].scrollIntoView({ block: "center", behavior: "smooth" });
}
async function getPayment() {
  load.value = true;
  try {
    const { data } = await $api().suggest.getPayments();

    activePayment(data);
  } catch (e) {
    console.log(e);
  } finally {
    load.value = false;
  }
}
function activePayment(arr) {
  arr.forEach((element) => {
    if (element.active === "1") {
      payments.value.push(element);
    }
  });
  paymentMethod.value.gateway = payments.value[0].key;
}

onMounted(async () => {
  getSocialite();
  getPayment();
  searchCountry();
  if (tokenCookie.value) {
    getProfile();
    getShipping();
  }
});

watch(
  () => props.shipping,
  (value) => {
    checkout.value = value;
  }
);
</script>
