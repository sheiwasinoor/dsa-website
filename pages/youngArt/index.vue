<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ======================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ======================================= -->
    <section
      class="relative w-full flex items-center justify-center overflow-hidden"
      :style="{ minHeight: YOUNGART_HERO_MIN_HEIGHT + 'vh' }"
    >
      <!-- Background -->
      <img
        src="/images/youngArt-hero.jpg"
        alt="Young Art Architecture"
        class="absolute inset-0 w-full h-full object-cover object-center"
        :style="{ transform: `scale(${YOUNGART_HERO_IMAGE_SCALE})` }"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ backgroundColor: `rgba(0,0,0,${YOUNGART_HERO_OVERLAY_OPACITY})` }"
      ></div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#ECEBC7]">

        <div
          class="h-px mx-auto"
          :style="{
            marginBottom: YOUNGART_HERO_LINE_SPACING + 'vh',
            width: YOUNGART_HERO_LINE_WIDTH + '%',
            backgroundColor: YOUNGART_HERO_LINE_COLOR
          }"
        ></div>

        <h1
class="uppercase"
  :style="{
    fontSize: YOUNGART_HERO_TITLE_SIZE + 'rem',
    marginBottom: YOUNGART_HERO_TITLE_SPACING + 'vh',
    letterSpacing: YOUNGART_HERO_TITLE_TRACKING + 'em',
    color: YOUNGART_HERO_TEXT_COLOR
  }"
        >
          {{ heroCopy.title[locale] }}
        </h1>

<p
  class="leading-relaxed mx-auto text-justify"
  :style="{
    fontSize: YOUNGART_HERO_PARAGRAPH_SIZE + 'rem',
    maxWidth: YOUNGART_HERO_PARAGRAPH_WIDTH + 'rem',
    textAlign: 'justify',
    textJustify: 'inter-word',
    color: YOUNGART_HERO_TEXT_SOFT_COLOR,
    paddingTop: YOUNGART_HERO_PARAGRAPH_TOP_PADDING + 'vh',
    paddingBottom: YOUNGART_HERO_PARAGRAPH_BOTTOM_PADDING + 'vh'
  }"
>
  {{ heroCopy.body[locale] }}
</p>

<div
  class="h-px mx-auto"
  :style="{
    marginTop: YOUNGART_HERO_BOTTOM_LINE_SPACING + 'vh',
    width: YOUNGART_HERO_LINE_WIDTH + '%',
    backgroundColor: YOUNGART_HERO_LINE_COLOR_BOTTOM
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
        paddingTop: YOUNGART_SEARCH_TOP_PADDING + 'vh',
        paddingBottom: YOUNGART_SEARCH_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <div
        class="relative group transition-all duration-500 border-b"
        :style="{
          width: YOUNGART_SEARCH_WIDTH + 'px',
          borderColor: YOUNGART_SEARCH_BORDER_COLOR
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
            width: YOUNGART_SEARCH_ICON_SIZE + 'px',
            height: YOUNGART_SEARCH_ICON_SIZE + 'px'
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
        paddingTop: YOUNGART_GRID_TOP_PADDING + 'vh',
        paddingBottom: YOUNGART_GRID_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <TransitionGroup
        name="youngArt-grid"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        :style="{
          gap: YOUNGART_GRID_GAP + 'px',
          '--filter-duration': YOUNGART_GRID_FILTER_ANIMATION_DURATION + 'ms'
        }"
      >
        <article
          @click="goTo(p.slug)"
          v-for="p in filteredProjects"
          :key="p.id"
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer"
          :style="{ height: YOUNGART_GRID_CARD_HEIGHT + 'px' }"
        >
          <!-- Thumbnail -->
          <img
            :src="p.thumbnail"
            :alt="p.title[locale]"
            class="w-full h-full object-cover transition-transform"
            :style="{
              transitionDuration: YOUNGART_GRID_IMAGE_ZOOM_DURATION + 'ms',
              transitionTimingFunction: 'cubic-bezier(0.33,1,0.68,1)'
            }"
          />

          <!-- Hover Overlay -->
          <div
            class="absolute inset-x-0 bottom-0 bg-black/55 project-overlay"
            :style="{
              '--overlay-height': YOUNGART_GRID_HOVER_OVERLAY_HEIGHT + '%',
              '--overlay-duration': YOUNGART_GRID_HOVER_OVERLAY_DURATION + 'ms'
            }"
          >
            <!-- Project Title (INSIDE overlay, top-left) -->
            <div
              class="absolute left-0 top-0 p-5 z-10 project-title text-left"
              :style="{
                '--text-fade-duration': YOUNGART_GRID_TEXT_FADE_DURATION + 'ms'
              }"
            >
              <p
                class="font-semibold text-white"
                :style="{ fontSize: YOUNGART_GRID_TITLE_SIZE + 'rem' }"
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
import { heroCopy } from '~/content/youngArt';

const { locale } = useLocale();
const projects = ref([]);

onMounted(async () => {
  projects.value = await $fetch("/api/projects/list?destination=youngArt");
});

//
// ============================================================
//   CONFIG — ALL VALUES HERE
// ============================================================
//

// HERO COLORS + LINES
const YOUNGART_HERO_TEXT_COLOR = "#D8DCDD";          // main hero title + body color
const YOUNGART_HERO_TEXT_SOFT_COLOR = "#D8DCDD";   // softer version (body)
const YOUNGART_HERO_LINE_COLOR = "#D8DCDD"; // top divider
const YOUNGART_HERO_LINE_COLOR_BOTTOM = "#D8DCDD"; // bottom divider

// HERO
const YOUNGART_HERO_MIN_HEIGHT = 125;
const YOUNGART_HERO_IMAGE_SCALE = 1.04;
const YOUNGART_HERO_OVERLAY_OPACITY = 0.65;
const YOUNGART_HERO_LINE_WIDTH = 105;
const YOUNGART_HERO_LINE_SPACING = 3;
const YOUNGART_HERO_TITLE_SIZE = 2;
const YOUNGART_HERO_TITLE_SPACING = 1;
const YOUNGART_HERO_TITLE_TRACKING = 0.14; // em — adjust to taste
const YOUNGART_HERO_PARAGRAPH_SIZE = 1.0;
const YOUNGART_HERO_PARAGRAPH_WIDTH = 35;

// HERO — EXTRA SPACING
const YOUNGART_HERO_PARAGRAPH_TOP_PADDING = 1.5;   // vh
const YOUNGART_HERO_PARAGRAPH_BOTTOM_PADDING = 1.5; // vh

// HERO — BOTTOM LINE SPACING (separate control)
const YOUNGART_HERO_BOTTOM_LINE_SPACING = 3; // vh

// SEARCH BAR
const YOUNGART_SEARCH_WIDTH = 260;
const YOUNGART_SEARCH_ICON_SIZE = 16;
const YOUNGART_SEARCH_TOP_PADDING = 6;
const YOUNGART_SEARCH_BOTTOM_PADDING = 1;
const YOUNGART_SEARCH_BORDER_COLOR = '#336341';

// GRID
const YOUNGART_GRID_TOP_PADDING = 1;
const YOUNGART_GRID_BOTTOM_PADDING = 14;
const YOUNGART_GRID_GAP = 32; // Increased from 28 → 32
const YOUNGART_GRID_CARD_HEIGHT = 336; // 20% bigger (old 280)
const YOUNGART_GRID_IMAGE_ZOOM_DURATION = 500;
const YOUNGART_GRID_HOVER_OVERLAY_DURATION = 450;
const YOUNGART_GRID_HOVER_OVERLAY_HEIGHT = 45;
const YOUNGART_GRID_TEXT_FADE_DURATION = 320;
const YOUNGART_GRID_FILTER_ANIMATION_DURATION = 400;
const YOUNGART_GRID_TITLE_SIZE = 1.32; // Increased 15% from 1.15

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
  navigateTo(`/${slug}`);
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

.youngArt-grid-enter-active,
.youngArt-grid-leave-active,
.youngArt-grid-move {
  transition: all var(--filter-duration) ease-out;
}
.youngArt-grid-enter-from,
.youngArt-grid-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>