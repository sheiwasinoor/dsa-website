<!-- layouts/landing.vue -->
<template>
  <div class="min-h-screen bg-[#000C05] text-[#F1F5F7] relative">

    <!-- GLOBAL FADE LOADER -->
    <Loading :visible="globalPageLoading" :showLogo="globalShowLogo" />

    <!-- MAIN CONTENT (no navbar/footer) -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/global/Loading.vue";
import { globalPageLoading, globalShowLogo } from "~/plugins/page-loading.client";
</script>