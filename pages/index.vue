<template>
  <div
    class="min-h-screen bg-[#000C05] text-[#ECEBC7] flex flex-col items-center justify-center relative overflow-hidden"
  >
    <!-- MAIN CONTENT -->
    <main class="flex flex-col items-center justify-center gap-10 px-4 z-30">

      <!-- LANDING VIDEO -->
      <video
        ref="videoEl"
        :src="LANDING_VIDEO_SRC"
        :style="{
          width: LANDING_VIDEO_WIDTH + 'px',
          maxWidth: LANDING_VIDEO_MAX_WIDTH + 'px',
        }"
        class="h-auto"
        playsinline
        autoplay
        muted
      ></video>

      <!-- TEXT BLOCK -->
      <div
        class="flex flex-col items-center"
        :style="{ width: LANDING_TEXT_CONTAINER_WIDTH + 'px' }"
      >
        <!-- Chinese -->
        <div
          class="flex justify-between w-full"
          :style="{ fontSize: LANDING_TEXT_FONT_SIZE_CN + 'px' }"
        >
          <span
            v-for="(char, i) in spacedCN"
            :key="'cn-' + i"
            :style="{ letterSpacing: LANDING_TEXT_LETTER_SPACING_CN + 'px' }"
          >
            {{ char }}
          </span>
        </div>

        <!-- English -->
        <div
          class="flex justify-between w-full mt-3 tracking-widest uppercase"
          :style="{ fontSize: LANDING_TEXT_FONT_SIZE_EN + 'px' }"
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
import { useRouter } from "vue-router";

import {
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

// Split characters for spacing
const spacedCN = computed(() => landingCopy.cn.split(""));
const spacedEN = computed(() => landingCopy.en.split(""));

onMounted(() => {
  if (!videoEl.value) return;

  // ensure the video ALWAYS starts from the beginning
  videoEl.value.currentTime = 0;

  videoEl.value.onended = () => {
    // No local fade – let global loader handle this transition
    router.replace("/home");
  };
});

// Landing page uses the landing layout (with global loader, no navbar/footer)
definePageMeta({
  layout: "landing",
});
</script>