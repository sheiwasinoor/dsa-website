<template>
  <Transition name="page-loading-fade">
    <div
      v-if="visible && !(fullyLoaded && minTimePassed)"
      class="fixed inset-0 flex items-center justify-center"
      :style="{
        backgroundColor: LOADING_BG_COLOR,
        zIndex: LOADING_Z_INDEX
      }"
    >
      <img
        :src="LOADING_LOGO_SRC"
        alt="Loading"
        :style="{
          width: LOADING_LOGO_WIDTH + 'px',
          opacity: LOADING_LOGO_OPACITY
        }"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
/* ============================================================
   CONFIG VALUES — tweak loader UI here
   ============================================================ */
const LOADING_BG_COLOR = "#000C05";
const LOADING_Z_INDEX = 200;

const LOADING_LOGO_SRC = "/images/navbar-logo.png";
const LOADING_LOGO_WIDTH = 120;
const LOADING_LOGO_OPACITY = 0.9;

// ⚠ Keep this in sync with FADE_DURATION_MS in useGlobalFade.ts
const LOADING_FADE_DURATION = 700; // ms
const LOADING_FADE_CURVE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

const MIN_LOADING_DURATION = 3000; // ms

const props = defineProps<{
  visible: boolean;
}>();

const fullyLoaded = ref(false);
const minTimePassed = ref(false);
let minTimer: number | null = null;

const handleWindowLoad = () => {
  fullyLoaded.value = true;
};

onMounted(() => {
  // Start minimum timer as soon as loader becomes visible
  minTimer = window.setTimeout(() => {
    minTimePassed.value = true;
  }, MIN_LOADING_DURATION);

  if (document.readyState === 'complete') {
    fullyLoaded.value = true;
  } else {
    window.addEventListener('load', handleWindowLoad);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('load', handleWindowLoad);
  if (minTimer) {
    clearTimeout(minTimer);
  }
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      fullyLoaded.value = false;
      minTimePassed.value = false;

      if (minTimer) clearTimeout(minTimer);

      minTimer = window.setTimeout(() => {
        minTimePassed.value = true;
      }, MIN_LOADING_DURATION);
    }
  }
);
</script>

<style scoped>
.page-loading-fade-enter-active,
.page-loading-fade-leave-active {
  transition:
    opacity v-bind(LOADING_FADE_DURATION + "ms")
    v-bind(LOADING_FADE_CURVE);
}

.page-loading-fade-enter-from,
.page-loading-fade-leave-to {
  opacity: 0;
}
</style>