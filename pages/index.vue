<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="{ backgroundColor: LANDING_BG_COLOR, color: LANDING_TEXT_COLOR }"
  >
    <main
      class="landing-main flex flex-col items-center justify-center px-4 z-30"
      :style="{
        '--landing-main-gap-desktop': LANDING_MAIN_GAP_DESKTOP + 'px',
        '--landing-main-gap-tablet': LANDING_MAIN_GAP_TABLET + 'px',
        '--landing-main-gap-mobile': LANDING_MAIN_GAP_MOBILE + 'px',
      }"
    >
      
      <!-- VIDEO -->
      <video
        ref="videoEl"
        :src="LANDING_VIDEO_SRC"
        :style="{
          '--landing-video-width': LANDING_VIDEO_WIDTH + 'px',
          '--landing-video-max': LANDING_VIDEO_MAX_WIDTH + 'px',
        }"
        :class="{ 'is-clickable': isVideoEnded }"
        class="h-auto landing-video"
        playsinline
        autoplay
        muted
        @click="onVideoClick"
      ></video>

      <!-- TEXT BLOCK -->
      <div
        class="flex flex-col items-center landing-text"
        :class="{ 'is-text-visible': isTextVisible }"
        :style="{
          '--landing-text-width': LANDING_TEXT_CONTAINER_WIDTH + 'px',
          '--landing-text-fade-ms': TEXT_FADE_IN_MS + 'ms',
        }"
        @click="goHome"
      >
        <!-- CN Row -->
        <div
          class="flex justify-between w-full"
          :style="{ 
            fontSize: LANDING_TEXT_FONT_SIZE_CN + 'px',
            color: LANDING_TEXT_COLOR,
            marginBottom: LANDING_TEXT_ROW_GAP_CN + 'px',
          }"
        >
          <span
            v-for="(char, i) in spacedCN"
            :key="'cn-' + i"
            :style="{ letterSpacing: LANDING_TEXT_LETTER_SPACING_CN_ROW + 'px' }"
          >
            {{ char }}
          </span>
        </div>

        <!-- EN Row -->
        <div
          class="flex justify-between w-full uppercase tracking-widest"
          :style="{ 
            fontSize: LANDING_TEXT_FONT_SIZE_EN + 'px',
            color: LANDING_TEXT_COLOR,
            marginTop: LANDING_TEXT_ROW_GAP_EN + 'px',
          }"
        >
          <span
            v-for="(char, i) in spacedEN"
            :key="'en-' + i"
            :style="{ letterSpacing: LANDING_TEXT_LETTER_SPACING_EN + 'px' }"
          >
            {{ char }}
          </span>
        </div>

      </div>

    </main>

    <!-- LOCATION Row -->
    <div
      class="landing-location text-center"
      :class="{ 'is-text-visible': isTextVisible }"
      :style="{ 
        fontSize: LANDING_TEXT_FONT_SIZE_LOC + 'px',
        color: LANDING_TEXT_COLOR,
        fontWeight: LANDING_TEXT_WEIGHT_LOC,
        letterSpacing: LANDING_TEXT_LETTER_SPACING_LOC + 'px',
        '--landing-location-bottom-desktop': LANDING_LOCATION_BOTTOM_DESKTOP,
        '--landing-location-bottom-tablet': LANDING_LOCATION_BOTTOM_TABLET,
        '--landing-location-bottom-mobile': LANDING_LOCATION_BOTTOM_MOBILE,
      }"
      @click="goHome"
    >
      {{ LOCATION_TEXT }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  LANDING_BG_COLOR,
  LANDING_TEXT_COLOR,
  LANDING_VIDEO_SRC,
  LANDING_VIDEO_WIDTH,
  LANDING_VIDEO_MAX_WIDTH,
  LANDING_TEXT_CONTAINER_WIDTH,
  LANDING_TEXT_FONT_SIZE_CN,
  LANDING_TEXT_FONT_SIZE_EN,
  LANDING_TEXT_LETTER_SPACING_CN,
  LANDING_TEXT_LETTER_SPACING_EN,
  LANDING_MAIN_GAP_DESKTOP,
  LANDING_MAIN_GAP_TABLET,
  LANDING_MAIN_GAP_MOBILE,
  LANDING_TEXT_ROW_GAP_CN,
  LANDING_TEXT_ROW_GAP_EN,
  LANDING_TEXT_LETTER_SPACING_CN_ROW,
  LANDING_LOCATION_BOTTOM_DESKTOP,
  LANDING_LOCATION_BOTTOM_TABLET,
  LANDING_LOCATION_BOTTOM_MOBILE,
  LOCATION_TEXT,
  LANDING_TEXT_FONT_SIZE_LOC,
  LANDING_TEXT_LETTER_SPACING_LOC,
  LANDING_TEXT_WEIGHT_LOC,
  landingCopy,
} from "~/content/index";

const router = useRouter();

const videoEl = ref<HTMLVideoElement | null>(null);
const isTextVisible = ref(false);
const isVideoEnded = ref(false);

const TEXT_FADE_IN_MS = 3000;
// Split characters
const spacedCN = computed(() => landingCopy.cn.split(""));
const spacedEN = computed(() => landingCopy.en.split(""));

onMounted(() => {
  if (!videoEl.value) return;
  videoEl.value.currentTime = 0;

  videoEl.value.onended = () => {
    isVideoEnded.value = true;
    isTextVisible.value = true;
  };
});

function goHome() {
  router.push("/about");
}

function onVideoClick() {
  if (!isVideoEnded.value) return;
  goHome();
}

// Use landing layout
definePageMeta({
  layout: "landing",
});
</script>

<style scoped>
.landing-video {
  width: var(--landing-video-width);
  max-width: var(--landing-video-max);
}

.landing-video.is-clickable {
  cursor: pointer;
}

.landing-text {
  width: var(--landing-text-width) !important;
  opacity: 0;
  transition:
    opacity var(--landing-text-fade-ms) ease-out,
    transform 920ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 520ms ease;
  cursor: pointer;
}

.landing-text.is-text-visible {
  opacity: 1;
  animation: landingGlow 2.4s ease-in-out var(--landing-text-fade-ms) infinite;
}

.landing-text:hover {
  filter: drop-shadow(0 0 10px rgba(236, 235, 199, 0.45));
  transform: translateY(-6px);
}

.landing-main {
  gap: var(--landing-main-gap-desktop);
}

.landing-location {
  position: absolute;
  left: 50%;
  bottom: var(--landing-location-bottom-desktop);
  transform: translateX(-50%);
  width: 100%;
  opacity: 0;
  transition: opacity var(--landing-text-fade-ms) ease-out;
  cursor: pointer;
}

.landing-location.is-text-visible {
  opacity: 1;
}

.landing-video {
}

@keyframes landingGlow {
  0% {
    filter: drop-shadow(0 0 0 rgba(236, 235, 199, 0));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(236, 235, 199, 0.55));
  }
  100% {
    filter: drop-shadow(0 0 0 rgba(236, 235, 199, 0));
  }
}
@media (max-width: 1200px) {
  .landing-main {
    gap: var(--landing-main-gap-tablet);
  }
  .landing-location {
    bottom: var(--landing-location-bottom-tablet);
  }
}

@media (max-width: 960px) {
  .landing-video {
    width: 92vw;
    max-width: 620px;
  }
  .landing-text {
    width: 92vw !important;
  }
  .landing-main {
    gap: var(--landing-main-gap-mobile);
  }
  .landing-location {
    bottom: var(--landing-location-bottom-mobile);
  }
}

@media (max-width: 640px) {
  .landing-video {
    width: 60vw;
    max-width: 360px;
  }
  .landing-text {
    width: 70vw !important;
    font-size: 0.78em;
  }
}
</style>
