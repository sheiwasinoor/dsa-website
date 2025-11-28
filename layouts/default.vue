<template>
  <div :class="['min-h-screen flex flex-col', pageThemeClass]">
    <!-- NAVBAR -->
    <Navbar class="z-40" />

    <!-- MAIN CONTENT -->
    <main class="flex-1 relative z-20">
      <slot />
    </main>

    <!-- FOOTER -->
    <Footer class="z-40" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";

import { useRoute } from "vue-router";
import { useTheme } from "~/composables/useTheme";
import { watch } from "vue";
import { computed } from 'vue';

const pageThemeClass = computed(() => {
  return 'page-theme'; // placeholder class
});

const route = useRoute();
const { setTheme } = useTheme();

// Theme assignment (updated logic)
watch(
  () => route.path,
  () => {
    // Ignore theme switching on Landing ("/") and Home ("/home")
    if (route.path === "/" || route.path.startsWith("/home")) {
      return; // Do NOT setTheme here
    }

    // Lighting cluster
    if (route.path.startsWith("/lighting")) {
      setTheme("lighting");
      return;
    }

    // Young Art — uses its own purple theme
    if (route.path.startsWith("/youngArt")) {
      setTheme("youngArt");
      return;
    }

    // Young News – ALSO uses youngArt theme
    if (route.path.startsWith("/young-news")) {
      setTheme("youngArt");
      return;
    }

    // Default for all Landscape/About/etc.
    setTheme("landscape");
  },
  { immediate: true }
);
</script>

<style>
.page-theme {
  background-color: var(--page-bg);
  color: var(--page-text);
  padding-top: var(--page-padding-top);
  padding-bottom: var(--page-padding-bottom);
  padding-left: var(--page-padding-x);
  padding-right: var(--page-padding-x);
}
</style>