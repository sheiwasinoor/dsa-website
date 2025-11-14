<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-[#000C05] text-[#F1F5F7] relative">

    <!-- GLOBAL BLACKOUT OVERLAY -->
    <div
      class="pointer-events-none fixed inset-0 bg-[#000C05] transition-opacity duration-700 z-50"
      :class="isFading ? 'opacity-100' : 'opacity-0'"
    ></div>

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
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
import { useLocale } from '~/composables/useLocale';
import { useRoute } from 'vue-router';
import { useTheme } from '~/composables/useTheme';
import { watch } from 'vue';

const { isFading } = useLocale();

const route = useRoute();
const { setTheme } = useTheme();

// Theme logic
const updateThemeFromRoute = () => {
  if (route.path.startsWith('/lighting')) {
    setTheme('lighting');
  } else {
    setTheme('landscape');
  }
};

watch(
  () => route.path,
  () => updateThemeFromRoute(),
  { immediate: true }
);
</script>