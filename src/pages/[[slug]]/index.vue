<template>
  <div>
    <Head>
      <Meta property="og:url" :content="metaLinkAlternative" />
    </Head>
    <main>
      <div class="main-page">
        <div class="main-page__top">
          <BlocksNavigation :tokenCookie="tokenCookie" />
          <div class="default-page__container video-container">
            <div class="main-page__info">
              <h1 v-html="product.data.product.fields.title" class="main-page__info-title"></h1>
              <h4 v-html="product.data.product.fields.subtitle" class="main-page__info-subtitle"></h4>
              <BlocksVideo
                src="/video/movie.MOV"
                :poster="product.data.video_poster?.url"
                :videos="product.data?.videos"
              />
            </div>
            <a href="#main-page__product" class="main-page__link-product">
              <BaseIconSvg
                icon-name="arrow-down"
                height="41"
                width="20"
                customClass="icon-pink"
              />
            </a>
          </div>
        </div>
        <WrapperLoad v-model="load">
          <div class="default-page__container">
            <div class="main-page__product" id="main-page__product">
              <div class="main-page__swiper-wrapper">
                <ClientOnly>
                  <BlocksSwiper
                    :options="product.data.images"
                    carusel
                    fancybox
                  />
                </ClientOnly>
              </div>

              <div class="main-page__product-info">
                <h2 class="default-title">{{ product.data.name }}</h2>
                <form>
                  <div class="main-page__product-rating">
                    <ClientOnly>
                      <BlocksStarRating
                        v-model="rating"
                        :rating="+product.data.product?.rating"
                        read-only
                      />
                    </ClientOnly>
                    <a href="#review">
                      <span class="default-text_pink">{{
                        product.data.product?.rating
                      }}</span>
                    </a>
                  </div>
                  <div
                    v-for="(switching, index) in product.switching"
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
                          @click.prevent="
                            changeVariation(property.variation.slug)
                          "
                        />
                      </div>
                    </div>
                    <div v-else class="default__block-radio">
                      <div
                        v-for="(
                          itemProperty, indexProperty
                        ) in switching.properties"
                        :key="indexProperty"
                      >
                        <FieldsRadio
                          :content="itemProperty.property.value"
                          :name="switching.attribute.slug"
                          :value="itemProperty.is_current"
                          @click.prevent="
                            changeVariation(itemProperty.variation.slug)
                          "
                        />
                      </div>
                    </div>
                  </div>

                  <div class="main-page__quantity">
                    <BlocksCountner
                      :price="product.data.price"
                      :price-old="product.data.price_old"
                      v-model="quantity"
                    />
                    <div class="main-page__quantity-radio">
                      <FieldsRadioDiscount
                        content-count="2"
                        content-percent="20%"
                        name="quantity"
                        id="discount2"
                        :value="2"
                        v-model="quantity"
                      /><FieldsRadioDiscount
                        contentCount="3 and more"
                        contentPercent="30%"
                        :value="3"
                        name="quantity"
                        id="discount3"
                        v-model="quantity"
                      />
                    </div>
                  </div>
                  <div class="main-page__product-btn">
                    <button
                      class="default-btn default-text"
                      @click.prevent="addCart(product.data, true)"
                    >
                      Add to cart
                    </button>
                    <button
                      class="default-btn_border default-text"
                      @click.prevent="switchToCheckout(product.data)"
                    >
                      Buy One Click
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="main-page__list-wrapper">
              <div class="main-page__item-category chart">
                <div class="profile__accordion-item">
                  <p>
                    <button
                      class="profile-btn__collapse"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample3"
                      aria-expanded="false"
                      aria-controls="collapseExample3"
                    >
                      <h4 class="main-page__item-category head">
                        Characteristics
                      </h4>
                      <BaseIconSvg
                        icon-name="toggle"
                        width="20"
                        height="20"
                        customClass="icon-pink"
                      />
                    </button>
                  </p>
                  <div class="collapse show" id="collapseExample3">
                    <div v-html="product.data.product.fields.characteristics" class="chart-info">

                    </div>
                  </div>
                </div>
              </div>
              <div class="main-page__item-category chart">
                <div class="profile__accordion-item">
                  <p>
                    <button
                      class="profile-btn__collapse"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample2"
                      aria-expanded="false"
                      aria-controls="collapseExample2"
                    >
                      <h4 class="main-page__item-category head">Sizechart</h4>
                      <BaseIconSvg
                        icon-name="toggle"
                        width="20"
                        height="20"
                        customClass="icon-pink"
                      />
                    </button>
                  </p>
                  <div class="collapse show" id="collapseExample2">
                    <div v-html="product.data.product.fields.sizechart" class="chart-size">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WrapperLoad>
        <div class="main-page__advantage">
          <div class="default-page__container">
            <ul class="main-page__advantage-list">
              <li class="main-page__advantage-item">
                <BaseIconSvg icon-name="star" customClass="icon-pink " />
                <span class="default-text_black">Unique product</span>
              </li>
              <li class="main-page__advantage-item">
                <BaseIconSvg icon-name="support" customClass="icon-pink " />
                <span class="default-text_black">24/7 support</span>
              </li>
              <li class="main-page__advantage-item">
                <BaseIconSvg icon-name="return" customClass="icon-pink " />
                <span class="default-text_black">Return within 30 days</span>
              </li>
              <li class="main-page__advantage-item">
                <BaseIconSvg icon-name="shipping" customClass="icon-pink " />
                <span class="default-text_black"
                  >Free shipping with <span>subscription</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="default-page__container default-page__container_about"
        >
          <div class="main-page__about">
            <div class="main-page__about-info">
              <div class="main-page__about-images">
                <BaseImage
                  :src="product.data.image.url"
                  customClass="main-page__about-img"
                />
              </div>
              <div v-html="product.data.product.body" class="main-page__about-text">

              </div>
            </div>
          </div>
        </div>
        <div class="main-page__product-swiper">
          <div class="swiper-container">
            <h2 class="default-title main-page__product-title">
              You can also like
            </h2>
            <BlocksSwiper
              :options="products.data"
              :perView="3"
              :spaceBetween="30"
              :breakpointsTabPerView="2"
              :breakpointsMobilePerView="1"
              @modalProduct="openModalProduct"
            />
            <ClientOnly>
              <teleport to="body">
                <b-modal
                  hide-footer
                  hide-header
                  centered
                  ok-only
                  class="modal__product"
                  v-model="showProduct"
                >
                  <div class="modal-header">
                    <h3 class="default-title">The product</h3>
                    <button class="close-btn" @click="showModalProduct">
                      <BaseIconSvg
                        icon-name="close"
                        width="16"
                        height="16"
                        customClass="icon-pink"
                      />
                    </button>
                  </div>
                  <BlocksModalProduct
                  ref="modalProduct"
                  @closeModalProduct="showModalProduct()"
                  ></BlocksModalProduct>
                </b-modal>
              </teleport>
            </ClientOnly>
          </div>
        </div>
        <WrapperLoad v-model="reviewsPending">
          <div v-if="reviews.data.length" class="default-page__container">
            <div class="main-page__review">
              <h2 class="default-title" id="review">
                Customer’s <span>reviews </span> ({{ reviews.total.total }}):
              </h2>
              <div class="main-page__review-raiting">
                <div class="main-page__review-star">
                  <span class="default-title">{{ reviews.total.avg }}</span>
                  <ClientOnly>
                    <BlocksStarRating
                      v-model="ratingReview"
                      :rating="+reviews.total.avg"
                      :padding="5"
                      read-only
                    />
                  </ClientOnly>
                </div>
                <ul class="main-page__review-progress">
                  <li
                    v-for="(rating, index) in reviews.total.stars"
                    :key="index"
                  >
                    <span class="default-text_black">{{ 5 - index }}</span>
                    <ClientOnly
                      ><b-progress
                        :value="reviews.total.stars[index]"
                        :max="reviews.total.total"
                      ></b-progress
                    ></ClientOnly>
                    <span class="default-text_black"
                      >{{
                        Math.round(
                          (reviews.total.stars[index] * 100) /
                            reviews.total.total
                        ) || 0
                      }}%</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="default-page__container">
            <button
              class="
                default-btn_border-none
                default-text_pink
                main-page__review-button
              "
              @click.prevent="toggleReview"
            >
              + Write a review
            </button>
            <div class="main-page__review-all">
              <div
                v-for="(review, index) in reviews.data"
                :key="index"
                class="main-page__review-wrapper"
              >
                <div class="main-page__review-item">
                  <span class="default-text_black"> {{ review.name }}</span>
                  <span class="default-text_grey">
                    {{ $moment(review.created_at).format("DD.MM.YYYY") }}</span
                  >
                </div>
                <ClientOnly>
                  <BlocksStarRating
                    :rating="+review.rating"
                    read-only
                    class="swiper-rating"
                  />
                </ClientOnly>
                <span class="default-text_black">{{ review.body }}</span>
                <div class="main-page__review-gallery">
                  <div class="main-page__review-images">
                    <div
                      v-for="(image, indexImage) in review.images"
                      :key="indexImage"
                    >
                      <a
                        v-if="indexImage !== 2"
                        :href="image.url"
                        :data-fancybox="`gallery${index}`"
                      >
                        <BaseImage
                          :src="image.url"
                          customClass="main-page__review-image"
                        />
                      </a>
                    </div>
                  </div>
                  <button
                    v-if="review.images.length >= 3"
                    :href="review.images[2].url"
                    :data-fancybox="`gallery${index}`"
                    class="main-page__review-btn"
                  >
                    <BaseImage
                      :src="review.images[2].url"
                      customClass="main-page__review-image btn"
                    />

                    <span class="default-text"
                      >+{{ review.images.length - 2 }}</span
                    >
                  </button>
                </div>
              </div>
            </div>
            <button
              v-if="reviews.data.length !== reviews.total.total"
              class="
                default-btn_border
                default-text_pink
                main-page__review-more
              "
              @click.prevent="
                (meta.per_page = meta.per_page + 6), reviewsRefresh()
              "
            >
              Show more
            </button>
          </div>
        </WrapperLoad>
        <div class="main-page__subscribe" id="subscribe">
          <div class="default-page__container">
            <div class="main-page__subscribe-wrapper">
              <h2 class="default-title">Get <span>free</span> shipping</h2>
              <p class="default-text_black">
                Subscribe to mailing and get promocode for a free shipping
              </p>
              <ClientOnly>
                <vee-form
                  @submit="submitNewsletter"
                  v-if="!submitForm"
                  class="default__form"
                >
                  <FieldsInput
                    placeholder="E-mail"
                    name="email"
                    v-model="newsletter.email"
                  />
                  <button class="default-btn default-text" type="submit">
                    Get
                  </button>
                </vee-form></ClientOnly
              >
              <div v-if="submitForm" class="main-page__subscribe-cart">
                <p class="default-text">
                  {{ subscribeText }}
                </p>
              </div>
            </div>
            <a href="#main-page__product" class="main-page__link-product top">
              <BaseIconSvg
                icon-name="arrow-down"
                height="38"
                width="17"
                customClass="icon-white"
              />
            </a>
          </div>
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
            id="review"
            class="review"
            v-model="showModalReview"
          >
            <div class="modal-header">
              <button class="close-btn" @click="showModalReview = false">
                <BaseIconSvg
                  icon-name="close"
                  width="16"
                  height="16"
                  customClass="icon-pink"
                />
              </button>
            </div>
            <div class="main-page__subscribe-wrapper">
              <h2 class="default-title">Write your review</h2>
              <p class="default-text_black">How would you rate this item?</p>
              <vee-form @submit="onSubmitReview" class="default__form">
                <BlocksStarRating
                  :size="60"
                  :rating="5"
                  v-model="reviewProduct.rating"
                />
                <FieldsTextArea
                  :rows="5"
                  v-model="reviewProduct.body"
                  name="body"
                  placeholder="Share your experience!"
                  class="modal-textarea"
                />
                <div class="modal-upload">
                  <FieldsUpload
                    v-model="reviewProduct.images"
                    name="images"
                    :image-error-message="imageErrorMessage"
                  />
                </div>
                <button class="default-btn default-text" type="submit">
                  Write
                </button>
              </vee-form>
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
            id="termsService"
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
              <h2 class="default-title">Get <span>free</span> shipping</h2>
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
          </b-modal></teleport
        >
      </ClientOnly>
    </main>
  </div>
</template>

<script setup>
import { serialize } from "object-to-formdata";
import { Fancybox } from "@fancyapps/ui";
import * as yup from "yup";
import qs from "qs";
import _ from "lodash";
const { $moment } = useNuxtApp();
let store = $store(),
  router = useRouter(),
  route = useRoute();
let validPhone = ref(false);
let submitForm = ref(false);
let showModalLogin = ref(false),
  showModalRegistration = ref(false),
  showModalPolicy = ref(false),
  metaLinkAlternative = ref(""),
  modalPolicy = ref({ name: "", body: "" }),
  submitOrderForm = ref(false),
  imageErrorMessage = ref(""),
  tokenCookie = useCookie("access_token"),
  CardIdCookie = useCookie("card_id"),
  promocode = useCookie("promocode"),
  forgot = ref(false),
  forgotReset = ref(false),
  socialites = ref([]),
  showConfirmPassword = ref(false),
  subscribeText = ref(""),
  meta = ref({ per_page: 6 }),
  code = ref(""),
  codeConfirm = ref(false),
  subscribeOrderText = ref(""),
  showPassword = ref(false),
  load = ref(false),
  showOderModal = ref(false),
  reviewProduct = ref({ rating: 5, body: "", images: [] }),
  showModalReview = ref(false),
  showProduct = ref(false);

const modalProduct = ref();
let rating = ref(0);
let quantity = ref(1);
let ratingReview = ref(4);
let index = ref(40);
let newsletter = ref({ email: "", type: "newsletter" });
let order = ref({ email: "", type: "newsletter" });
let login = ref({ email: "", password: "", remember: false });
let forgotForm = ref({ email: "", password: "", code: "" });
let registration = ref({
  name: "",
  phone: "",
  email: "",
  accept: false,
  password: "",
  password_confirmation: "",
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
const config = useRuntimeConfig();
const {
  data: product,
  pending: loadProduct,
  refresh: refreshProduct,
} = await useAsyncData(
  `getProduct-${route.params.slug}`,
  () =>
    $fetch(
      config.API_BASE_URL +
        "/variation/" +
        (route.params.slug ? route.params.slug : "first"),
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          sHost: config.public.API_DOMAIN,
          sLocale: "en",
        },
      }
    ),
  {
    transform: (product) => {
      return product;
    },
  }
);




const {
  data,
  pending,
  error,
  refresh,
} = await useAsyncData("home", () =>
  $fetch(config.API_BASE_URL + "/pages/home", {
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      sHost: config.public.API_DOMAIN,
      sLocale: "en",
    },
  })
);

const {
  data: reviews,
  pending: reviewsPending,
  refresh: reviewsRefresh,
} = await useAsyncData(
  `comments-${product.value.data?.product.id}`,
  () =>
    $fetch(
      config.API_BASE_URL +
        `/products/${product.value.data?.product.id}/comments`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          sHost: config.public.API_DOMAIN,
          sLocale: "en",
        },
        params: {
          ...meta.value,
        },
      }
    ),
  {
    transform: ({ data, total }) => {
      total.stars = Object.assign({}, Object.values(total.stars).reverse());

      total.avg = Number(total.avg).toFixed(2);
      return { data, total };
    },
  }
);

const {
  data: products,
  refresh: refreshProducts,
  pending: variationsPending,
} = await useAsyncData(
  `variations-${product.value.data?.product.id}`,
  () =>
    $fetch(
      config.API_BASE_URL +
        `/variations?${qs.stringify(
          JSON.parse(
            JSON.stringify({
              f: { is_default: 1, without: product.value.data?.id },
            })
          )
        )}`,
      {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          sHost: config.public.API_DOMAIN,
          sLocale: "en",
        },
      }
    ),
  {
    transform: (products) => {
      return products;
    },
  }
);
useHead({
  title: data.value.seo.title,
  meta: [
    { property: "og:image", content: data.value.seo.og_image },
    { property: "fb:app_id", content: data.value.seo.fb_app_id },
    { property: "og:description", content: data.value.seo.og_description },
    { property: "og:locale", content: data.value.seo.og_locale },
    { property: "og:site_name", content: data.value.seo.og_site_name },
    { property: "og:title", content: data.value.seo.og_title },
    { property: "og:type", content: data.value.seo.og_type },
    { name: "description", content: data.value.seo.description },
    { name: "twitter:title", content: data.value.seo.twitter_title },
    {
      name: "twitter:description",
      content: data.value.seo.twitter_description,
    },
  ],
});

//--  Methods

function showModalProduct() {
  showProduct.value = !showProduct.value;
}

function openModalProduct(slug) {
  modalProduct.value.openProductStatus(slug)
  showModalProduct()
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
async function switchToCheckout(product) {
  await addCart(product, false);
  router.push("/checkout");
}
function toggleReview() {
  let token = useCookie("access_token");
  if (!token.value) {
    showModalLogin.value = !showModalLogin.value;
  } else {
    showModalReview.value = !showModalReview.value;
  }
}

function specificationName(item, secification) {
  for (var key in secification) {
    if (item === key) {
      return Object.values(secification[key]).join(", ");
    }
  }
}
async function submitNewsletter(val, actions) {
  try {
    const data = await $api().incomings.get(newsletter.value);
    subscribeText.value = data.message;

    submitForm.value = !submitForm.value;
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}
async function onSubmitReview(val, actions) {
  try {
    const formData = serialize(reviewProduct.value);

    const data = await $api().products.sentReview(
      product.value.data.product.id,
      formData
    );
    reviewsRefresh();
    actions.resetForm({
      name: "",
      product: "",
    });
    showModalReview.value = !showModalReview.value;
  } catch (e) {
    Object.values(e.data.errors).forEach((element) => {
      if (element.join().includes("images"))
        imageErrorMessage.value = element.join(",");
    });
    actions.setErrors(e.data.errors);
  }
}
async function submitOrder(val, actions) {
  try {
    const data = await $api().incomings.get(order.value);
    subscribeOrderText.value = data.message;

    submitOrderForm.value = !submitOrderForm.value;
  } catch (e) {
    actions.setErrors(e.data.errors);
  }
}
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
  } catch (e) {
    console.error(e);
  } finally {
    load.value = false;
  }
}
async function socialAuth(social) {
  try {
    const data = await $api().socialite.get(social);
    window.location.href = data.destination;
  } catch (e) {
    console.error(e);
  }
}
async function changeVariation(slug) {
  if (route.params.slug !== slug) {
    load.value = true;
  } else {
    load.value = false;
  }
  router.push({ path: `/${slug}`, hash: "#main-page__product" });
}

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

async function loginSubmit(val, actions) {
  try {
    const { data } = await $api().login.get(login.value);
    tokenCookie.value = data.access_token;

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
function getSocialite() {
  socialites.value = $store().variables.$state.variables.socialites;
}
function sentForm(val, actions) {
  if (forgotReset.value !== true) {
    sentEmail(val, actions);
  } else {
    sentResetPassword(val, actions);
  }
}

onMounted(async () => {
  load.value = false;
  metaLinkAlternative.value = window.location.href;
  setTimeout(() => {
    if (!$store().order.$state.order) {
      showOderModal.value = !showOderModal.value;
    }
    $store().order.setOrder(true);
  }, 120000);
  /*   if (router.currentRoute.value.params.slug) {
    changeVariation(router.currentRoute.value.params.slug);
  } */
  if (route.query.promocode) {
    promocode.value = route.query.promocode;
  }
  if ($store().cart.$state.cart.length === 0) {
    $store().cart.setCart();
  }
  if (route.hash === "#main-page__product") {
    const maineProduct = document.querySelector('#main-page__product')

    maineProduct.scrollIntoView({block: "start", behavior: "smooth"});
  }
});
</script>
