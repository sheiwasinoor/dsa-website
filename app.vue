<template>
  <div class="min-h-screen bg-[#000C05] text-[#F1F5F7] relative">
    <!-- GLOBAL CINEMATIC OVERLAY -->
    <Loading :visible="overlayVisible" />

    <!-- ACTUAL APP -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Loading from "~/components/global/Loading.vue";
import { useGlobalFade } from "~/composables/useGlobalFade";

const { overlayVisible, initialFadeIn } = useGlobalFade();

onMounted(() => {
  // Handles the very first fade-in when the app boots
  initialFadeIn();
});
</script>