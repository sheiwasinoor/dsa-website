<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- ======================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ======================================= -->
    <section
      ref="heroSection"
      :class="[
        'relative w-full flex items-center justify-center overflow-hidden reveal-block',
        { 'reveal-visible': reveals.hero }
      ]"
      :style="{ minHeight: LANDSCAPE_HERO_MIN_HEIGHT + 'vh' }"
    >
      <!-- Background -->
      <img
        src="/images/landscape-hero.jpg"
        alt="Landscape Architecture"
        class="absolute inset-0 w-full h-full object-cover object-center"
        :style="{ transform: `scale(${LANDSCAPE_HERO_IMAGE_SCALE})` }"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ backgroundColor: `rgba(0,0,0,${LANDSCAPE_HERO_OVERLAY_OPACITY})` }"
      ></div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center text-[#ECEBC7]">

        <div
          class="h-px mx-auto"
          :style="{
            marginBottom: LANDSCAPE_HERO_LINE_SPACING + 'vh',
            width: LANDSCAPE_HERO_LINE_WIDTH + 'px',
            backgroundColor: LANDSCAPE_HERO_LINE_COLOR
          }"
        ></div>

        <h1
class="uppercase"
  :style="{
    fontSize: LANDSCAPE_HERO_TITLE_SIZE + 'px',
    marginBottom: LANDSCAPE_HERO_TITLE_SPACING + 'px',
    letterSpacing: LANDSCAPE_HERO_TITLE_TRACKING + 'em',
    fontWeight: 600,
    color: LANDSCAPE_HERO_TEXT_COLOR
  }"
        >
          {{ heroCopy.title[locale] }}
        </h1>

<p
  class="leading-relaxed mx-auto text-justify"
  :style="{
    fontSize: LANDSCAPE_HERO_PARAGRAPH_SIZE + 'px',
    maxWidth: LANDSCAPE_HERO_PARAGRAPH_WIDTH + 'px',
    fontWeight: 200,
    letterSpacing: '-0.01em',
    lineHeight: '26px',
    color: LANDSCAPE_HERO_TEXT_SOFT_COLOR,
    paddingTop: LANDSCAPE_HERO_PARAGRAPH_TOP_PADDING + 'vh',
    paddingBottom: LANDSCAPE_HERO_PARAGRAPH_BOTTOM_PADDING + 'vh'
  }"
>
  {{ heroCopy.body[locale] }}
</p>

<div
  class="h-px mx-auto"
  :style="{
    marginTop: LANDSCAPE_HERO_BOTTOM_LINE_SPACING + 'vh',
    width: LANDSCAPE_HERO_LINE_WIDTH + 'px',
    backgroundColor: LANDSCAPE_HERO_LINE_COLOR_BOTTOM
  }"
></div>
      </div>
    </section>



    <!-- ======================================= -->
    <!-- 2. SEARCH BAR -->
    <!-- ======================================= -->
    <div
      ref="searchSection"
      :class="[
        'max-w-6xl mx-auto flex justify-end reveal-block',
        { 'reveal-visible': reveals.search }
      ]"
      :style="{
        paddingTop: LANDSCAPE_SEARCH_TOP_PADDING + 'vh',
        paddingBottom: LANDSCAPE_SEARCH_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <div
        class="relative group transition-all duration-500 border-b"
        :style="{
          width: LANDSCAPE_SEARCH_WIDTH + 'px',
          borderColor: '#8EB29E'
        }"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search keywords"
          class="bg-transparent text-[#8EB29E] placeholder-[#8EB29E] tracking-wide
                 focus:outline-none text-sm transition-all duration-500 pr-8 w-full pb-2"
        />

        <svg
          class="absolute right-0 top-1/2 -translate-y-1/2 stroke-[#8EB29E]
                 transition-transform duration-500 group-focus-within:translate-x-1 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          :style="{
            width: LANDSCAPE_SEARCH_ICON_SIZE + 'px',
            height: LANDSCAPE_SEARCH_ICON_SIZE + 'px'
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
      :class="[
        'max-w-6xl mx-auto reveal-block',
        { 'reveal-visible': reveals.grid }
      ]"
      :style="{
        paddingTop: LANDSCAPE_GRID_TOP_PADDING + 'vh',
        paddingBottom: LANDSCAPE_GRID_BOTTOM_PADDING + 'vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }"
    >
      <TransitionGroup
        name="landscape-grid"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        :style="{
          gap: LANDSCAPE_GRID_GAP + 'px',
          '--filter-duration': LANDSCAPE_GRID_FILTER_ANIMATION_DURATION + 'ms'
        }"
      >
        <article
          @click="goTo(p.slug)"
          v-for="p in filteredProjects"
          :key="p.id"
          class="relative group overflow-hidden bg-[#101A14] rounded-md cursor-pointer card-lift min-h-[1px]"
          :style="{ height: LANDSCAPE_GRID_CARD_HEIGHT + 'px' }"
        >
          <!-- Thumbnail -->
          <img
            :src="resolveThumb(p.thumbnail)"
            :alt="p.title?.[locale] || ''"
            class="w-full h-full object-cover transition-transform"
            :style="{
              transitionDuration: LANDSCAPE_GRID_IMAGE_ZOOM_DURATION + 'ms',
              transitionTimingFunction: 'cubic-bezier(0.33,1,0.68,1)'
            }"
            @error="(e) => markThumbError(e, p.thumbnail)"
          />

          <!-- Debug fallback (only shows when the image fails to load) -->
          <div
            class="absolute inset-0"
            :style="{
              background:
                'linear-gradient(135deg, rgba(142,178,158,0.18), rgba(16,26,20,0.92))',
              opacity: 0,
              transition: 'opacity 200ms ease-out'
            }"
            :data-thumb-fallback="p.id"
          ></div>

          <!-- Hover Overlay -->
          <div
            class="absolute inset-x-0 bottom-0 bg-black/55 project-overlay"
            :style="{
              '--overlay-height': LANDSCAPE_GRID_HOVER_OVERLAY_HEIGHT + '%',
              '--overlay-duration': LANDSCAPE_GRID_HOVER_OVERLAY_DURATION + 'ms'
            }"
          >
            <!-- Project Title (INSIDE overlay, top-left) -->
            <div
              class="absolute left-0 top-0 p-5 z-10 project-title text-left"
              :style="{
                '--text-fade-duration': LANDSCAPE_GRID_TEXT_FADE_DURATION + 'ms'
              }"
            >
              <p
                class="font-semibold text-white"
                :style="{ fontSize: LANDSCAPE_GRID_TITLE_SIZE + 'rem' }"
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
import { heroCopy } from '~/content/landscape';

const { locale } = useLocale();
const projects = ref([]);

onMounted(async () => {
  projects.value = await $fetch("/api/projects/list?destination=landscape");
});

//
// ============================================================
//   CONFIG — ALL VALUES HERE
// ============================================================
//

// HERO COLORS + LINES
const LANDSCAPE_HERO_TEXT_COLOR = "#D8DCDD";          // main hero title + body color
const LANDSCAPE_HERO_TEXT_SOFT_COLOR = "#D8DCDD";   // softer version (body)
const LANDSCAPE_HERO_LINE_COLOR = "#6E8C7C"; // top divider 
const LANDSCAPE_HERO_LINE_COLOR_BOTTOM = "#6E8C7C"; // bottom divider

// HERO
const LANDSCAPE_HERO_MIN_HEIGHT = 100;
const LANDSCAPE_HERO_IMAGE_SCALE = 1.04;
const LANDSCAPE_HERO_OVERLAY_OPACITY = 0.65;
const LANDSCAPE_HERO_LINE_WIDTH = 656;
const LANDSCAPE_HERO_LINE_SPACING = 3;
const LANDSCAPE_HERO_TITLE_SIZE = 32;
const LANDSCAPE_HERO_TITLE_SPACING = 0.5;
const LANDSCAPE_HERO_TITLE_TRACKING = 0.14; // em — adjust to taste
const LANDSCAPE_HERO_PARAGRAPH_SIZE = 18;
const LANDSCAPE_HERO_PARAGRAPH_WIDTH = 580;

// HERO — EXTRA SPACING
const LANDSCAPE_HERO_PARAGRAPH_TOP_PADDING = 1.5;   // vh
const LANDSCAPE_HERO_PARAGRAPH_BOTTOM_PADDING = 1.5; // vh

// HERO — BOTTOM LINE SPACING (separate control)
const LANDSCAPE_HERO_BOTTOM_LINE_SPACING = 3; // vh

// SEARCH BAR
const LANDSCAPE_SEARCH_WIDTH = 260;
const LANDSCAPE_SEARCH_ICON_SIZE = 16;
const LANDSCAPE_SEARCH_TOP_PADDING = 6;
const LANDSCAPE_SEARCH_BOTTOM_PADDING = 1;
const LANDSCAPE_SEARCH_BORDER_COLOR = '#336341';

// GRID
const LANDSCAPE_GRID_TOP_PADDING = 1;
const LANDSCAPE_GRID_BOTTOM_PADDING = 14;
const LANDSCAPE_GRID_GAP = 32; // Increased from 28 → 32
const LANDSCAPE_GRID_CARD_HEIGHT = 336; // 20% bigger (old 280)
const LANDSCAPE_GRID_IMAGE_ZOOM_DURATION = 500;
const LANDSCAPE_GRID_HOVER_OVERLAY_DURATION = 450;
const LANDSCAPE_GRID_HOVER_OVERLAY_HEIGHT = 35;
const LANDSCAPE_GRID_TEXT_FADE_DURATION = 320;
const LANDSCAPE_GRID_FILTER_ANIMATION_DURATION = 400;
const LANDSCAPE_GRID_TITLE_SIZE = 1.32; // Increased 15% from 1.15

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

// Normalize thumbnails so relative DB paths don't become route-relative (e.g. /landscape/...) and 404.
function resolveThumb(src: unknown): string {
  const s = String(src ?? '').trim();
  if (!s) return '';

  // Absolute URLs or data/blob URLs — keep as-is
  if (/^(https?:\/\/|data:|blob:)/i.test(s)) return s;

  // If it already starts with '/', it's root-relative and fine
  if (s.startsWith('/')) return s;

  // Otherwise make it root-relative
  return '/' + s;
}

function markThumbError(e: Event, original: unknown) {
  // Show a visible fallback overlay when the image fails to load
  const img = e.target as HTMLImageElement | null;
  if (!img) return;
  const card = img.closest('article');
  const fallback = card?.querySelector('[data-thumb-fallback]') as HTMLElement | null;
  if (fallback) fallback.style.opacity = '1';

  // Helpful console signal for diagnosing path issues
  // eslint-disable-next-line no-console
  console.warn('[Landscape] thumbnail failed to load:', {
    original,
    resolved: img.currentSrc || img.src,
  });
}

/* Scroll reveals */
const heroSection = ref<HTMLElement | null>(null);
const searchSection = ref<HTMLElement | null>(null);
const gridSection = ref<HTMLElement | null>(null);

const reveals = ref({
  hero: false,
  search: false,
  grid: false, // start hidden, but fail-safe below will auto-show
});

const observerRef = ref<IntersectionObserver | null>(null);

onMounted(() => {
  // Fail-safe: force grid visible shortly after mount so thumbnails never stay hidden.
  const gridTimeout = setTimeout(() => {
    reveals.value.grid = true;
  }, 400);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
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

.landscape-grid-enter-active,
.landscape-grid-leave-active,
.landscape-grid-move {
  transition: all var(--filter-duration) ease-out;
}
.landscape-grid-enter-from,
.landscape-grid-leave-to {
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
