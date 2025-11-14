<template>
  <footer class="mt-24 border-t border-[#5D6762]/40 bg-[#000C05] text-[#F1F5F7]">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between">
      <!-- Left: Logo + Socials -->
      <div class="space-y-4">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold tracking-wide text-[#ECEBC7]">
            DSA DESIGN
          </span>
        </div>

        <!-- Social icons (placeholder icons for now) -->
        <div class="flex items-center gap-4 text-[#5D6762]">
          <button class="transition hover:text-[#ECEBC7] hover:drop-shadow-[0_0_8px_rgba(236,235,199,0.65)]">
            FB
          </button>
          <button class="transition hover:text-[#ECEBC7] hover:drop-shadow-[0_0_8px_rgba(236,235,199,0.65)]">
            IN
          </button>
          <button class="transition hover:text-[#ECEBC7] hover:drop-shadow-[0_0_8px_rgba(236,235,199,0.65)]">
            YT
          </button>
          <button class="transition hover:text-[#ECEBC7] hover:drop-shadow-[0_0_8px_rgba(236,235,199,0.65)]">
            IG
          </button>
        </div>
      </div>

      <!-- Right: Topic / Page columns -->
      <div class="grid gap-8 text-sm text-[#F1F5F7] md:grid-cols-3">
        <div v-for="col in footerColumns" :key="col.topic" class="space-y-2">
          <div class="uppercase tracking-[0.12em] text-xs text-[#F1F5F7]">
            {{ col.topic }}
          </div>
          <div>
            <NuxtLink
              :to="col.to"
              class="border-b border-current pb-0.5 text-xs tracking-[0.12em] uppercase transition-colors duration-200"
              :class="linkColorClass"
            >
              {{ col.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '~/composables/useTheme';

const { theme } = useTheme();

// Example footer structure; we can adjust once we know actual “Topic/Page”
const footerColumns = [
  {
    topic: 'Topic',
    label: 'About',
    to: '/about'
  },
  {
    topic: 'Topic',
    label: 'Landscape',
    to: '/landscape'
  },
  {
    topic: 'Topic',
    label: 'Contact',
    to: '/contact'
  }
];

const linkColorClass = computed(() => {
  // Landscape = green, Lighting = yellow
  if (theme.value === 'lighting') {
    return 'text-[#ECEBC7] hover:text-[#336341] hover:drop-shadow-[0_0_8px_rgba(51,99,65,0.65)]';
  }
  // landscape default
  return 'text-[#336341] hover:text-[#ECEBC7] hover:drop-shadow-[0_0_8px_rgba(236,235,199,0.65)]';
});
</script>