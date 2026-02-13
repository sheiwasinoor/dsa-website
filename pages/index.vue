<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="{
      backgroundColor: LANDING_BG_COLOR,
      color: LANDING_TEXT_COLOR,
      '--landing-text-mobile-scale': LANDING_TEXT_MOBILE_SCALE,
      '--landing-letter-spacing-cn-row-mobile-scale': LANDING_TEXT_LETTER_SPACING_CN_ROW_MOBILE_SCALE,
      '--landing-text-medium-scale': LANDING_TEXT_MEDIUM_SCALE,
      '--landing-video-mobile-scale': LANDING_VIDEO_MOBILE_SCALE,
    }"
    @click="handleLandingClick"
  >
    <div class="landing-page-fade" :class="{ 'is-clicked': isClicked }"></div>
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
        :style="{
          '--landing-video-width': LANDING_VIDEO_WIDTH + 'px',
          '--landing-video-max': LANDING_VIDEO_MAX_WIDTH + 'px',
        }"
        :class="{ 'is-clickable': canNavigate }"
        class="h-auto landing-video"
        playsinline
        autoplay
        muted
        @click="onVideoClick"
        @error="handleVideoError"
      >
        <source :src="LANDING_VIDEO_SRC" type="video/webm" />
        <source src="/videos/dsa-landing-fallback2.mp4" type="video/mp4" />
      </video>

      <!-- TEXT BLOCK (commented out) -->
      <!--
      <div
        class="flex flex-col items-center landing-text"
        :class="{ 'is-text-visible': isTextVisible }"
        :style="{
          '--landing-text-width': LANDING_TEXT_CONTAINER_WIDTH + 'px',
          '--landing-text-fade-ms': TEXT_FADE_IN_MS + 'ms',
          '--landing-text-font-cn-base': LANDING_TEXT_FONT_SIZE_CN + 'px',
          '--landing-text-font-en-base': LANDING_TEXT_FONT_SIZE_EN + 'px',
          '--landing-letter-spacing-cn-row-base': LANDING_TEXT_LETTER_SPACING_CN_ROW + 'px',
          '--landing-letter-spacing-en-base': LANDING_TEXT_LETTER_SPACING_EN + 'px',
        }"
        @click="handleLandingClick"
      >
        <div
          class="landing-row landing-cn-row flex justify-between w-full"
          :style="{ 
            fontSize: 'var(--landing-text-font-cn)',
            color: LANDING_TEXT_COLOR,
            marginBottom: LANDING_TEXT_ROW_GAP_CN + 'px',
          }"
        >
          <span
            v-for="(char, i) in spacedCN"
            :key="'cn-' + i"
          >
            {{ char }}
          </span>
        </div>

        <div
          class="landing-row landing-en-row flex justify-between w-full uppercase tracking-widest font-en"
          :style="{ 
            fontSize: 'var(--landing-text-font-en)',
            color: LANDING_TEXT_COLOR,
            marginTop: LANDING_TEXT_ROW_GAP_EN + 'px',
          }"
        >
          <span
            v-for="(char, i) in spacedEN"
            :key="'en-' + i"
            :style="{ letterSpacing: 'var(--landing-letter-spacing-en)' }"
          >
            {{ char }}
          </span>
        </div>
      </div>
      -->

    </main>

    <!-- LOCATION Row -->
    <div
      class="landing-location text-center font-en"
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
      @click="handleLandingClick"
    >
      {{ LOCATION_TEXT }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  LANDING_BG_COLOR,
  LANDING_TEXT_COLOR,
  LANDING_VIDEO_SRC,
  LANDING_VIDEO_WIDTH,
  LANDING_VIDEO_MAX_WIDTH,
  LANDING_MAIN_GAP_DESKTOP,
  LANDING_MAIN_GAP_TABLET,
  LANDING_MAIN_GAP_MOBILE,
  LANDING_TEXT_MOBILE_SCALE,
  LANDING_TEXT_LETTER_SPACING_CN_ROW_MOBILE_SCALE,
  LANDING_TEXT_MEDIUM_SCALE,
  LANDING_VIDEO_MOBILE_SCALE,
  LANDING_LOCATION_BOTTOM_DESKTOP,
  LANDING_LOCATION_BOTTOM_TABLET,
  LANDING_LOCATION_BOTTOM_MOBILE,
  LOCATION_TEXT,
  LANDING_TEXT_FONT_SIZE_LOC,
  LANDING_TEXT_LETTER_SPACING_LOC,
  LANDING_TEXT_WEIGHT_LOC,
} from "~/content/index";

const router = useRouter();

const videoEl = ref<HTMLVideoElement | null>(null);
const isTextVisible = ref(false);
const isVideoEnded = ref(false);
const videoStarted = ref(false);
const pendingNavigation = ref(false);
const canNavigate = ref(false);
const textFadeTimeout = ref<number | null>(null);
const playTextTimer = ref<number | null>(null);
const isClicked = ref(false);

const TEXT_APPEAR_DELAY_MS = 2500;
const TEXT_FADE_IN_MS = TEXT_APPEAR_DELAY_MS;
onMounted(() => {
  if (!videoEl.value) return;
  videoEl.value.currentTime = 0;
  const videoElement = videoEl.value;

  const fallbackTimer = window.setTimeout(() => {
    if (!videoStarted.value) {
      isVideoEnded.value = true;
      startTextAnimation();
    }
  }, TEXT_APPEAR_DELAY_MS);

  videoElement.onplaying = () => {
    videoStarted.value = true;
    window.clearTimeout(fallbackTimer);
    if (playTextTimer.value) {
      window.clearTimeout(playTextTimer.value);
    }
    playTextTimer.value = window.setTimeout(() => {
      startTextAnimation();
    }, TEXT_APPEAR_DELAY_MS);
  };

  videoElement.onended = () => {
    isVideoEnded.value = true;
    startTextAnimation();
  };

  videoElement.onerror = () => {
    isVideoEnded.value = true;
    startTextAnimation();
    window.clearTimeout(fallbackTimer);
    if (playTextTimer.value) {
      window.clearTimeout(playTextTimer.value);
    }
  };

  videoElement.ontimeupdate = () => {
    const duration = videoElement.duration;
    if (!Number.isFinite(duration) || canNavigate.value) return;
    if (duration - videoElement.currentTime <= 2) {
      canNavigate.value = true;
    }
  };
});

function goHome() {
  router.push("/about");
}

function onVideoClick() {
  handleLandingClick();
}

function handleLandingClick() {
  if (isClicked.value) return;
  if (canNavigate.value) {
    triggerNavigate();
    return;
  }

  pendingNavigation.value = true;
}

function handleVideoError() {
  isVideoEnded.value = true;
  startTextAnimation();
}

function startTextAnimation() {
  if (!isTextVisible.value) {
    isTextVisible.value = true;
  }

  if (canNavigate.value) return;
  if (textFadeTimeout.value) {
    window.clearTimeout(textFadeTimeout.value);
  }

  textFadeTimeout.value = window.setTimeout(() => {
    canNavigate.value = true;
    if (pendingNavigation.value) {
      triggerNavigate();
    }
  }, TEXT_FADE_IN_MS);
}

function triggerNavigate() {
  if (isClicked.value) return;
  isClicked.value = true;
  window.setTimeout(() => {
    router.push("/about");
  }, 150);
}


// Use landing layout
definePageMeta({
  layout: "landing",
});
</script>

<style scoped>
.landing-page-fade {
  position: absolute;
  inset: 0;
  background: #000C05;
  opacity: 0;
  pointer-events: none;
  z-index: 40;
}
.landing-page-fade.is-clicked {
  animation: landingFadeOut 420ms ease-out forwards;
}
.landing-video {
  width: var(--landing-video-width);
  max-width: var(--landing-video-max);
  margin-top: -75px;
  transition:
    transform 920ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 520ms ease;
}
.landing-video.is-clickable {
  cursor: pointer;
}
.landing-video.is-clickable:hover {
  transform: translateY(-6px);
}

.landing-text {
  width: var(--landing-text-width) !important;
  --landing-text-font-cn: var(
    --landing-text-font-cn-base,
    0px
  );
  --landing-text-font-en: var(
    --landing-text-font-en-base,
    0px
  );
  --landing-letter-spacing-en: var(
    --landing-letter-spacing-en-base,
    0px
  );
  --landing-letter-spacing-cn-row: var(
    --landing-letter-spacing-cn-row-base,
    0px
  );
  opacity: 0;
  transition:
    opacity var(--landing-text-fade-ms) ease-out,
    transform 920ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 520ms ease;
  cursor: pointer;
}

.landing-cn-row {
  gap: var(--landing-letter-spacing-cn-row);
}

.font-en {
  font-family: var(--font-en);
}

.landing-text.is-text-visible {
  opacity: 1;
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

@media (max-width: 1200px) {
  .landing-main {
    gap: var(--landing-main-gap-tablet);
  }
  .landing-location {
    bottom: var(--landing-location-bottom-tablet);
  }
}

@keyframes landingFadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .landing-video {
    width: calc(
      var(--landing-video-width) * var(--landing-text-medium-scale, 1)
    );
    max-width: calc(
      var(--landing-video-max) * var(--landing-text-medium-scale, 1)
    );
  }
  .landing-text {
    width: calc(
      var(--landing-text-width) * var(--landing-text-medium-scale, 1)
    ) !important;
    --landing-text-font-en: calc(
      var(--landing-text-font-en-base, 0px) * var(--landing-text-medium-scale, 1)
    );
    --landing-text-font-cn: calc(
      var(--landing-text-font-cn-base, 0px) * var(--landing-text-medium-scale, 1)
    );
    --landing-letter-spacing-cn-row: calc(
      var(--landing-letter-spacing-cn-row-base, 0px)
        * var(--landing-text-medium-scale, 1)
    );
    --landing-letter-spacing-en: calc(
      var(--landing-letter-spacing-en-base, 0px)
        * var(--landing-text-medium-scale, 1)
    );
  }
  .landing-main {
    gap: calc(
      var(--landing-main-gap-desktop) * var(--landing-text-medium-scale, 1)
    );
  }
  .landing-location {
    bottom: calc(
      var(--landing-location-bottom-desktop)
        * var(--landing-text-medium-scale, 1)
    );
  }
}

@media (max-width: 640px) {
  .landing-video {
    width: calc(
      var(--landing-video-width) * var(--landing-video-mobile-scale, 1)
    );
    max-width: calc(
      var(--landing-video-max) * var(--landing-video-mobile-scale, 1)
    );
  }
  .landing-text {
    width: calc(
      var(--landing-text-width) * var(--landing-text-mobile-scale, 1)
    ) !important;
    font-size: 0.78em;
  }
  .landing-row {
    justify-content: space-between;
    gap: 0;
    text-align: center;
  }
  .landing-text {
    --landing-text-font-en: calc(
      var(--landing-text-font-en-base, 0px) * var(--landing-text-mobile-scale, 1)
    );
    --landing-text-font-cn: calc(
      var(--landing-text-font-cn-base, 0px) * var(--landing-text-mobile-scale, 1)
    );
    --landing-letter-spacing-cn-row: calc(
      var(--landing-letter-spacing-cn-row-base, 0px)
        * var(--landing-letter-spacing-cn-row-mobile-scale, 1)
    );
  }
}
</style>
