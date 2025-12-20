<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ======================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ======================================= -->
    <section
      ref="heroSection"
      class="hero-section"
      :class="[
        'relative w-full flex items-center justify-center overflow-hidden reveal-block',
        { 'reveal-visible': reveals.hero }
      ]"
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
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#ECEBC7] hero-content">

        <div
          class=" mx-auto hero-line"
          :style="{
            marginBottom: LIGHTING_HERO_LINE_SPACING + 'vh',
            width: LIGHTING_HERO_LINE_WIDTH + 'px',
            backgroundColor: LIGHTING_HERO_LINE_COLOR,
            height: 0.5 + 'px'
          }"
        ></div>

        <h1
class="uppercase"
  :style="{
    fontSize: LIGHTING_HERO_TITLE_SIZE + 'px',
    marginBottom: LIGHTING_HERO_TITLE_SPACING + 'px',
    letterSpacing: LIGHTING_HERO_TITLE_TRACKING + 'em',
    fontWeight: 600,
    color: LIGHTING_HERO_TEXT_COLOR
  }"
        >
          {{ heroCopy.title[locale] }}
        </h1>

<p
  class="leading-relaxed mx-auto text-justify hero-body"
  :style="{
    fontSize: LIGHTING_HERO_PARAGRAPH_SIZE + 'px',
    maxWidth: LIGHTING_HERO_PARAGRAPH_WIDTH + 'px',
    fontWeight: 200,
    letterSpacing: '-0.01em',
    lineHeight: '26px',
    color: LIGHTING_HERO_TEXT_SOFT_COLOR,
    paddingTop: LIGHTING_HERO_PARAGRAPH_TOP_PADDING + 'vh',
    paddingBottom: LIGHTING_HERO_PARAGRAPH_BOTTOM_PADDING + 'vh'
  }"
>
  {{ heroCopy.body[locale] }}
</p>

<div
  class="mx-auto hero-line"
  :style="{
    marginTop: LIGHTING_HERO_BOTTOM_LINE_SPACING + 'vh',
    width: LIGHTING_HERO_LINE_WIDTH + 'px',
    backgroundColor: LIGHTING_HERO_LINE_COLOR_BOTTOM,
            height: 0.5 + 'px'
  }"
></div>
      </div>
    </section>



    <!-- ======================================= -->
    <!-- 2. SEARCH BAR -->
    <!-- ======================================= -->
    <div
      ref="searchSection"
      class="search-wrap"
      :class="[
        'max-w-6xl mx-auto flex justify-end reveal-block',
        { 'reveal-visible': reveals.search }
      ]"
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
          borderColor: '#ECEBC7'
        }"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search keywords"
          class="bg-transparent text-[#ECEBC7] placeholder-[#ECEBC7] tracking-wide
                 focus:outline-none text-sm transition-all duration-500 pr-8 w-full pb-2"
        />

        <svg
          class="absolute right-0 top-1/2 -translate-y-1/2 stroke-[#ECEBC7]
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
      ref="gridSection"
      class="grid-wrap"
      :class="[
        'max-w-6xl mx-auto reveal-block',
        { 'reveal-visible': reveals.grid }
      ]"
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
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer card-lift"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
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
const LIGHTING_HERO_LINE_COLOR = "#ECEBC7"; // top divider
const LIGHTING_HERO_LINE_COLOR_BOTTOM = "#ECEBC7"; // bottom divider

// HERO
const LIGHTING_HERO_MIN_HEIGHT = 100;
const LIGHTING_HERO_IMAGE_SCALE = 1.04;
const LIGHTING_HERO_OVERLAY_OPACITY = 0.65;
const LIGHTING_HERO_LINE_WIDTH = 656;
const LIGHTING_HERO_LINE_SPACING = 3;
const LIGHTING_HERO_TITLE_SIZE = 32;
const LIGHTING_HERO_TITLE_SPACING = 0.5;
const LIGHTING_HERO_TITLE_TRACKING = 0.14; // em — adjust to taste
const LIGHTING_HERO_PARAGRAPH_SIZE = 18;
const LIGHTING_HERO_PARAGRAPH_WIDTH = 580;

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
const LIGHTING_GRID_HOVER_OVERLAY_HEIGHT = 35;
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
  navigateTo(`${slug}`);
}

/* Scroll reveals */
const heroSection = ref<HTMLElement | null>(null);
const searchSection = ref<HTMLElement | null>(null);
const gridSection = ref<HTMLElement | null>(null);

const reveals = ref({
  hero: false,
  search: false,
  grid: false, // stays hidden until observer or timeout flips it
});

const observerRef = ref<IntersectionObserver | null>(null);

onMounted(() => {
  // Fail-safe so thumbnails don't stay invisible if observer never fires (e.g., offscreen)
  const gridTimeout = setTimeout(() => {
    reveals.value.grid = true;
  }, 400);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target === heroSection.value) reveals.value.hero = true;
        if (target === searchSection.value) reveals.value.search = true;
        if (target === gridSection.value) reveals.value.grid = true;
        observer.unobserve(target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  [heroSection.value, searchSection.value, gridSection.value].forEach(
    (el) => el && observer.observe(el)
  );

  observerRef.value = observer;

  onBeforeUnmount(() => {
    clearTimeout(gridTimeout);
  });
});

onBeforeUnmount(() => {
  observerRef.value?.disconnect();
});
</script>

<style scoped>
.hero-body {
  text-align: justify !important;
  text-wrap: pretty;
}

@media (max-width: 720px) {
  .hero-section {
    min-height: 68vh !important;
    padding: 76px 0 32px 0;
    align-items: center;
  }

  .hero-content {
    max-width: 92vw !important;
    padding: 0 12px;
  }

  .hero-line {
    width: 90vw !important;
  }

  .hero-content h1 {
    font-size: 22px !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 14px !important;
  }

  .hero-body {
    font-size: 14px !important;
    max-width: 92vw !important;
    line-height: 22px !important;
    padding-top: 12px !important;
    padding-bottom: 14px !important;
    text-align: justify !important;
  }

  .search-wrap {
    justify-content: center !important;
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }

  .search-wrap > div {
    width: 100% !important;
    max-width: 520px;
  }

  .grid-wrap {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    padding-top: 24px !important;
    padding-bottom: 48px !important;
  }

  .grid-wrap .grid {
    gap: 16px !important;
  }
}
</style>



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

/* Reveal primitives */
.reveal-block {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 900ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Card hover */
.card-lift {
  transition:
    transform 320ms cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 320ms cubic-bezier(0.33, 1, 0.68, 1);
}
.card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-block,
  .card-lift {
    transition-duration: 0ms !important;
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>
