<template>
  <div class="default-page__container">
    <div class="navigation">
      <NuxtLink to="/">
        <BaseImage
          src="/images/logo.svg"
          alt="Header Logo"
          customClass="main-page__logo"
        />
      </NuxtLink>
      <nav>
        <ul class="navigation-list toggle" :class="{ active: menuActive }">
          <li>
            <button class="close-btn" @click="toggleMenu">
              <BaseIconSvg
                icon-name="close"
                width="16"
                height="16"
                customClass="icon-pink"
              />
            </button>
          </li>
          <li><NuxtLink to="/" class="default-text_black">Home</NuxtLink></li>
          <li class="navigation-item">
            <NuxtLink to="/tracking" class="default-text_black">
              Tracking</NuxtLink
            >
          </li>
          <li class="navigation-item">
            <NuxtLink to="/contact" class="default-text_black"
              >Contact us
            </NuxtLink>
          </li>
          <li
            v-if="store.variables.variables?.site?.email"
            class="navigation-item_contact"
          >
            <NuxtLink
              :to="`mailto:${store.variables.variables?.site?.email || ''}`"
              class="default-text_pink"
            >
              {{ store.variables.variables?.site?.email }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="navigation-btn">
        <button
          v-if="tokenCookie"
          class="navigation__menu-btn_user"
          :class="{ active: menuActiveUser }"
          @click="toggelMenuUser"
        >
          <BaseIconSvg icon-name="basket" width="27px" height="25px" />
          <BaseIconSvg
            icon-name="toggle"
            width="10"
            height="5"
            customClass="toggle"
          />
        </button>
        <button
          v-else
          class="navigation__menu-btn_user"
          @click="showModalLogin = !showModalLogin"
        >
          <BaseIconSvg icon-name="basket" width="27px" height="25px" />

          <span class="default-text_black">Sign in</span>
        </button>
        <button class="navigation_cart" @click="activatedCart">
          <BaseIconSvg icon-name="cart" />
          <span v-if="store.cart.cartQuantity > 0" class="navigation-count">
            {{ store.cart.cartQuantity }}</span
          >
        </button>

        <button class="navigation__menu-btn" @click="toggleMenu">
          <BaseIconSvg icon-name="burger" width="30" height="21" />
        </button>
        <ul class="navigation__user-list" :class="{ active: menuActiveUser }">
          <li class="navigation__user-item">
            <NuxtLink to="/profile" class="default-text_black"
              >Profile</NuxtLink
            >
          </li>
          <li class="navigation__user-item">
            <button
              class="default-btn_border-none default-text_black"
              @click="showLogout = !showLogout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>

    <ClientOnly
      ><teleport to="body">
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
              v-if="
                !forgot && store.variables.variables?.socialites.length !== 0
              "
              class="auth-social"
            >
              <span class="default-text_black">Sign in with:</span>
              <button
                v-for="(socialite, index) in store.variables.variables
                  ?.socialites"
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
              v-if="
                !forgot && store.variables.variables?.socialites.length !== 0
              "
              class="modal-or default-text_black"
            >
              OR
            </p>
            <WrapperLoad v-model="load">
              <vee-form v-if="!forgot" @submit="loginSubmit" class="modal-form">
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
                          forgotConfirmPasswordShow = !forgotConfirmPasswordShow
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
                  <button class="default-btn_border" @click="forgot = !forgot">
                    Go back
                  </button>
                </div>
                <div v-else class="modal-btn__wrapper">
                  <button class="default-btn default-text" type="submit">
                    Change password
                  </button>
                  <button class="default-btn_border" @click="forgot = !forgot">
                    Go back
                  </button>
                </div>
              </vee-form>
            </WrapperLoad>
          </div>
        </b-modal></teleport
      >
    </ClientOnly>
    <ClientOnly
      ><teleport to="body">
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
                v-if="
                  !forgot && store.variables.variables?.socialites.length !== 0
                "
                class="auth-social"
              >
                <span class="default-text_black">Sign in with:</span>
                <button
                  v-for="(socialite, index) in store.variables.variables
                    ?.socialites"
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
                v-if="
                  !forgot && store.variables.variables?.socialites.length !== 0
                "
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
                  v-model="registration.password_confirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirm password"
                  class="default__form-input"
                  name="password_confirmation"
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
                <p class="auth-text default-text_black">
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
        </b-modal></teleport
      >
    </ClientOnly>
    <ClientOnly
      ><teleport to="body">
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
          <div v-html="modalPolicy.body"></div> </b-modal
      ></teleport>
    </ClientOnly>
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
            <h3 class="default-title">
              Are you sure you want to cancel the order?
            </h3>
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
              <button
                @click="tokenCookie = ''"
                class="default-btn default-text"
              >
                Cancel</button
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
const props = defineProps({
  tokenCookie: {
    type: String,
    default: "basket",
  },
});
let store = $store();
let validPhone = ref(false);
let menuActive = ref(false);
let menuActiveUser = ref(false);
let confirm_password = ref("");
const router = useRouter();
let showPassword = ref(false),
  showConfirmPassword = ref(false),
  showResetPassword = ref(false),
  forgotReset = ref(false);
let forgotForm = ref({
  email: "",
  password: "",
  code: "",
  confirm_password: "",
});

let showModalPolicy = ref(false),
  load = ref(false),
  forgot = ref(false),
  codeConfirm = ref(false),
  forgotPasswordShow = ref(false),
  forgotConfirmPasswordShow = ref(false),
  modalPolicy = ref({ name: "", body: "" });
let tokenCookie = useCookie("access_token"),
  showOderModal = ref(false),
  code = ref("");
let showModalLogin = ref(false),
  showLogout = ref(false),
  showModalRegistration = ref(false);
let login = ref({ email: "", password: "", remember: false });
let registration = ref({
  name: "",
  phone: "",
  email: "",
  accept: false,
  password: "",
  password_confirmation: ""
});

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
//--  Auth
async function registrationSubmit(val, actions) {
  try {
    if (registration.value.password_confirmation === registration.value.password) {
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

    if (val !== false) {
      showModalLogin.value = !showModalLogin.value;
    }
    if (router.currentRoute.value.query.slug) {
      changeVariation(router.currentRoute.value.query.slug);
    } else {
      getProgucts();
    }
    actions.resetForm({
      email: "",
      password: "",
      remember: "",
    });
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
async function logout() {
  load.value = true;
  try {
    await $api().logout.get(tokenCookie.value);
    tokenCookie.value = "";
    showLogout.value = !showLogout.value;
    router.push("/");
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
function activatedCart() {
  $store().cart.setCartActive(false);
  $store().cart.setCart();
}
onMounted(() => {
  window.addEventListener("click", (e) => {
    let target = e.target;
    if (
      !target.closest(".navigation__menu-btn") &&
      !target.closest(".navigation-list")
    ) {
      menuActive.value = false;
    }
  });
  window.addEventListener("click", (e) => {
    let target = e.target;
    if (
      !target.closest(".navigation__menu-btn_user") &&
      !target.closest(".navigation__user-list")
    ) {
      menuActiveUser.value = false;
    }
  });
  window.addEventListener("click", (e) => {
    let target = e.target;
    if (
      !target.closest(".navigation_cart") &&
      !target.closest(".cart") &&
      !target.closest(".cart-btn")
    ) {
      $store().cart.setCartActive(true);
    }
  });
});
watch(
  () => props.tokenCookie,
  (value) => {
    tokenCookie.value = value;
  }
);
</script>
