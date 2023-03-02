<template>
  <main>
    <div class="tracking-main">
      <BlocksNavigation />
      <div class="tracking">
        <div
          :class="[
            'tracking__content',
            { 'tracking__content--info': trackInfo },
          ]"
        >
          <div v-if="!trackInfo" class="tracking__content-head">
            <h1 class="main-page__info-title"><span>Tracking </span>service</h1>
            <p class="tracking__content-descr">
              Track a package with your tracking number
            </p>
          </div>
          <WrapperLoad v-model="load">
            <vee-form @submit="getStatusDelivery" class="tracking__actions">
              <FieldsInput
                placeholder="Tracking number"
                type="text"
                class="input default-text_grey tracking__input"
                name="ttn"
                v-model="trCode"
              />
              <button type="submit" class="default-btn tracking__actions-btn">
                Track
              </button>
            </vee-form>
          </WrapperLoad>

          <div v-if="trackInfo" class="tracking__details">
            <div class="tracking-section tracking__number">
              <div class="tracking__number-info">
                <h3 class="tracking__head">Number:</h3>
                <div class="tracking__number-details">
                  <p id="copyText" class="tracking__number-current">
                    {{ trackInfo?.number }}
                  </p>
                  <p
                    :class="[
                      'tracking__number-status',
                      {
                        'tracking__number-status--green':
                          trackInfo?.status_desc === 'Delivered',
                      },
                      {
                        'tracking__number-status--orange':
                          trackInfo?.status_desc === 'Delivering',
                      },
                    ]"
                  >
                    {{ trackInfo?.status_desc }}
                  </p>
                </div>
              </div>
              <button @click="copyFunction" class="tracking__copy">
                <BaseIconSvg
                  iconName="tracking-copy"
                  width="20"
                  height="20"
                  customClass="icon-pink"
                />
                <span class="tracking__copy--text">Copy details</span>
              </button>
              <div class="popup__bg" v-if="popapSuccess">
                <div v-if="popapSuccess" class="popap-img">
                  <BaseImage
                    src="/images/check-green.png"
                    customClass="checkout-img"
                  />
                </div>
                <span v-if="popapSuccess">The text was copied</span>
              </div>
            </div>

            <div class="tracking-section tracking__way">
              <div class="tracking__way-road">
                <div class="tracking__way-from">
                  <h3 class="tracking__head">Origin</h3>
                  <p class="tracking__way-country">
                    {{ trackInfo?.origin_country }}
                  </p>
                </div>
                <img src="/images/tracking/way-arrow.svg" alt="" />
                <div class="tracking__way-to">
                  <h3 class="tracking__head">Destination</h3>
                  <p class="tracking__way-country">
                    {{ trackInfo?.destination_country }}
                  </p>
                </div>
              </div>
              <div class="tracking__way-points">
                <h3 class="tracking__head tracking__head--destination">
                  Estimated delivery by: Feb 3 - Feb 4
                </h3>
                <div
                  class="tracking__way-points--line"
                  :style="{
                    background: `linear-gradient(to right, ${colorPrimary} ${
                      trackInfo?.process.rate * 100
                    }%, ${colorBorder} ${trackInfo?.process.rate * 100}%)`,
                  }"
                ></div>
                <div class="tracking__way-plan">
                  <div
                    v-for="(option, idx) in trackInfo?.process.points"
                    :key="idx"
                    class="tracking__way-point"
                  >
                    <div
                      :class="[
                        'tracking__way-point--dot',
                        { 'tracking__way-point--active': option.light },
                      ]"
                    ></div>
                    <div class="tracking__way-plan-block">
                      <p class="tracking__way-plan--text">{{ option.name }}</p>
                      <div class="tracking__way-popup">
                        <p
                          class="
                            tracking__way-plan--text tracking__way-plan--country
                          "
                        >
                          {{ option.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tracking-section">
              <div class="tracking__way-status">
                <div class="tracking__way-status--line"></div>
                <div
                  v-for="(option, idx) in trackInfo?.details"
                  :key="idx"
                  class="tracking__way-delivery"
                >
                  <div
                    :class="[
                      'tracking__way-point--dot',
                      { 'tracking__way-point--active': idx == 0 },
                    ]"
                  ></div>
                  <div class="tracking__way-stations">
                    <h4 class="tracking__way-head">{{ option.desc }}</h4>
                    <div class="tracking__head tracking__head--note">
                      {{ option.desc_title }} {{ option.standerd_desc }}
                      <p class="tracking__head--date">
                        {{
                          $moment(option.datetime).format("YYYY-MM-DD h:mm:ss")
                        }}
                        <span>{{ option.timezone }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import qs from "qs";
import _ from "lodash";

const colorPrimary =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-primary"
    ) || "#fff",
  colorBorder =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-border"
    ) || "#fff",
  { $moment } = useNuxtApp(),
  route = useRoute(),
  router = useRouter();

let trCode = ref(""),
  load = ref(false),
  trackInfo = ref(),
  popapSuccess = ref(false);

useHead({
  title: "NICEBODY - Tracking",
});

function deletePopapSuccess() {
  popapSuccess.value = true;
  setTimeout(() => {
    popapSuccess.value = false;
  }, 3000);
}

async function getStatusDelivery(val, actions) {
  load.value = true;
  try {
    const { data } = await $api().tracking.getStatus({
      ttn: `${trCode.value}`,
    });
    router.push({
      path: "/tracking",
      query: { ttn: trCode.value },
    });
    trackInfo.value = data;
  } catch (e) {
    actions.setErrors(e.data.errors);
  } finally {
    load.value = false;
  }
}

function copyFunction() {
  // Get the text fiel
  navigator.clipboard.writeText(document.getElementById("copyText").innerHTML);
  deletePopapSuccess();
}

onMounted(() => {
  if (route.query.ttn) {
    trCode.value = route.query.ttn;
    getStatusDelivery();
  } else {
    trCode.value = "";
  }
});
</script>
