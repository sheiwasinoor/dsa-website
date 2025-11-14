<template>
  <div
    class="min-h-screen bg-dsa-base text-dsa-flurry flex flex-col items-center justify-between py-8"
  >
    <!-- Centered GIF + text lockup -->
    <main class="flex-1 flex flex-col items-center justify-center gap-6 px-4">
      <!-- Loading GIF -->
      <img
        src="/images/dsa-landing-logo.gif"
        alt="DSA loading"
        class="w-[535px] max-w-full h-auto"
      />

      <!-- Text image under the GIF -->
      <img
        src="/images/dsa-landing-text.png"
        alt="Design Studio Asia"
        class="w-[316px] max-w-full h-auto"
      />
    </main>

   
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Adjust this to match your GIF length (in ms)
const GIF_DURATION_MS = 5500;

onMounted(() => {
  if (import.meta.client) {
    setTimeout(() => {
      router.replace('/home');
    }, GIF_DURATION_MS);
  }
});

// Landing page uses the landing layout (no navbar, black bg)
definePageMeta({
  layout: 'landing',
});
</script>