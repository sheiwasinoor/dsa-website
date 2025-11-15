<!-- layouts/landing.vue -->
<template>
  <div class="min-h-screen bg-[#000C05] text-[#F1F5F7] relative">
    <!-- MAIN CONTENT (no navbar/footer) -->
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple layout: global loader handled in app.vue
</script>