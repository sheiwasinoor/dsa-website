<!-- components/global/Loading.vue -->
<template>
  <Transition name="page-loading-fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center"
      :style="{
        backgroundColor: LOADING_BG_COLOR,
        zIndex: LOADING_Z_INDEX
      }"
    >
      <img
        v-if="showLogo"
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
import { defineProps } from "vue";

/* ============================================================
   CONFIG VALUES — tweak loader UI here
   ============================================================ */
const LOADING_BG_COLOR = "#000C05";
const LOADING_Z_INDEX = 200;

const LOADING_LOGO_SRC = "/images/navbar-logo.png";
const LOADING_LOGO_WIDTH = 120;
const LOADING_LOGO_OPACITY = 0.9;

const LOADING_FADE_DURATION = 700; // ms (A1 choice)
const LOADING_FADE_CURVE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/* Props controlled by global plugin */
const props = defineProps<{
  visible: boolean;
  showLogo: boolean;
}>();
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