<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ======================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ======================================= -->
    <section
      class="relative w-full flex items-center justify-center overflow-hidden"
      :style="{ minHeight: LIGHTING_HERO_MIN_HEIGHT + 'vh' }"
    >
      <!-- Background -->
      <img
        src="/images/lighting-hero.jpg"
        alt="Lighting Architecture"
        class="absolute inset-0 w-full h-full object-cover object-center"
        :style="{ transform: `scale(${LIGHTING_HERO_IMAGE_SCALE})` }"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ backgroundColor: `rgba(0,0,0,${LIGHTING_HERO_OVERLAY_OPACITY})` }"
      ></div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#ECEBC7]">

        <div
          class="h-px mx-auto"
          :style="{
            marginBottom: LIGHTING_HERO_LINE_SPACING + 'vh',
            width: LIGHTING_HERO_LINE_WIDTH + '%',
            backgroundColor: LIGHTING_HERO_LINE_COLOR
          }"
        ></div>

        <h1
class="uppercase"
  :style="{
    fontSize: LIGHTING_HERO_TITLE_SIZE + 'rem',
    marginBottom: LIGHTING_HERO_TITLE_SPACING + 'vh',
    letterSpacing: LIGHTING_HERO_TITLE_TRACKING + 'em',
    color: LIGHTING_HERO_TEXT_COLOR
  }"
        >
          {{ heroCopy.title[locale] }}
        </h1>

<p
  class="leading-relaxed mx-auto text-justify"
  :style="{
    fontSize: LIGHTING_HERO_PARAGRAPH_SIZE + 'rem',
    maxWidth: LIGHTING_HERO_PARAGRAPH_WIDTH + 'rem',
    textAlign: 'justify',
    textJustify: 'inter-word',
    color: LIGHTING_HERO_TEXT_SOFT_COLOR,
    paddingTop: LIGHTING_HERO_PARAGRAPH_TOP_PADDING + 'vh',
    paddingBottom: LIGHTING_HERO_PARAGRAPH_BOTTOM_PADDING + 'vh'
  }"
>
  {{ heroCopy.body[locale] }}
</p>

<div
  class="h-px mx-auto"
  :style="{
    marginTop: LIGHTING_HERO_BOTTOM_LINE_SPACING + 'vh',
    width: LIGHTING_HERO_LINE_WIDTH + '%',
    backgroundColor: LIGHTING_HERO_LINE_COLOR_BOTTOM
  }"
></div>
      </div>
    </section>



    <!-- ======================================= -->
    <!-- 2. SEARCH BAR -->
    <!-- ======================================= -->
    <div
      class="max-w-6xl mx-auto flex justify-end"
      :style="{
        paddingTop: LIGHTING_SEARCH_TOP_PADDING + 'vh',
        paddingBottom: LIGHTING_SEARCH_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <div
        class="relative group transition-all duration-500 border-b"
        :style="{
          width: LIGHTING_SEARCH_WIDTH + 'px',
          borderColor: LIGHTING_SEARCH_BORDER_COLOR
        }"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search keywords"
          class="bg-transparent text-[#ECEBC7]/70 placeholder-[#ECEBC7]/40 tracking-wide
                 focus:outline-none text-sm transition-all duration-500 pr-8 w-full pb-2"
        />

        <svg
          class="absolute right-0 top-1/2 -translate-y-1/2 stroke-[#ECEBC7]/50
                 transition-transform duration-500 group-focus-within:translate-x-1 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          :style="{
            width: LIGHTING_SEARCH_ICON_SIZE + 'px',
            height: LIGHTING_SEARCH_ICON_SIZE + 'px'
          }"
        >
          <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-width="2"></line>
        </svg>
      </div>
    </div>



    <!-- ======================================= -->
    <!-- 3. PROJECT GRID -->
    <!-- ======================================= -->
    <div
      class="max-w-6xl mx-auto"
      :style="{
        paddingTop: LIGHTING_GRID_TOP_PADDING + 'vh',
        paddingBottom: LIGHTING_GRID_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <TransitionGroup
        name="lighting-grid"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        :style="{
          gap: LIGHTING_GRID_GAP + 'px',
          '--filter-duration': LIGHTING_GRID_FILTER_ANIMATION_DURATION + 'ms'
        }"
      >
        <article
          @click="goTo(p.slug)"
          v-for="p in filteredProjects"
          :key="p.id"
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer"
          :style="{ height: LIGHTING_GRID_CARD_HEIGHT + 'px' }"
        >
          <!-- Thumbnail -->
          <img
            :src="p.thumbnail"
            :alt="p.title[locale]"
            class="w-full h-full object-cover transition-transform"
            :style="{
              transitionDuration: LIGHTING_GRID_IMAGE_ZOOM_DURATION + 'ms',
              transitionTimingFunction: 'cubic-bezier(0.33,1,0.68,1)'
            }"
          />

          <!-- Hover Overlay -->
          <div
            class="absolute inset-x-0 bottom-0 bg-black/55 project-overlay"
            :style="{
              '--overlay-height': LIGHTING_GRID_HOVER_OVERLAY_HEIGHT + '%',
              '--overlay-duration': LIGHTING_GRID_HOVER_OVERLAY_DURATION + 'ms'
            }"
          >
            <!-- Project Title (INSIDE overlay, top-left) -->
            <div
              class="absolute left-0 top-0 p-5 z-10 project-title text-left"
              :style="{
                '--text-fade-duration': LIGHTING_GRID_TEXT_FADE_DURATION + 'ms'
              }"
            >
              <p
                class="font-semibold text-white"
                :style="{ fontSize: LIGHTING_GRID_TITLE_SIZE + 'rem' }"
              >
                {{ p.title[locale] }}
              </p>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>

  </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLocale } from '~/composables/useLocale';
import { heroCopy } from '~/content/lighting';

const { locale } = useLocale();
const projects = ref([]);

onMounted(async () => {
  projects.value = await $fetch("/api/projects/list?destination=lighting");
});

//
// ============================================================
//   CONFIG — ALL VALUES HERE
// ============================================================
//

// HERO COLORS + LINES
const LIGHTING_HERO_TEXT_COLOR = "#D8DCDD";          // main hero title + body color
const LIGHTING_HERO_TEXT_SOFT_COLOR = "#D8DCDD";   // softer version (body)
const LIGHTING_HERO_LINE_COLOR = "#D8DCDD"; // top divider
const LIGHTING_HERO_LINE_COLOR_BOTTOM = "#D8DCDD"; // bottom divider

// HERO
const LIGHTING_HERO_MIN_HEIGHT = 125;
const LIGHTING_HERO_IMAGE_SCALE = 1.04;
const LIGHTING_HERO_OVERLAY_OPACITY = 0.65;
const LIGHTING_HERO_LINE_WIDTH = 105;
const LIGHTING_HERO_LINE_SPACING = 3;
const LIGHTING_HERO_TITLE_SIZE = 2;
const LIGHTING_HERO_TITLE_SPACING = 1;
const LIGHTING_HERO_TITLE_TRACKING = 0.14; // em — adjust to taste
const LIGHTING_HERO_PARAGRAPH_SIZE = 1.0;
const LIGHTING_HERO_PARAGRAPH_WIDTH = 35;

// HERO — EXTRA SPACING
const LIGHTING_HERO_PARAGRAPH_TOP_PADDING = 1.5;   // vh
const LIGHTING_HERO_PARAGRAPH_BOTTOM_PADDING = 1.5; // vh

// HERO — BOTTOM LINE SPACING (separate control)
const LIGHTING_HERO_BOTTOM_LINE_SPACING = 3; // vh

// SEARCH BAR
const LIGHTING_SEARCH_WIDTH = 260;
const LIGHTING_SEARCH_ICON_SIZE = 16;
const LIGHTING_SEARCH_TOP_PADDING = 6;
const LIGHTING_SEARCH_BOTTOM_PADDING = 1;
const LIGHTING_SEARCH_BORDER_COLOR = '#336341';

// GRID
const LIGHTING_GRID_TOP_PADDING = 1;
const LIGHTING_GRID_BOTTOM_PADDING = 14;
const LIGHTING_GRID_GAP = 32; // Increased from 28 → 32
const LIGHTING_GRID_CARD_HEIGHT = 336; // 20% bigger (old 280)
const LIGHTING_GRID_IMAGE_ZOOM_DURATION = 500;
const LIGHTING_GRID_HOVER_OVERLAY_DURATION = 450;
const LIGHTING_GRID_HOVER_OVERLAY_HEIGHT = 45;
const LIGHTING_GRID_TEXT_FADE_DURATION = 320;
const LIGHTING_GRID_FILTER_ANIMATION_DURATION = 400;
const LIGHTING_GRID_TITLE_SIZE = 1.32; // Increased 15% from 1.15

// SEARCH FILTER
const searchQuery = ref('');

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return projects.value;

  const q = searchQuery.value.toLowerCase();

  return projects.value.filter(
    (p) =>
      p.title.en.toLowerCase().includes(q) ||
      p.title.zh.includes(q) ||
      p.keywords.some((kw: string) => kw.toLowerCase().includes(q))
  );
});

//GoTO Function to go to slug
function goTo(slug: string) {
  navigateTo(`/lighting/${slug}`);
}
</script>



<style scoped>
.project-overlay {
  position: absolute;
  height: 0;
  transition: height var(--overlay-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
.group:hover .project-overlay {
  height: var(--overlay-height);
}

.project-title {
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity var(--text-fade-duration) ease-out,
    transform var(--text-fade-duration) ease-out;
}
.group:hover .project-title {
  opacity: 1;
  transform: translateY(0);
}

.lighting-grid-enter-active,
.lighting-grid-leave-active,
.lighting-grid-move {
  transition: all var(--filter-duration) ease-out;
}
.lighting-grid-enter-from,
.lighting-grid-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>