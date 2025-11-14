<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ============================== -->
    <!-- 1. HERO SECTION -->
    <!-- ============================== -->
    <section class="relative w-full min-h-[90vh] flex items-center justify-center">

      <!-- Background -->
      <img
        src="/images/landscape-hero.jpg"
        alt="Landscape Architecture"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/55"></div>

      <!-- HERO CONTENT -->
      <div class="relative max-w-3xl mx-auto px-6 text-center text-[#ECEBC7]">

        <!-- Top line -->
        <div class="h-px bg-[#ECEBC7]/60 mb-6 mx-auto w-[65%]"></div>

        <!-- Title -->
        <h1 class="text-2xl md:text-3xl lg:text-4xl tracking-[0.28em] uppercase mb-6">
          {{ heroCopy.title[locale] }}
        </h1>

        <!-- Paragraph -->
        <p class="text-sm md:text-base leading-relaxed text-[#ECEBC7]/85 max-w-2xl mx-auto">
          {{ heroCopy.body[locale] }}
        </p>

        <!-- Bottom line -->
        <div class="h-px bg-[#ECEBC7]/40 mt-8 mx-auto w-[65%]"></div>
      </div>
    </section>



    <!-- ============================== -->
    <!-- 2. SEARCH BAR -->
    <!-- ============================== -->
    <div class="max-w-6xl mx-auto px-6 pt-16 pb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search keywords"
          class="w-full bg-transparent border-b border-[#336341]/40 pb-2 text-[#ECEBC7]/70 
                 placeholder-[#ECEBC7]/40 tracking-wide focus:outline-none"
        />

        <!-- Search icon -->
        <svg
          class="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 stroke-[#336341]/60"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-width="2"></line>
        </svg>
      </div>
    </div>



    <!-- ============================== -->
    <!-- 3. PROJECT GRID -->
    <!-- ============================== -->
    <div class="max-w-6xl mx-auto px-6 pb-28">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        <article
          v-for="p in filteredProjects"
          :key="p.id"
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer"
        >
          <div class="relative h-[220px]">

            <!-- Thumbnail -->
            <img
              :src="p.thumbnail"
              :alt="p.title[locale]"
              class="h-full w-full object-cover transition-transform duration-500 ease-out 
                     group-hover:scale-105"
            />

            <!-- Rising overlay -->
            <div
              class="absolute inset-x-0 bottom-0 h-0 bg-black/50 
                     group-hover:h-1/2 transition-all duration-500 ease-out"
            ></div>

            <!-- Text -->
            <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
              <p class="text-sm font-semibold text-white">
                {{ p.title[locale] }}
              </p>
              <p class="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#ECEBC7]/70">
                {{ p.category[locale] }}
              </p>
            </div>

          </div>
        </article>

      </div>
    </div>

  </div>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocale } from '~/composables/useLocale';

// IMPORT CONTENT (this is the important fix)
import { heroCopy, projects } from '~/content/landscape';

const { locale } = useLocale();

/* SEARCH */
const searchQuery = ref("");

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return projects;

  const q = searchQuery.value.toLowerCase();

  return projects.filter((p) =>
    p.title.en.toLowerCase().includes(q) ||
    p.title.zh.includes(q) ||
    p.keywords.some(kw => kw.toLowerCase().includes(q))
  );
});
</script>



<style scoped>
/* Text block stability */
.letter-columns-wrapper {
  break-inside: avoid;
  column-fill: balance;
}

.break-inside-avoid-column {
  break-inside: avoid-column;
}
</style>