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
        }"
        class="h-auto landing-video"
        playsinline
        autoplay
        muted
      ></video>

      <!-- TEXT BLOCK -->
      <div
        class="flex flex-col items-center landing-text"
        :style="{
          '--landing-text-width': LANDING_TEXT_CONTAINER_WIDTH + 'px',
        }"
      >
        <!-- CN Row -->
        <div
          class="flex justify-between w-full"
          :style="{ 
            fontSize: LANDING_TEXT_FONT_SIZE_CN + 'px',
            color: LANDING_TEXT_COLOR
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
          class="flex justify-between w-full mt-3 uppercase tracking-widest"
          :style="{ 
            fontSize: LANDING_TEXT_FONT_SIZE_EN + 'px',
            color: LANDING_TEXT_COLOR
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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

import { useGlobalFade } from "~/composables/useGlobalFade";

const { navigateWithFade } = useGlobalFade();

const videoEl = ref<HTMLVideoElement | null>(null);

// Split characters
const spacedCN = computed(() => landingCopy.cn.split(""));
const spacedEN = computed(() => landingCopy.en.split(""));

onMounted(() => {
  if (!videoEl.value) return;
  videoEl.value.currentTime = 0;

  videoEl.value.onended = () => {
    navigateWithFade("/home");
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
