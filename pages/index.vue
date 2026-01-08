<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    :style="{ backgroundColor: LANDING_BG_COLOR, color: LANDING_TEXT_COLOR }"
  >
    <main class="flex flex-col items-center justify-center gap-10 px-4 z-30">
      
      <!-- VIDEO -->
      <video
        ref="videoEl"
        :src="LANDING_VIDEO_SRC"
        :style="{
          '--landing-video-width': LANDING_VIDEO_WIDTH + 'px',
          '--landing-video-max': LANDING_VIDEO_MAX_WIDTH + 'px',
          '--landing-exit-fade-ms': EXIT_FADE_OUT_MS + 'ms',
          opacity: isFadingOut ? 0 : 1,
        }"
        class="h-auto landing-video"
        playsinline
        autoplay
        muted
      ></video>

      <!-- TEXT BLOCK -->
      <div
        class="flex flex-col items-center landing-text"
        :class="{ 'is-text-visible': isTextVisible, 'is-fading-out': isFadingOut }"
        :style="{
          '--landing-text-width': LANDING_TEXT_CONTAINER_WIDTH + 'px',
          '--landing-text-fade-ms': TEXT_FADE_IN_MS + 'ms',
          '--landing-exit-fade-ms': EXIT_FADE_OUT_MS + 'ms',
        }"
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
            :style="{ letterSpacing: LANDING_TEXT_LETTER_SPACING_CN + 'px' }"
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

        <!-- LOCATION Row -->
        <div
          class="mt-3 text-center"
          :style="{ 
            fontSize: LANDING_TEXT_FONT_SIZE_LOC + 'px',
            color: LANDING_TEXT_COLOR,
            fontWeight: LANDING_TEXT_WEIGHT_LOC,
            letterSpacing: LANDING_TEXT_LETTER_SPACING_LOC + 'px',
          }"
        >
          {{ LOCATION_TEXT }}
        </div>
      </div>

    </main>
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
  LANDING_VIDEO_FADE_OUT_DURATION,
  LANDING_TEXT_CONTAINER_WIDTH,
  LANDING_TEXT_FONT_SIZE_CN,
  LANDING_TEXT_FONT_SIZE_EN,
  LANDING_TEXT_LETTER_SPACING_CN,
  LANDING_TEXT_LETTER_SPACING_EN,
  landingCopy,
} from "~/content/index";

const router = useRouter();

const videoEl = ref<HTMLVideoElement | null>(null);
const isFadingOut = ref(false);
const isTextVisible = ref(false);

const TEXT_FADE_IN_MS = 1200;
const EXIT_FADE_OUT_MS = 900;
const LANDING_TEXT_ROW_GAP_CN = 8;
const LANDING_TEXT_ROW_GAP_EN = 0;
const LOCATION_TEXT = "Shenzhen | Shanghai | Singapore";
const LANDING_TEXT_FONT_SIZE_LOC = LANDING_TEXT_FONT_SIZE_EN - 3;
const LANDING_TEXT_LETTER_SPACING_LOC = 1;
const LANDING_TEXT_WEIGHT_LOC = 100;

// Split characters
const spacedCN = computed(() => landingCopy.cn.split(""));
const spacedEN = computed(() => landingCopy.en.split(""));

onMounted(() => {
  if (!videoEl.value) return;
  videoEl.value.currentTime = 0;

  if (process.client) {
    window.requestAnimationFrame(() => {
      isTextVisible.value = true;
    });
  }

  videoEl.value.onended = () => {
    isFadingOut.value = true;
    window.setTimeout(() => {
      router.push("/home");
    }, EXIT_FADE_OUT_MS);
  };
});

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

.landing-text {
  width: var(--landing-text-width) !important;
  opacity: 0;
  transition: opacity var(--landing-text-fade-ms) ease-out;
}

.landing-text.is-text-visible {
  opacity: 1;
}

.landing-text.is-fading-out {
  opacity: 0;
  transition-duration: var(--landing-exit-fade-ms);
}

.landing-video {
  transition: opacity var(--landing-exit-fade-ms) ease-out;
}

@media (max-width: 960px) {
  .landing-video {
    width: 92vw;
    max-width: 620px;
  }
  .landing-text {
    width: 92vw !important;
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
