<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-[#000C05] text-[#F1F5F7] relative">

    <!-- GLOBAL FADE LOADER -->
    <Loading :visible="globalPageLoading" :showLogo="globalShowLogo" />

    <!-- NAVBAR -->
    <Navbar class="z-40" />

    <!-- MAIN CONTENT -->
    <main class="flex-1 relative z-30">
      <slot />
    </main>

    <!-- FOOTER -->
    <Footer class="z-40" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";
import Loading from "~/components/global/Loading.vue";

import { globalPageLoading, globalShowLogo } from "~/plugins/page-loading.client";

import { useRoute } from "vue-router";
import { useTheme } from "~/composables/useTheme";
import { watch } from "vue";

const route = useRoute();
const { setTheme } = useTheme();

// Theme assignment
watch(
  () => route.path,
  () => {
    if (route.path.startsWith("/lighting")) {
      setTheme("lighting");
    } else {
      setTheme("landscape");
    }
  },
  { immediate: true }
);
</script>