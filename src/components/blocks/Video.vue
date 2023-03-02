<template>
  <div class="video-wrapper">
    <video class="video" :poster="poster">
      <source
        v-for="(item, idx) in videos"
        :key="idx"
        :src="item.url"
        :type="item.mime_type"
      />
      Sorry, your browser doesn't support embedded videos.
    </video>
    <div v-if="videos.length > 0" class="video-overlay" @click="toggleVideo">
      <button>
        <span></span>
        <BaseIconSvg icon-name="play" height="167" width="167" />
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  src: { type: String, default: "" },
  poster: { type: String, default: "" },
  videos: { type: Array, default: "" },
});
function toggleVideo() {
  let video = document.querySelector(".video");
  let playpause = document.querySelector(".video-overlay");

  if (video.paused) {
    video.play();
    playpause.style.opacity = 0;
  } else {
    video.pause();
    playpause.style.opacity = 1;
  }
}
</script>
