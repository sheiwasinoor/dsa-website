<template>
  <div
    class="min-h-screen relative"
    style="
      background-color: var(--landing-bg, #000C05);
      color: var(--landing-text, #F1F5F7);
      padding-top: var(--landing-padding-top, 0rem);
      padding-bottom: var(--landing-padding-bottom, 0rem);
      padding-left: var(--landing-padding-x, 0rem);
      padding-right: var(--landing-padding-x, 0rem);
    "
  >
    <!-- MAIN CONTENT (no navbar/footer) -->
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple layout: global loader handled in app.vue
</script>